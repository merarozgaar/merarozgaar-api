module.exports = {
  middlewares: [],
  path: '/applications',
  routes: [
    /**
     * @swagger
     * /applications/{id}:
     *   get:
     *     description: Allows an authenticated user or user ID to get details of a job application specified by the ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Applications
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
     *      404:
     *        description: Not found
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id',
      method: 'get',
      handler: 'getApplicationByID',
      validation: 'getApplicationByID',
      auth: true,
    },
    /**
     * @swagger
     * /applications/{id}:
     *   put:
     *     description: Allows an authenticated user or user ID to update the status of a job application specified by the ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Applications
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        schema:
     *          type: number
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            status:
     *              type: string
     *              required: true
     *              enum:
     *                - CLOSED
     *                - HIRED
     *                - OPEN
     *                - SCREENING
     *                - SHORTLISTED
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
      path: ':id',
      method: 'put',
      handler: 'updateApplicationByID',
      validation: 'updateApplicationByID',
      auth: true,
    },
    /**
     * @swagger
     * /applications/{id}/schedule:
     *   post:
     *     description: Allows an authenticated user or user ID to update the status of a job application specified by the ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Applications
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        schema:
     *          type: number
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            status:
     *              type: string
     *              required: true
     *              enum:
     *                - CLOSED
     *                - HIRED
     *                - OPEN
     *                - SCREENING
     *                - SHORTLISTED
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
      path: ':id/schedule',
      method: 'post',
      handler: 'scheduleInterview',
      // validation: 'scheduleInterview',
      // auth: true,
    },
  ],
};
