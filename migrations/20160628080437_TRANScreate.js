exports.up = function(knex, Promise) {
  return knex.schema.createTable('trans', function(table) {
    table.increments('tranId').primary();
    table.integer('tranShop_id').unsigned().index().references('shopId').inTable('shops');
    table.integer('tranBuyer_id');
    table.integer('tranProd_id').unsigned().index().references('prodId').inTable('prods');
    table.enu('tranMethodPay', ['Paypal', 'Stripe', 'Bitcoin']);
    table.integer('tranMethodTranId');
    table.decimal('tranAmt',8,2);
    table.integer('tranShipCharge');
    table.integer('tranShipDays');
    table.timestamp('tranDate').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trans')
};
