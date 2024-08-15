
const userService = require('./userService');
const { sendErrorResponse, sendSuccessResponse } = require('../../common/responseHelper');
const messages = require('../../common/messages.json');
const {validateCreateDocument, checkValidationResult} = require("./userValidator")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {isAdmin, authenticate} = require("../../config/Auth")

// Controller for handling GET requests to fetch all documents
exports.getAllDocuments = [
  // authenticate,
  // isAdmin,
   async (req, res) => {
  try {
    const documents = await userService.getAllDocuments(req);
    sendSuccessResponse(res, 200, 'user list found', documents);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling GET requests to fetch a single document by ID
exports.getDocumentById = [
  async (req, res) => {
  try {
    const document = await userService.getDocumentById(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'user not found');
    }
    sendSuccessResponse(res, 200, 'user found', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling  requests for login
exports.login = [
  // validateLogin,
  // checkValidationResult,
  async (req, res) => {
    try {
      const user = await userService.getDocumentByEmail(req.body.email);
      if (!user) {
        return sendErrorResponse(res, 404, 'Invalid email or password');
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return sendErrorResponse(res, 404, 'Invalid email or password');
      }

      const userForToken = {
        _id: user._id,
        isAdmin: user.role === 'admin',
        email: user.email,
      };

      const secret = process.env.JWT_SECRET;
      const jwtData = { expiresIn: process.env.JWT_TIMEOUT_DURATION || '2h' };
      const token = jwt.sign(userForToken, secret, jwtData);

      sendSuccessResponse(res, 200, 'User found', {
        token: token,
        _id: user._id,
      });
    } catch (error) {
      sendErrorResponse(res, 500, error.message || 'Unexpected error occurred');
    }
  },
];

// Controller for handling POST requests to create a new document
exports.createDocument = [
  // validateCreateDocument,
  // checkValidationResult,
  async (req, res) => {
    try {
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
      const hash = await bcrypt.hash(req.body.password, saltRounds);

      const document = await userService.createDocument({ ...req.body, password: hash });

      const userForToken = {
        _id: document._id,
        isAdmin: document.role === 'admin',
        email: document.email,
      };

      const secret = process.env.JWT_SECRET;
      const jwtData = { expiresIn: process.env.JWT_TIMEOUT_DURATION || '2h' };
      const token = jwt.sign(userForToken, secret, jwtData);

      const response= {
        ...document._doc,
        token:token
      }

   

      sendSuccessResponse(res, 201, 'User created successfully', response);
    } catch (error) {
      sendErrorResponse(res, 500, error);
    }
  },
];

// Controller for handling PUT requests to update a document by ID
exports.updateDocument = [
  async (req, res) => {
  try {
    const document = await userService.updateDocument(req.params.id, req.body);
    if (!document) {
      return sendErrorResponse(res, 404, 'user not found');
    }
    sendSuccessResponse(res, 200, 'user updated successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling DELETE requests to delete a document by ID
exports.deleteDocument =[
   async (req, res) => {
  try {
    const document = await userService.deleteDocument(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'user not found');
    }
    sendSuccessResponse(res, 200, 'user deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]
