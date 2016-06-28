exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('userId').primary();
    table.string('userEmail');
    table.string('userPassword');
    table.string('userFirstName').defaultTo('');
    table.string('userLastName').defaultTo('');
    table.string('userCell').defaultTo('');
    table.string('userImgUrl').defaultTo('');
    table.string('userLogo').defaultTo('');
    table.text('userAbout').defaultTo('');
    table.boolean('user_isSeller').defaultTo(false);
    table.boolean('user_isAdmin').defaultTo(false);
    table.timestamp('userSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
