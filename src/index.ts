// LOCAL IMPORTS
import { server, port } from './server';

server.listen(port, (): void => {
  if (process.env.NODE_ENV == 'development') {
    console.log(`Server listening at http://localhost:${port}`);
  }
});
