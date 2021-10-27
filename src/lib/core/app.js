module.exports = function (deps) {
  return function (done) {
    // eslint-disable-next-line global-require
    require('./server')(deps, done);
  };
};
