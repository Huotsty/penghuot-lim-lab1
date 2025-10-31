import { createServer as httpCreateServer } from 'http';
import app from './app.js';

const PORT = process.env.PORT || 3000;

export function createServer(app) {
  return httpCreateServer(app);
}

if (process.env.NODE_ENV !== 'test') {
  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}