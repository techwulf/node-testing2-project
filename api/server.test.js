const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

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

describe('[GET] /api/energies', () => {
  let res;
  beforeEach(async () => {
    res = await request(server).get('/api/energies');
  });

  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200);
  });
  it('responds with 4 energies', async () => {
    expect(res.body).toHaveLength(4);
  });
  it('responds with correct structure', () => {
    expect(res.body).toMatchObject([
      {id: 1, energy: "demonic"},
      {id: 2, energy: "fey"},
      {id: 3, energy: "celestial"},
      {id: 4, energy: "undead"}
    ]);
  });
});