exports.up = function(knex, Promise) {
  return knex.schema.table('trans', function(table) {
    table.renameColumn('tranBuyer_id','tranUser_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trans', function(table) {
    table.renameColumn('tranUser_id','tranBuyer_id');
  });
};
