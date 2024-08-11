const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Custom format for logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Logger configuration
const logger = createLogger({
  level: 'info', // You can adjust the logging level here
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Capture stack trace for errors
    logFormat
  ),
  transports: [
    new transports.Console(),  // Log to console
    new transports.File({ filename: 'combined.log' }),  // Log to a file
    new transports.File({ filename: 'error.log', level: 'error' })  // Log errors to a separate file
  ]
});

module.exports = logger;
