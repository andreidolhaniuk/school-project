/* eslint-disable no-underscore-dangle */
/* global test, describe, expect, beforeEach, afterAll */

const request = require('supertest');
const app = require('../src/app');

const {
  configureDb,
  closeConnection,
  lesson1,
  lesson3,
  teacher2,
  group2,
  user,
  lessonRepresentationInDB,
} = require('./fixtures/db');
const Lesson = require('../src/models/lesson');

const { TOKEN_ERROR } = require('../src/utils/errors');

const URL = '/update-lesson/';

beforeEach(configureDb);

describe('Update a lesson.', () => {
  test('Should update an entaire object.', async () => {
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(lesson3);
    const lessonInDB = await Lesson.findById(lesson1._id).populate('teacher', '-_id -__v').populate('group', '-_id -__v');

    expect(response.statusCode).toBe(200);
    expect(lessonInDB).toMatchObject(lessonRepresentationInDB);
  });

  test('Should update subject field.', async () => {
    const updatedLesson = { ...lesson1, subject: 'Math' };
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(updatedLesson);
    const lessonInDB = await Lesson.findById(lesson1._id).populate('teacher', '-_id -__v').populate('group', '-_id -__v');

    expect(response.statusCode).toBe(200);
    expect(lessonInDB.subject).toBe(updatedLesson.subject);
  });

  test('Should update teacher field.', async () => {
    const updatedLesson = { ...lesson1, teacher: teacher2 };
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(updatedLesson);
    const lessonInDB = await Lesson.findById(lesson1._id).populate('teacher', '-_id -__v').populate('group', '-_id -__v');

    expect(response.statusCode).toBe(200);
    expect(lessonInDB.teacher).toMatchObject(updatedLesson.teacher);
  });

  test('Should update group field. ', async () => {
    const updatedLesson = { ...lesson1, group: group2 };
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(updatedLesson);
    const lessonInDB = await Lesson.findById(lesson1._id).populate('teacher', '-_id -__v').populate('group', '-_id -__v');

    expect(response.statusCode).toBe(200);
    expect(lessonInDB.group.number).toBe(updatedLesson.group);
  });

  test('Should update class field.', async () => {
    const updatedLesson = { ...lesson1, classNumber: 33 };
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(updatedLesson);
    const lessonInDB = await Lesson.findById(lesson1._id).populate('teacher', '-_id -__v').populate('group', '-_id -__v');

    expect(response.statusCode).toBe(200);
    expect(lessonInDB.class).toBe(updatedLesson.class);
  });

  test('Should update order field.', async () => {
    const updatedLesson = { ...lesson1, order: 2 };
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(updatedLesson);
    const lessonInDB = await Lesson.findById(lesson1._id).populate('teacher', '-_id -__v').populate('group', '-_id -__v');

    expect(response.statusCode).toBe(200);
    expect(lessonInDB.order).toBe(updatedLesson.order);
  });

  test('Should return an authorization error.', async () => {
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Accept', 'application/json')
      .send(lesson3);
    const lessonInDB = await Lesson.findById(lesson1._id).populate('teacher', '-_id -__v').populate('group', '-_id -__v');

    expect(lessonInDB).not.toMatchObject(lessonRepresentationInDB);
    expect(response.body).toMatchObject({ error: TOKEN_ERROR });
    expect(response.statusCode).toBe(401);
  });
});

afterAll(closeConnection);
