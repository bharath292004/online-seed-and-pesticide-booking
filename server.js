const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/seed_pesticide_booking';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Order Schema
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true }
});

// Create Order Model
const Order = mongoose.model('Order', orderSchema);

// POST route to handle form submission
app.post('/api/orders', (req, res) => {
    const newOrder = new Order({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        items: req.body.items,
        totalAmount: req.body.totalAmount
    });

    newOrder.save()
    .then(order => res.status(201).json(order)) // Send 201 Created status
    .catch(err => res.status(400).json({ error: err.message })); // Error handling
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
