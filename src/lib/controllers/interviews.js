const dayjs = require('dayjs');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require('unique-names-generator');
const agoraClient = require('../../utils/agoraClient');

module.exports = function (deps) {
  const { config, db } = deps;

  const query = `
SELECT
   *
FROM
   (
      SELECT
         INTERVIEWS_TABLE.application_id AS application_id,
         APPLICATIONS_TABLE.applicant_id AS applicant_id,
         EMPLOYEE_TABLE.name AS applicant_name,
         application_status,
         channel_name,
         date,
         id,
         status,
         time,
         profession,
         APPLICATIONS_TABLE.job_id,
         EMPLOYER_TABLE.name AS employer_name,
         EMPLOYER_TABLE.created_by AS employer_id
      FROM
         interviews INTERVIEWS_TABLE
         JOIN
            (
               SELECT
                  id AS application_id,
                  applicant_id,
                  job_id,
                  status AS application_status
               FROM
                  applications
            )
            APPLICATIONS_TABLE
            ON INTERVIEWS_TABLE.application_id = APPLICATIONS_TABLE.application_id
         JOIN
            (
               SELECT
                  id AS job_id,
                  profession_id,
                  created_by
               FROM
                  jobs
            )
            JOBS_TABLE
            ON APPLICATIONS_TABLE.job_id = JOBS_TABLE.job_id
         JOIN
            (
               SELECT
                  id AS created_by,
                  name
               FROM
                  users
            )
            EMPLOYER_TABLE
            ON JOBS_TABLE.created_by = EMPLOYER_TABLE.created_by
         JOIN
            (
               SELECT
                  id AS applicant_id,
                  name
               FROM
                  users
            )
            EMPLOYEE_TABLE
            ON APPLICATIONS_TABLE.applicant_id = EMPLOYEE_TABLE.applicant_id
         JOIN
            (
               SELECT
                  id AS profession_id,
                  label AS profession
               FROM
                  types
            )
            TYPES_TABLE
            ON JOBS_TABLE.profession_id = TYPES_TABLE.profession_id
   )
   AS MASTER
WHERE
   date >= CURRENT_DATE
`;

  return {
    async getInterviews(req, res) {
      try {
        const { id, role } = req.user;

        console.log(req.user);

        if (role === 'EMPLOYEE') {
          const rows = await db.query(
            `${query} AND status = "PENDING" OR status = "CONFIRMED" AND applicant_id = ?`,
            [id],
          );

          res.status(200).json(rows);
        }

        if (role === 'EMPLOYER') {
          const rows = await db.query(`${query} AND employer_id = ?`, [id]);

          res.status(200).json(rows);
        }
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async getInterviewByID(req, res) {
      try {
        const { id } = req.params;

        const rows = await db.query(
          `${query} AND APPLICATIONS_TABLE.application_id = ?`,
          [Number(id)],
        );

        if (rows.length) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }
      } catch (e) {
        res.status(500).end();
      }
    },
    async updateInterviewStatus(req, res) {
      try {
        const { id } = req.params;

        const { status, date, time } = req.body;

        if (status === 'CONFIRMED') {
          await db.query(
            'UPDATE interviews SET channel_name = ?, date = ?, time = ?, status = ? WHERE id = ?',
            [
              uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
              }),
              date,
              time,
              status,
              Number(id),
            ],
          );
        } else {
          await db.query(
            'UPDATE interviews SET date = ?, time = ?, status = ? WHERE id = ?',
            [date, time, status, Number(id)],
          );
        }

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
    async requestRtcToken(req, res) {
      try {
        const expirationTimeInSeconds = 3600;
        const role = RtcRole.PUBLISHER;

        const { id } = req.params;

        const { id: uid } = req.user;

        const [{ channel_name }] = await db.query(
          'SELECT channel_name FROM interviews WHERE id = ?',
          [id],
        );

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        const token = RtcTokenBuilder.buildTokenWithUid(
          config.get('agora.appId'),
          config.get('agora.appCertificate'),
          channel_name,
          uid,
          role,
          privilegeExpiredTs,
        );

        res.status(200).json({ token, channel_name, uid });
      } catch (e) {
        res.status(500).end();
      }
    },
    async acquireAgoraResource(req, res) {
      try {
        const { id } = req.params;

        const { id: uid, role } = req.user;

        const { token } = req.body;

        const [{ channel_name }] = await db.query(
          'SELECT channel_name FROM interviews WHERE id = ?',
          [id],
        );

        if (channel_name) {
          const {
            data: { resourceId },
          } = await agoraClient.post('/cloud_recording/acquire', {
            cname: channel_name,
            uid: uid.toString(),
            clientRequest: {
              region: 'AP',
            },
          });

          const { data } = await agoraClient.post(
            `/cloud_recording/resourceid/${resourceId}/mode/mix/start`,
            {
              cname: channel_name,
              uid: uid.toString(),
              clientRequest: {
                token,
                recordingConfig: {
                  maxIdleTime: 30,
                  streamTypes: 2,
                  channelType: 1,
                  transcodingConfig: {
                    height: 720,
                    width: 960,
                    bitrate: 1820,
                    fps: 15,
                    mixedVideoLayout: 1,
                  },
                },
                recordingFileConfig: {
                  avFileType: ['hls', 'mp4'],
                },
                storageConfig: {
                  vendor: 1,
                  region: 8,
                  bucket: config.get('aws.agoraBucket'),
                  accessKey: config.get('aws.accessKeyId'),
                  secretKey: config.get('aws.secretAccessKey'),
                  fileNamePrefix: [
                    `${dayjs().format('DDMMYYYY')}`,
                    `${id}`,
                    `${role}`,
                  ],
                },
              },
            },
          );

          res.status(200).json(data);
        } else {
          res.status(400).end();
        }
      } catch (e) {
        res.status(500).end();
      }
    },
    async stopAgoraRecording(req, res) {
      try {
        const { channel_name, uid, resource_id, sid } = req.body;

        console.log(req.body);

        const { data } = await agoraClient.post(
          `/cloud_recording/resourceid/${resource_id}/sid/${sid}/mode/mix/stop`,
          {
            cname: channel_name,
            uid: uid.toString(),
            clientRequest: {
              async_stop: false,
            },
          },
        );

        res.status(200).json(data);
      } catch (e) {
        console.log(e);
        res.status(200).end();
      }
    },
  };
};
