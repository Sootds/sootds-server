// EXTERNAL IMPORTS
import { Router } from 'express';

// LOCAL IMPORTS
import { authRoute, authRouter } from '../components/Auth';
import { vendorsRoute, vendorsRouter } from '../components/Vendors';

export const apiRoute = '/api';
export const apiRouter = Router();

apiRouter.use(authRoute, authRouter);
apiRouter.use(vendorsRoute, vendorsRouter);
