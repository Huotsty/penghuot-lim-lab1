import { createServer as httpCreateServer } from 'http';
import app from './app.js';

export const PORT = process.env.PORT || 3000;

export function createServer(app) {
  const server = httpCreateServer(app);

  function startServer(port = PORT) {
    return new Promise((resolve, reject) => {
      server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        resolve(server);
      });
      server.on('error', reject);
    });
  }

  server.start = startServer;
  return server;
}

// Only start the server if we're not testing
if (process.env.NODE_ENV !== 'test') {
  const server = createServer(app);
  server.start().catch(console.error);
}