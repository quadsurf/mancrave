exports.up = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.dropColumn('prodImgGal_id');
    table.dropColumn('prodShop_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.integer('prodImgGal_id');
    table.integer('prodShop_id');
  })
};
