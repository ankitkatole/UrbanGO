const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    image: {
      type: String
    },
    City: {
        type: String
    },
    place:{
        type: String,
        required: true
    },
    rating:{
        type: Number
    },
    address:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
  });

const Famousplaces = mongoose.model("Famousplaces", placeSchema);
 

module.exports = Famousplaces;