exports.up = function(knex, Promise) {
  return knex.schema.table('trans', function(table) {
    table.integer('tranUser_id').unsigned().index().references('userId').inTable('users');;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trans', function(table) {
    table.dropColumn('tranUser_id');
  });
};
