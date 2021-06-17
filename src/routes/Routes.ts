import { Router } from 'express';
import { authRoute, authRouter } from '../components/auth';

export const apiRoute = '/api';
export const apiRouter = Router();

apiRouter.use(authRoute, authRouter);
