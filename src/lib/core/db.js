const mysql = require('mysql');
const util = require('util');

module.exports = function (deps) {
  const { config } = deps;

  return function (done) {
    const connection = mysql.createConnection({
      host: config.get('database.mysql.host'),
      port: config.get('database.mysql.port'),
      user: config.get('database.mysql.user'),
      password: config.get('database.mysql.password'),
      database: config.get('database.mysql.database'),
      dateStrings: true,
    });

    connection.connect((err) => {
      if (err) {
        done(err);
      }

      done(null, {
        connection,
        query(query, args) {
          return util.promisify(connection.query).call(connection, query, args);
        },
        close() {
          return util.promisify(connection.end).call(connection);
        },
      });
    });
  };
};
