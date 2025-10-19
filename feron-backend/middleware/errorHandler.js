const logger = require('../utils/logger');

function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const response = {
    message: err.message,
  };
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }
  logger.error('Error: %s', err.message, { stack: err.stack });
  res.status(statusCode).json(response);
}

module.exports = { notFound, errorHandler };
