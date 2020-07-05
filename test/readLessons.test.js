const request = require('supertest');
const app = require('../src/app');

const URL = '/lessons';

// eslint-disable-next-line no-undef
describe('Test read operation', () => {
  // eslint-disable-next-line no-undef
  test('Read the lessons. Should return status code 200', async () => {
    const response = await request(app).get(URL);
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });
  // eslint-disable-next-line no-undef
  test('Response body should not be null.', async () => {
    const response = await request(app).get(URL);
    // eslint-disable-next-line no-undef
    expect(response.body).not.toBeNull();
  });
});
