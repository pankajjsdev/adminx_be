const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Define Schema
const Schema = mongoose.Schema;

// Create a new Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  emailVerified: {
    type: Boolean,
    default: false, // Email is not verified by default
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phoneNo: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, 'Please fill a valid 10-digit phone number'],
  },
  mobileVerified: {
    type: Boolean,
    default: false, // Mobile number is not verified by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'unpublished', 'pending'],
    default: 'draft',
  },
  profileImage: {
    type: String, // URL or file path
    default: null,
  },
  address: {
    street: { type: String, trim: true, default: null },
    city: { type: String, trim: true, default: null },
    state: { type: String, trim: true, default: null },
    zipCode: { type: String, trim: true, default: null },
    country: { type: String, trim: true, default: 'USA' },
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  preferences: {
    newsletterSubscribed: { type: Boolean, default: false },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
    default: null,
  },
  favoriteTags: [{
    type: String,
    trim: true,
    default: null,
  }],
  subscription: {
    plan: { 
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free'
    },
    startDate: { 
      type: Date,
      default: null 
    },
    endDate: { 
      type: Date,
      default: null 
    },
  },
  activityHistory: [{
    action: { 
      type: String,
      required: false
    },
    date: { 
      type: Date,
      default: Date.now 
    },
    ip: { 
      type: String,
      default: null,
    },
  }],
  socialLinks: {
    twitter: { type: String, trim: true, default: null },
    linkedin: { type: String, trim: true, default: null },
    facebook: { type: String, trim: true, default: null },
    instagram: { type: String, trim: true, default: null },
  },
}, { timestamps: true });

// Middleware to auto-update the lastLogin field on save
userSchema.pre('save', function (next) {
  if (this.isModified('lastLogin')) {
    this.lastLogin = Date.now();
  }
  next();
});

// Apply the paginate plugin to the schema
userSchema.plugin(mongoosePaginate);

// Compile the schema into a model
const userModel = mongoose.model('userModel', userSchema);

// Export the model
module.exports = userModel;
