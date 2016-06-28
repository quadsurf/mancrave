exports.up = function(knex, Promise) {
  return knex.schema.createTable('cats', function(table) {
    table.increments('catId').primary();
    table.string('catName');
    table.timestamp('catSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cats');
};
