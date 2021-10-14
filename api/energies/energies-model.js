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

  async update(id, changes) {
    await db('energies')
      .where('id', id)
      .update({energy: changes});
    return this.getById(id);
  },

  async remove(id) {
    const deletedEnergy = await this.getById(id);
    await db('energies')
      .where('id', id)
      .delete();
    return deletedEnergy;
  }
}