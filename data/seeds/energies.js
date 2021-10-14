exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('energies')
    .truncate()
    .then(function () {
      return knex('energies').insert([
        {energy: 'demonic'},
        {energy: 'fey'},
        {energy: 'celestial'},
        {energy: 'undead'}
      ]);
    });
};
