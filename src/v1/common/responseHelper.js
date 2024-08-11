const { errors, success } = require("./messages.json");
var logger = require('../config/logger');


function sendErrorResponse(res, statusCode, error) {
  logger.error(error.message)
  res.status(statusCode).json({ success: false, error: error.message || error || errors.unexpectedError  });
}

function sendSuccessResponse(res, statusCode, successMessage, data = {}) {
  res.status(statusCode).json({ success: true, message: successMessage, data });
}

module.exports = { sendErrorResponse, sendSuccessResponse };
