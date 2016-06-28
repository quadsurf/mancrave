exports.up = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.string('prodCat');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('prods', function(table) {
    table.dropColumn('prodCat');
  });
};
