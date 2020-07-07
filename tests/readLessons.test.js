/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');

const URL = '/lessons';

const {
  configureDb,
  closeConnection,
  user,
} = require('./fixtures/db');

// eslint-disable-next-line no-undef
beforeEach(configureDb);

// eslint-disable-next-line no-undef
describe('Read the lessons.', () => {
  // eslint-disable-next-line no-undef
  test('Should return status code 200', async () => {
    const response = await request(app)
      .get(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send();
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });

  // eslint-disable-next-line no-undef
  test('Response body should not be null.', async () => {
    const response = await request(app)
      .get(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send();
    // eslint-disable-next-line no-undef
    expect(response.body).not.toBeNull();
  });

  // eslint-disable-next-line no-undef
  test('Request body should be an array with provided objects', async () => {
    const lessons = await Lesson.find().populate('teacher', '-_id -__v').populate('group', '-_id -__v');
    const response = await request(app)
      .get(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send();
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject(
      {
        lessons: lessons.map((each) => each.toObject({
          transform: (doc, ret) => {
            // eslint-disable-next-line no-param-reassign
            if (ret._id) ret._id = ret._id.toString();
            // eslint-disable-next-line no-param-reassign
            delete ret.__v;
          },
        })),
      },
    );
  });
});

// eslint-disable-next-line no-undef
afterAll(closeConnection);
