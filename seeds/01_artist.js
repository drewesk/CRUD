const artists = require('../artists')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE artist RESTART IDENTITY CASCADE;')
    .then(function () {
      return knex('artist').insert(artists);
    });
};
