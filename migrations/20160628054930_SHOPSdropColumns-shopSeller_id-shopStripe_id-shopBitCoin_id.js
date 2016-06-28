exports.up = function(knex, Promise) {
return knex.schema.table('shops', function(table) {
  table.dropColumns('shopSeller_id','shopStripe_id','shopBitCoin_id');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.table('shops', function(table){
  table.integer('shopSeller_id');
  table.integer('shopStripe_id');
  table.integer('shopBitCoin_id');
  });
};
