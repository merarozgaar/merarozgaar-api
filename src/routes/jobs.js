module.exports = {
  middlewares: [],
  path: '/jobs',
  routes: [
    /**
     * @swagger
     * /jobs:
     *   get:
     *     description: Returns a variety of information about one or more jobs.
     *     tags:
     *       - Jobs
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      500:
     *        description: Internal server error
     */
    {
      path: '',
      method: 'get',
      handler: 'getJobs',
    },
    /**
     * @swagger
     * /jobs/{id}:
     *   get:
     *     description: Returns a variety of information about a single job or job ID.
     *     tags:
     *       - Jobs
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        schema:
     *          type: number
     *     responses:
     *      200:
     *        description: Successful
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id',
      method: 'get',
      handler: 'getJobByID',
      validation: 'getJobByID',
    },
    /**
     * @swagger
     * /jobs:
     *   post:
     *     description: Allows an authenticated employer or user ID to create a new job.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Jobs
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            address:
     *              type: object
     *              required: true
     *              properties:
     *                city:
     *                  type: string
     *                  required: true
     *                country:
     *                  type: string
     *                  default: India
     *                pin_code:
     *                  type: string
     *                  required: true
     *                state:
     *                  type: string
     *                  required: true
     *                street_address:
     *                  type: string
     *                  required: true
     *            benefits:
     *              type: string
     *              required: true
     *            description:
     *              type: string
     *              required: true
     *            education_id:
     *              type: number
     *              required: true
     *            gender:
     *              type: string
     *              required: true
     *            languages:
     *              type: string
     *              required: true
     *            location_type:
     *              type: string
     *              required: true
     *              enum:
     *                - ONSITE_ONLY
     *                - REMOTE_ALLOWED
     *                - REMOTE_ONLY
     *            min_age:
     *              type: string
     *              required: true
     *            min_experience:
     *              type: string
     *              required: true
     *            need_references:
     *              type: boolean
     *              required: true
     *              default: false
     *            profession_id:
     *              type: number
     *              required: true
     *            salary:
     *              type: object
     *              required: true
     *              properties:
     *                frequency_id:
     *                  type: number
     *                  required: true
     *                max_amount:
     *                  type: number
     *                  required: true
     *                min_amount:
     *                  type: number
     *                  required: true
     *            timings:
     *              type: string
     *              required: true
     *            title:
     *              type: string
     *              required: true
     *            type_id:
     *              type: number
     *              required: true
     *            vacancies:
     *              type: string
     *              required: true
     *            working_days:
     *              type: string
     *              required: true
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     *      401:
     *        description: Unauthorized
     *      403:
     *        description: Forbidden
     *      500:
     *        description: Internal server error
     */
    {
      path: '',
      method: 'post',
      handler: 'createJob',
      // validation: 'createJob',
      role: 'EMPLOYER',
      auth: true,
    },
    {
      path: ':id',
      method: 'put',
      handler: 'updateJob',
      // validation: 'createJob',
      role: 'EMPLOYER',
      auth: true,
    },
    /**
     * @swagger
     * /jobs/{id}/applications:
     *   get:
     *     description: Allows an authenticated employer or user ID to view a variety of information about one or more applications for a job specified by job ID and created by the authenticated employer or user ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Jobs
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        schema:
     *          type: number
     *     responses:
     *      200:
     *        description: Successful
     *      400:
     *        description: Bad request
     *      401:
     *        description: Unauthorized
     *      403:
     *        description: Forbidden
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id/applications',
      method: 'get',
      handler: 'getJobApplications',
      auth: true,
      // role: 'EMPLOYER',
    },
    /**
     * @swagger
     * /jobs/{id}/apply:
     *   post:
     *     description: Allows an authenticated employee or user ID to apply for a job or job ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Jobs
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        schema:
     *          type: number
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     *      401:
     *        description: Unauthorized
     *      403:
     *        description: Forbidden
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id/apply',
      method: 'post',
      handler: 'applyJob',
      validation: 'applyJob',
      auth: true,
      // role: 'EMPLOYEE',
    },
    /**
     * @swagger
     * /jobs/{id}/activate-deactivate:
     *   post:
     *     description: Allows an authenticated employee or user ID to apply for a job or job ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Jobs
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        schema:
     *          type: number
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     *      401:
     *        description: Unauthorized
     *      403:
     *        description: Forbidden
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id/activate-deactivate',
      method: 'put',
      handler: 'activateDeactivateJob',
      // validation: 'applyJob',
      auth: true,
      // role: 'EMPLOYEE',
    },
  ],
};
