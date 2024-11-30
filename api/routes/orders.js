const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Restaurant = require('../models/restaurant');
const Organization = require('../models/organization')
const Volunteer = require('../models/volunteer');
const router = express.Router();

// POST /orders - Restaurant posts a new order
router.post('/orders', async (req, res) => {
  const { restaurantId, mealType, servings, expirationDays, expirationHours, restaurantLocation,contactNumber } = req.body;
  console.log(req.body)
  try {
    const restaurant = await Restaurant.findOne({ userId: restaurantId });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const newOrder = new Order({
      restaurant: {
        name: restaurant.name,
        id: restaurant.userId,
        location: restaurantLocation || restaurant.location,
        contactNumber:contactNumber,
      },
      mealType,
      servings,
      expiration: { days: expirationDays, hours: expirationHours },
      status: 'posted',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /orders/:orderId/request - Organization requests an order
router.put('/orders/:orderId/request', async (req, res) => {
  const { organizationId, organizationName, organizationLocation } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order || order.status !== 'posted') {
      return res.status(404).json({ error: 'Order not found or already taken' });
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    order.organization = {
      name: organizationName,
      id: organization._id,
      location: organizationLocation || organization.location,
    };
    order.status = 'assigned';
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /orders/:orderId/pick - Volunteer picks the order
router.put('/orders/:orderId/pick', async (req, res) => {
  const { volunteerId, volunteerName } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order || order.status !== 'assigned') {
      return res.status(404).json({ error: 'Order not assigned yet' });
    }

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    order.volunteer = {
      name: volunteerName,
      id: volunteer._id,
    };
    order.status = 'picked';
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /orders/:orderId/deliver - Volunteer marks the order as delivered
router.put('/orders/:orderId/deliver', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order || order.status !== 'picked') {
      return res.status(404).json({ error: 'Order not picked yet' });
    }

    order.status = 'delivered';
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /orders - Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
