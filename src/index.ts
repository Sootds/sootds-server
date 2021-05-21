import express, { Request, Response } from 'express';
import { isHello } from './utils';

const server = express();
const port = 3000;

// Setup middleware.
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get('/', (request: Request, response: Response): void => {
  response.send('GET - Hello!');
});

server.post('/', (request: Request, response: Response): void => {
  const { message } = request.body;
  if (isHello(message)) {
    response.json({
      message: `POST - You said "Hello". 😂`,
    });
  } else {
    response.json({
      message: `POST - You said "${message}"`,
    });
  }
});

server.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});
