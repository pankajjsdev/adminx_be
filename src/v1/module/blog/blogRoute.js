
const express = require('express');
const router = express.Router();
const blogController = require('./blogController');

// GET all documents
router.get('/list', blogController.getAllDocuments);

// GET a document by ID
router.get('/:id', blogController.getDocumentById);

// POST create a new document
router.post('/create', blogController.createDocument);

// PUT update a document by ID
router.put('/update/:id', blogController.updateDocument);

// DELETE delete a document by ID
router.delete('/delete/:id', blogController.deleteDocument);

module.exports = router;
