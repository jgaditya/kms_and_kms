const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/weather/current - Get current weather
router.get('/current', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    
    if (!city && (!lat || !lon)) {
      return res.status(400).json({ 
        message: 'Please provide city or coordinates' 
      });
    }
    
    // Build parameters for OpenWeatherMap API
    const params = {
      appid: process.env.OPENWEATHER_API_KEY,
      units: 'metric'
    };
    
    if (city) {
      params.q = city;
    } else {
      params.lat = lat;
      params.lon = lon;
    }
    
    // Make request to OpenWeatherMap API
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather', 
      { params, timeout: 10000 }
    );
    
    // Format the response
    res.json({
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      city: response.data.name,
      country: response.data.sys.country
    });
    
  } catch (error) {
    console.error('Weather API error:', error);
    
    if (error.response) {
      // OpenWeatherMap API error
      res.status(502).json({ 
        message: 'Weather service unavailable',
        error: error.response.data 
      });
    } else if (error.request) {
      // Network error
      res.status(503).json({ 
        message: 'Cannot connect to weather service' 
      });
    } else {
      // Other error
      res.status(500).json({ 
        message: 'Internal server error' 
      });
    }
  }
});

// GET /api/weather/forecast - Get weather forecast
router.get('/forecast', async (req, res) => {
  try {
    const { city, lat, lon, days = 5 } = req.query;
    
    if (!city && (!lat || !lon)) {
      return res.status(400).json({ 
        message: 'Please provide city or coordinates' 
      });
    }
    
    // Build parameters for OpenWeatherMap API
    const params = {
      appid: process.env.OPENWEATHER_API_KEY,
      units: 'metric',
      cnt: days * 8 // OpenWeatherMap returns data in 3-hour intervals
    };
    
    if (city) {
      params.q = city;
    } else {
      params.lat = lat;
      params.lon = lon;
    }
    
    // Make request to OpenWeatherMap API
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast', 
      { params, timeout: 10000 }
    );
    
    // Format the response to daily forecasts
    const dailyForecasts = [];
    const processedDays = new Set();
    
    response.data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0]; // Get just the date part
      
      if (!processedDays.has(date)) {
        processedDays.add(date);
        dailyForecasts.push({
          date: date,
          temperature: item.main.temp,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          icon: item.weather[0].icon
        });
      }
    });
    
    // Return only the requested number of days
    res.json(dailyForecasts.slice(0, days));
    
  } catch (error) {
    console.error('Weather forecast error:', error);
    
    if (error.response) {
      res.status(502).json({ 
        message: 'Weather service unavailable',
        error: error.response.data 
      });
    } else if (error.request) {
      res.status(503).json({ 
        message: 'Cannot connect to weather service' 
      });
    } else {
      res.status(500).json({ 
        message: 'Internal server error' 
      });
    }
  }
});

module.exports = router;