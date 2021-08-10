// EXTERNAL IMPORTS
import { Router, Response } from 'express';

// LOCAL IMPORTS
import { ProductsRequest } from './interfaces';

// Setup component router.
export const productsRoute = '/products';
export const productsRouter = Router();

// Ping
productsRouter.get('/ping', (_: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: 'pong',
    timestamp: Date.now()
  });
});

// Get Products
productsRouter.get('/', (_: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved products.`,
    timestamp: Date.now()
  });
});

// Get Product By Product ID
productsRouter.get('/:product_id', (request: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved product ${request.params.product_id}.`,
    timestamp: Date.now()
  });
});
