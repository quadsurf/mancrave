exports.up = function(knex, Promise) {
  return knex.schema.createTable('sellers', function(table) {
    table.increments('sellerId').primary();
    table.string('sellerFirstName');
    table.string('sellerLastName');
    table.string('sellerCell');
    table.string('sellerImgUrl');
    table.text('sellerAbout');
    table.timestamp('sellerSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sellers')
};
