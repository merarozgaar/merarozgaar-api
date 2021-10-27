// Middleware to enforce role based access
const { isArray } = require('lodash');

module.exports = function () {
  return function (role) {
    return function (req, res, next) {
      if (
        req.user && isArray(role)
          ? role.indexOf(req.user.role) > -1
          : role === req.user.role
      ) {
        next();
      } else {
        res.status(403).end();
      }
    };
  };
};
