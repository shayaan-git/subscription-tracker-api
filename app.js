import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from './routes/workflow.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// // Health check route - place this BEFORE your API routes
// app.get('/', (req, res) => {
//   res.json({ message: 'API is running successfully!' });
// });

// API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Error handling middleware should be last
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send(`Welcome to the Subscription Tracker API!
  <br> Prefer to use 'HTTPie' for quick command-line API interactions during production.`);
});

app.listen(PORT, async () => {
  console.log('API is connected successfully! ✅');
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
  console.log('Using Arcjet for monitoring and error tracking');
  console.log('Connecting to MongoDB...');

  await connectToDatabase();
});

export default app;