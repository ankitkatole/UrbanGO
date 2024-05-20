const mongoose = require('mongoose')
require('dotenv').config();

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

async function Connection() {
  try {
    await mongoose.connect(process.env.MONGO_URI_URBANGO, clientOptions)
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log('Connected to MongoDB Atlas cluster');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

module.exports = {
  Connection
}