// EXTERNAL IMPORTS
import { Router } from 'express';

// LOCAL IMPORTS
import { authRoute, authRouter } from '../components/Auth';

export const apiRoute = '/api';
export const apiRouter = Router();

apiRouter.use(authRoute, authRouter);
