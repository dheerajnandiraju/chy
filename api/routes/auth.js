const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Organization = require('../models/organization');
const Volunteer = require('../models/volunteer');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { fullName, email, phoneNumber, password, address, userRole } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password,  // The password will be hashed by pre-save middleware
      address,
      userRole,
    });

    // Save the user to the database
    await newUser.save();

    // Handle role-based model population (Restaurant, Organization, Volunteer)
    if (userRole === 'restaurants') {
      const newRestaurant = new Restaurant({
        userId: newUser._id,
        name: fullName,
        location:address,
        numberOfDeliveries: 0,
        numberOfMembersFed: 0,
      });

      await newRestaurant.save();
    } else if (userRole === 'organizations') {
      const newOrganization = new Organization({
        organizationId: newUser._id,
        name: fullName,
        location: address,
        phoneNumber:phoneNumber,
      });

      await newOrganization.save();
    } else if (userRole === 'volunteer') {
      const newVolunteer = new Volunteer({
        volunteerId: newUser._id,
        name: fullName,
        email:email,
        phoneNumber:phoneNumber,
      });

      await newVolunteer.save();
    }

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id, role: userRole }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send success response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.userRole,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request body:', req.body); // Debug log

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password (hashed password in the database vs entered password)
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', validPassword);  // Log password comparison result

    if (!validPassword) {
      console.log('Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.userRole }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('JWT Token:', token);  // Log generated JWT token

    // Send response with token and user details
    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.userRole,
        address:user.address,
        contactNumber:user.phoneNumber,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
