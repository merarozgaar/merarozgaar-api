module.exports = {
  middlewares: [],
  path: '/auth',
  routes: [
    /**
     * @swagger
     * /auth/check_existing_user:
     *   post:
     *     description: Allows to check if user is already registered.
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            dial_code:
     *              type: string
     *              required: true
     *            mobile_number:
     *              type: string
     *              required: true
     *     responses:
     *      200:
     *        description: Successful
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     */
    {
      path: 'check_existing_user',
      method: 'post',
      handler: 'checkExistingUser',
      validation: 'checkExistingUser',
    },
    /**
     * @swagger
     * /auth/request_otp:
     *   post:
     *     description: Requests a new 6 digit OTP specified by a mobile number.
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            dial_code:
     *              type: string
     *              required: true
     *            mobile_number:
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
      path: 'request_otp',
      method: 'post',
      handler: 'requestOtp',
      validation: 'requestOtp',
    },
    /**
     * @swagger
     * /auth/signup:
     *   post:
     *     description: Allows to register an user if not already registered.
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            dial_code:
     *              type: string
     *              required: true
     *            email:
     *              type: string
     *            name:
     *              type: string
     *              required: true
     *            mobile_number:
     *              type: string
     *              required: true
     *            role:
     *              type: string
     *              required: true
     *              enum:
     *                - EMPLOYEE
     *                - EMPLOYER
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     */
    {
      path: 'signup',
      method: 'post',
      handler: 'signup',
      validation: 'signup',
    },
    /**
     * @swagger
     * /auth/verify_otp:
     *   post:
     *     description: Verifies a 6 digit OTP specified by a mobile number.
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            dial_code:
     *              type: string
     *              required: true
     *            mobile_number:
     *              type: string
     *              required: true
     *            otp:
     *              type: number
     *              required: true
     *     responses:
     *      200:
     *        description: Successful
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     */
    {
      path: 'verify_otp',
      method: 'post',
      handler: 'verifyOtp',
      validation: 'verifyOtp',
    },
  ],
};
