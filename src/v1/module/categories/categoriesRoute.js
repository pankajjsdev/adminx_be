
const express = require('express');
const router = express.Router();
const categoriesController = require('./categoriesController');

// GET all documents
router.get('/list', categoriesController.getAllDocuments);

// GET a document by ID
router.get('/:id', categoriesController.getDocumentById);

// POST create a new document
router.post('/create', categoriesController.createDocument);

// PUT update a document by ID
router.put('/update/:id', categoriesController.updateDocument);

// DELETE delete a document by ID
router.delete('/delete/:id', categoriesController.deleteDocument);

module.exports = router;
