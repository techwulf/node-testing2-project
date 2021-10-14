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

  it.todo('responds with 200 OK');
  it.todo('responds with 4 energies');
  it.todo('responds with correct structure');
});