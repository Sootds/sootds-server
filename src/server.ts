// EXTERNAL IMPORTS
import express, { RequestHandler } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// LOCAL IMPORTS
import { apiRoute, apiRouter } from './routes';

// Create Express server.
export const server = express();
export const port = process.env.PORT || 4000;

// Setup middleware.
server.use(cors({ origin: true, credentials: true }));
server.use(express.urlencoded({ extended: true }) as RequestHandler);
server.use(express.json() as RequestHandler);
server.use(cookieParser());

// Setup API router.
server.use(apiRoute, apiRouter);
