const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const restaurantRoutes = require('./routes/restaurantRoutes');
const requestRoutes = require('./routes/requestRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const farmerFoodRoutes = require('./routes/farmerfood');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:19006',
    'http://103.88.236.250',
    'http://10.0.2.2:5000',
    'http://10.10.6.234:5000',
    'http://10.10.6.234:8081',
    'exp://10.10.6.234:8081'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Routes
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/farmer', farmerFoodRoutes);

// MongoDB Connection
connectDB(); // Connects to MongoDB

// Start Server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
  console.log(`API available at http://10.10.6.234:${PORT}`);
});
