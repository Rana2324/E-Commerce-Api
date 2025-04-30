import morgan from 'morgan';
import logger from '../config/loggerConfig.js';

// Custom format string without timestamp (winston will add it)
const morganMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }
);

export default morganMiddleware;