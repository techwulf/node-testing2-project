
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

  it.todo('returns all (4) energies');
  it.todo('energies returned are in the correct shape');
});