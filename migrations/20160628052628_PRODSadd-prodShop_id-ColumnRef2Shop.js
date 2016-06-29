exports.up = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.integer('prodShop_id').unsigned().index().references('shopId').inTable('shops');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.dropColumn('prodShop_id');
  })
};
