const request = require('supertest');
const app = require('../app');

// eslint-disable-next-line no-undef
describe('Test create operation', () => {
  // eslint-disable-next-line no-undef
  test('Create a lesson. Should return status code 201.', async () => {
    const response = await request(app).post('/create-lesson');
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(201);
  });
});
