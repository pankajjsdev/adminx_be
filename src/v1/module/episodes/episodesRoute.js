
const express = require('express');
const router = express.Router();
const episodesController = require('./episodesController');

// GET all documents
router.get('/list', episodesController.getAllDocuments);

// GET a document by ID
router.get('/:id', episodesController.getDocumentById);

// POST create a new document
router.post('/create', episodesController.createDocument);

// PUT update a document by ID
router.put('/update/:id', episodesController.updateDocument);

// DELETE delete a document by ID
router.delete('/delete/:id', episodesController.deleteDocument);

module.exports = router;
