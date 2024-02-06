const winston = require('winston');
const morgan = require('morgan');

const { format, transports } = winston;

const logFormat = format.combine(format.timestamp(), format.simple());

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/app.log' })
  ]
});

const stream = {
  write: (message) => logger.info(message)
};

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream }
);
module.exports = { logger, morganMiddleware };
