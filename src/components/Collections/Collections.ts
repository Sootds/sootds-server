// EXTERNAL IMPORTS
import { Router, Response } from 'express';

// LOCAL IMPORTS
import { CollectionsRequest } from './interfaces';

// Setup component router.
export const collectionsRoute = '/collections';
export const collectionsRouter = Router();

// Ping
collectionsRouter.get('/ping', (_: CollectionsRequest, response: Response): void => {
  response.status(200).json({
    message: 'pong',
    timestamp: Date.now()
  });
});

// Get Collections
collectionsRouter.get('/', (_: CollectionsRequest, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved collections.`,
    timestamp: Date.now()
  });
});

// Get Collection By Collection ID
collectionsRouter.get(
  '/:collection_id',
  (request: CollectionsRequest, response: Response): void => {
    response.status(200).json({
      message: `Successfully retrieved collection ${request.params.collection_id}.`,
      timestamp: Date.now()
    });
  }
);
