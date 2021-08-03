// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

// SHARED IMPORTS
import { validateRequestSchema } from '../../../../shared/middleware';

// Setup component router.
export const storesRoute = '/stores';
export const storesRouter = Router();

// Ping
storesRouter.get('/ping', (_: Request, response: Response): void => {
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Get Store By ID
storesRouter.get('/:store_id', (request: Request, response: Response): void => {
  response
    .status(200)
    .json({ message: `Store ID: ${request.params.store_id}`, timestamp: Date.now() });
});

// Create New Store
storesRouter.post('/', (request: Request, response: Response): void => {
  response
    .status(200)
    .json({ message: `New store created.`, timestamp: Date.now() });
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
