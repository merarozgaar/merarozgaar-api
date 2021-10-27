const allSettled = require('promise.allsettled');

module.exports = function (deps) {
  const { db } = deps;

  return {
    async getEmployers(req, res) {
      try {
        const rows = await db.query(
          'SELECT users.id AS id, email, name, dial_code, mobile_number, role, INDUSTRIES.label AS industry, INDUSTRIES.id AS industry_id, SIZES.id AS size_id, SIZES.label AS company_size, city, country, locality, pin_code, state, street_address FROM users JOIN employer_profile ON users.id = employer_profile.company_id JOIN types INDUSTRIES ON employer_profile.industry_type_id = INDUSTRIES.id JOIN types SIZES ON employer_profile.company_size_id = SIZES.id JOIN addresses ON employer_profile.address_id = addresses.id',
        );

        res.status(200).json(rows);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getEmployees(req, res) {
      try {
        const rows = await db.query(
          'SELECT users.id AS id, dial_code, name, mobile_number, profile_score, EDU.id AS education_id, EDU.label AS education, GENDER.id AS gender_id, GENDER.label AS gender, city, country, locality, pin_code, state, street_address FROM users JOIN employee_profile ON users.id = employee_profile.employee_id JOIN types EDU ON employee_profile.education_id = EDU.id JOIN types GENDER ON employee_profile.gender_id = GENDER.id JOIN addresses ON employee_profile.address_id = addresses.id',
        );

        res.status(200).json(rows);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getJobs(req, res) {
      try {
        const rows = await db.query(
          'SELECT jobs.id AS id, jobs.created_at AS created_at, jobs.updated_at AS updated_at, jobs.verified AS verified, jobs.active AS active, benefits, gender, min_age, min_experience, profession_id, salary, salary_frequency, timings, working_days, vacancies, label AS profession, created_by AS employer_id, name, dial_code, mobile_number, city, country, locality, pin_code, state, street_address FROM jobs JOIN addresses ON jobs.address_id = addresses.id JOIN types ON jobs.profession_id = types.id JOIN users ON jobs.created_by = users.id',
        );

        const promises = rows.map(
          (r) =>
            new Promise((resolve, reject) => {
              (async () => {
                try {
                  const rows1 = await db.query(
                    'SELECT COUNT(*) AS number_of_applications FROM applications WHERE job_id = ?',
                    [r.id],
                  );

                  if (rows1.length) {
                    resolve({
                      ...r,
                      number_of_applications: rows1.length
                        ? rows1[0].number_of_applications
                        : 0,
                    });
                  } else {
                    resolve({ ...r, number_of_applications: 0 });
                  }
                } catch (e) {
                  reject(e);
                }
              })();
            }),
        );

        const results = ((await allSettled(promises)) || [])
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => value);

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getInterviews(req, res) {
      try {
        const rows = await db.query(
          'SELECT interviews.id, applications.job_id AS job_id, interviews.status AS status, time, interviews.application_id AS application_id, applications.applicant_id AS applicant_id, users.name AS applicant_name, types.label AS profession FROM interviews JOIN applications ON interviews.application_id = applications.id JOIN users ON applications.applicant_id = users.id JOIN jobs ON applications.job_id = jobs.id JOIN types ON jobs.profession_id = types.id',
        );

        res.status(200).json(rows);
      } catch (e) {
        res.status(500).end();
      }
    },
    async approveJob(req, res) {
      try {
        const { id } = req.params;

        const { status } = req.body;

        await db.query('UPDATE jobs SET verified = ? WHERE id = ?', [
          status,
          id,
        ]);

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
    async getNotifications(req, res) {
      try {
        const rows = await db.query(
          'SELECT notifications.id AS id, body, SENDER.id AS sender_id, SENDER.name AS sender_name, SENDER.role AS sender_role, users.name AS receiver_name, users.id AS receiver_id, users.role AS receiver_role FROM `notifications` JOIN users SENDER ON notifications.created_by = SENDER.id JOIN users ON notifications.user_id = users.id',
        );

        res.status(200).json(rows);
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
