/* eslint-disable global-require */
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  os.cpus().forEach(() => {
    cluster.fork();
  });

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '.env') });

  const async = require('async');
  const { isFunction } = require('lodash');
  const config = require('config');

  const deps = {
    basedir: __dirname,
    config,
    controllers: null,
    middlewares: null,
    routes: require('./src/routes'),
    validations: null,
  };

  const connect = require('./src/lib/core/db')(deps);

  connect((error, db) => {
    if (error) {
      throw error;
    }

    deps.db = db;

    require('./src/lib')(deps, ['middlewares', 'controllers']);

    // console.log(deps.middlewares);

    // load core modules
    async.eachSeries(
      ['app'],
      (module, callback) => {
        // eslint-disable-next-line import/no-dynamic-require
        const func = require(`./src/lib/core/${module}`)(deps);

        if (isFunction(func)) {
          func((e, result) => {
            if (e) {
              throw callback(e);
            }

            deps[module] = result;

            callback(null, result);
          });
        } else {
          process.nextTick(() => {
            deps[module] = func;

            callback(null, func);
          });
        }
      },
      (e) => {
        if (e) {
          process.exit(1);
        }

        deps.app.listen(config.get('server.port'));
      },
    );
  });
}
