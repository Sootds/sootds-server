// EXTERNAL IMPORTS
import { Router, Response } from 'express';

// LOCAL IMPORTS
import { ProductsRequest } from './interfaces';

// Setup component router.
export const productsRoute = '/:store_id/products';
export const productsRouter = Router({ mergeParams: true });

// Ping
productsRouter.get('/ping', (request: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `pong from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Get Store Products
productsRouter.get('/', (request: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved products from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Get Store Product By Product ID
productsRouter.get('/:product_id', (request: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved product ${request.params.product_id} from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Create New Store Product
productsRouter.post('/', (request: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `New product created for store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Update Store Product By Product ID
productsRouter.put('/:product_id', (request: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `Update product ${request.params.product_id} from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Delete Store Product By Product ID
productsRouter.delete('/:product_id', (request: ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `Delete product ${request.params.product_id} from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});
