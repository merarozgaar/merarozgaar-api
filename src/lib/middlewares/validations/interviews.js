const { check, param } = require('express-validator');
const { getValidationMessage } = require('../../../utils');

const interviewID = [
  param('id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('id')),
];

module.exports = {
  requestRtcToken: interviewID,
  acquireAgoraResource: [
    ...interviewID,
    check('token')
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired('token')),
  ],
};
