// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';

// LOCAL IMPORTS
import { storesRoute, storesRouter } from './components';

// Setup component router.
export const vendorsRoute = '/vendors';
export const vendorsRouter = Router();

vendorsRouter.use(storesRoute, storesRouter);
