const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const router = express.Router();

// Weather schema
const weatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  feels_like: Number,
  humidity: Number,
  wind: Number,
  condition: String,
  date: { type: Date, default: Date.now }
});

const Weather = mongoose.models.Weather || mongoose.model("Weather", weatherSchema);

// GET /api/weather/:city
router.get("/:city", async (req, res) => {
  const city = req.params.city;

  try {
    // Check if already stored in DB today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Weather.findOne({
      city: city,
      date: { $gte: today }
    });

    if (existing) {
      return res.json({ success: true, data: existing, source: "db" });
    }

    // Fetch from OpenWeatherMap (⚠️ Fixed template literal here)
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`
    );

    const data = {
      city: city,
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      condition: response.data.weather[0].description
    };

    // Save in DB
    const newWeather = new Weather(data);
    await newWeather.save();

    res.json({ success: true, data: newWeather, source: "api" });

  } catch (error) {
    console.error("Weather error:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch weather" });
  }
});

module.exports = router;
