
exports.up = function(knex, Promise) {
  return knex.schema.createTable('artist', (table) => {
    table.increments();
    table.text('firstName');
    table.text('lastName');
    table.text('phone');
    table.text('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('artist');
};
