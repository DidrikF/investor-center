import * as supertest from 'supertest';
import app from '../koaServer';
import server from '../index';
import * as mongoose from 'mongoose';
const config = require('../config').get()
const UserModel: mongoose.Model<any> = require('../models/User.model');
import * as validator from 'validator';
import * as statuses from 'statuses';

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

test('A user can be registered', async () => {
  const response = await request.post('/register').send(testUser);
  expect(response.status).toEqual(201);
  expect(response.body.user).toMatchObject(responseUser);

})

test('A user is saved to the database when successfully registering', async () => {
  const response = await request.post('/register').send(testUser);
  expect(response.status).toEqual(201);
  const cursor = UserModel.findOne({email: testUser.email}).cursor()
  const user = await cursor.next()
  expect(user).not.toBe(null);
  if (user !== null) {
    expect(user.username).toBe(responseUser.username);
  }
});

/*
 * Registration Errors 
 */

test('Error is returned when registering and name is missing', async () => {
  const response = await request.post('/register').send({
    name: '',
    email: 'john@test.com',
    username: 'johnD',
    password: 'password123',
  });
  expect(response.status).toEqual(400);
  expect(response.body.error.name).not.toEqual(null);
  expect(response.body.error.name.message).toMatch(/.+/);
});


test('Error is returned when registering and email is not a valid email', async () => {
  const response = await request.post('/register').send({
    name: 'John Doe',
    email: 'email',
    username: 'johnD',
    password: 'password123',
  });
  expect(response.status).toEqual(400);
  expect(response.body.error.email).not.toEqual(null);
  expect(response.body.error.email.message).toMatch(/.+/);

});

test('Error is returned when registering and username is not alphanumeric', async () => {
  const response = await request.post('/register').send({
    name: 'John Doe',
    email: 'john@test.com',
    username: 'johnD*!',
    password: 'password123',
  });
  expect(response.status).toEqual(400);
  expect(response.body.error.username).not.toEqual(null);
  expect(response.body.error.username.message).toMatch(/.+/);

});

test('Error is returned when registering and username is less than 3 characters', async () => {
  const response = await request.post('/register').send({
    name: 'John Doe',
    email: 'john@test.com',
    username: 'ab',
    password: 'password123',
  });
  expect(response.status).toEqual(400);
  expect(response.body.error.username).not.toEqual(null);
  expect(response.body.error.username.message).toMatch(/.+/);

});

test('Error is returned when registering and username is more than 15 characters', async () => {
  const response = await request.post('/register').send({
    name: 'John Doe',
    email: 'john@test.com',
    username: 'abcdefghijklm15no',
    password: 'password123',
  });
  expect(response.status).toEqual(400);
  expect(response.body.error.username).not.toEqual(null);
  expect(response.body.error.username.message).toMatch(/.+/);
});

test('Error is returned when registering and password is less than 7 characters', async () => {
  const response = await request.post('/register').send({
    name: 'John Doe',
    email: 'john@test.com',
    username: 'johnD',
    password: 'nopass',
  });
  expect(response.status).toEqual(400);
  expect(response.body.error.password).not.toEqual(null);
  expect(response.body.error.password.message).toMatch(/.+/);
});

test('Error is returned when registering and password is more than 50 characters', async () => {
  const response = await request.post('/register').send({
    name: 'John Doe',
    email: 'john@test.com',
    username: 'johnD',
    password: 'asuperlongpasswordthatwillberejectedforsurebutineedtomakeitevenlongerwhosouldhavesuchalongpassword',
  });
  expect(response.status).toEqual(400);
  expect(response.body.error.password).not.toBe(null);
  expect(response.body.error.password.message).toMatch(/.+/);
});

test('Hashed passwords are not returned after successfull registration', async () => {
  const response = await request.post('/register').send(testUser);
  expect(response.status).toEqual(201);
  expect(response.body.user.password).toBe(undefined);
})

test('Successfully registering will log a user in by returning a JWT', async () => {

})


/*
 *  Login tests
 */ 

test('Login fails andan error is returned when incorrect credentials is submitted', async () => {
  const registerResponse = await request.post('/register').send(testUser);
  expect(registerResponse.status).toBe(201)
  const loginResponse = await request.post('/login').send({
    email: 'john@test.com',
    password: 'wrong-password',
  })
  expect(loginResponse.status).toBe(400)
  expect(loginResponse.body.error.email).not.toBe(null);
  expect(loginResponse.body.error.password).not.toBe(null);  

})

test('Users can log in and a JWT is returned in authorization header and in the body when logging in successfully', async () => {
  const registerResponse = await request.post('/register').send(testUser);
  expect(registerResponse.status).toBe(201)
  const loginResponse = await request.post('/login').send({
    email: 'john@test.com',
    password: 'password123',
  })
  expect(loginResponse.status).toBe(200);
  expect(loginResponse.header.authorization).toMatch(/Bearer .+/)
  expect(loginResponse.body.jwt).toMatch(/.+/);
})

/*
 *  Authorization Tests
 */

test('Users can access protected routes with a valid JWT in the authorization header', async () => {
  const registerResponse = await request.post('/register').send(testUser);
  expect(registerResponse.status).toBe(201)
  const loginResponse = await request.post('/login').send({
    email: 'john@test.com',
    password: 'password123',
  });
  expect(loginResponse.status).toBe(200);
  const protectedRouteResponse = await request.get('/app').set('Cookie', 'Authorization=Bearer '+loginResponse.body.jwt);
  expect(protectedRouteResponse.status).toBe(200);
  expect(protectedRouteResponse.text).toContain('<div id="app">')
});

test('Users can not access protected routes with an invalid JWT', async () => {
  const protectedRouteResponse = await request.get('/app').set('Cookie', 'Authorization=Bearer not-valid-jwt-token');
  expect(protectedRouteResponse.status).toBe(403);
  expect(protectedRouteResponse.body.error).toBe('Not authorized')
  
});


// sanitize input to mongoose?
// do i set all the properties I want on JWT