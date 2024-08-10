
// Require Mongoose
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Define Schema
const Schema = mongoose.Schema;

// Create a new Schema
const episodesSchema = new Schema({
  // Define your schema fields and their types
  field1: {
    type: String,
    required: true
  },
  field2: {
    type: Number,
    required: true
  },
  // Add more fields as needed
},{timestamps:true});

// Apply the paginate plugin to the schema
episodesSchema.plugin(mongoosePaginate);

// Compile the schema into a model
const episodesModel = mongoose.model('episodesModel', episodesSchema);

// Export the model
module.exports = episodesModel;
