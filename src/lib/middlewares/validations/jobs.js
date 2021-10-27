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
  ...[
    'benefits',
    'description',
    'gender',
    'languages',
    'min_age',
    'min_experience',
    'timings',
    'title',
    'vacancies',
    'working_days',
  ].map((c) =>
    check(c)
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired(c)),
  ),
  check('company_size_id')
    .exists()
    .notEmpty()
    .withMessage(getValidationMessage().isRequired('company_size_id'))
    .bail()
    .isNumeric()
    .withMessage(getValidationMessage().isInvalid('company_size_id')),
  ...[
    'education_id',
    'profession_id',
    'salary.frequency_id',
    'salary.max_amount',
    'salary.min_amount',
    'type_id',
  ].map((c) =>
    check(c)
      .exists()
      .notEmpty()
      .withMessage(getValidationMessage().isRequired(c))
      .bail()
      .isNumeric()
      .withMessage(getValidationMessage().isInvalid(c)),
  ),
  check('location_type')
    .exists()
    .notEmpty()
    .custom((value) =>
      ['ONSITE_ONLY', 'REMOTE_ALLOWED', 'REMOTE_ONLY'].includes(value),
    )
    .withMessage(getValidationMessage().isInvalid('location_type')),
];

module.exports = {
  getJobByID: applicationID,
  applyJob: applicationID,
  createJob: common,
};
