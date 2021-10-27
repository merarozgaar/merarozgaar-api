const path = require('path');
const fs = require('fs');
const { reduce } = require('lodash');
const { validationResult } = require('express-validator');

module.exports = function () {
  return function (handler) {
    const validations = reduce(
      fs.readdirSync(__dirname),
      (a, c) => {
        if (c !== path.basename(__filename)) {
          return {
            ...a,
            // eslint-disable-next-line global-require,import/no-dynamic-require
            ...require(path.join(__dirname, c)),
          };
        }

        return a;
      },
      {},
    );

    const rules = validations[handler];

    if (rules) {
      return [
        rules,
        function (req, res, next) {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(400).json(errors);
            return;
          }

          next();
        },
      ];
    }

    return function (req, res, next) {
      next();
    };
  };
};
