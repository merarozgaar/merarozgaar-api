const path = require('path');
const fs = require('fs');
const { each, reduce, isFunction } = require('lodash');

module.exports = function (deps, folders = ['middlewares', 'controllers']) {
  each(folders, (dir) => {
    // eslint-disable-next-line no-param-reassign
    deps[dir] = {};

    reduce(
      fs.readdirSync(path.join(__dirname, dir)),
      (a, c) => {
        if (c !== path.basename(__filename)) {
          // eslint-disable-next-line global-require,import/no-dynamic-require
          const module = require(path.resolve(__dirname, dir, c));

          const key = path.basename(c, '.js');

          if (isFunction(module)) {
            // eslint-disable-next-line no-param-reassign
            a[key] = module(deps);
          } else {
            // eslint-disable-next-line no-param-reassign
            a[key] = module;
          }
        }

        return a;
      },
      deps[dir],
    );
  });
};
