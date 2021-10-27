const { check } = require('express-validator');
const { getValidationMessage } = require('../../../utils');

const common = [
  check('date_of_birth')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('date_of_birth'))
    .bail()
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage(getValidationMessage().isInvalid('date_of_birth')),
  check('education_id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('education_id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('education_id')),
  check('email')
    .optional()
    .normalizeEmail()
    .isEmail()
    .withMessage(getValidationMessage().isInvalid('email')),
  check('gender_id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('gender_id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('gender_id')),
  ...['permanent_address', 'present_address']
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
  ...['permanent_address', 'present_address'].map((c) =>
    check(`${c}.pin_code`)
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired(`${c}.pin_code`))
      .bail()
      .isPostalCode('IN')
      .withMessage(getValidationMessage().isInvalid(`${c}.pin_code`)),
  ),
  ...['permanent_address', 'present_address'].map((c) =>
    check(`${c}.country`)
      .optional()
      .custom((value) => ['India'].includes(value))
      .withMessage(getValidationMessage().isInvalid(`${c}.country`)),
  ),
  check('experiences')
    .exists()
    .withMessage(getValidationMessage().isRequired('experiences'))
    .bail()
    .isArray({ min: 1 })
    .withMessage(getValidationMessage().isInvalid('experiences')),
  ...['profession_id', 'salary'].map((c) =>
    check(`experiences.*.${c}`)
      .exists()
      .withMessage(getValidationMessage().isRequired(`experiences.*.${c}`))
      .bail()
      .isNumeric()
      .withMessage(getValidationMessage().isInvalid(`experiences.*.${c}`)),
  ),
];

module.exports = {
  setupProfile: common,
  updateProfile: [
    ...common,
    ...['permanent_address', 'present_address'].map((c) =>
      check(`${c}.id`)
        .exists()
        .withMessage(getValidationMessage().isRequired(`${c}.id`))
        .bail()
        .isNumeric()
        .withMessage(getValidationMessage().isInvalid(`${c}.id`)),
    ),
    check('experiences.*.id')
      .exists()
      .withMessage(getValidationMessage().isRequired('experiences.*.id'))
      .bail()
      .isNumeric()
      .withMessage(getValidationMessage().isInvalid('experiences.*.id')),
    check('id')
      .exists()
      .withMessage(getValidationMessage().isRequired('id'))
      .bail()
      .isNumeric()
      .withMessage(getValidationMessage().isInvalid('id')),
  ],
};
