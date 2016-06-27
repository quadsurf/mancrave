exports.up = function(knex, Promise) {
  return knex.schema.createTable('shops', function(table) {
    table.increments('shopId').primary();
    table.string('shopSeller_id');
    table.string('shopName');
    table.text('shopAbout');
    table.string('shopCell');
    table.string('shopEmail');
    table.string('shopStripe_id');
    table.string('shopBitCoin_id');
    table.string('shopPaypalMerchId');
    table.string('shopImgUrl');
    table.string('shopPrivacy');
    table.string('shopReturn');
    table.timestamp('shopSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops')
};
