
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