
// validators.js
const userService = require('./userService');
const { body, validationResult } = require('express-validator');

// Validation rules for creating a new document
exports.validateCreateDocument = [
  body('email').notEmpty().withMessage('email is required field'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address')
  .custom(async (email) => {
    const user = await userService.getDocumentByEmail(email);
    if (user) {
      throw new Error('Email already in use');
    }
  }),
  body('name').notEmpty().withMessage('name is required field'),
];

exports.validateLogin = [
  body('email').notEmpty().withMessage('email is required field'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('name is required field'),
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
