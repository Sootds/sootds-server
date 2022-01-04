// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

// LOCAL IMPORTS
import * as handlers from './handlers';

// Setup component router.
export const utilsRoute = '/utils';
export const utilsRouter = Router();

// Ping
utilsRouter.get('/ping', (_: Request, response: Response): void => {
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Get Countries
utilsRouter.get('/countries', (_: Request, response: Response): void => {
  handlers.getCountriesRequestHandler(_, response);
});
