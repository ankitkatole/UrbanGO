const express = require('express');
const axios = require('axios');
const router = express.Router()
const app = express();

router.get('/:city', async (req, res) => {
    try {
      const cityName = req.params.city;
      const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.API_KEY}`);
      
      if (geoResponse.data.length === 0) {
        res.status(404).json({ error: 'City not found' });
        return;
      }
      
      const { lat, lon } = geoResponse.data[0];
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      
      const weatherData = {
        city: cityName,
        weather: weatherResponse.data.weather[0].main,
        temperature: weatherResponse.data.main.temp,
        humidity: weatherResponse.data.main.humidity
      };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router