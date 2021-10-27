module.exports = {
  middlewares: [],
  path: '/notifications',
  routes: [
    /**
     * @swagger
     * /notifications:
     *   get:
     *     description: Returns a variety of information about one or more candidates.
     *     tags:
     *       - Candidates
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
      handler: 'getNotifications',
      auth: true,
    },
    /**
     * @swagger
     * /notifications:
     *   put:
     *     description: Allows an authenticated employee or user ID to update profile.
     *     tags:
     *       - Notifications
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            token:
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
      method: 'put',
      handler: 'create',
      // validation: 'updateProfile',
      auth: true,
    },
    /**
     * @swagger
     * /notifications/register:
     *   put:
     *     description: Allows an authenticated employee or user ID to update profile.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Notifications
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            token:
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
      path: 'register',
      method: 'put',
      handler: 'updateToken',
      // validation: 'updateProfile',
      auth: true,
    },
  ],
};
