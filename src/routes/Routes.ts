// EXTERNAL IMPORTS
import { Router } from 'express';

// LOCAL IMPORTS
import { authRoute, authRouter } from '../components/Auth';
import { usersRoute, usersRouter } from '../components/Users';
import { vendorsRoute, vendorsRouter } from '../components/Vendors';

// Setup main API router.
export const apiRoute = '/api';
export const apiRouter = Router();

// Hook up components.
apiRouter.use(authRoute, authRouter);
apiRouter.use(usersRoute, usersRouter);
apiRouter.use(vendorsRoute, vendorsRouter);
