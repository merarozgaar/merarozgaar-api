const { check, param } = require('express-validator');
const { getValidationMessage } = require('../../../utils');

const applicationID = [
  param('id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('id')),
];

const updateApplicationByID = [
  ...applicationID,
  check('status')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('status'))
    .bail()
    .custom((value) =>
      [
        'WITHDRAWN',
        'HIRED',
        'APPLIED',
        'SCREENING',
        'SHORTLISTED',
        'REJECTED',
      ].includes(value),
    )
    .withMessage(getValidationMessage().isInvalid('status')),
];

module.exports = {
  getApplicationByID: applicationID,
  updateApplicationByID,
};
