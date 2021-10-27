module.exports = {
  middlewares: [],
  path: '/interviews',
  routes: [
    /**
     * @swagger
     * /interviews:
     *   get:
     *     description: Returns a variety of information about interviews depending on the authenticated user or user ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Interviews
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
      handler: 'getInterviews',
      auth: true,
    },
    /**
     * @swagger
     * /interviews/{id}:
     *   get:
     *     description: Returns a variety of information about a single job or job ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Interviews
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
     *      404:
     *        description: Not found
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id',
      method: 'get',
      handler: 'getInterviewByID',
      // validation: 'getCandidateByID',
      auth: true,
    },
    /**
     * @swagger
     * /interviews/{id}:
     *   put:
     *     description: Allows an authenticated employee or user ID to update profile.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Interviews
     *     produces:
     *       - application/json
     *     parameters:
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
     *                - CONFIRMED
     *                - REJECTED
     *                - RESCHEDULED
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
      path: ':id',
      method: 'put',
      handler: 'updateInterviewStatus',
      // validation: 'updateProfile',
      auth: true,
    },
    /**
     * @swagger
     * /interviews/{id}/request_to_join:
     *   post:
     *     description: Allows an authenticated user or user ID to join an interview call specified by interview ID and channel name.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Interviews
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
     *      404:
     *        description: Not found
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id/request_to_join',
      method: 'post',
      handler: 'requestRtcToken',
      validation: 'requestRtcToken',
      auth: true,
    },
    /**
     * @swagger
     * /interviews/{id}/start:
     *   post:
     *     description: Allows an authenticated user or user ID to start an interview call specified by interview ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Interviews
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
     *            token:
     *              type: string
     *              required: true
     *     responses:
     *      200:
     *        description: Successful
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not found
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id/start',
      method: 'post',
      handler: 'acquireAgoraResource',
      validation: 'acquireAgoraResource',
      auth: true,
    },
    /**
     * @swagger
     * /interviews/{id}/stop:
     *   post:
     *     description: Allows an authenticated user or user ID to end an interview call specified by interview ID.
     *     security:
     *       - Authorization: []
     *     tags:
     *       - Interviews
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
     *            channel_name:
     *              type: string
     *              required: true
     *            uid:
     *              type: string
     *              required: true
     *            resource_id:
     *              type: string
     *              required: true
     *            sid:
     *              type: string
     *              required: true
     *     responses:
     *      200:
     *        description: Successful
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not found
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id/stop',
      method: 'post',
      handler: 'stopAgoraRecording',
      // validation: 'acquireAgoraResource',
      auth: true,
    },
  ],
};
