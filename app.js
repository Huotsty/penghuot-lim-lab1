import express from "express";

export function createApp() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello, CI/CD pipeline!');
  });

  // Handle 404s
  app.use((req, res) => {
    res.status(404).send('Not Found');
  });

  return app;
}

const app = createApp();
export default app;
