const winston = require('winston');
const path = require('path');

// Custom log format that includes file name, file location, and line number
const customLogFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
  let fileInfo = 'N/A';
  
  if (stack) {
    try {
      const stackLines = stack.split('\n');
      const fileInfoMatch = stackLines[2].match(/\(([^)]+)\)/);

      if (fileInfoMatch) {
        fileInfo = fileInfoMatch[1];
      }
    } catch (err) {
      // Handle any errors gracefully
      console.error('Error extracting file info from stack:', err);
    }
  }

  return `${timestamp} ${level}: ${message} (${fileInfo})`;
});

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), 
    customLogFormat
  ),
  transports: [
    // Log everything to a file
    new winston.transports.File({ filename: 'app.log' }),
    // Log everything to the console
    new winston.transports.Console(),
  ],
});

module.exports = logger;
