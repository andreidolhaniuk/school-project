const request = require('supertest');
const app = require('../src/app');

// eslint-disable-next-line no-undef
describe('Test update operation', () => {
  // eslint-disable-next-line no-undef
  test('Update the lessons. Should return status code 200', async () => {
    const response = await request(app).get('/lessons');
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });
});
