exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopratings', function(table) {
    table.increments('shopratingId').primary();
    table.integer('shopratingTran_id').unsigned().index().references('tranId').inTable('trans').onDelete('cascade');
    table.decimal('shoprating',2,0);
    table.text('shopratingComment');
    table.timestamp('shopratingDate').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shopratings')
};
