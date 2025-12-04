import express from 'express';
import cors from 'cors';
import { initDatabase } from './config/database.js';
import { PORT, CLIENT_ORIGIN } from './config/env.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import authRouter from './routers/authRouter.js';
import eventRouter from './routers/eventRouter.js';

async function start() {
  const app = express();

  app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(authMiddleware);

  app.use('/api/auth', authRouter);
  app.use('/api/events', eventRouter);

  await initDatabase();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();