const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    city: {
      type: String,
      required: true
    },
    hotels: [
      {
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ]
  });
  
  const Hotel = mongoose.model('Hotel', hotelSchema);
  module.exports = Hotel