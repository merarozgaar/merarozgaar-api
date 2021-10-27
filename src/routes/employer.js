module.exports = {
  middlewares: [],
  path: '/employer',
  routes: [
    /**
     * @swagger
     * /employer/jobs:
     *   get:
     *     description: Returns a variety of information about an employer profile depending on the authenticated employer or user ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employer
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      403:
     *        description: Forbidden
     *      500:
     *        description: Internal server error
     */
    {
      path: 'jobs',
      method: 'get',
      handler: 'getJobs',
      auth: true,
      role: 'EMPLOYER',
    },
    /**
     * @swagger
     * /employer/profile:
     *   get:
     *     description: Returns a variety of information about an employer profile depending on the authenticated employer or user ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employer
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      401:
     *        description: Unauthorized
     *      403:
     *        description: Forbidden
     *      500:
     *        description: Internal server error
     */
    {
      path: 'profile',
      method: 'get',
      handler: 'getProfile',
      auth: true,
      role: 'EMPLOYER',
    },
    /**
     * @swagger
     * /employer/profile:
     *   post:
     *     description: Allows an authenticated employer or user ID to complete profile setup.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employer
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
     *            company_size_id:
     *              type: number
     *              required: true
     *            industry_type_id:
     *              type: number
     *              required: true
     *            name:
     *              type: string
     *              required: true
     *            overview:
     *              type: string
     *              required: true
     *            website:
     *              type: string
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
      path: 'profile',
      method: 'post',
      handler: 'setupProfile',
      // validation: 'setupProfile',
      auth: true,
      role: 'EMPLOYER',
    },
    /**
     * @swagger
     * /employer/profile:
     *   put:
     *     description: Allows an authenticated employer or user ID to update profile.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employer
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
     *                id:
     *                  type: number
     *                  required: true
     *                pin_code:
     *                  type: string
     *                  required: true
     *                state:
     *                  type: string
     *                  required: true
     *                street_address:
     *                  type: string
     *                  required: true
     *            company_size_id:
     *              type: number
     *              required: true
     *            id:
     *              type: number
     *              required: true
     *            industry_type_id:
     *              type: number
     *              required: true
     *            name:
     *              type: string
     *              required: true
     *            overview:
     *              type: string
     *              required: true
     *            website:
     *              type: string
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
      path: 'profile',
      method: 'put',
      handler: 'updateProfile',
      // validation: 'updateProfile',
      auth: true,
      role: 'EMPLOYER',
    },
  ],
};
