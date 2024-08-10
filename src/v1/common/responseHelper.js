const { errors, success } = require("./messages.json");


function sendErrorResponse(res, statusCode, error) {
  console.log("got an error",  error)
  res.status(statusCode).json({ success: false, error: error.message || error || errors.unexpectedError  });
}

function sendSuccessResponse(res, statusCode, successMessage, data = {}) {
  res.status(statusCode).json({ success: true, message: successMessage, data });
}

module.exports = { sendErrorResponse, sendSuccessResponse };
