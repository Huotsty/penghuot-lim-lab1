import express from "express";
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, CI/CD pipeline!');
});

export default app;
