// EXTERNAL IMPORTS
import request from 'supertest';

// LOCAL IMPORTS
import { server } from '../../server';

describe('/api/users/', (): void => {
  describe('GET /ping', (): void => {
    it(`should return a status code of '200'`, async (): Promise<void> => {
      const response = await request(server).get('/api/users/ping');
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('GET /:username', (): void => {
    const username = 'testing_username';
    const message = `Successfully retrieved user ${username}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/users/${username}`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('PUT /:username', (): void => {
    const username = 'testing_username';
    const message = `Update user ${username}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).put(`/api/users/${username}`);
      expect(response.body.message).toEqual(message);
    });
  });
});
