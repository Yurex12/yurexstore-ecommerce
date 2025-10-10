import express from 'express';

import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;

app.get('/', (req, res, next) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
