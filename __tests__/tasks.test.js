const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test@example',
  password: '123456'
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // Get all tasks from the current user
  it('#tasks. If logged in, get all tasks', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);

    const res = await request(app).get('/api/v1/tasks');
    const expected = [];
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expected);
  });

  it('#post. if logged create, create a new task', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);

    const resp = await (await agent.post('/api/v1/tasks/1')).setEncoding({  }); // Finish From Here
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      description: expect.any(String)
    });
  });

  afterAll(() => {
    pool.end();
  });
});
