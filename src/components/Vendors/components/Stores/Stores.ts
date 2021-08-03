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
