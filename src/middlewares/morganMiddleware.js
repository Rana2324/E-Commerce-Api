import morgan from 'morgan';
import logger from '../config/loggerConfig.js';

// Create custom token for timestamp
morgan.token('timestamp', () => {
  return new Date().toISOString();
});

// Custom format string including timestamp
const morganMiddleware = morgan(
  ':timestamp ] :method :url :status :response-time ms - :res[content-length]',
  {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }
);

export default morganMiddleware;