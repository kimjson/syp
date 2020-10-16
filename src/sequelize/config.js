const Url = require('url-parse');

const {username, password, hostname, protocol, pathname: database} = new Url(process.env.DATABASE_URL, true);

module.exports = {
  development: {
    username,
    password,
    database,
    host: hostname,
    dialect: protocol
  },
  production: {
    username,
    password,
    database,
    host: hostname,
    dialect: protocol
  },
}
