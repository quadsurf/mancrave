exports.up = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.renameColumn('prodStore_id', 'prodShop_id');
    table.integer('prodShipDays');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.renameColumn('prodShop_id', 'prodStore_id');
    table.dropColumn('prodShipDays');
  })
};
