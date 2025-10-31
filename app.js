import express from "express";
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, GitHub Actions!');
});

export default app;
