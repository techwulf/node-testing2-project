
const db = require('../../data/dbConfig');
const Energies = require('./energies-model');

test('environment', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('Energies.getAll()', () => {
  let energies;
  beforeEach(async () => {
    energies = await Energies.getAll();
  })

  it('returns all (4) energies', async () => {
    expect(energies).toHaveLength(4);
  });

  it('energies returned are in the correct shape', () => {
    expect(energies).toMatchSnapshot();
  });
});

describe('Energies.insert()', () => {
  let energy;
  beforeEach(async () => {
    energy = await Energies.insert({energy: 'animate'});
  });

  it('inserting a new energy causes 5 energies to exist in db', async () => {
    const energies = await db('energies');
    expect(energies).toHaveLength(5);
  });

  it('inserting a new energy resolves to the new energy object', async () => {
    expect(energy).toMatchObject({id: 5, energy: 'animate'});
  });
});

describe('Energies.update()', () => {
  const id = 3;
  let updatedEnergy;
  beforeEach(async () => {
    updatedEnergy = await Energies.update(id, 'cosmic');
  });

  it(
    'updating an existing energy changes that energy in the database', 
    async () => {
      const changedEnergy = await db('energies').where('id', id).first();
      expect(changedEnergy).toMatchObject({id: 3, energy: 'cosmic'});
  });

  it(
    'updating an existing energy resolves to the updated energy object',
    async () => {
      expect(updatedEnergy).toMatchObject({id: 3, energy: 'cosmic'});
  });
});

describe('Energies.remove()', () => {
  const id = 4;
  let deletedEnergy;
  beforeEach(async () => {
    deletedEnergy = await Energies.remove(id);
  });

  it('deleteing an energy causes 3 energies to exist in database', async () => {
    const energies = await db('energies');
    expect(energies).toHaveLength(3);
  });

  it('deleting an energy resolves to the deleted energy object', async () => {
    expect(deletedEnergy).toMatchObject({id: 4, energy: 'undead'});
  });
});