const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { each, reduce, isFunction, isArray, indexOf } = require('lodash');

module.exports = function (deps, done) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(morgan('dev'));

  app.use(cors());

  app.use(express.static('dist'));

  // eslint-disable-next-line global-require
  const options = require('../../docs');

  const swaggerSpec = swaggerJSDoc(options);

  app.use(
    '/doc',
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
      explorer: false,
    }),
  );

  each(deps.routes, (data, key) => {
    const basePath = data.path || '';
    const commonMiddlewares = data.middlewares || [];

    each(data.routes, (route) => {
      const path =
        route.path.indexOf('/') === 0
          ? route.path
          : `${deps.config.get('apiEndpoint.prefix')}${basePath}/${route.path}`;
      const { method } = route;
      const { role } = route;
      const { handler } = route;
      const middleware = [];
      const callback = [];
      const { validation } = route;

      if (route.auth) {
        callback.push(deps.middlewares.auth);
      }

      if (role) {
        const acl = deps.middlewares.acl(role);
        callback.push(acl);
      }

      if (validation) {
        const fn = deps.middlewares.validations(validation);
        callback.push(fn);
      }

      // common route middlewares
      Array.prototype.push.apply(middleware, commonMiddlewares || []);

      // route middlewares
      Array.prototype.push.apply(middleware, route.middlewares || []);

      reduce(
        middleware,
        // eslint-disable-next-line consistent-return
        (a, c) => {
          if (isFunction(c)) {
            a.push(c);
            return a;
          }

          const fn = deps.middlewares[c];

          if (isFunction(fn) && indexOf(a, fn) === -1) {
            a.push(fn);
            return a;
          }
        },
        callback,
      );

      const controller = deps.controllers[key][handler];

      if (isArray(controller)) {
        Array.prototype.push.apply(callback, controller);
      } else if (isFunction(controller)) {
        callback.push(controller);
      } else {
        throw new Error(`Controller ${handler} is not found.`);
      }

      app[method].call(app, path, callback);

      // console.log(method, middleware, path, callback);
    });
  });

  app.disable('etag');

  app.all('*', (req, res) => res.status(404).end());

  done(null, app);
};
