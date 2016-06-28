exports.up = function(knex, Promise) {
  return knex.schema.createTable('prodreviews', function(table) {
    table.increments('prodreviewId').primary();
    table.integer('prodreviewTran_id').unsigned().index().references('tranId').inTable('trans').onDelete('cascade');
    table.decimal('prodreview',2,0);
    table.text('prodreviewComment');
    table.timestamp('prodreviewDate').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('prodreviews')
};
