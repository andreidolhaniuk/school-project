const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Lesson = require('../src/models/lesson');

const TEST_URL = '/create-lesson';

const allowedFields = [
  'subject',
  'teacher',
  'group',
  'classNumber',
  'order',
];

// eslint-disable-next-line no-undef
beforeEach(async () => {
  await Lesson.deleteMany();
});

const LESSSON_DATA = {
  subject: 'pure math',
  teacher: { name: 'Test', surname: 'Testovich' },
  group: 1000,
  classNumber: 204,
  order: 6,
};

// eslint-disable-next-line no-undef
describe('Test create operation', () => {
  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return status code 201.', async () => {
    const response = await request(app).post(TEST_URL).send(LESSSON_DATA);
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(201);
  });

  // eslint-disable-next-line no-undef
  test('Create a lesson. Should match the confirmation text', async () => {
    const response = await request(app).post(TEST_URL).send(LESSSON_DATA);
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ text: 'The lesson was created.' });
  });

  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return status 400', async () => {
    const response = await request(app).post(TEST_URL).send({ test: 'test' });
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(400);
  });

  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return properties that are allowed', async () => {
    const response = await request(app).post(TEST_URL).send({ test: 'test' });
    // eslint-disable-next-line no-undef
    expect(response.body).toMatchObject({ error: `Allowed fields are ${allowedFields.join()}` });
  });
});

// eslint-disable-next-line no-undef
afterAll(() => {
  mongoose.connection.close();
});
