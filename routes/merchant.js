// routes/merchant.js
const express = require('express');
const router = express.Router();

// GET /api/merchant/products
router.get('/products', (req, res) => {
  res.json({
    success: true,
    products: [
      { id: 1, name: 'Handmade Pottery', price: 25, category: 'crafts' },
      { id: 2, name: 'Traditional Shawl', price: 45, category: 'textiles' }
    ]
  });
});n

// GET /api/merchant/orders
router.get('/orders', (req, res) => {
  res.json({
    success: true,
    orders: [
      { id: 101, product: 'Handmade Pottery', status: 'completed' },
      { id: 102, product: 'Traditional Shawl', status: 'pending' }
    ]
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'Merchant routes working' });
});

module.exports = router;