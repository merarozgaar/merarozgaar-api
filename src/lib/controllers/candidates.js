const notificationClient = require('../../utils/notificationClient');

module.exports = function (deps) {
  const { db } = deps;

  //   const query = `
  // SELECT
  //
  // created_at, USER_TABLE.id AS id, name, updated_at, verified, date_of_birth, EDUCATION_TABLE.education_id AS education_id, education, GENDER_TABLE.gender_id AS gender_id, gender,
  //
  //
  // PERMANENT_ADDRESS_TABLE.permanent_address_id as permanent_address_id, PERMANENT_ADDRESS_TABLE.city AS permanent_address_city, PERMANENT_ADDRESS_TABLE.country AS permanent_address_country, PERMANENT_ADDRESS_TABLE.pin_code AS permanent_address_pin_code, PERMANENT_ADDRESS_TABLE.state AS permanent_address_state, PERMANENT_ADDRESS_TABLE.street_address AS permanent_address_street_address,
  //
  //
  // PRESENT_ADDRESS_TABLE.present_address_id as present_address_id, PRESENT_ADDRESS_TABLE.city AS present_address_city, PRESENT_ADDRESS_TABLE.country AS present_address_country, PRESENT_ADDRESS_TABLE.pin_code AS present_address_pin_code, PRESENT_ADDRESS_TABLE.state AS present_address_state, PRESENT_ADDRESS_TABLE.street_address AS present_address_street_address
  //
  //
  // FROM users USER_TABLE
  //
  // JOIN
  // (SELECT date_of_birth, education_id, employee_id AS id, gender_id, permanent_address_id, present_address_id FROM employee_profile) AS PROFILE_TABLE
  // ON USER_TABLE.id = PROFILE_TABLE.id
  //
  // JOIN
  // (SELECT id AS education_id, label AS education FROM types) EDUCATION_TABLE
  // ON PROFILE_TABLE.education_id = EDUCATION_TABLE.education_id
  //
  // JOIN
  // (SELECT id AS gender_id, label AS gender FROM types) GENDER_TABLE
  // ON PROFILE_TABLE.gender_id = GENDER_TABLE.gender_id
  //
  // JOIN
  // (SELECT id AS permanent_address_id, city, country, pin_code, state, street_address FROM addresses) PERMANENT_ADDRESS_TABLE
  // ON PROFILE_TABLE.permanent_address_id = PERMANENT_ADDRESS_TABLE.permanent_address_id
  //
  // JOIN
  // (SELECT id AS present_address_id, city, country, pin_code, state, street_address FROM addresses) PRESENT_ADDRESS_TABLE
  // ON PROFILE_TABLE.present_address_id = PRESENT_ADDRESS_TABLE.present_address_id
  //   `;

  const query = `
SELECT
   *
FROM
   (
      SELECT
         USER_TABLE.created_at AS created_at,
         USER_TABLE.id AS id,
         USER_TABLE.id AS user_id,
         name,
         USER_TABLE.updated_at AS updated_at,
         verified,
         EDUCATION_TABLE.education_id AS education_id,
         education,
         GENDER_TABLE.gender_id AS gender_id,
         gender,
         ADDRESS_TABLE.city AS address_city,
         ADDRESS_TABLE.country AS address_country,
         ADDRESS_TABLE.locality AS address_locality,
         ADDRESS_TABLE.pin_code AS address_pin_code,
         ADDRESS_TABLE.state AS address_state,
         ADDRESS_TABLE.street_address AS address_street_address,
         ADDRESS_TABLE.latitude AS address_latitude,
         ADDRESS_TABLE.longitude AS address_longitude,
         PROFESSION_TABLE.profession_id AS profession_id,
         experience,
         salary,
         ST_DISTANCE_SPHERE(ADDRESS_TABLE.geocode, POINT( ? , ? )) * .001 AS distance,
         role,
         profile_score,
         dial_code,
         mobile_number,
         show_contact,
         profile_picture_url
      FROM
         users USER_TABLE
         JOIN
            (
               SELECT
                  avatar_id,
                  date_of_birth,
                  education_id,
                  employee_id,
                  employee_id AS id,
                  gender_id,
                  address_id,
                  profile_score,
                  show_contact
               FROM
                  employee_profile
            )
            AS PROFILE_TABLE
            ON USER_TABLE.id = PROFILE_TABLE.id
         JOIN
            (
               SELECT
                  id AS avatar_id,
                  url AS profile_picture_url
               FROM
                  uploads
            )
            AS UPLOADS_TABLE
            ON PROFILE_TABLE.avatar_id = UPLOADS_TABLE.avatar_id
         JOIN
            (
               SELECT
                  id AS education_id,
                  label AS education
               FROM
                  types
            )
            EDUCATION_TABLE
            ON PROFILE_TABLE.education_id = EDUCATION_TABLE.education_id
         JOIN
            (
               SELECT
                  id AS gender_id,
                  label AS gender
               FROM
                  types
            )
            GENDER_TABLE
            ON PROFILE_TABLE.gender_id = GENDER_TABLE.gender_id
         JOIN
            (
               SELECT
                  *,
                  id AS address_id,
                  ST_X(geo_code) AS latitude,
                  ST_Y(geo_code) AS longitude,
                  geo_code AS geocode
               FROM
                  addresses
            )
            AS ADDRESS_TABLE
            ON PROFILE_TABLE.address_id = ADDRESS_TABLE.address_id
         JOIN
            (
               SELECT
                  *
               FROM
                  employee_work_experiences
            )
            AS EXPERIENCE_TABLE
            ON PROFILE_TABLE.employee_id = EXPERIENCE_TABLE.employee_id
         JOIN
            (
               SELECT
                  id AS profession_id,
                  label AS experience
               FROM
                  types
            )
            PROFESSION_TABLE
            ON EXPERIENCE_TABLE.profession_id = PROFESSION_TABLE.profession_id
   )
   AS MASTER
WHERE
   MASTER.distance <= 100
   AND role = "EMPLOYEE"
  `;

  return {
    async getCandidates(req, res) {
      try {
        const { latitude, longitude } = req.query;

        const rows = await db.query(
          'SELECT * FROM (SELECT A.employee_id AS id, A.active AS active, name, url AS profile_picture_url, profile_score, city, country, locality, ST_DISTANCE_SPHERE(C.geo_code, POINT(?, ?)) * .001 AS distance FROM employee_profile A JOIN uploads B ON A.avatar_id = B.id JOIN addresses C ON A.address_id = C.id JOIN users D ON A.employee_id = D.id) AS MASTER WHERE distance <= 3500',
          [longitude, latitude],
        );

        res
          .status(200)
          .json(
            rows.map(
              ({ dial_code, mobile_number, otp, role, ...rest }) => rest,
            ),
          );
      } catch (e) {
        console.log(e);

        res.status(500).end();
      }
    },
    async getCandidateByID(req, res) {
      try {
        const { id } = req.params;

        const { latitude, longitude } = req.query;

        const rows = await db.query(
          `SELECT * FROM (SELECT A.employee_id AS id, A.active AS active, name, gender_id, education_id, url AS profile_picture_url, profile_score, city, country, locality, geo_code, street_address, ST_DISTANCE_SPHERE(C.geo_code, POINT(?, ?)) * .001 AS distance FROM employee_profile A JOIN uploads B ON A.avatar_id = B.id JOIN addresses C ON A.address_id = C.id JOIN users D ON A.employee_id = D.id) AS MASTER WHERE id = ?`,
          [longitude, latitude, Number(id)],
        );

        if (rows.length) {
          const [
            { city, state, country, street_address, gender_id, education_id },
          ] = rows;

          const experiences = await db.query(
            'SELECT * FROM employee_work_experiences WHERE employee_id = ?',
            [id],
          );

          const skills = await db.query(
            'SELECT SKILLS.id AS id, skill_id, label AS skill FROM employee_skills SKILLS JOIN types AS TYPES ON SKILLS.skill_id = TYPES.id WHERE employee_id = ?',
            [id],
          );

          const preferences = await db.query(
            'SELECT PREFERENCES.id AS id, employee_id, PROFESSIONS.id AS profession_id, PROFESSIONS.label AS profession FROM `employee_preferences` PREFERENCES JOIN types PROFESSIONS ON PREFERENCES.profession_id = PROFESSIONS.id WHERE employee_id = ?',
            [id],
          );

          const [{ gender }] = await db.query(
            'SELECT label as gender FROM types WHERE id = ?',
            [gender_id],
          );

          const [{ education }] = await db.query(
            'SELECT label as education FROM types WHERE id = ?',
            [education_id],
          );

          const payload = {
            ...rows[0],
            experiences,
            address: { city, state, country, street_address },
            gender,
            education,
            skills,
            preferences,
          };

          res.status(200).json(payload);
          // res.status(200).json(
          //   Object.values(groupBy(rows, 'profession_id'))
          //     .reduce((a, c) => [...a, ...c], [])
          //     .reduce(
          //       (
          //         a,
          //         {
          //           address_id,
          //           address_city,
          //           address_country,
          //           address_latitude,
          //           address_locality,
          //           address_longitude,
          //           address_pin_code,
          //           address_state,
          //           address_street_address,
          //           experience_id,
          //           profession_id,
          //           experience,
          //           salary,
          //           show_contact,
          //           dial_code,
          //           mobile_number,
          //           ...rest
          //         },
          //       ) => ({
          //         ...a,
          //         ...rest,
          //         address: {
          //           city: address_city,
          //           coordinates: {
          //             latitude: address_latitude,
          //             longitude: address_longitude,
          //           },
          //           country: address_country,
          //           id: address_id,
          //           locality: address_locality,
          //           pin_code: address_pin_code,
          //           state: address_state,
          //           street_address: address_street_address,
          //         },
          //         experiences: [
          //           ...(a.experiences || []),
          //           {
          //             experience,
          //             id: experience_id,
          //             profession_id,
          //             salary,
          //           },
          //         ],
          //         ...(show_contact ? { dial_code, mobile_number } : {}),
          //         show_contact: show_contact === 1,
          //       }),
          //       {},
          //     ),
          // );
        } else {
          res.status(404).end();
        }
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async requestContact(req, res) {
      try {
        const { name } = req.user;

        const { user_id, isHindi } = req.body;

        const rows = await db.query('SELECT * FROM users WHERE id = ?', [
          user_id,
        ]);

        if (rows.length) {
          const {
            dial_code,
            mobile_number,
            email,
            fcm_token: user_fcm_token,
          } = rows[0];

          const notification = {
            body: isHindi
              ? `आपकी कांटेक्ट डिटेल ${name} के साथ शेयर की गई है। नियोक्ता जल्द ही आपसे संपर्क कर सकते हैं।`
              : `Your contact details has been shared with ${name}. Employer may contact you soon.`,
            title: isHindi
              ? `कांटेक्ट डिटेल्स शेयर की गई है`
              : 'Contact details shared',
            type: 'CONTACT_DETAILS',
          };

          await db.query(
            'INSERT INTO notifications (body, title, user_id) VALUES (?, ?, ?)',
            [notification.body, notification.title, user_id],
          );

          await notificationClient.post('', {
            to: user_fcm_token,
            data: {},
            notification,
          });

          res.status(200).json({
            dial_code,
            mobile_number,
            email,
          });
        } else {
          res.status(404).end();
        }
      } catch (e) {
        res.status(500).end();
      }
    },
    async search(req, res) {
      try {
        const { latitude, longitude, profession_id } = req.query;

        const results = await db.query(
          'SELECT * FROM (SELECT A.employee_id AS id, A.active AS active, name, url AS profile_picture_url, city, country, locality, ST_DISTANCE_SPHERE(C.geo_code, POINT(?, ?)) * .001 AS distance, profession_id FROM employee_profile A JOIN uploads B ON A.avatar_id = B.id JOIN addresses C ON A.address_id = C.id JOIN users D ON A.employee_id = D.id JOIN employee_preferences E ON A.employee_id = E.employee_id) AS MASTER WHERE distance <= 3500 AND profession_id = ?',
          [longitude, latitude, Number(profession_id)],
        );

        res.status(200).json(results);
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
