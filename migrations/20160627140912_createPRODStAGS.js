exports.up = function(knex, Promise) {
  return knex.schema.createTable('prods_tags', function(table) {
    table.increments('prod_tagId').primary();
    table.integer('prod_tagProds_id').unsigned().index().references('prodId').inTable('prods');
    table.integer('prod_tagTags_id').unsigned().index().references('tagId').inTable('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('prods_tags')
};
