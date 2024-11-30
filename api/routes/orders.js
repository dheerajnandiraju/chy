const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Restaurant = require('../models/restaurant');
const Organization = require('../models/organization');
const Volunteer = require('../models/volunteer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Email setup (using Gmail for example, you can replace it with your own service)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Replace with your email provider (Mailgun, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER,  // Gmail address or your email
    pass: process.env.EMAIL_PASS   // Gmail password or your app-specific password
  }
});

// POST /orders - Restaurant posts a new order
router.post('/orders', async (req, res) => {
  const { restaurantId, mealType, servings, expirationDays, expirationHours, restaurantLocation, contactNumber } = req.body;
  console.log(req.body);

  try {
    // Find the restaurant by userId
    const restaurant = await Restaurant.findOne({ userId: restaurantId });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Create a new order
    const newOrder = new Order({
      restaurant: {
        name: restaurant.name,
        id: restaurant.userId,
        location: restaurantLocation || restaurant.location,
        contactNumber: contactNumber,
      },
      mealType,
      servings,
      expiration: { days: expirationDays, hours: expirationHours },
      status: 'posted',
    });

    await newOrder.save();

    // Fetch all organizations
    const organizations = await Organization.find();

    // Define email template (Order Posted Notification)
    const emailHtml = `
      <html>
        <head><title>New Order Posted</title></head>
        <body>
          <h1>New Meal Order Posted!</h1>
          <p><strong>Restaurant:</strong> ${restaurant.name}</p>
          <p><strong>Location:</strong> ${restaurantLocation || restaurant.location}</p>
          <p><strong>Meal Type:</strong> ${mealType}</p>
          <p><strong>Servings:</strong> ${servings}</p>
          <p><strong>Expiration Time:</strong> ${expirationDays} days and ${expirationHours} hours</p>
          <p>Please respond to this order if you can assist.</p>
        </body>
      </html>
    `;

    // Send email to all organizations
    organizations.forEach(org => {
      const mailOptions = {
        from: process.env.EMAIL_USER,  // sender address
        to: org.email, // organization email address
        subject: 'New Order Posted', // Subject line
        html: emailHtml // HTML body content
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(`Error sending email to ${org.email}:`, err);
        } else {
          console.log(`Email sent to ${org.email}: ${info.response}`);
        }
      });
    });

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

    // Update order with the organization info
    order.organization = {
      name: organizationName,
      id: organization._id,
      location: organizationLocation || organization.location,
    };
    order.status = 'assigned';
    await order.save();

    // Define email template (Order Accepted Notification for Volunteers)
    const emailHtml = `
      <html>
        <head><title>Order Accepted</title></head>
        <body>
          <h1>Order Has Been Accepted!</h1>
          <p><strong>Organization:</strong> ${organizationName}</p>
          <p><strong>Location:</strong> ${organizationLocation || organization.location}</p>
          <p><strong>Meal Type:</strong> ${order.mealType}</p>
          <p><strong>Servings:</strong> ${order.servings}</p>
          <p><strong>Expiration Time:</strong> ${order.expiration.days} days and ${order.expiration.hours} hours</p>
          <p>Please mark the order as picked when you collect the meal.</p>
        </body>
      </html>
    `;

    // Send email to all volunteers
    const volunteers = await Volunteer.find(); // You can filter volunteers if necessary
    volunteers.forEach(volunteer => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: volunteer.email, // volunteer's email
        subject: 'Order Assigned to You', // Subject line
        html: emailHtml // HTML body content
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(`Error sending email to ${volunteer.email}:`, err);
        } else {
          console.log(`Email sent to ${volunteer.email}: ${info.response}`);
        }
      });
    });

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

    // Update the order status to picked
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
