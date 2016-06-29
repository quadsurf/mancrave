exports.up = function(knex, Promise) {
  return knex.schema.createTable('stripes', function(table) {
    table.increments('stripeId').primary();
    table.string('token_type');
    table.string('stripe_publishable_key');
    table.string('scope');
    table.string('livemode');
    table.integer('stripe_user_id');
    table.string('refresh_token');
    table.string('access_token');
    table.timestamp('stripeSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stripes')
};
