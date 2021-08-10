// EXTERNAL IMPORTS
import request from 'supertest';

// LOCAL IMPORTS
import { server } from '../../server';

describe('/api/collections', (): void => {
  const collectionId = 'testing_collection_id';

  describe('GET /ping', (): void => {
    const message = `pong`;
    it(`should return a status code of '200'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/collections/ping`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('GET /', (): void => {
    const message = `Successfully retrieved collections.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/collections`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('GET /:collection_id', (): void => {
    const message = `Successfully retrieved collection ${collectionId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/collections/${collectionId}`);
      expect(response.body.message).toEqual(message);
    });
  });
});
