
const categoriesService = require('./categoriesService');
const { sendErrorResponse, sendSuccessResponse } = require('../../common/responseHelper');
const messages = require('../../common/messages.json');
const {isAdmin, authenticate} = require("../../config/Auth")

// Controller for handling GET requests to fetch all documents
exports.getAllDocuments = [
  authenticate,
  isAdmin, 
   async (req, res) => {
  try {
    const documents = await categoriesService.getAllDocuments(req);
    sendSuccessResponse(res, 200, 'categories list found', documents);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling GET requests to fetch a single document by ID
exports.getDocumentById = [
  authenticate,
  isAdmin, 
  authenticate,
  async (req, res) => {
  try {
    const document = await categoriesService.getDocumentById(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'categories not found');
    }
    sendSuccessResponse(res, 200, 'categories found', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling POST requests to create a new document
exports.createDocument = [
  authenticate,
  isAdmin, 
  async (req, res) => {
  try {
    const document = await categoriesService.createDocument(req.body);
    sendSuccessResponse(res, 201, 'categories created successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling PUT requests to update a document by ID
exports.updateDocument = [
  authenticate,
  isAdmin, 
  async (req, res) => {
  try {
    const document = await categoriesService.updateDocument(req.params.id, req.body);
    if (!document) {
      return sendErrorResponse(res, 404, 'categories not found');
    }
    sendSuccessResponse(res, 200, 'categories updated successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling DELETE requests to delete a document by ID
exports.deleteDocument =[
  authenticate,
  isAdmin, 
   async (req, res) => {
  try {
    const document = await categoriesService.deleteDocument(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'categories not found');
    }
    sendSuccessResponse(res, 200, 'categories deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]
