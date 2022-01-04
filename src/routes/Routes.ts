// EXTERNAL IMPORTS
import { Router } from 'express';

// LOCAL IMPORTS
import {
  authRoute,
  authRouter,
  usersRoute,
  usersRouter,
  vendorsRoute,
  vendorsRouter,
  productsRoute,
  productsRouter,
  collectionsRoute,
  collectionsRouter,
  utilsRoute,
  utilsRouter
} from '../components';

// Setup main API router.
export const apiRoute = '/api';
export const apiRouter = Router();

// Hook up components.
apiRouter.use(authRoute, authRouter);
apiRouter.use(usersRoute, usersRouter);
apiRouter.use(vendorsRoute, vendorsRouter);
apiRouter.use(productsRoute, productsRouter);
apiRouter.use(collectionsRoute, collectionsRouter);
apiRouter.use(utilsRoute, utilsRouter);
