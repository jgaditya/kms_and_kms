const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['cultural', 'culinary', 'adventure', 'historical', 'artistic', 'nature']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['hours', 'days'], default: 'hours' }
  },
  location: {
    address: String,
    city: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [String],
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  capacity: {
    type: Number,
    default: 1,
    min: 1
  },
  availability: [{
    date: Date,
    slots: Number
  }],
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  requirements: [String],
  included: [String],
  notIncluded: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  }
}, {
  timestamps: true
});

// Index for better search performance
experienceSchema.index({ title: 'text', description: 'text' });
experienceSchema.index({ category: 1, location: 1 });

module.exports = mongoose.model('Experience', experienceSchema);