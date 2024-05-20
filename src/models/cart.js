const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  trips: [
    {
      type: {
        type: String,
        required: true
      },
      data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;