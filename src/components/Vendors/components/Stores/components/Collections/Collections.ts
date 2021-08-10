// EXTERNAL IMPORTS
import { Router, Response } from 'express';

// LOCAL IMPORTS
import { CollectionsRequest } from './interfaces';

// Setup component router.
export const collectionsRoute = '/:store_id/collections';
export const collectionsRouter = Router({ mergeParams: true });

// Ping
collectionsRouter.get('/ping', (request: CollectionsRequest, response: Response): void => {
  response.status(200).json({
    message: `pong from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Get Store Collections
collectionsRouter.get('/', (request: CollectionsRequest, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved collections from store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Get Store Collection By Collection ID
collectionsRouter.get(
  '/:collection_id',
  (request: CollectionsRequest, response: Response): void => {
    response.status(200).json({
      message: `Successfully retrieved collection ${request.params.collection_id} from store ${request.params.store_id}.`,
      timestamp: Date.now()
    });
  }
);

// Create New Store Collection
collectionsRouter.post('/', (request: CollectionsRequest, response: Response): void => {
  response.status(200).json({
    message: `New collection created for store ${request.params.store_id}.`,
    timestamp: Date.now()
  });
});

// Update Store Collection By Collection ID
collectionsRouter.put(
  '/:collection_id',
  (request: CollectionsRequest, response: Response): void => {
    response.status(200).json({
      message: `Update collection ${request.params.collection_id} from store ${request.params.store_id}.`,
      timestamp: Date.now()
    });
  }
);

// Delete Store Collection By Collection ID
collectionsRouter.delete(
  '/:collection_id',
  (request: CollectionsRequest, response: Response): void => {
    response.status(200).json({
      message: `Delete collection ${request.params.collection_id} from store ${request.params.store_id}.`,
      timestamp: Date.now()
    });
  }
);
