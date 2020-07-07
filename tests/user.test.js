/* eslint-disable no-underscore-dangle */
/* global test, describe, expect, beforeEach, afterAll */

const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const { USER_ALLOWED_FIELDS_ERROR, EMAIL_OR_PASSWORD_ERROR } = require('../src/utils/errors');
const { REGISTRATION_CONFIRMATION } = require('../src/utils/confirmations');

const {
  configureDb,
  closeConnection,
  user,
  newUser,
} = require('./fixtures/db');

const LOGIN_URL = '/login';
const REGISTER_URL = '/register';
const LOGOUT_URL = '/logout';

beforeEach(configureDb);

describe('Login a user.', () => {
  test('Should return status 200.', async () => {
    const response = await request(app)
      .post(LOGIN_URL)
      .set('Accept', 'application/json')
      .send({ email: user.email, password: user.password });
    expect(response.statusCode).toBe(200);
  });

  test('Should return status 400 if invalid field is provided.', async () => {
    const response = await request(app)
      .post(LOGIN_URL)
      .set('Accept', 'application/json')
      .send({ email: 'invalidemail', password: user.password });
    expect(response.statusCode).toBe(400);
  });

  test('Should return an error if email and password field is absent.', async () => {
    const response = await request(app)
      .post(LOGIN_URL)
      .set('Accept', 'application/json')
      .send({});
    expect(response.body.error).toBe(USER_ALLOWED_FIELDS_ERROR);
  });

  test('Should return an error about password and email.', async () => {
    const response = await request(app)
      .post(LOGIN_URL)
      .set('Accept', 'application/json')
      .send({ email: 'email_not_in_db@example.com', password: '123456789' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(EMAIL_OR_PASSWORD_ERROR);
  });

  test('Should return a token that matches the token in db.', async () => {
    const response = await request(app)
      .post(LOGIN_URL)
      .set('Accept', 'application/json')
      .send({ email: user.email, password: user.password });
    const userInDB = await User.findOne({ email: user.email });
    expect(response.body.token).toBe(userInDB.token);
  });
});

describe('Register a user.', () => {
  test('Should return status 200', async () => {
    const response = await request(app)
      .post(REGISTER_URL)
      .set('Accept', 'application/json')
      .send(newUser);
    expect(response.statusCode).toBe(200);
  });

  test('Should successfully register a user.', async () => {
    const response = await request(app)
      .post(REGISTER_URL)
      .set('Accept', 'application/json')
      .send(newUser);
    const userInDB = await User.findOne({ email: newUser.email });
    expect(userInDB).not.toBeNull();
    expect(response.body.text).toBe(REGISTRATION_CONFIRMATION);
  });
});

describe('Logout a user.', () => {
  test('Should return status 401', async () => {
    const response = await request(app)
      .post(LOGOUT_URL)
      .set('Accept', 'application/json')
      .send();
    expect(response.statusCode).toBe(401);
  });

  test('Should successfully logout a user.', async () => {
    const userDoc = await User.create(newUser);
    const token = await userDoc.getToken();
    const response = await request(app)
      .post(LOGOUT_URL)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send();
    const userInDB = await User.findById(userDoc._id);
    expect(userInDB.token).toBeUndefined();
    expect(response.statusCode).toBe(200);
  });
});

afterAll(closeConnection);
