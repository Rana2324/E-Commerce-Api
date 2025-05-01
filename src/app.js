import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import morganMiddleware from './middlewares/morganMiddleware.js';
import logger from './config/loggerConfig.js';
import corseConfig from './config/corseConfig.js';
import helmetConfig from './config/helmetConfig.js';
import limiter from './config/rateLimiterConfig.js';
import authRoutes from './routes/modules/authRoutes.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';

dotenv.config();

function createApp() {
  const app = express();
  const server = http.createServer(app);

  // Basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morganMiddleware);

  // Middleware to handle URLs with trailing newline characters
  app.use((req, res, next) => {
    if (req.url.endsWith('%0A')) {
      req.url = req.url.slice(0, -3); // Remove the %0A
      logger.info(`Removed trailing newline from URL: ${req.url}`);
    }
    next();
  });

  // Security middleware
  app.use(helmetConfig);
  app.use(corseConfig);
  app.use(limiter);

  // Mount API routes
  app.use('/api/auth', authRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
  });

  // Base route
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the E-Commerce API'
    });
  });

  // Handle 404s
  app.use(notFoundMiddleware);

  // Global error handler
  app.use((err, req, res, next) => {
    logger.error('Error:', err);
    res.status(500).json({
      status: 'error',
      message: err.message || 'Something went wrong!'
    });
  });

  return { app, server };
}

export default createApp;