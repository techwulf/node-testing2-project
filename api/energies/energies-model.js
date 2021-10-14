const db = require('../../data/dbConfig');

module.exports = {
  getAll() {
    return db('energies');
  },

  getById(id) {
    return db('energies').where('id', id).first();
  },

  async insert(energy) {
    const [id] = await db('energies').insert(energy);
    return this.getById(id);
  },

  insertById(id) {
  },

  remove(id) {
  }
}