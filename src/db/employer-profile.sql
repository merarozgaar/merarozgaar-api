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
