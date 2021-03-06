const debug = require('debug')('lab:middleware:sendError');

const AppError = require('./appError');

const sendError = function() {
  return (req, res, next) => {
    res.sendError = (error) => {
      debug(error.message);
      if (error instanceof AppError) {
        res
          .status(error.status)
          .json({
            error: error.message,
          });
      } else {
        res
          .status(500)
          .json({
            error: 'Internal server error',
          });
      }
    };

    next();
  };
};

module.exports = sendError;
