const { check } = require('express-validator');
const { getValidationMessage } = require('../../../utils');

module.exports = {
  upload: [
    check('context')
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired('data'))
      .bail()
      .custom((value) => ['AVATAR', 'ID_PROOF'].includes(value))
      .withMessage(getValidationMessage().isInvalid('context')),
    check('data')
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired('data'))
      .bail()
      .isDataURI()
      .withMessage(getValidationMessage().isInvalid('data')),
    check('file_name')
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired('file_name'))
      .bail(),
  ],
};
