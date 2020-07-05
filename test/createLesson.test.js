const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');
const { LESSSON_DATA } = require('./testData');

const { allowedFieldsLesson, allowedFieldsTeacher } = require('../src/utils/allowedFields');

const URL = '/create-lesson';

// eslint-disable-next-line no-undef
beforeEach(async () => {
  await Lesson.deleteMany();
});
// eslint-disable-next-line no-undef
describe('Test create operation', () => {
  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return status code 201.', async () => {
    const response = await request(app).post(URL).send(LESSSON_DATA);
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(201);
  });

  // eslint-disable-next-line no-undef
  test('Create a lesson. Should match the confirmation text', async () => {
    const response = await request(app).post(URL).send(LESSSON_DATA);
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ text: 'The lesson was created.' });
  });

  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return status 400', async () => {
    const response = await request(app).post(URL).send({ test: 'test' });
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(400);
  });

  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return properties that are allowed', async () => {
    const response = await request(app).post(URL).send({ test: 'test' });
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ error: `Allowed fields are ${allowedFieldsLesson.join()}` });
  });

  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return properties that are allowed', async () => {
    LESSSON_DATA.teacher = { name: 'Test', surnam: 'Incorrect key' };
    const response = await request(app).post(URL).send(LESSSON_DATA);
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ error: `Allowed fields for teacher are ${allowedFieldsTeacher.join()}` });
  });
});

// eslint-disable-next-line no-undef
afterAll(() => {
  mongoose.connection.close();
});
