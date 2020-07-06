const request = require('supertest');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');

const {
  configureDb,
  closeConnection,
  lesson1,
  user,
} = require('./fixtures/db');

const URL = '/delete-lesson/';

// eslint-disable-next-line no-undef
beforeEach(configureDb);

// eslint-disable-next-line no-undef
describe('Delete a lesson.', () => {
  // eslint-disable-next-line no-undef
  test('Should return status code 200', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const id = lesson1._id;
    const response = await request(app)
      .delete(`${URL}${id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send();
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });
  // eslint-disable-next-line no-undef
  test('Should delete a lesson in database', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const id = lesson1._id;
    await request(app)
      .delete(`${URL}${id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send();
    const foundLesson = await Lesson.findById(id);
    // eslint-disable-next-line no-undef
    expect(foundLesson).toBeNull();
  });
});

// eslint-disable-next-line no-undef
afterAll(closeConnection);
