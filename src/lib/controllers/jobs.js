const dayjs = require('dayjs');
const allSettled = require('promise.allsettled');

module.exports = function (deps) {
  const { db } = deps;

  const jobsQuery = `
SELECT
   JOB_MASTER.active AS active,
   benefits,
   created_at,
   created_by,
   JOB_MASTER.deleted AS deleted,
   gender,
   JOB_MASTER.id AS id,
   min_experience,
   salary,
   salary_frequency,
   timings,
   JOB_MASTER.updated_at AS updated_at,
   vacancies,
   working_days,
   JOB_MASTER.city AS city,
   JOB_MASTER.country AS country,
   JOB_MASTER.geo_code AS geo_code,
   JOB_MASTER.address_id AS address_id,
   JOB_MASTER.locality AS locality,
   JOB_MASTER.pin_code AS pin_code,
   JOB_MASTER.state AS state,
   JOB_MASTER.street_address AS street_address,
   profession_id,
   profession,
   avatar_id,
   avatar_url,
   company_id,
   overview,
   website,
   dial_code,
   email,
   mobile_number,
   name AS employer_name,
   JOB_MASTER.verified AS verified
FROM
   (
      SELECT
         active,
         benefits,
         JOBS.created_at AS created_at,
         created_by,
         deleted,
         gender,
         id,
         min_experience,
         salary,
         salary_frequency,
         timings,
         JOBS.updated_at AS updated_at,
         vacancies,
         working_days,
         city,
         country,
         geo_code,
         ADDRESSES.address_id AS address_id,
         locality,
         pin_code,
         state,
         street_address,
         PROFESSION.profession_id AS profession_id,
         profession,
         JOBS.verified AS verified
      FROM
         jobs JOBS
         JOIN
            (
               SELECT
                  city,
                  country,
                  geo_code,
                  id AS address_id,
                  locality,
                  pin_code,
                  state,
                  street_address
               FROM
                  addresses
            )
            ADDRESSES
            ON JOBS.address_id = ADDRESSES.address_id
         JOIN
            (
               SELECT
                  id AS profession_id,
                  label AS profession
               FROM
                  types
            )
            PROFESSION
            ON JOBS.profession_id = PROFESSION.profession_id
   )
   AS JOB_MASTER
   JOIN
      (
         SELECT
            EMPLOYER_PROFILE.active AS active,
            avatar_id,
            company_id,
            EMPLOYER_PROFILE.id AS id,
            overview,
            EMPLOYER_PROFILE.verified AS verified,
            website,
            dial_code,
            email,
            mobile_number,
            name,
            url AS avatar_url
         FROM
            employer_profile EMPLOYER_PROFILE
            JOIN
               users USERS
               ON EMPLOYER_PROFILE.company_id = USERS.id
            JOIN
               uploads UPLOADS
               ON EMPLOYER_PROFILE.avatar_id = UPLOADS.id
      )
      EMPLOYER_PROFILE_MASTER
      ON JOB_MASTER.created_by = EMPLOYER_PROFILE_MASTER.company_id
  `;

  const jobsWithDistanceQuery = `
SELECT
   *
FROM
   (
      SELECT
         *,
         ST_DISTANCE_SPHERE(geo_code, POINT(?, ?)) * .001 AS distance
      FROM
         (
            ${jobsQuery}
         )
         AS JOB_DETAILS
   )
   AS MASTER
WHERE
   distance <= 3500
   AND active = 1
   AND verified = 1
   # AND created_at <= "${dayjs()
     .subtract(3, 'hours')
     .format('YYYY-MM-DD HH:mm:ss')}"
  `;

  return {
    async getJobs(req, res) {
      try {
        const { latitude, longitude } = req.query;

        const getJobObject = ({
          dial_code,
          mobile_number,
          email,
          active,
          verified,
          ...rest
        }) => ({
          ...rest,
          active: active === 1,
          verified: verified === 1,
        });

        if (latitude && longitude) {
          const rows = await db.query(
            `${jobsWithDistanceQuery} ORDER BY created_at DESC`,
            [longitude, latitude],
          );

          res.status(200).json(rows.map(getJobObject));
        } else {
          const rows = await db.query(jobsQuery);

          res.status(200).json(rows.map(getJobObject));
        }
      } catch (e) {
        res.status(500).end();
      }
    },
    async getJobByID(req, res) {
      try {
        const { id } = req.params;

        const { is_applied_by, latitude, longitude } = req.query;

        let results;

        if (latitude && longitude) {
          results = await db.query(`${jobsWithDistanceQuery} AND id = ?`, [
            longitude,
            latitude,
            id,
          ]);
        } else {
          results = await db.query(`${jobsQuery} AND JOB_MASTER.id = ?`, [id]);
        }

        if (results.length) {
          const { active, verified, ...rest } = results[0];

          const application = {
            ...rest,
            active: active === 1,
            verified: verified === 1,
          };

          if (is_applied_by) {
            const rows = await db.query(
              'SELECT * FROM applications WHERE job_id = ? AND applicant_id = ?',
              [rest.id, is_applied_by],
            );

            res
              .status(200)
              .json({ ...application, is_applied: rows.length > 0 });
          } else {
            res.status(200).json(application);
          }
        } else {
          res.status(404).end();
        }
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async createJob(req, res) {
      try {
        const { id } = req.user;

        const {
          address,
          benefits = '',
          gender,
          min_age,
          min_experience,
          profession_id,
          timings = '',
          salary,
          salary_frequency,
          vacancies,
          working_days = '',
        } = req.body;

        console.log(req.body);

        const { insertId: address_id } = await db.query(
          'INSERT INTO addresses (city, country, geo_code, locality, pin_code, state, street_address) VALUES (?, ?, POINT(?, ?), ?, ?, ?, ?)',
          [
            address.city,
            address.country || 'India',
            address.coordinates.longitude,
            address.coordinates.latitude,
            address.locality,
            address.pin_code,
            address.state,
            address.street_address,
          ],
        );

        // const { insertId: salary_id } = await db.query(
        //   'INSERT INTO salaries (frequency_id, max_amount, min_amount) VALUES (?, ?, ?)',
        //   [frequency_id, Number(max_amount), Number(min_amount)],
        // );

        await db.query(
          'INSERT INTO jobs (address_id, benefits, created_by, gender, min_age, min_experience, profession_id, salary, salary_frequency, timings, vacancies, working_days) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            address_id,
            benefits,
            id,
            gender,
            min_age,
            min_experience || 0,
            profession_id,
            salary,
            salary_frequency,
            timings,
            Number(vacancies),
            working_days,
          ],
        );

        res.status(201).end();
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async updateJob(req, res) {
      try {
        const { id } = req.user;

        const {
          address,
          benefits = '',
          gender,
          min_age = '',
          min_experience,
          profession_id,
          timings = '',
          salary,
          salary_frequency,
          vacancies,
          working_days = '',
          id: job_id,
        } = req.body;

        const { address_id } = address;

        await db.query(
          'UPDATE jobs SET address_id = ?, benefits = ?, created_by = ?, gender = ?, min_age = ?, min_experience = ?, profession_id = ?, salary = ?, salary_frequency = ?, timings = ?, vacancies = ?, working_days = ? WHERE id = ?',
          [
            address_id,
            benefits,
            id,
            gender,
            min_age,
            min_experience,
            profession_id,
            salary,
            salary_frequency,
            timings,
            Number(vacancies),
            working_days,
            job_id,
          ],
        );

        await db.query(
          'UPDATE addresses SET city = ?, country = ?, geo_code = POINT(?, ?), locality = ?, pin_code = ?, state = ?, street_address = ? WHERE id = ?',
          [
            address.city,
            address.country || 'India',
            address.coordinates.longitude,
            address.coordinates.latitude,
            address.locality,
            address.pin_code,
            address.state,
            address.street_address,
            address_id,
          ],
        );

        res.status(200).end();
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async getJobApplications(req, res) {
      try {
        const { id: uid } = req.user;

        const { id } = req.params;

        const rows = await db.query(
          `
SELECT * FROM applications APPLICATION_TABLE

JOIN
(SELECT id AS job_id, created_by FROM jobs) JOBS_TABLE
ON APPLICATION_TABLE.job_id = JOBS_TABLE.job_id

JOIN
(SELECT id AS applicant_id, name, verified FROM users) USER_TABLE
ON APPLICATION_TABLE.applicant_id = USER_TABLE.applicant_id

WHERE APPLICATION_TABLE.job_id = ? AND created_by = ?
        `,
          [Number(id), Number(uid)],
        );

        res.status(200).json(
          rows.map(({ verified, ...rest }) => ({
            ...rest,
            verified: verified === 1,
          })),
        );
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async applyJob(req, res) {
      try {
        const { id } = req.user;

        const { id: job_id } = req.params;

        await db.query(
          'INSERT INTO applications (applicant_id, job_id) VALUES (?, ?)',
          [id, Number(job_id)],
        );

        res.status(201).end();
      } catch (e) {
        res.status(500).end();
      }
    },
    async activateDeactivateJob(req, res) {
      try {
        const { active } = req.body;

        const { id: job_id } = req.params;

        await db.query('UPDATE jobs SET active = ? WHERE id = ?', [
          active,
          Number(job_id),
        ]);

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
