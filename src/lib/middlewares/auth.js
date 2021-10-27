// Middleware to verify JWT tokens
const jwt = require('jsonwebtoken');

module.exports = function (deps) {
  return function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, deps.config.get('jwt.secret'), (error, decoded) => {
        if (error) {
          res.status(401).end();
          return;
        }

        req.user = decoded;
        next();
      });
    } else {
      res.status(401).end();
    }
  };
};
