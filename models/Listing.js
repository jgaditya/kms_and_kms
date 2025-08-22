const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['handicraft', 'artwork', 'clothing', 'jewelry', 'food', 'other']
  },
  images: [String],
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  variations: [{
    name: String,
    options: [String],
    additionalPrice: Number
  }],
  dimensions: {
    weight: Number,
    height: Number,
    width: Number,
    length: Number
  },
  shipping: {
    domestic: { type: Boolean, default: true },
    international: { type: Boolean, default: false },
    cost: Number
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'soldout'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for better search performance
listingSchema.index({ name: 'text', description: 'text' });
listingSchema.index({ category: 1, merchant: 1 });

module.exports = mongoose.model('Listing', listingSchema);