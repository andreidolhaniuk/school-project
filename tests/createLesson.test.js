const request = require('supertest');
const app = require('../src/app');

const { allowedFieldsLesson, allowedFieldsTeacher } = require('../src/utils/allowedFields');

const {
  configureDb,
  closeConnection,
  lesson3,
  user,
} = require('./fixtures/db');

const URL = '/create-lesson';
// eslint-disable-next-line no-undef
beforeEach(configureDb);
// eslint-disable-next-line no-undef
describe('Create a lesson.', () => {
  // eslint-disable-next-line no-undef
  test('Should return status code 201.', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(lesson3);
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(201);
  });

  // eslint-disable-next-line no-undef
  test('Should match the confirmation text', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send(lesson3);
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ text: 'The lesson was created.' });
  });

  // eslint-disable-next-line no-undef
  test('Should return status 400', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send({ test: 'test' });
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(400);
  });

  // eslint-disable-next-line no-undef
  test('Should return properties that are allowed', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send({ test: 'test' });
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ error: `Allowed fields are ${allowedFieldsLesson.join()}` });
  });

  // eslint-disable-next-line no-undef
  test('Should return properties that are allowed for teacher', async () => {
    const response = await request(app)
      .post(URL)
      .set('Authorization', `Bearer ${user.token}`)
      .set('Accept', 'application/json')
      .send({ ...lesson3, teacher: { name: 'Test', surnam: 'Incorrect key' } });
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ error: `Allowed fields for teacher are ${allowedFieldsTeacher.join()}` });
  });
});

// eslint-disable-next-line no-undef
afterAll(closeConnection);
