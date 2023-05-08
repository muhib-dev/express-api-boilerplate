const morgan = require("morgan");

// Define custom log format
const logFormat =
  ':method :url :status :response-time ms - :remote-user [:date[clf]] ":user-agent"';

// Create middleware
const logger = morgan(logFormat);

module.exports = logger;
