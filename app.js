const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Helper function to load routes safely
const loadRoute = (routePath, routeName) => {
  try {
    const route = require(routePath);
    app.use(`/api/${routeName}`, route);
    console.log(`✓ ${routeName} routes loaded successfully`);
    return true;
  } catch (error) {
    console.log(`⚠ ${routeName} routes failed to load: ${error.message}`);
    
    // Create a basic demo endpoint for this route
    app.use(`/api/${routeName}`, (req, res, next) => {
      res.status(503).json({
        success: false,
        message: `${routeName} functionality is temporarily unavailable`,
        error: process.env.NODE_ENV === 'development' ? error.message : 'Service in maintenance'
      });
    });
    
    return false;
  }
};

// Load routes with error handling
loadRoute('./routes/auth', 'auth');
loadRoute('./routes/explorer', 'explorer');
loadRoute('./routes/merchant', 'merchant');
loadRoute('./routes/weather', 'weather');

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    port: PORT
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is working correctly!',
    timestamp: new Date().toISOString()
  });
});

// Database connection with better error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('MongoDB URI not found. Running without database connection.');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.log('MongoDB connection error:', err.message);
    console.log('Running without database connection');
  }
};

// Connect to database
connectDB();

// 404 handler
app.use('*', (req, res) => {
  // If API route, return JSON error
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ 
      success: false, 
      message: 'API endpoint not found',
      requestedUrl: req.originalUrl
    });
  }
  
  // For non-API routes, serve the main page (for SPA routing)
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Test endpoint: http://localhost:${PORT}/api/test`);
  
  // Log database status
  if (mongoose.connection.readyState === 1) {
    console.log('✅ Database: Connected');
  } else {
    console.log('⚠️ Database: Not connected (running in demo mode)');
  }
  
  console.log('\n📋 Available API endpoints:');
  console.log('   GET /api/health     - Server status');
  console.log('   GET /api/test       - Basic test endpoint');
  console.log('   GET /api/auth/*     - Authentication routes');
  console.log('   GET /api/explorer/* - Explorer routes');
  console.log('   GET /api/merchant/* - Merchant routes');
  console.log('   GET /api/weather/*  - Weather routes');
});