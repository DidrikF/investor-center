import * as supertest from 'supertest';
import server from '../index';
import * as mongoose from 'mongoose';
const config = require('../config').get()
const UserModel: mongoose.Model<any> = require('../models/User.model');

const testUser = {
  name: 'John Doe',
  email: 'john@test.com',
  username: 'johnD',
  password: 'password123',
};
const responseUser = {
  _id: expect.anything(),
  name: 'John Doe',
  email: 'john@test.com',
  username: 'johnD',
}
const unvalidUser = {
  name: '',
  email: 'john%test.com',
  username: '0123456789abcdef',
  password: 'one',
}

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = supertest.agent(server)
  await mongoose.connect(config.database.url)
})


afterEach(async function () {
  const collections = await mongoose.connection.db.collections()
  for (let collection of collections) {
    await collection.remove({})
  }
});


afterAll(async () => {
  server.close();
});

/*
 * Successfull Registration  
 */

test('One can query the neo4j graph database', async () => {
  const registerResponse = await request.post('/register').send(testUser);
  expect(registerResponse.status).toBe(201)
  const loginResponse = await request.post('/login').send({
    email: 'john@test.com',
    password: 'password123',
  });
  expect(loginResponse.status).toBe(200);
  const recordsResponse = await request.post('/app/kcgraph').set('Cookie', 'Authorization=Bearer '+loginResponse.body.jwt).send({
    context: [
      {
				type: 'analysis',
				company: 'Apple inc.',
				industry: ['Computer Hardware', 'Computer Software', 'Online Services'],
				exchange: ['New York Stock Exchange'],
				country: 'USA',
      },
      {
				type: 'Balance Sheet',
				header: 'Inventories',
			}
    ]
  });

  console.log(recordsResponse.body)

})