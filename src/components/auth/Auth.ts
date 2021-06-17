import { Router, Request, Response } from 'express';
import type { UserSignUp } from '../../types';

export const authRoute = '/auth';
export const authRouter = Router();

authRouter.get('/ping', (request: Request, response: Response): void => {
  response.send('pong');
});

authRouter.post('/signup', (request: Request, response: Response): void => {
  const user: UserSignUp = request.body;
  response.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});
