/* eslint-disable no-underscore-dangle */
/* global test, describe, expect, beforeEach, afterAll */

const request = require('supertest');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');

const { TOKEN_ERROR } = require('../src/utils/errors');

const {
  configureDb,
  closeConnection,
  lesson1,
  user,
} = require('./fixtures/db');

const URL = '/delete-lesson/';

beforeEach(configureDb);

describe('Delete a lesson.', () => {
  test('Should delete a lesson in database.', async () => {
    const id = lesson1._id;
    const response = await request(app)
      .delete(`${URL}${id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send();
    const foundLesson = await Lesson.findById(id);

    expect(response.statusCode).toBe(200);
    expect(foundLesson).toBeNull();
  });

  test('Should return an authorization error.', async () => {
    const id = lesson1._id;
    const response = await request(app)
      .delete(`${URL}${id}`)
      .set('Accept', 'application/json')
      .send();

    const foundLesson = await Lesson.findById(id);

    expect(foundLesson).not.toBeNull();
    expect(response.body).toMatchObject({ error: TOKEN_ERROR });
    expect(response.statusCode).toBe(401);
  });
});

afterAll(closeConnection);
