const { param } = require('express-validator');
const { getValidationMessage } = require('../../../utils');

const candidateID = [
  param('id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('id')),
];

module.exports = {
  getCandidateByID: candidateID,
};
