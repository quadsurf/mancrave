exports.up = function(knex, Promise) {
  return knex.schema.createTable('test1', function(table) {
    table.increments('test1Id').primary();
    table.string('title');
    table.timestamp('sellerSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('test1')
};
