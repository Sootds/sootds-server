// EXTERNAL IMPORTS
import { Router } from 'express';

// LOCAL IMPORTS
import { authRoute, authRouter } from '../components/test';

export const apiRoute = '/api';
export const apiRouter = Router();

apiRouter.use(authRoute, authRouter);
