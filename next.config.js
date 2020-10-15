const { BASE_URL, NEXTAUTH_URL, ON_MAINTENANCE } = process.env;

module.exports = {
  env: {
    BASE_URL: BASE_URL || NEXTAUTH_URL,
    ON_MAINTENANCE: ON_MAINTENANCE === 'true' ? true : false,
  }
}