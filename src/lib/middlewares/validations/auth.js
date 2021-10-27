const { check } = require('express-validator');
const { getValidationMessage } = require('../../../utils');

const dialCode = [
  check('dial_code')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('dial_code'))
    .bail()
    .custom((value) => value.startsWith('+'))
    .withMessage(getValidationMessage().isInvalid('dial_code'))
    .bail()
    .custom((value) => Number.isInteger(Number(value.replace('+', ''))))
    .withMessage(getValidationMessage().isInvalid('dial_code')),
];

const phoneNumber = [
  check('mobile_number')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('mobile_number'))
    .bail()
    .custom((value) => Number.isInteger(Number(value)))
    .withMessage(getValidationMessage().isInvalid('mobile_number')),
];

module.exports = {
  checkExistingUser: [...dialCode, ...phoneNumber],
  signup: [
    ...dialCode,
    check('email')
      .optional()
      .normalizeEmail()
      .isEmail()
      .withMessage(getValidationMessage().isInvalid('email')),
    check('name')
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired('name'))
      .bail(),
    ...phoneNumber,
    check('role')
      .exists()
      .notEmpty()
      .custom((value) => ['ADMIN', 'EMPLOYER', 'EMPLOYEE'].includes(value))
      .withMessage(getValidationMessage().isInvalid('role')),
  ],
  requestOtp: [...dialCode, ...phoneNumber],
  verifyOtp: [
    ...dialCode,
    ...phoneNumber,
    check('otp')
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired('otp'))
      .isInt({ min: 100000, max: 999999 })
      .bail(),
  ],
};
