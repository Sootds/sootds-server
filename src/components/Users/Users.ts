// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

// SHARED IMPORTS
import { validateRequestSchema, verifyAccessToken } from '../../shared/middleware';

// LOCAL IMPORTS
import * as schemas from './schemas';
import * as interfaces from './interfaces';
import * as handlers from './handlers';

// Setup component router.
export const usersRoute = '/users';
export const usersRouter = Router();

// Ping
usersRouter.get('/ping', (_: Request, response: Response): void => {
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Get User By Username
usersRouter.get('/:username', (request: Request, response: Response): void => {
  response.status(200).json({
    message: `Successfully retrieved user ${request.params.username}.`,
    timestamp: Date.now()
  });
});

// Update User By Username
usersRouter.put('/:username', (request: Request, response: Response): void => {
  response
    .status(200)
    .json({ message: `Update user ${request.params.username}.`, timestamp: Date.now() });
});

// Get User Info
usersRouter.post(
  '/',
  [verifyAccessToken, validateRequestSchema(schemas.GetUserInfoRequestBodySchema)],
  (request: interfaces.GetUserInfoRequest, response: Response): void => {
    handlers.getUserInfoRequestHandler(request, response);
  }
);

// Update User Info
usersRouter.put(
  '/',
  [verifyAccessToken, validateRequestSchema(schemas.UpdateUserInfoRequestBodySchema)],
  (request: interfaces.UpdateUserInfoRequest, response: Response): void => {
    handlers.updateUserInfoRequestHandler(request, response);
  }
)
