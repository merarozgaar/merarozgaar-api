module.exports = {
  middlewares: [],
  path: '/options',
  routes: [
    /**
     * @swagger
     * /options/company_sizes:
     *   get:
     *     description: Returns a variety of options for company sizes.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'company_sizes',
      method: 'get',
      handler: 'getCompanySizes',
      // auth: true,
    },
    /**
     * @swagger
     * /options/genders:
     *   get:
     *     description: Returns a variety of options for genders.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'genders',
      method: 'get',
      handler: 'getGenders',
      // auth: true,
    },
    /**
     * @swagger
     * /options/industries:
     *   get:
     *     description: Returns a variety of options for industry types.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'industries',
      method: 'get',
      handler: 'getIndustries',
      // auth: true,
    },
    /**
     * @swagger
     * /options/job_types:
     *   get:
     *     description: Returns a variety of options for job types.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'job_types',
      method: 'get',
      handler: 'getJobTypes',
      // // auth: true,
    },
    /**
     * @swagger
     * /options/professions:
     *   get:
     *     description: Returns a variety of options for professions.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'professions',
      method: 'get',
      handler: 'getProfessions',
      // auth: true,
    },
    /**
     * @swagger
     * /options/qualifications:
     *   get:
     *     description: Returns a variety of options for educational qualifications.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'qualifications',
      method: 'get',
      handler: 'getQualifications',
      // auth: true,
    },
    /**
     * @swagger
     * /options/salary_frequencies:
     *   get:
     *     description: Returns a variety of options for salary frequencies.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'salary_frequencies',
      method: 'get',
      handler: 'getSalaryFrequency',
      // auth: true,
    },
    /**
     * @swagger
     * /options/skills:
     *   get:
     *     description: Returns a variety of options for salary frequencies.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Meta Data
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal server error
     */
    {
      path: 'skills',
      method: 'get',
      handler: 'getSkills',
      // auth: true,
    },
  ],
};
