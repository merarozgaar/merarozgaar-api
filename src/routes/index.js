const path = require('path');
const fs = require('fs');
const { reduce } = require('lodash');

module.exports = reduce(
  fs.readdirSync(__dirname),
  (a, c) => {
    if (c !== path.basename(__filename)) {
      // eslint-disable-next-line global-require,import/no-dynamic-require,no-param-reassign
      a[path.basename(c, path.extname(c))] = require(path.join(__dirname, c));
    }

    return a;
  },
  {},
);
