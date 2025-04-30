// logger.js
import path from 'path';
import { fileURLToPath } from 'url';
import { createLogger, format, transports, addColors } from 'winston';

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log format helpers
const { combine, timestamp, printf, colorize } = format;

// Custom color map
addColors({
  info: 'bold blue',
  error: 'bold red',
  warn: 'italic yellow',
  debug: 'gray',
});

// Custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}] ${message}`;
});

// Logger instance
const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(), // Color log levels
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    customFormat // Custom log output format
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
    }),
  ],
});

// Only show logs in console during development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
    })
  );
}

export default logger;
