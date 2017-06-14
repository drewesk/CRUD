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
};
