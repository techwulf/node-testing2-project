
exports.up = function(knex) {
  return knex.schema.createTable('energies', table => {
    table.increments();
    table.string('energy', 16).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('energies');
};
