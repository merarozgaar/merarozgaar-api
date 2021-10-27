const allSettled = require('promise.allsettled');
const { groupBy, isEmpty, pickBy } = require('lodash');

module.exports = function (deps) {
  const { db } = deps;

  const profileQuery = `
WITH x AS
(
   SELECT
      date_of_birth,
      email,
      UPLOADS_TABLE.avatar_id AS avatar_id,
      avatar_url AS profile_picture_url,
      ADDRESS_TABLE.city AS address_city,
      ADDRESS_TABLE.country AS address_country,
      ADDRESS_TABLE.locality AS address_locality,
      ADDRESS_TABLE.pin_code AS address_pin_code,
      ADDRESS_TABLE.state AS address_state,
      ADDRESS_TABLE.street_address AS address_street_address,
      ADDRESS_TABLE.latitude AS address_latitude,
      ADDRESS_TABLE.longitude AS address_longitude,
      EDUCATION_TABLE.education_id AS education_id,
      education,
      EMPLOYEE_PROFILE_TABLE.employee_id AS employee_id,
      GENDER_TABLE.gender_id AS gender_id,
      gender,
      name,
      EMPLOYEE_PROFILE_TABLE.id AS id,
      EXPERIENCE_TABLE.company AS company,
      EXPERIENCE_TABLE.id AS experience_id,
      EXPERIENCE_TABLE.salary AS salary,
      PROFESSION_TABLE.profession_id AS profession_id,
      PROFESSION_TABLE.profession AS profession,
      profile_score
   FROM
      employee_profile EMPLOYEE_PROFILE_TABLE
      JOIN
         (
            SELECT
               *,
               id AS address_id,
               ST_X(geo_code) AS latitude,
               ST_Y(geo_code) AS longitude
            FROM
               addresses
         )
         AS ADDRESS_TABLE
         ON EMPLOYEE_PROFILE_TABLE.address_id = ADDRESS_TABLE.address_id
      JOIN
         (
            SELECT
               id AS avatar_id,
               url AS avatar_url
            FROM
               uploads
         )
         UPLOADS_TABLE
         ON EMPLOYEE_PROFILE_TABLE.avatar_id = UPLOADS_TABLE.avatar_id
      JOIN
         (
            SELECT
               *,
               id AS education_id,
               label AS education
            FROM
               types
         )
         EDUCATION_TABLE
         ON EMPLOYEE_PROFILE_TABLE.education_id = EDUCATION_TABLE.education_id
      JOIN
         (
            SELECT
               *,
               id AS gender_id,
               label AS gender
            FROM
               types
         )
         GENDER_TABLE
         ON EMPLOYEE_PROFILE_TABLE.gender_id = GENDER_TABLE.gender_id
      JOIN
         (
            SELECT
               *
            FROM
               employee_work_experiences
         )
         EXPERIENCE_TABLE
         ON EMPLOYEE_PROFILE_TABLE.employee_id = EXPERIENCE_TABLE.employee_id
      JOIN
         (
            SELECT
               id AS employee_id,
               name
            FROM
               users
         )
         USER_TABLE
         ON EMPLOYEE_PROFILE_TABLE.employee_id = USER_TABLE.employee_id
      JOIN
         (
            SELECT
               id AS profession_id,
               label AS profession
            FROM
               types
         )
         PROFESSION_TABLE
         ON EXPERIENCE_TABLE.profession_id = PROFESSION_TABLE.profession_id
   WHERE
      EMPLOYEE_PROFILE_TABLE.employee_id = ?
)
,
y AS
(
   SELECT
      date_of_birth,
      email,
      UPLOADS_TABLE.avatar_id AS avatar_id,
      avatar_url AS profile_picture_url,
      ADDRESS_TABLE.city AS address_city,
      ADDRESS_TABLE.country AS address_country,
      ADDRESS_TABLE.locality AS address_locality,
      ADDRESS_TABLE.pin_code AS address_pin_code,
      ADDRESS_TABLE.state AS address_state,
      ADDRESS_TABLE.street_address AS address_street_address,
      ADDRESS_TABLE.latitude AS address_latitude,
      ADDRESS_TABLE.longitude AS address_longitude,
      EDUCATION_TABLE.education_id AS education_id,
      education,
      EMPLOYEE_PROFILE_TABLE.employee_id AS employee_id,
      GENDER_TABLE.gender_id AS gender_id,
      gender,
      name,
      EMPLOYEE_PROFILE_TABLE.id AS id,
      NULL AS company,
      NULL AS experience_id,
      NULL AS salary,
      NULL AS profession_id,
      NULL AS profession,
      profile_score
   FROM
      employee_profile EMPLOYEE_PROFILE_TABLE
      JOIN
         (
            SELECT
               *,
               id AS address_id,
               ST_X(geo_code) AS latitude,
               ST_Y(geo_code) AS longitude
            FROM
               addresses
         )
         AS ADDRESS_TABLE
         ON EMPLOYEE_PROFILE_TABLE.address_id = ADDRESS_TABLE.address_id
      JOIN
         (
            SELECT
               id AS avatar_id,
               url AS avatar_url
            FROM
               uploads
         )
         UPLOADS_TABLE
         ON EMPLOYEE_PROFILE_TABLE.avatar_id = UPLOADS_TABLE.avatar_id
      JOIN
         (
            SELECT
               *,
               id AS education_id,
               label AS education
            FROM
               types
         )
         EDUCATION_TABLE
         ON EMPLOYEE_PROFILE_TABLE.education_id = EDUCATION_TABLE.education_id
      JOIN
         (
            SELECT
               *,
               id AS gender_id,
               label AS gender
            FROM
               types
         )
         GENDER_TABLE
         ON EMPLOYEE_PROFILE_TABLE.gender_id = GENDER_TABLE.gender_id
      JOIN
         (
            SELECT
               id AS employee_id,
               name
            FROM
               users
         )
         USER_TABLE
         ON EMPLOYEE_PROFILE_TABLE.employee_id = USER_TABLE.employee_id
   WHERE
      EMPLOYEE_PROFILE_TABLE.employee_id = ?
)
SELECT
   *
FROM
   x
UNION ALL
SELECT
   *
FROM
   y
WHERE
   NOT EXISTS
   (
      SELECT
         *
      FROM
         x
   )`;

  function getProfileByUserID(id) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const rows = await db.query(profileQuery, [id, id]);

          resolve(
            Object.values(groupBy(rows, 'profession_id'))
              .reduce((a, c) => [...a, ...c], [])
              .reduce(
                (
                  a,
                  {
                    address_id,
                    address_city,
                    address_country,
                    address_latitude,
                    address_locality,
                    address_longitude,
                    address_pin_code,
                    address_state,
                    address_street_address,
                    company,
                    experience_id,
                    profession_id,
                    profession,
                    salary,
                    ...rest
                  },
                ) => ({
                  ...a,
                  ...rest,
                  address: {
                    city: address_city,
                    coordinates: {
                      latitude: address_latitude,
                      longitude: address_longitude,
                    },
                    country: address_country,
                    id: address_id,
                    locality: address_locality,
                    pin_code: address_pin_code,
                    state: address_state,
                    street_address: address_street_address,
                  },
                  experiences: [
                    ...(a.experiences || []),
                    {
                      company,
                      profession,
                      id: experience_id,
                      profession_id,
                      salary,
                    },
                  ]
                    .map(pickBy)
                    .filter((o) => !isEmpty(o)),
                }),
                {},
              ),
          );
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })();
    });
  }

  return {
    async getProfile(req, res) {
      try {
        const { id } = req.user;

        // const profile = await getProfileByUserID(id);

        const [profile] = await db.query(
          'SELECT * FROM employee_profile WHERE employee_id = ?',
          [id],
        );

        if (isEmpty(profile)) {
          res.status(200).json({});
        } else {
          const { address_id, avatar_id, education_id, gender_id } = profile;

          const [address] = await db.query(
            'SELECT * FROM addresses WHERE id = ?',
            [address_id],
          );

          const [{ education }] = await db.query(
            'SELECT label AS education FROM types WHERE id = ?',
            [education_id],
          );

          const experiences = await db.query(
            'SELECT id AS experience_id, company FROM employee_work_experiences WHERE employee_id = ?',
            [id],
          );

          const [{ gender }] = await db.query(
            'SELECT label AS gender FROM types WHERE id = ?',
            [gender_id],
          );

          const [{ profile_picture_url }] = await db.query(
            'SELECT url AS profile_picture_url FROM uploads WHERE id = ?',
            [avatar_id],
          );

          const skills = await db.query(
            'SELECT SKILLS.id AS id, skill_id, label AS skill FROM employee_skills SKILLS JOIN types AS TYPES ON SKILLS.skill_id = TYPES.id WHERE employee_id = ?',
            [id],
          );

          const preferences = await db.query(
            'SELECT PREFERENCES.id AS id, employee_id, PROFESSIONS.id AS profession_id, PROFESSIONS.label AS profession FROM `employee_preferences` PREFERENCES JOIN types PROFESSIONS ON PREFERENCES.profession_id = PROFESSIONS.id WHERE employee_id = ?',
            [id],
          );

          const payload = {
            ...profile,
            address,
            education,
            experiences,
            gender,
            profile_picture_url,
            skills,
            preferences,
          };

          res.status(200).json(payload);
        }
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async setupProfile(req, res) {
      try {
        const { id } = req.user;

        const a = {
          avatar_data_uri: '',
          name: 'D',
          date_of_birth: '2003/08/07',
          gender_id: 30,
          address: {
            formatted_address: 'भांडुप वेस्ट, मुम्बई, महाराष्ट्र, भारत',
            name: 'भांडुप वेस्ट',
            place_id: 'ChIJe0T4RHq45zsRGDwtaYvJmaY',
          },
          education_id: 778,
          profile_video_data_uri: '',
          preferences: [
            {
              industry_id: 28,
              profession_id: 756,
            },
            {
              industry_id: 215,
              profession_id: 723,
            },
          ],
          experiences: [
            {
              company: 'Ds',
            },
            {
              company: 'As',
            },
          ],
          skills: [
            {
              skill_id: 49,
            },
            {
              skill_id: 52,
            },
          ],
          languages: 'Assamese',
          reference: 'Zx',
        };

        const {
          avatar_id,
          date_of_birth,
          gender_id,
          education_id,
          email,
          name,
          // profile_video_data_uri,
          address,
          experiences,
          preferences,
          languages,
          skills,
          reference,
        } = req.body;

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

        const queries = [
          ...preferences.map(({ profession_id }) =>
            db.query(
              'INSERT INTO employee_preferences (employee_id, profession_id) VALUES (?, ?)',
              [id, profession_id],
            ),
          ),
          ...experiences.map(({ company }) =>
            db.query(
              'INSERT INTO employee_work_experiences (company, employee_id) VALUES (?, ?)',
              [company, id],
            ),
          ),
          ...skills.map(({ skill_id }) =>
            db.query(
              'INSERT INTO employee_skills (employee_id, skill_id) VALUES (?, ?)',
              [id, skill_id],
            ),
          ),
        ];

        queries.push(
          db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]),
        );

        const r = await Promise.all(queries);

        console.log(r);

        await db.query(
          'INSERT INTO employee_profile (address_id, avatar_id, date_of_birth, education_id, email, employee_id, gender_id, languages, reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            address_id,
            avatar_id || 1,
            date_of_birth,
            education_id,
            email || '',
            id,
            gender_id,
            languages,
            reference,
          ],
        );

        const profile = await getProfileByUserID(id);

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
          avatar_id,
          date_of_birth,
          gender_id,
          education_id,
          email = '',
          id: profile_id,
          name,
          address,
          preferences,
          skills,
        } = req.body;

        await db.query(
          'UPDATE addresses SET city = ?, country = ?, pin_code = ?, state = ?, street_address = ? WHERE id = ?',
          [
            address.city,
            address.country || 'India',
            address.pin_code,
            address.state,
            address.street_address,
            address.id,
          ],
        );

        const queries = [
          ...preferences.map(({ profession_id }) =>
            db.query(
              'INSERT INTO employee_preferences (employee_id, profession_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE profession_id = ?',
              [id, profession_id, profession_id],
            ),
          ),
          ...skills.map(({ skill_id }) =>
            db.query(
              'INSERT INTO employee_skills (employee_id, skill_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE skill_id = ?',
              [id, skill_id, skill_id],
            ),
          ),
        ];

        queries.push(
          db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]),
        );

        const r = await Promise.all(queries);

        console.log(r);

        await db.query(
          'UPDATE employee_profile SET avatar_id = ?, date_of_birth = ?, education_id = ?, email = ?, employee_id = ?, gender_id = ?, address_id = ? WHERE id = ?',
          [
            avatar_id || 1,
            date_of_birth,
            education_id,
            email,
            id,
            gender_id,
            address.id,
            profile_id,
          ],
        );

        const profile = await getProfileByUserID(id);

        res.status(200).json(profile);
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async getApplications(req, res) {
      try {
        const { id } = req.user;

        const rows = await db.query(
          `
SELECT applicant_id, company, created_at, id, APPLICATION_TABLE.job_id AS job_id, status, JOBS_TABLE.profession_id AS profession_id, profession FROM applications APPLICATION_TABLE

JOIN
(SELECT id AS job_id, created_by, profession_id FROM jobs) JOBS_TABLE
ON APPLICATION_TABLE.job_id = JOBS_TABLE.job_id

JOIN
(SELECT id AS created_by, name AS company FROM users) COMPANY_TABLE
ON JOBS_TABLE.created_by = COMPANY_TABLE.created_by

JOIN
(SELECT company_id AS created_by, avatar_id FROM employer_profile) COMPANY_PROFILE
ON COMPANY_TABLE.created_by = COMPANY_PROFILE.created_by

JOIN
(SELECT id AS profession_id, label AS profession FROM types) TYPES_TABLE
ON JOBS_TABLE.profession_id = TYPES_TABLE.profession_id

WHERE applicant_id = ?

ORDER BY created_at DESC
        `,
          [id],
        );

        res.status(200).json(rows);
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async deactivateAccount(req, res) {
      try {
        const { id } = req.user;

        await db.query(
          'UPDATE employee_profile SET active = ? WHERE employee_id = ?',
          [0, id],
        );

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
    async removePreference(req, res) {
      try {
        const { id } = req.params;

        await db.query('DELETE FROM employee_preferences WHERE id = ?', [id]);

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
    async removeSkill(req, res) {
      try {
        const { id } = req.params;

        await db.query('DELETE FROM employee_skills WHERE id = ?', [id]);

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
