// Middleware to enforce access to only owners or ADMIN users
module.exports = function () {
  return function (req, res, next) {
    if (
      req.user.id === Number(req.params.id) ||
      req.user.id === Number(req.body.id) ||
      req.user.role === 'ADMIN'
    ) {
      next();
    } else {
      res.status(403).end();
    }
  };
};
