// db.js

const mongoose = require('mongoose');

// Replace 'your_mongo_db_uri' with your actual MongoDB URI
const mongoDBURI = 'mongodb://localhost:27017'; // Local MongoDB URI
// Or for MongoDB Atlas
// const mongoDBURI = 'your_mongo_db_atlas_uri';

mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Optionally, you can define your data schema here
const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    items: Array,
    totalAmount: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; // Export the Order model for use in other files
