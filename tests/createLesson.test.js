/* eslint-disable no-underscore-dangle */
/* global test, describe, expect, beforeEach, afterAll */

const request = require('supertest');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');

const { LESSON_ALLOWED_FIELDS_ERROR, TEACHER_ALLOWED_FIELDS_ERROR, TOKEN_ERROR } = require('../src/utils/errors');
const { LESSON_CREATION_CONFIRMATION } = require('../src/utils/confirmations');

const {
  configureDb,
  closeConnection,
  lesson3,
  user,
} = require('./fixtures/db');

const URL = '/create-lesson';

beforeEach(configureDb);

describe('Create a lesson.', () => {
  test('Should match the confirmation text.', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(lesson3);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({ text: LESSON_CREATION_CONFIRMATION });
  });

  test('Should return status 400.', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send({ test: 'test' });

    expect(response.statusCode).toBe(400);
  });

  test('Should return properties that are allowed.', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send({ test: 'test' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({ error: LESSON_ALLOWED_FIELDS_ERROR });
  });

  test('Should return properties that are allowed for teacher.', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send({ ...lesson3, teacher: { name: 'Test', surnam: 'Incorrect key' } });

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({ error: TEACHER_ALLOWED_FIELDS_ERROR });
  });

  test('Should return an authorization error.', async () => {
    const response = await request(app)
      .post(URL)
      .set('Accept', 'application/json')
      .send(lesson3);

    const lessonInDB = await Lesson.findOne({ subject: lesson3.subject, order: lesson3.order });

    expect(lessonInDB).toBeNull();
    expect(response.body).toMatchObject({ error: TOKEN_ERROR });
    expect(response.statusCode).toBe(401);
  });
});

afterAll(closeConnection);
