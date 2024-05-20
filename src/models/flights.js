const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema({
    From: {
      type: String,
      required: true
    },
    Routes: [
      {
        To: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        duration: {
          type: Number,
          required: true
        },
        carrier: {
          type: String,
          required: true
        }
      }
    ]
  });

const Flight = mongoose.model("Flight", flightSchema);
 

module.exports = Flight;

