// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

// LOCAL IMPORTS
import { storesRoute, storesRouter } from './components';

// Setup component router.
export const vendorsRoute = '/vendors';
export const vendorsRouter = Router();

// Hook up components.
vendorsRouter.use(storesRoute, storesRouter);

// Ping
vendorsRouter.get('/ping', (_: Request, response: Response): void => {
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Get Vendor By Username
vendorsRouter.get('/:username', (request: Request, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved vendor ${request.params.username}.`,
    timestamp: Date.now()
  });
});

// Create New Vendor
vendorsRouter.post('/', (request: Request, response: Response): void => {
  response.status(200).json({
    message: `New vendor created.`,
    timestamp: Date.now()
  });
});

// Update Vendor By Username
vendorsRouter.put('/:username', (request: Request, response: Response): void => {
  response
    .status(200)
    .json({ message: `Update vendor ${request.params.username}.`, timestamp: Date.now() });
});

// Delete Vendor By Username
vendorsRouter.delete('/:username', (request: Request, response: Response): void => {
  response
    .status(200)
    .json({ message: `Delete vendor ${request.params.username}.`, timestamp: Date.now() });
});
