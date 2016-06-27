exports.up = function(knex, Promise) {
  return knex.schema.createTable('prods_tags', function(table) {
    table.increments('prod_tag_Id').primary();
    table.integer('prods_id').unsigned().index().references('prodId').inTable('shops').onDelete('cascade');
    table.integer('_id').unsigned().index().references('imgGalId').inTable('imggals');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('prods_tags')
};
