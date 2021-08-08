// EXTERNAL IMPORTS
import request from 'supertest';

// LOCAL IMPORTS
import { server } from '../../server';

describe('/api/vendors', (): void => {
  describe('GET /ping', (): void => {
    const statusCode = 200;
    it(`should return a status code of '${statusCode}'`, async (): Promise<void> => {
      const response = await request(server).get('/api/vendors/ping');
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('GET /:username', (): void => {
    const username = 'testing_username';
    const message = `Successfully retrieved vendor ${username}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/vendors/${username}`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('POST /', (): void => {
    const message = 'New vendor created.';
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).post('/api/vendors');
      expect(response.body.message).toEqual(message);
    });
  });

  describe('PUT /:username', (): void => {
    const username = 'testing_username';
    const message = `Update vendor ${username}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).put(`/api/vendors/${username}`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('DELETE /:username', (): void => {
    const username = 'testing_username';
    const message = `Delete vendor ${username}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).delete(`/api/vendors/${username}`);
      expect(response.body.message).toEqual(message);
    });
  });
});
