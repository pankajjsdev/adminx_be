
const episodesService = require('./episodesService');
const { sendErrorResponse, sendSuccessResponse } = require('../../common/responseHelper');
const messages = require('../../common/messages.json');

// Controller for handling GET requests to fetch all documents
exports.getAllDocuments = [
   async (req, res) => {
  try {
    const documents = await episodesService.getAllDocuments(req);
    sendSuccessResponse(res, 200, 'episodes list found', documents);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling GET requests to fetch a single document by ID
exports.getDocumentById = [
  async (req, res) => {
  try {
    const document = await episodesService.getDocumentById(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'episodes not found');
    }
    sendSuccessResponse(res, 200, 'episodes found', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling POST requests to create a new document
exports.createDocument = [
  async (req, res) => {
  try {
    const document = await episodesService.createDocument(req.body);
    sendSuccessResponse(res, 201, 'episodes created successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling PUT requests to update a document by ID
exports.updateDocument = [
  async (req, res) => {
  try {
    const document = await episodesService.updateDocument(req.params.id, req.body);
    if (!document) {
      return sendErrorResponse(res, 404, 'episodes not found');
    }
    sendSuccessResponse(res, 200, 'episodes updated successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling DELETE requests to delete a document by ID
exports.deleteDocument =[
   async (req, res) => {
  try {
    const document = await episodesService.deleteDocument(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, 'episodes not found');
    }
    sendSuccessResponse(res, 200, 'episodes deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]
