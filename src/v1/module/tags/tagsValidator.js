
// validators.js
const tagsService = require('./tagsService');
const { body, validationResult } = require('express-validator');

// Validation rules for creating a new document
exports.validateCreateDocument = [
  body('field1').notEmpty().withMessage('Field1 is required'),
  body('field2').notEmpty().withMessage('Field2 is required').isNumeric().withMessage('Field2 must be a number'),
];

// Validation rules for updating a document
exports.validateUpdateDocument = [
  body('field1').optional().notEmpty().withMessage('Field1 is required'),
  body('field2').optional().notEmpty().withMessage('Field2 is required').isNumeric().withMessage('Field2 must be a number'),
];

// Middleware to check for validation errors
exports.checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};
