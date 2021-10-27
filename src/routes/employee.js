module.exports = {
  middlewares: [],
  path: '/employee',
  routes: [
    /**
     * @swagger
     * /employee/applications:
     *   get:
     *     description: Returns a variety of information about one or more job applications depending on the authenticated employee or user ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employee
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
      path: 'applications',
      method: 'get',
      handler: 'getApplications',
      auth: true,
      // role: 'EMPLOYEE',
    },
    /**
     * @swagger
     * /employee/profile:
     *   get:
     *     description: Returns a variety of information about an employee profile depending on the authenticated employee or user ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employee
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
      role: 'EMPLOYEE',
    },
    /**
     * @swagger
     * /employee/profile:
     *   post:
     *     description: Allows an authenticated employee or user ID to complete profile setup.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employee
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            date_of_birth:
     *              type: string
     *              required: true
     *              default: YYYY-MM-DD
     *            education_id:
     *              type: number
     *              required: true
     *            email:
     *              type: string
     *              required: true
     *            gender_id:
     *              type: number
     *              required: true
     *            name:
     *              type: string
     *              required: true
     *            permanent_address:
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
     *            present_address:
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
     *            experiences:
     *              type: array
     *              required: true
     *              items:
     *                type: object
     *                properties:
     *                  profession_id:
     *                    type: number
     *                    required: true
     *                  salary:
     *                    type: number
     *                    required: true
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
      role: 'EMPLOYEE',
    },
    /**
     * @swagger
     * /employee/profile:
     *   put:
     *     description: Allows an authenticated employee or user ID to update profile.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employee
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            date_of_birth:
     *              type: string
     *              required: true
     *              default: YYYY-MM-DD
     *            education_id:
     *              type: number
     *              required: true
     *            email:
     *              type: string
     *              required: true
     *            gender_id:
     *              type: number
     *              required: true
     *            id:
     *              type: number
     *              required: true
     *            name:
     *              type: string
     *              required: true
     *            permanent_address:
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
     *            present_address:
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
     *            experiences:
     *              type: array
     *              required: true
     *              items:
     *                type: object
     *                properties:
     *                  id:
     *                    type: number
     *                    required: true
     *                  profession_id:
     *                    type: number
     *                    required: true
     *                  salary:
     *                    type: number
     *                    required: true
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
      method: 'put',
      handler: 'updateProfile',
      // validation: 'updateProfile',
      auth: true,
      role: 'EMPLOYEE',
    },
    /**
     * @swagger
     * /employee/profile:
     *   delete:
     *     description: Returns a variety of information about an employee profile depending on the authenticated employee or user ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Employee
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
      method: 'delete',
      handler: 'deactivateAccount',
      auth: true,
      role: 'EMPLOYEE',
    },
    {
      path: 'profile/preferences/:id',
      method: 'delete',
      handler: 'removePreference',
      auth: true,
      role: 'EMPLOYEE',
    },
    {
      path: 'profile/skills/:id',
      method: 'delete',
      handler: 'removeSkill',
      auth: true,
      role: 'EMPLOYEE',
    },
  ],
};
