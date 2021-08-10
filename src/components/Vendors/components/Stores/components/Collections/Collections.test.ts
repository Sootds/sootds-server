// EXTERNAL IMPORTS
import request from 'supertest';

// LOCAL IMPORTS
import { server } from '../../../../../../server';

describe('/api/vendors/stores/:store_id/collections', (): void => {
  const storeId = 'testing_store_id';
  const collectionId = 'testing_collection_id';

  describe('GET /ping', (): void => {
    const message = `pong from store ${storeId}.`
    it(`should return a status code of '200'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/vendors/stores/${storeId}/collections/ping`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('GET /', (): void => {
    const message = `Successfully retrieved collections from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/vendors/stores/${storeId}/collections/`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('GET /:collection_id', (): void => {
    const message = `Successfully retrieved collection ${collectionId} from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(
        `/api/vendors/stores/${storeId}/collections/${collectionId}`
      );
      expect(response.body.message).toEqual(message);
    });
  });

  describe('POST /', (): void => {
    const message = `New collection created for store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).post(`/api/vendors/stores/${storeId}/collections/`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('PUT /:collection_id', (): void => {
    const message = `Update collection ${collectionId} from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).put(
        `/api/vendors/stores/${storeId}/collections/${collectionId}`
      );
      expect(response.body.message).toEqual(message);
    });
  });

  describe('DELETE /:collection_id', (): void => {
    const message = `Delete collection ${collectionId} from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).delete(
        `/api/vendors/stores/${storeId}/collections/${collectionId}`
      );
      expect(response.body.message).toEqual(message);
    });
  });
});
