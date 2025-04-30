import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morganMiddleware from './middlewares/morganMiddleware.js';
import logger from './config/loggerConfig.js';
import http from 'http';
import limiter from './middlewares/rateLimiter.js';

// Load environment variables
dotenv.config();

function createApp() {
  const app = express();
  const server = http.createServer(app);

  // Apply security middlewares
  app.use(helmet());
  app.use(cors());
  app.use(limiter);

  // Request parsing middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  app.use(morganMiddleware);

  // Health check route
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
  });

  // Base route
  app.get('/', (req, res, next) => {
    try {
      res.status(200).json({
        message: 'Welcome to the E-Commerce API'
      });
    } catch (error) {
      next(error);
    }
  });

  // Global Error Handler
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    // Only send a response if one hasn't been sent already
    if (!res.headersSent) {
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  });

  return { app, server };
}

export default createApp;