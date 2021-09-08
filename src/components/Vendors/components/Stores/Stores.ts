// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

// SHARED IMPORTS
import { validateRequestSchema, verifyAccessToken } from '../../../../shared/middleware';

// LOCAL IMPORTS
import * as interfaces from './interfaces';
import * as handlers from './handlers';
import { productsRoute, productsRouter, collectionsRoute, collectionsRouter } from './components';
import { CreateStoreRequestBodySchema } from './schemas';

// Setup component router.
export const storesRoute = '/stores';
export const storesRouter = Router();

// Hook up components.
storesRouter.use(productsRoute, productsRouter);
storesRouter.use(collectionsRoute, collectionsRouter);

// Ping
storesRouter.get('/ping', (_: Request, response: Response): void => {
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Get Store By ID or URL Name
storesRouter.get('/', (request: interfaces.GetStoreRequest, response: Response): void => {
  handlers.getStoreRequestHandler(request, response);
});

// Create Store
storesRouter.post(
  '/',
  [verifyAccessToken, validateRequestSchema(CreateStoreRequestBodySchema)],
  async (request: interfaces.CreateStoreRequest, response: Response): Promise<void> => {
    handlers.createStoreRequestHandler(request, response);
  }
);

// Update Store
storesRouter.put('/:store_id', (request: Request, response: Response): void => {
  response
    .status(200)
    .json({ message: `Update store ${request.params.store_id}.`, timestamp: Date.now() });
});

// Delete Store
storesRouter.delete('/:store_id', (request: Request, response: Response): void => {
  response
    .status(200)
    .json({ message: `Delete store ${request.params.store_id}.`, timestamp: Date.now() });
});
