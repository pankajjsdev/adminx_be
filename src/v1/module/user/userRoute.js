
const express = require('express');
const router = express.Router();
const userController = require('./userController');

// GET all documents
router.get('/list', userController.getAllDocuments);

// post to login
router.post('/login', userController.login);

// GET a document by ID
router.get('/:id', userController.getDocumentById);

// POST create a new document
router.post('/create', userController.createDocument);

// PUT update a document by ID
router.put('/update/:id', userController.updateDocument);

// DELETE delete a document by ID
router.delete('/delete/:id', userController.deleteDocument);

module.exports = router;
