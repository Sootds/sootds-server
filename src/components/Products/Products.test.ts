// EXTERNAL IMPORTS
import request from 'supertest';

// LOCAL IMPORTS
import { server } from '../../server';

describe('/api/products', (): void => {
  const productId = 'testing_product_id';

  describe('GET /ping', (): void => {
    const message = `pong`;
    it(`should return a status code of '200'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/products/ping`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('GET /', (): void => {
    const message = `Successfully retrieved products.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/products`);
      expect(response.body.message).toEqual(message);
    });
  });

  describe('GET /:product_id', (): void => {
    const message = `Successfully retrieved product ${productId}.`;
    it(`should return a message '${message}'`, async (): Promise<void> => {
      const response = await request(server).get(`/api/products/${productId}`);
      expect(response.body.message).toEqual(message);
    });
  });
});
