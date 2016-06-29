exports.up = function(knex, Promise) {
  return knex.schema.createTable('imggals', function(table) {
    table.increments('imgGalId').primary();
    table.string('imgGalPath');
    table.integer('imgGalProd_id').unsigned().index().references('prodId').inTable('prods').onDelete('cascade');    
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('imggals')
};
