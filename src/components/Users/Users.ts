// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

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
