const dayjs = require('dayjs');
const notificationClient = require('../../utils/notificationClient');

module.exports = function (deps) {
  const { db } = deps;

  return {
    async getApplicationByID(req, res) {
      try {
        const { id: uid, role } = req.user;

        const { id } = req.params;

        if (role === 'EMPLOYEE') {
          const rows = await db.query(
            'SELECT * FROM applications WHERE applicant_id = ? AND id = ?',
            [uid, id],
          );

          if (rows.length) {
            res.status(200).json(rows[0]);
          } else {
            res.status(404).end();
          }
        } else if (role === 'EMPLOYER') {
          const rows = await db.query(
            `
SELECT *, created_by AS user_id FROM applications APPLICATIONS_TABLE

JOIN
(SELECT id AS job_id, created_by FROM jobs) JOBS_TABLE
ON APPLICATIONS_TABLE.job_id = JOBS_TABLE.job_id

WHERE APPLICATIONS_TABLE.id = ? AND created_by = ?
            `,
            [id, uid],
          );

          if (rows.length) {
            const { created_by, user_id, ...rest } = rows[0];

            res.status(200).json(rest);
          } else {
            res.status(404).end();
          }
        }
      } catch (e) {
        console.log(e);

        res.status(500).end();
      }
    },
    async updateApplicationByID(req, res) {
      try {
        const { id: uid, role } = req.user;

        const { status } = req.body;

        const { id } = req.params;

        if (role === 'EMPLOYEE') {
          if (status !== 'WITHDRAWN') {
            console.log(1);

            res.status(403).end();
          } else {
            await db.query('UPDATE applications SET status = ? WHERE id = ?', [
              status,
              id,
            ]);

            res.status(200).end();
          }
        } else if (role === 'EMPLOYER') {
          if (status === 'OPEN') {
            res.status(403).end();
          } else {
            const rows = await db.query(
              `
SELECT id, created_by AS user_id FROM applications APPLICATIONS_TABLE

JOIN
(SELECT id AS job_id, created_by FROM jobs) JOBS_TABLE
ON APPLICATIONS_TABLE.job_id = JOBS_TABLE.job_id

WHERE id = ? AND created_by = ?
            `,
              [id, uid],
            );

            if (rows.length) {
              await db.query(
                'UPDATE applications SET status = ? WHERE id = ?',
                [status, id],
              );

              res.status(200).end();
            } else {
              res.status(403).end();
            }
          }
        } else if (role === 'ADMIN') {
          await db.query('UPDATE applications SET status = ? WHERE id = ?', [
            id,
          ]);

          res.status(200).end();
        } else {
          res.status(403).end();
        }
      } catch (e) {
        res.status(500).end();
      }
    },
    async scheduleInterview(req, res) {
      try {
        const { date, time, isHindi } = req.body;

        const { id } = req.params;

        await db.query(
          'INSERT INTO interviews (application_id, date, time) VALUES (?, ?, ?)',
          [id, date, time],
        );

        await db.query(
          'UPDATE applications SET status = "SCREENING" WHERE id = ?',
          [id],
        );

        const rows = await db.query(
          'SELECT id, name, user_id, fcm_token FROM `applications` APPLICATIONS JOIN (SELECT name, id as user_id, fcm_token FROM users) USERS ON APPLICATIONS.applicant_id = USERS.user_id WHERE id = ?',
          [id],
        );

        if (rows.length) {
          const { name, fcm_token, user_id } = rows[0];

          const body = isHindi
            ? `हाय ${name}, आपका साक्षात्कार ${dayjs(`${date} ${time}`).format(
                'hh:mm A, DD MMMM YYYY',
              )} स्केडुल हुआ है।`
            : `Hi ${name}, your interview is scheduled at ${dayjs(
                `${date} ${time}`,
              ).format('hh:mm A, DD MMMM YYYY')}.`;

          const title = isHindi ? 'इंटरव्यू स्केडुलड ' : 'Interview scheduled';

          const { data } = await notificationClient.post('', {
            to: fcm_token,
            data: {},
            notification: {
              body,
              title,
            },
          });

          console.log(data);

          await db.query(
            'INSERT INTO notifications (body, title, type, user_id) VALUES (?, ?, "INTERVIEW_SCHEDULED", ?)',
            [body, title, user_id],
          );
        }

        res.status(201).end();
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
  };
};
