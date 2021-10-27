module.exports = {
  middlewares: [],
  path: '/courses',
  routes: [
    /**
     * @swagger
     * /courses:
     *   get:
     *     description: Returns a variety of information about one or more jobs.
     *     tags:
     *       - Courses
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
      handler: 'getCourses',
    },
    /**
     * @swagger
     * /courses/certificate:
     *   get:
     *     description: Returns a variety of information about one or more jobs.
     *     tags:
     *       - Courses
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      500:
     *        description: Internal server error
     */
    {
      path: '/badge',
      method: 'get',
      handler: 'getCertificate',
      auth: false,
    },
    /**
     * @swagger
     * /courses/{id}:
     *   get:
     *     description: Returns a variety of information about one or more jobs.
     *     tags:
     *       - Courses
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
     *      500:
     *        description: Internal server error
     */
    {
      path: ':id',
      method: 'get',
      handler: 'getCourseByID',
      auth: true,
    },
    /**
     * @swagger
     * /courses/update_score:
     *   put:
     *     description: Returns a variety of information about one or more jobs.
     *     tags:
     *       - Courses
     *     produces:
     *       - application/json
     *     responses:
     *      200:
     *        description: Successful
     *      500:
     *        description: Internal server error
     */
    {
      path: 'update_score',
      method: 'put',
      handler: 'updateProfileScore',
      auth: true,
    },
  ],
};
