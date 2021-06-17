import express from 'express';
import cors from 'cors';
import { apiRoute, apiRouter } from './routes'

const server = express();
const port = 4000;

// Setup middleware.
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Setup API router.
server.use(apiRoute, apiRouter);

server.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});
