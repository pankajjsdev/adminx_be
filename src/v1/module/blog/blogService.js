
const blogModel = require('./blogModel');
const logger = require('../../config/logger');

// Service function to fetch all documents
exports.getAllDocuments = async (req) => {
  try {
    // Extracting pagination parameters from the request query
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const searchQuery = req.query.search || '';

    const options = {
        page: page,
        limit: limit,
        customLabels: {
          docs: 'list'
        },
        projection: {},
        pagination: limit ? true : false,
      };

    // Building the query object for search
    const query = {};

    if (searchQuery) {
      query.$or = [
        { 'name': { $regex: searchQuery, $options: 'i' } }
      ];
    }
    
    return blogModel.paginate(query, options);
  } catch (error) {
   logger.error(error)
    throw new Error('Error fetching blog');
  }
};

// Service function to fetch a single document by ID
exports.getDocumentById = async (id) => {
  try {
    return await blogModel.findById(id);
  } catch (error) {
    logger.error(error)
    throw new Error('Error fetching blog by ID');
  }
};

// Service function to create a new document
exports.createDocument = async (data) => {
  try {
    return await blogModel.create(data);
  } catch (error) {
    logger.error(error)
    throw new Error('Error creating blog');
  }
};

// Service function to update a document by ID
exports.updateDocument = async (id, data) => {
  try {
    return await blogModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  } catch (error) {
    logger.error(error)
    throw new Error('Error updating blog');
  }
};

// Service function to delete a document by ID
exports.deleteDocument = async (id) => {
  try {
    return await blogModel.findByIdAndDelete(id);
  } catch (error) {
    logger.error(error)
    throw new Error('Error deleting blog');
  }
};
