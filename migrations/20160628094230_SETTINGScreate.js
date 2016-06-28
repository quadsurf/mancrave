exports.up = function(knex, Promise) {
  return knex.schema.createTable('settings', function(table) {
    table.increments('settingId').primary();
    table.decimal('settingMarkup',2,0);
    table.integer('settingStripeId');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('settings')
};
