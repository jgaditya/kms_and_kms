const express = require('express');
const router = express.Router();

// Simple GET route that works
router.get('/experiences', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Traditional Pottery Workshop',
      description: 'Learn ancient pottery techniques',
      price: 45
    },
    {
      id: 2,
      title: 'Cultural Food Tour',
      description: 'Explore local cuisine',
      price: 35
    }
  ]);
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'Explorer routes working' });
});

module.exports = router;