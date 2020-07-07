/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* global test, describe, expect, beforeEach, afterAll */

const request = require('supertest');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');

const { TOKEN_ERROR } = require('../src/utils/errors');

const URL = '/lessons';

const {
  configureDb,
  closeConnection,
  user,
} = require('./fixtures/db');

beforeEach(configureDb);

describe('Read the lessons.', () => {
  test('Response body should not be null.', async () => {
    const response = await request(app)
      .get(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  test('Request body should be an array with provided objects.', async () => {
    const lessons = await Lesson.find().populate('teacher', '-_id -__v').populate('group', '-_id -__v');
    const response = await request(app)
      .get(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(
      {
        lessons: lessons.map((each) => each.toObject({
          transform: (doc, ret) => {
            if (ret._id) ret._id = ret._id.toString();
            delete ret.__v;
          },
        })),
      },
    );
  });

  test('Should return an authorization error.', async () => {
    const response = await request(app)
      .get(URL)
      .set('Accept', 'application/json')
      .send();

    expect(response.body).toMatchObject({ error: TOKEN_ERROR });
    expect(response.statusCode).toBe(401);
  });
});

afterAll(closeConnection);
