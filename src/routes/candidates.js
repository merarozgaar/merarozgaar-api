module.exports = {
  middlewares: [],
  path: '/candidates',
  routes: [
    /**
     * @swagger
     * /candidates:
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
      handler: 'getCandidates',
    },
    {
      path: 'search',
      method: 'get',
      handler: 'search',
    },
    /**
     * @swagger
     * /candidates/{id}:
     *   get:
     *     description: Returns a variety of information about a single job or job ID.
     *     tags:
     *       - Candidates
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
      handler: 'getCandidateByID',
      validation: 'getCandidateByID',
    },
    /**
     * @swagger
     * /candidates/{id}/request-contact:
     *   get:
     *     description: Returns a variety of information about a single job or job ID.
     *     tags:
     *       - Candidates
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
      path: ':id/request-contact',
      method: 'post',
      handler: 'requestContact',
      auth: true,
    },
  ],
};
