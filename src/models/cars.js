    const mongoose = require('mongoose');

    const CabPricesSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    price: {
        Kolkata: {
        type: Number
        },
        Chennai: {
        type: Number
        },
        Mumbai: {
        type: Number
        },
        Bangalore: {
        type: Number
        },
        Hyderabad: {
        type: Number
        }
    }
    });

    const Cars= mongoose.model('Cars', CabPricesSchema);

    module.exports = Cars