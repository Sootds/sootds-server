// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

// LOCAL IMPORTS
import { productsRoute, productsRouter } from './components';

// SHARED IMPORTS
import { validateRequestSchema } from '../../../../shared/middleware';

// Setup component router.
export const storesRoute = '/stores';
export const storesRouter = Router();

// Hook up components.
storesRouter.use(productsRoute, productsRouter);

// Ping
storesRouter.get('/ping', (_: Request, response: Response): void => {
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Get Store By ID
storesRouter.get('/:store_id', (request: Request, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Create New Store
storesRouter.post('/', (request: Request, response: Response): void => {
  response.status(200).json({ message: `New store created.`, timestamp: Date.now() });
});

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