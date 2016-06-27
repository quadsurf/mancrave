exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(table) {
    table.increments('tagId').primary();
    table.string('tagKeyword');
    table.timestamp('tagSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags')
};
