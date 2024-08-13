
const blogService = require('./blogService');
const { sendErrorResponse, sendSuccessResponse } = require('../../common/responseHelper');
const messages = require('../../common/messages.json');

// Controller for handling GET requests to fetch all documents
exports.getAllDocuments = [
   async (req, res) => {
  try {
    const documents = await blogService.getAllDocuments(req);
    sendSuccessResponse(res, 200, 'blog list found', documents);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling GET requests to fetch a single document by ID
exports.getDocumentById = [
  async (req, res) => {
  try {
    const document = await blogService.getDocumentById(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'blog not found');
    }
    sendSuccessResponse(res, 200, 'blog found', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling POST requests to create a new document
exports.createDocument = [
  async (req, res) => {
  try {
    const document = await blogService.createDocument(req.body);
    sendSuccessResponse(res, 201, 'blog created successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling PUT requests to update a document by ID
exports.updateDocument = [
  async (req, res) => {
  try {
    const document = await blogService.updateDocument(req.params.id, req.body);
    if (!document) {
      return sendErrorResponse(res, 404, 'blog not found');
    }
    sendSuccessResponse(res, 200, 'blog updated successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling DELETE requests to delete a document by ID
exports.deleteDocument =[
   async (req, res) => {
  try {
    const document = await blogService.deleteDocument(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'blog not found');
    }
    sendSuccessResponse(res, 200, 'blog deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]
