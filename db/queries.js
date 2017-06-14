const knex = require('./knex');// the connection

module.exports = {
  getAll() {
    return knex('artist'); // shorthand
  },
  getOne(id) {
    return knex('artist').where('id', id).first();
  },
  create(artist){
    return knex('artist').insert(artist, '*');
  },
  update(id, artist) {
    return knex('artist').where('id', id).update(artist, '*');
  },
  delete(id) {
    return knex('artist').where('id', id).del();
  }
}
