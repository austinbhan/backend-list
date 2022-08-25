const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test@example.com',
  password: '12345'
};

const registerAndLogin = async (userProps = {}) => {
  // eslint-disable-next-line no-unused-vars
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const resp = await agent
    .post('/api/v1/users')
    .send({ ...mockUser, ...userProps });
  const user = resp.body;
  return [agent, user];
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });



  it('creates a new user', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.post('/api/v1/users').send(mockUser);
    const { email } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });


  it('should sign in a user', async () => {
    const [agent] = await registerAndLogin();
    const { email, password } = mockUser;
    const res = await agent.post('/api/v1/users/sessions').send({
      email,
      password
    });
    expect(res.body).toEqual({ message: 'Signed in Successfully' });
    console.log(res.body);
  });

  it('should return the currently logged in user', async () => {
    const [agent, user] = await registerAndLogin();
    const resp = await agent.get('/api/v1/users/me');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });



  afterAll(() => {
    pool.end();
  });

});
