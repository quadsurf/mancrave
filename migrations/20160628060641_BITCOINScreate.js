exports.up = function(knex, Promise) {
  return knex.schema.createTable('bitcoins', function(table) {
    table.increments('bitcoinId').primary();
    table.timestamp('bitcoinSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bitcoins')
};
