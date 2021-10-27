module.exports = {
  middlewares: [],
  path: '/media',
  routes: [
    /**
     * @swagger
     * /media:
     *   post:
     *     description: Allows to an authenticated user to upload files to storage.
     *     tags:
     *       - Media
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            context:
     *              type: string
     *              required: true
     *              enum:
     *                - AVATAR
     *                - ID_PROOF
     *            data:
     *              type: string
     *              required: true
     *              description: Content of the file as data URI
     *            file_name:
     *              type: string
     *              required: true
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     */
    {
      path: '',
      method: 'post',
      handler: 'upload',
      // validation: 'upload',
      // middlewares: ['multer'],
      auth: true,
    },
    {
      path: 'video',
      method: 'post',
      handler: 'uploadVideo',
      // validation: 'upload',
      middlewares: ['multer'],
      auth: true,
    },
    {
      path: 'certificate',
      method: 'get',
      handler: 'getCertificate',
      auth: true,
    },
  ],
};
