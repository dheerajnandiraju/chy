const express = require('express');
const mongoose = require('mongoose');
// Assuming you've already defined the Order model
const router = express.Router();
const Order = require('../models/Order');

// Middleware to parse JSON
router.use(express.json());

// POST Request: Create a new order
router.post('/orders', async (req, res) => {
  try {
    const { restaurant, meal, expiration,servings } = req.body;
    console.log(req.body);

    // Validate the incoming data (you can further expand validation as needed)
    if (!restaurant || !meal || !expiration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = new Order({
      restaurant: restaurant,
      meal: meal,
      status: "Pending",
      servings:servings,
      expirationDays: expiration.days,
      expirationHours: expiration.hours,
    });

    await newOrder.save();

    return res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT Request: Update organization details (Organization only)
router.put('/orders/:orderId/organization', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { name, phoneNumber, location } = req.body;

    // Validate if organization fields are provided
    if (!name || !phoneNumber || !location) {
      return res.status(400).json({ error: 'Organization name, phone number, and location are required' });
    }

    // Find and update the order
    const order = await Order.findByIdAndUpdate(
      orderId,
      { 'organization.name': name, 'organization.phoneNumber': phoneNumber, 'organization.location': location,status:"In Progress" },
      { new: true }
    );
    console.log(order)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json({ message: 'Organization details updated successfully', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT Request: Update volunteer details (Volunteer only)
router.put('/orders/:orderId/volunteer', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { name, phoneNumber, extra } = req.body;

    // Validate if volunteer fields are provided
    if (!name || !phoneNumber) {
      return res.status(400).json({ error: 'Volunteer name and phone number are required' });
    }

    // Find and update the order
    const order = await Order.findByIdAndUpdate(
      orderId,
      { 'volunteer.name': name, 'volunteer.phoneNumber': phoneNumber, 'volunteer.extra': extra,'status':'Picked' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json({ message: 'Volunteer details updated successfully', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Request: Fetch all orders
router.get('/orders', async (req, res) => {
  try {
    // Find all orders in the database
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    return res.status(200).json({ message: 'Orders retrieved successfully', orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
