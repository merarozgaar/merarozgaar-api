const { check } = require('express-validator');
const { getValidationMessage } = require('../../../utils');

const common = [
  ...['address']
    .reduce(
      (a, c) => [
        ...a,
        ...['city', 'state', 'street_address'].map((p) => `${c}.${p}`),
      ],
      [],
    )
    .map((c) =>
      check(c)
        .exists()
        .notEmpty()
        .withMessage(getValidationMessage().isRequired(c)),
    ),
  ...['address'].map((c) =>
    check(`${c}.pin_code`)
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired(`${c}.pin_code`))
      .bail()
      .isPostalCode('IN')
      .withMessage(getValidationMessage().isInvalid(`${c}.pin_code`)),
  ),
  ...['address'].map((c) =>
    check(`${c}.country`)
      .optional()
      .custom((value) => ['India'].includes(value))
      .withMessage(getValidationMessage().isInvalid(`${c}.country`)),
  ),
  check('company_size_id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('company_size_id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('company_size_id')),
  check('industry_type_id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('industry_type_id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('industry_type_id')),
  check('name')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('name'))
    .bail(),
  check('overview')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('name'))
    .bail(),
  check('website')
    .optional()
    .isURL()
    .withMessage(getValidationMessage().isInvalid('website'))
    .bail(),
];

module.exports = {
  setupProfile: common,
  updateProfile: [
    ...common,
    ...['address'].map((c) =>
      check(`${c}.id`)
        .exists()
        .withMessage(getValidationMessage().isRequired(`${c}.id`))
        .bail()
        .isNumeric()
        .withMessage(getValidationMessage().isInvalid(`${c}.id`)),
    ),
    check('id')
      .exists()
      .withMessage(getValidationMessage().isRequired('id'))
      .bail()
      .isNumeric()
      .withMessage(getValidationMessage().isInvalid('id')),
  ],
};
