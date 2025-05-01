import morgan from 'morgan';
import logger from '../config/loggerConfig.js';

const morganMiddleware = morgan((tokens, req, res) => {
  const url = decodeURIComponent(tokens.url(req, res));
  return [
    tokens.method(req, res),
    url,
    tokens.status(req, res),
    tokens['response-time'](req, res),
    'ms'
  ].join(' ');
}, {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

export default morganMiddleware;