exports.up = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.dropColumn('shopSeller_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.integer('shopSeller_id');
  });
};
