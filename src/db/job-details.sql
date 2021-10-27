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
   name 
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
         profession 
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
