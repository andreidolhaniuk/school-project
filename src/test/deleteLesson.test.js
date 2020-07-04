const request = require('supertest');
const app = require('../app');

// eslint-disable-next-line no-undef
describe('Test delete operation', () => {
  // eslint-disable-next-line no-undef
  test('Delete a lesson. Should return status code 200', async () => {
    const response = await request(app).get('/lessons');
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });
});
