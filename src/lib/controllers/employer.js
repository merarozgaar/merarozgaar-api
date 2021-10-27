const allSettled = require('promise.allsettled');

module.exports = function (deps) {
  const { db } = deps;

  const jobQuery = `
SELECT active, benefits, city, company, company_logo_url, created_at, gender, id,

#max_amount AS max_salary, min_age, min_experience, min_amount AS min_salary,

profession,
PROFESSION_TABLE.profession_id AS profession_id,

# salary_frequency,

state, street_address, timings, updated_at, vacancies, website, working_days FROM jobs JOBS_TABLE

JOIN
(SELECT id AS created_by, name as company FROM users) COMPANY_TABLE
ON JOBS_TABLE.created_by = COMPANY_TABLE.created_by

JOIN
(SELECT company_id AS created_by, avatar_id, verified, website FROM employer_profile) COMPANY_PROFILE
ON JOBS_TABLE.created_by = COMPANY_PROFILE.created_by

JOIN
(SELECT id AS avatar_id, url AS company_logo_url FROM uploads) COMPANY_UPLOADS
ON COMPANY_PROFILE.avatar_id = COMPANY_UPLOADS.avatar_id

JOIN
(SELECT id AS address_id, city, state, street_address FROM addresses) ADDRESS_TABLE
ON JOBS_TABLE.address_id = ADDRESS_TABLE.address_id

JOIN
(SELECT id AS profession_id, label AS profession FROM types) PROFESSION_TABLE
ON JOBS_TABLE.profession_id = PROFESSION_TABLE.profession_id

#JOIN
#(SELECT id AS salary_id, max_amount, min_amount, frequency_id FROM salaries) SALARY_TABLE
#ON JOBS_TABLE.salary_id = SALARY_TABLE.salary_id

#JOIN (SELECT id AS frequency_id, label AS salary_frequency FROM types) SALARY_FREQUENCY_TABLE
#ON SALARY_TABLE.frequency_id = SALARY_FREQUENCY_TABLE.frequency_id
  `;

  const profileQuery = `
SELECT
   EMPLOYER_PROFILE_TABLE.address_id,
   city,
   country,
   pin_code,
   state,
   street_address,
   EMPLOYER_PROFILE_TABLE.company_id AS company_id,
   EMPLOYER_PROFILE_TABLE.company_size_id,
   COMPANY_SIZE_TABLE.label AS company_size,
   EMPLOYER_PROFILE_TABLE.id,
   EMPLOYER_PROFILE_TABLE.industry_type_id,
   INDUSTRY_TYPE_TABLE.label AS industry_type,
   name,
   overview,
   website,
   AVATAR_TABLE.avatar_id AS avatar_id,
   profile_picture_url
FROM
   employer_profile AS EMPLOYER_PROFILE_TABLE
   JOIN
      (
         SELECT
            *,
            id AS company_id
         FROM
            users
      )
      USER_TABLE
      ON EMPLOYER_PROFILE_TABLE.company_id = USER_TABLE.company_id
   JOIN
      (
         SELECT
            *,
            id AS address_id
         FROM
            addresses
      )
      ADDRESS_TABLE
      ON EMPLOYER_PROFILE_TABLE.address_id = ADDRESS_TABLE.address_id
   JOIN
      (
         SELECT
            *,
            id AS avatar_id,
            url AS profile_picture_url
         FROM
            uploads
      )
      AVATAR_TABLE
      ON EMPLOYER_PROFILE_TABLE.avatar_id = AVATAR_TABLE.id
   JOIN
      (
         SELECT
            *,
            id AS company_size_id
         FROM
            types
      )
      COMPANY_SIZE_TABLE
      ON EMPLOYER_PROFILE_TABLE.company_size_id = COMPANY_SIZE_TABLE.company_size_id
   JOIN
      (
         SELECT
            *,
            id AS industry_type_id
         FROM
            types
      )
      INDUSTRY_TYPE_TABLE
      ON EMPLOYER_PROFILE_TABLE.industry_type_id = INDUSTRY_TYPE_TABLE.industry_type_id
  `;

  function getProfileByID(id) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response = await db.query(
            `${profileQuery} WHERE EMPLOYER_PROFILE_TABLE.company_id = ?`,
            [Number(id)],
          );

          if (response.length) {
            const [data] = response;

            const {
              address_id,
              city,
              country,
              pin_code,
              state,
              street_address,
              ...rest
            } = data;

            resolve({
              address: {
                id: address_id,
                city,
                country,
                pin_code,
                state,
                street_address,
              },
              ...rest,
            });
          } else {
            resolve({});
          }
        } catch (e) {
          reject(e);
        }
      })();
    });
  }

  return {
    async getJobs(req, res) {
      try {
        const { id } = req.user;

        const rows = await db.query(
          'SELECT id FROM jobs WHERE created_by = ?',
          [id],
        );

        const promises = rows.map(
          ({ id: job_id }) =>
            new Promise((resolve, reject) => {
              (async () => {
                try {
                  const [{ active, need_references, verified, ...rest }] =
                    await db.query(`${jobQuery} WHERE id = ?`, [job_id]);

                  const [{ number_of_applications }] = await db.query(
                    `SELECT COUNT(*) AS number_of_applications FROM applications WHERE job_id = ?`,
                    [job_id],
                  );

                  const application = {
                    ...rest,
                    job_id,
                    active: active === 1,
                    need_references: need_references === 1,
                    verified: verified === 1,
                    number_of_applications,
                  };

                  resolve(application);
                } catch (e) {
                  reject(e);
                }
              })();
            }),
        );

        const p = await allSettled(promises);

        const results = (p || [])
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => value);

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
    async getProfile(req, res) {
      try {
        const { id } = req.user;

        const profile = await getProfileByID(id);

        res.status(200).json(profile);
      } catch (e) {
        res.status(500).end();
      }
    },
    async setupProfile(req, res) {
      try {
        const { id } = req.user;

        const {
          address,
          avatar_id,
          company_size_id,
          industry_type_id,
          name,
          overview,
          website,
        } = req.body;

        const { insertId: address_id } = await db.query(
          'INSERT INTO addresses (city, country, geo_code, locality, pin_code, state, street_address) VALUES (?, ?, POINT(?, ?), ?, ?, ?, ?)',
          [
            address.city || '',
            address.country || 'India',
            address.coordinates.longitude,
            address.coordinates.latitude,
            address.locality || '',
            address.pin_code || '',
            address.state || '',
            address.street_address || '',
          ],
        );

        await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);

        await db.query(
          'INSERT INTO employer_profile (address_id, avatar_id, company_id, company_size_id, industry_type_id, overview, website) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            address_id,
            avatar_id,
            id,
            company_size_id,
            industry_type_id,
            overview,
            website || '',
          ],
        );

        const profile = await getProfileByID(id);

        res.status(201).json(profile);
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async updateProfile(req, res) {
      try {
        const { id } = req.user;

        const {
          address: {
            city,
            country,
            id: address_id,
            pin_code,
            state,
            street_address,
          },
          avatar_id,
          company_size_id,
          id: profile_id,
          industry_type_id,
          name,
          overview,
          website,
        } = req.body;

        console.log(req.body);

        await db.query(
          'UPDATE addresses SET city = ?, country = ?, pin_code = ?, state = ?, street_address = ? WHERE id = ?',
          [
            city,
            country || 'India',
            pin_code,
            state,
            street_address,
            address_id,
          ],
        );

        await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);

        await db.query(
          'UPDATE employer_profile SET address_id = ?, avatar_id = ?, company_id = ?, company_size_id = ?, industry_type_id = ?, overview = ?, website = ? WHERE id = ?',
          [
            address_id,
            avatar_id,
            id,
            company_size_id,
            industry_type_id,
            overview,
            website || '',
            profile_id,
          ],
        );

        const profile = await getProfileByID(id);

        res.status(200).json(profile);
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
  };
};
