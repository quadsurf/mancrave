exports.up = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.integer('shopUser_id').unsigned().index().references('userId').inTable('users');;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.dropColumn('shopUser_id');
  });
};
