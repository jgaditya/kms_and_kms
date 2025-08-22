// routes/ksrtc.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/ksrtc/routes - Get available routes
router.get('/routes', async (req, res) => {
  try {
    const { from, to } = req.query;
    
    // In a real implementation, you would use the actual KSRTC API
    const response = await axios.get(`https://api.ksrtc.in/routes`, {
      params: { from, to },
      headers: {
        'Authorization': `Bearer ${process.env.KSRTC_API_KEY}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('KSRTC API error:', error);
    res.status(500).json({ 
      message: 'Error fetching KSRTC routes',
      error: error.response?.data || error.message 
    });
  }
});

// GET /api/ksrtc/schedule - Get bus schedule
router.get('/schedule', async (req, res) => {
  try {
    const { routeId, date } = req.query;
    
    const response = await axios.get(`https://api.ksrtc.in/schedule`, {
      params: { routeId, date },
      headers: {
        'Authorization': `Bearer ${process.env.KSRTC_API_KEY}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('KSRTC API error:', error);
    res.status(500).json({ 
      message: 'Error fetching schedule',
      error: error.response?.data || error.message 
    });
  }
});

module.exports = router;
                    