exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('userPassword');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('userPassword').defaultTo('');
  });
};
