import { createServer as httpCreateServer } from 'http';
import app from './app.js';

// Export the app as default for serverless platforms (Vercel) to import.
export default app;

// Named exports used by tests and local startup
export const PORT = process.env.PORT || 3000;

export function createServer(appInstance = app) {
  const server = httpCreateServer(appInstance);

  function startServer(port = PORT) {
    return new Promise((resolve, reject) => {
      server.listen(port, () => resolve(server));
      server.on('error', reject);
    });
  }

  // Attach a convenience start method used in tests
  server.start = startServer;
  return server;
}

// Start server locally for development (not on Vercel or during tests)
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const server = createServer();
  server.start().then(() => {
    console.log(`Server is running on port ${PORT}`);
  }).catch(console.error);
}