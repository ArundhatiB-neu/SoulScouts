require('dotenv').config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { client, mongoNativeClient } from './mongo/mongo';
import userRouter from './user/user.router';
import wellnessRoutes from './wellness/wellness.router';
import supportRouter from './support/support.router';
import programRouter from './program/program.router';
import notificationRouter from './notification/notification.router';
import coachRouter from './coach/coach.router';

const app = express();
const port = process.env.PORT || process.env.FALLBACK_PORT;

app.use(helmet());
app.use(express.json({ limit: '100mb' }));
app.use(cors({ origin: true }));
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRouter);
app.use('/api/wellness', wellnessRoutes);
app.use('/api/support', supportRouter);
app.use('/api/programs', programRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/coach', coachRouter);

const startServer = async () => {
    try {
      await mongoNativeClient.connect();
      await client();
      app.listen(port);
  
      console.log(`Server is running on port ${port}`);
    } catch (e) {
      console.log(e);
    }
  };

  startServer().then();
  