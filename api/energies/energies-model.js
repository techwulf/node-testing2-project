const db = require('../../data/dbConfig');

module.exports = {
  getAll() {
    return db('energies');
  },

  insert(energy) {
  },

  insertById(id) {
  },

  remove(id) {
  }
}