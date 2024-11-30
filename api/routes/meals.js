const express = require('express');
const router = express.Router();
const Meal = require('../models/meals');
const Restaurant = require('../models/restaurant');

// POST route to create a new meal
router.post('/meal', async (req, res) => {
  const { restaurantId, restaurantName, mealItems, numPeople, expireInDays, expireInHours } = req.body;

  try {
    // Check if the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Calculate the expiration time
    const currentDate = new Date();
    const expireTime = new Date(currentDate.getTime() + expireInDays * 24 * 60 * 60 * 1000 + expireInHours * 60 * 60 * 1000);

    // Create a new meal
    const newMeal = new Meal({
      restaurantId,
      name: restaurantName, // Use the restaurant name from request body
      mealItems,  // List of meal items
      numPeople,  // Number of people who can eat
      expireTime,  // Expiration time calculated
    });

    // Save the meal
    await newMeal.save();

    // Return success response
    res.status(201).json({
      message: 'Meal posted successfully',
      meal: newMeal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;