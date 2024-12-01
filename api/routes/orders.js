require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Order = require('../models/Order');
const Organization = require('../models/organization');  // Assuming you have this model
const router = express.Router();

// Create Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Middleware to parse JSON
router.use(express.json());

// POST Request: Create a new order
router.post('/orders', async (req, res) => {
  try {
    const { restaurant, meal, expiration, servings } = req.body;
    console.log(req.body);

    // Validate the incoming data (you can further expand validation as needed)
    if (!restaurant || !meal || !expiration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = new Order({
      restaurant: restaurant,
      meal: meal,
      status: "Pending",
      servings: servings,
      expirationDays: expiration.days,
      expirationHours: expiration.hours,
    });

    await newOrder.save();

    // Notify organizations when a new order is posted
    const organizations = await Organization.find();  // Assuming you have an Organization model
    organizations.forEach((org) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: org.email, // Assuming organizations have an email field
        subject: 'New Order Posted',
        text: `Dear ${org.name},\n\nA new order has been posted by ${restaurant}. Please check the details and accept the order if you can assist.\n\nOrder Details:\nMeal: ${meal}\nExpiration: ${expiration.days} days, ${expiration.hours} hours\n\nThank you!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    });

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
      { 
        'organization.name': name,
        'organization.phoneNumber': phoneNumber,
        'organization.location': location,
        status: "In Progress"
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Notify the volunteer when the order is accepted by the organization
    const volunteer = order.volunteer; // Assuming volunteer is stored in the order model
    if (volunteer) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: volunteer.email,  // Assuming volunteer has an email field
        subject: 'Order Accepted by Organization',
        text: `Dear ${volunteer.name},\n\nThe organization ${name} has accepted your order. Please proceed with the next steps.\n\nOrder Details:\nMeal: ${order.meal}\nOrganization: ${name}\nPhone: ${phoneNumber}\nLocation: ${location}\n\nThank you!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
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
      { 
        'volunteer.name': name,
        'volunteer.phoneNumber': phoneNumber,
        'volunteer.extra': extra,
        status: 'Picked'
      },
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
