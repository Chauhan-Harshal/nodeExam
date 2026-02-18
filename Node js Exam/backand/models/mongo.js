const mongoose = require('mongoose');
const config = require('../config/db');

const uri = config.mongoUri || process.env.MONGO_URI;

function connect() {
  mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err.message || err));
}

module.exports = {
  connect,
  mongoose
};
