// EXTERNAL IMPORTS
import request from 'supertest';

// LOCAL IMPORTS
import { server } from '../../../../../../server';

describe('/api/vendors/stores/:store_id/products', (): void => {
  const storeId = 'testing_store_id';
  const productId = 'testing_product_id';

  describe('GET /ping', (): void => {
    it(`should return a status code of '200'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/vendors/stores/${storeId}/products/ping`);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('GET /', (): void => {
    const message = `Successfully retrieved products from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/vendors/stores/${storeId}/products/`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('GET /:product_id', (): void => {
    const message = `Successfully retrieved product ${productId} from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(
        `/api/vendors/stores/${storeId}/products/${productId}`
      );
      expect(response.body.message).toEqual(message);
    });
  });

  describe('POST /', (): void => {
    const message = `New product created for store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).post(`/api/vendors/stores/${storeId}/products/`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('PUT /:product_id', (): void => {
    const message = `Update product ${productId} from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).put(
        `/api/vendors/stores/${storeId}/products/${productId}`
      );
      expect(response.body.message).toEqual(message);
    });
  });

  describe('DELETE /:product_id', (): void => {
    const message = `Delete product ${productId} from store ${storeId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).delete(
        `/api/vendors/stores/${storeId}/products/${productId}`
      );
      expect(response.body.message).toEqual(message);
    });
  });
});
