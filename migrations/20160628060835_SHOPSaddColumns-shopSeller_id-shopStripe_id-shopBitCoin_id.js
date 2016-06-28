exports.up = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.integer('shopSeller_id').unsigned().index().references('sellerId').inTable('sellers');
    table.integer('shopStripe_id').unsigned().index().references('stripeId').inTable('stripes').onDelete('cascade');
    table.integer('shopBitCoin_id').unsigned().index().references('bitcoinId').inTable('bitcoins').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops', function(table){
    table.dropColumns('shopSeller_id','shopStripe_id','shopBitCoin_id');
  })
};
