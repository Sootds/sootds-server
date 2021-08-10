// EXTERNAL IMPORTS
import request from 'supertest';

// LOCAL IMPORTS
import { server } from '../../../../server';

describe('/api/vendors/stores', (): void => {
  describe('GET /ping', (): void => {
    it(`should return a status code of '200'`, async (): Promise<void> => {
      const response = await request(server).get('/api/vendors/stores/ping');
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('GET /:store_id', (): void => {
    const storeId = 'testing_id';
    const message = `Successfully retrieved store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/vendors/stores/${storeId}`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('POST /', (): void => {
    const message = `New store created.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).post(`/api/vendors/stores`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('PUT /:store_id', (): void => {
    const storeId = 'testing_id';
    const message = `Update store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).put(`/api/vendors/stores/${storeId}`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('DELETE /:store_id', (): void => {
    const storeId = 'testing_id';
    const message = `Delete store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).delete(`/api/vendors/stores/${storeId}`);
      expect(response.body.message).toEqual(message);
    });
  });
});
