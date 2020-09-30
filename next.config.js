const { BASE_URL, NEXTAUTH_URL } = process.env;

module.exports = {
  env: {
    BASE_URL: BASE_URL || NEXTAUTH_URL,
  }
}