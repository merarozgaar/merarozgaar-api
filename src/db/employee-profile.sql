WITH x AS 
(
   SELECT
      date_of_birth,
      email,
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
      PROFESSION_TABLE.profession AS profession 
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
      EMPLOYEE_PROFILE_TABLE.employee_id = 10 
)
,
y AS 
(
   SELECT
      date_of_birth,
      email,
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
      NULL AS profession 
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
      EMPLOYEE_PROFILE_TABLE.employee_id = 10 
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
   )
