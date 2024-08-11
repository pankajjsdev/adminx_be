
// Require Mongoose
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Define Schema
const Schema = mongoose.Schema;

// Create a new Schema
const categoriesSchema = new Schema({
  // Define your schema fields and their types
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: { type: String, enum: ['draft', 'active', 'inactive', 'pending', 'delete'], default: 'draft' },
  // Add more fields as needed
}, { timestamps: true });

// Apply the paginate plugin to the schema
categoriesSchema.plugin(mongoosePaginate);

// Compile the schema into a model
const categoriesModel = mongoose.model('categoriesModel', categoriesSchema);

// Export the model
module.exports = categoriesModel;
