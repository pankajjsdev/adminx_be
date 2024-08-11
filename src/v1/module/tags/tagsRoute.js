
const express = require('express');
const router = express.Router();
const tagsController = require('./tagsController');

// GET all documents
router.get('/list', tagsController.getAllDocuments);

// GET a document by ID
router.get('/:id', tagsController.getDocumentById);

// POST create a new document
router.post('/create', tagsController.createDocument);

// PUT update a document by ID
router.put('/update/:id', tagsController.updateDocument);

// DELETE delete a document by ID
router.delete('/delete/:id', tagsController.deleteDocument);

module.exports = router;
