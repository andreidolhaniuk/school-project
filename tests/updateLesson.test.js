/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('../src/app');

const {
  configureDb,
  closeConnection,
  lesson1,
  teacher2,
  group2,
  user,
} = require('./fixtures/db');

const URL = '/update-lesson/';

// eslint-disable-next-line no-undef
beforeEach(configureDb);

// eslint-disable-next-line no-undef
describe('Update a lesson.', () => {
  // eslint-disable-next-line no-undef
  test('Should return status code 200', async () => {
    const updatedLesson = { ...lesson1, teacher: teacher2, group: group2 };
    const response = await request(app)
      .put(`${URL}${lesson1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(updatedLesson);
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });
});

// eslint-disable-next-line no-undef
afterAll(closeConnection);
