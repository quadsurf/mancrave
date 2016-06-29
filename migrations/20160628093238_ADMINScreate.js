exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', function(table) {
    table.increments('adminId').primary();
    table.string('adminUserName');
    table.string('adminPassword');
    table.enu('adminAccess', ['regular', 'super']).defaultTo('super');
    table.timestamp('adminSince').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admins')
};
