// EXTERNAL IMPORTS
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// LOCAL IMPORTS
import { apiRoute, apiRouter } from './routes';

// Create Express server.
const server = express();
const port = 4000;

// Setup middleware.
server.use(cors({ origin: true, credentials: true }));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

// Setup API router.
server.use(apiRoute, apiRouter);

server.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});
