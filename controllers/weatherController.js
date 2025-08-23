const axios = require("axios");
const { WEATHER_API_URL, WEATHER_API_KEY } = require("../config/constants");

exports.getWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric", // °C
      },
    });

    res.json({
      location: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch weather" });
  }
};
