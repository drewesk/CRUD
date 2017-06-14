// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/events'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-events'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
