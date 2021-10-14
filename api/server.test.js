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

describe('[POST] /api/energies', () => {
  let res;
  const newEnergy = {energy: 'animate'};
  beforeEach(async () => {
    res = await request(server).post('/api/energies')
      .send(newEnergy);
  });

  it('responds with 201 OK', async () => {
    expect(res.status).toBe(201);
  });

  it('causes an energy to be added to the db', async () => {
    const energies = await db('energies');
    expect(energies).toHaveLength(5);
  });

  it('responds with the newly created energy', async () => {
    expect(res.body).toMatchSnapshot();
  });
});

describe('[PUT] /api/energies/:id', () => {
  let res;
  const id = 3;
  const updatedEnergy = {energy: 'cosmic'};
  beforeEach(async () => {
    res = await request(server).put(`/api/energies/${id}`)
      .send(updatedEnergy);
  });

  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200);
  });

  it('responds with the newly updated energy', async () => {
    expect(res.body).toMatchObject({id: 3, energy: 'cosmic'});
  });

  it('causes update to show up in database', async () => {
    const energy = await db('energies').where('id', id).first();
    expect(energy).toMatchObject({id: 3, energy: 'cosmic'});
  });
});

describe('[DELETE] /api/energies/:id', () => {
  let res;
  const id = 4;
  beforeEach(async () => {
    res = await request(server).delete(`/api/energies/${id}`)
  });

  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200);
  });

  it('responds with the deleted energy', async () => {
    expect(res.body).toMatchObject({id: 4, energy: 'undead'});
  });

  it('causes energy to delete from the server', async () => {
    const energies = await db('energies');
    expect(energies).toHaveLength(3);
  });

})