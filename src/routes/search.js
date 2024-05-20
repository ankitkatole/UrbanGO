// Import required modules
const express = require('express');
const axios = require('axios');

const router = express.Router();
const Flight = require('../models/flights.js');
const Hotel = require('../models/hotels.js');
const Famousplaces = require('../models/famousplaces');
const Car = require('../models/cars.js');

// Function to fetch weather data for a city
async function getWeatherData(city) {
    try {
        const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.API_KEY}`);
        
        if (geoResponse.data.length === 0) {
            return null; // No weather data found
        }
        
        const { lat, lon } = geoResponse.data[0];
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`);
        
        const weatherData = {
            city: city,
            weather: weatherResponse.data.weather[0].main,
            temperature: weatherResponse.data.main.temp,
            humidity: weatherResponse.data.main.humidity
        };
        
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}



router.post("/flights", async (req, res) => {
    const { From, to } = req.body;

    try {
        const flight = await Flight.findOne({ From });

        if (!flight) {
            console.log('No flights available');
            res.send({ message: 'No flights available' });
        } else {
            let matchingRoutes = [];

            flight.Routes.forEach(Route => {
                if (Route.To === to) {
                    matchingRoutes.push(Route);
                }
            });

            if (matchingRoutes.length > 0) {
                const routeWithWeatherPromises = matchingRoutes.map(async (route) => {
                    const weatherData = await getWeatherData(route.To);
                    return {
                        routeDetails: route,
                        weather: weatherData
                    };
                });

                const routesWithWeather = await Promise.all(routeWithWeatherPromises);
                console.log("Sending response")
                res.send(routesWithWeather);
            } else {
                console.log('No matching routes available');
                res.send({ message: 'No matching routes available' });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Error processing request' });
    }
});

router.post("/hotels",async (req,res)=>{
    const {city} = req.body
    console.log(city)
  
    try 
    {
        const hotel = await Hotel.findOne({ city })
    
        if (!hotel) 
        {
            console.log('No Hotels avaliable')
            res.send({ message: 'No Hotels avaliable' });
        } 
        else 
        {
            console.log(hotel.hotels)
            res.send(hotel.hotels)
        }
    } 
    catch(error) 
    {
        console.error(error);
        res.status(500).send({ message: 'Error adding to cart' });
    }
  })



  router.post("/cars", async (req, res) => {
    const { city, to } = req.body;

    try {
        const car = await Car.findOne({ city });

        if (!car) {
            console.log('No Cabs available');
            res.send({ message: 'No Cabs available' });
        } else {
            let obj = car.price;
            let val = "nil";

            Object.keys(obj).forEach(key => {
                if (key == to) {
                    val = key;
                }
            });

            const carDetails = {
                From: city,
                Destination: to,
                Price: car.price[val]
            };

            const weatherData = await getWeatherData(to);
            console.log({ carDetails, weatherData })
            if (weatherData) {
                res.send({ carDetails, weatherData });
            } else {
                res.send({ carDetails, weather: 'Weather data not available' });
            }
        }
    } catch(error) {
        console.error(error);
        res.status(500).send({ message: 'Error processing request' });
    }
});



router.post("/famousplaces",async (req,res)=>{
    let {city} = req.body;
    console.log(city)

    try{
        let place = await Famousplaces.find({City:city});
        if(!place){
            console.log("No Data Found")
            res.send({message:"No Data Found"})
        }
        else{
            console.log(place)
            res.send(place)
        }
    }
    catch(err){
        console.log("Error Occured!"+err);
        res.status(500).send({ message: 'Error processing request' });
    }
})



module.exports = router;
