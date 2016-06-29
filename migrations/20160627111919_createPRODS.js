exports.up = function(knex, Promise) {
  return knex.schema.createTable('prods', function(table) {
    table.increments('prodId').primary();
    table.string('prodName');
    table.integer('prodShop_id');
    table.string('prodImgUrl');
    table.integer('prodImgGal_id');
    table.text('prodAbout');
    table.decimal('prodPrice',8,2);
    table.decimal('prodShipAmt',8,2);
    table.integer('prodShipDays');
    table.timestamp('prodSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('prods')
};
