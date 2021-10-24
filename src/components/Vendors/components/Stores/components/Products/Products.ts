// EXTERNAL IMPORTS
import { Router, Response } from 'express';

// SHARED IMPORTS
import { validateRequestSchema, verifyAccessToken } from '../../../../../../shared/middleware';

// LOCAL IMPORTS
import * as interfaces from './interfaces';
import * as schemas from './schemas';
import * as handlers from './handlers';

// Setup component router.
export const productsRoute = '/:store_id/products';
export const productsRouter = Router({ mergeParams: true });

// Ping
productsRouter.get('/ping', (request: interfaces.ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `pong from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Get Store Products
productsRouter.get('/', (request: interfaces.ProductsRequest, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved products from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Get Store Product By Product ID
productsRouter.get(
  '/:product_id',
  (request: interfaces.ProductsRequest, response: Response): void => {
    response.status(200).json({
      message: `Successfully retrieved product ${request.params.product_id} from store ${request.params.store_id}.`,
      timestamp: Date.now()
    });
  }
);

// Create Store Product
productsRouter.post(
  '/',
  [validateRequestSchema(schemas.CreateStoreRequestBodySchema), verifyAccessToken],
  (request: interfaces.CreateProductRequest, response: Response): void => {
    handlers.createProductRequestHandler(request, response);
  }
);

// Update Store Product By Product ID
productsRouter.put(
  '/:product_id',
  (request: interfaces.ProductsRequest, response: Response): void => {
    response.status(200).json({
      message: `Update product ${request.params.product_id} from store ${request.params.store_id}.`,
      timestamp: Date.now()
    });
  }
);

// Delete Store Product By Product ID
productsRouter.delete(
  '/:product_id',
  (request: interfaces.ProductsRequest, response: Response): void => {
    response.status(200).json({
      message: `Delete product ${request.params.product_id} from store ${request.params.store_id}.`,
      timestamp: Date.now()
    });
  }
);
