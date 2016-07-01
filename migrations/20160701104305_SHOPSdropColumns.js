exports.up = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.dropColumns('shopCell','shopEmail','shopPrivacy','shopReturn','shopStripe_id','shopBitCoin_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.string('shopCell').defaultTo('');
    table.string('shopEmail').defaultTo('');
    table.string('shopPrivacy').defaultTo('');
    table.string('shopReturn').defaultTo('');
    table.integer('shopStripe_id').defaultTo('');
    table.integer('shopBitCoin_id').defaultTo('');
  });
};
