const express = require('express');
const router = express.Router();
const FoodAvailable = require('../models/FoodAvailable');

// POST /api/restaurant/post - Add a food item
router.post('/post', async (req, res) => {
  try {
    console.log('Received food data:', req.body);
    
    // Only validate foodName as required
    if (!req.body.foodName) {
      return res.status(400).json({ 
        message: 'Food name is required',
        received: req.body
      });
    }

    // Create food data with defaults
    const foodData = {
      foodName: req.body.foodName,
      serves: req.body.serves || 1,
      expiry: {
        days: req.body.expiry?.days || 0,
        hours: req.body.expiry?.hours || 0
      },
      address: {
        street: req.body.address?.street || 'srinivasa colony rdno:1',
        city: req.body.address?.city || 'hyderabad',
        pincode: req.body.address?.pincode || '500035',
        latitude: req.body.address?.latitude || 0,
        longitude: req.body.address?.longitude || 0
      }
    };

    const newFood = new FoodAvailable(foodData);
    console.log('Creating new food item:', newFood);
    
    await newFood.save();
    console.log('Food saved successfully');
    
    res.status(201).json({ message: 'Food posted successfully', food: newFood });
  } catch (error) {
    console.error('Error in /api/restaurant/post:', error);
    res.status(500).json({ 
      message: 'Error posting food',
      error: error.message,
      stack: error.stack
    });
  }
});

// GET /api/restaurant/all - Get all available food
router.get('/all', async (req, res) => {
  try {
    const foods = await FoodAvailable.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error('Error in /api/restaurant/all:', error);
    res.status(500).json({ message: 'Error fetching food data' });
  }
});

// GET /api/restaurant/:id - Get a specific food item
router.get('/:id', async (req, res) => {
  try {
    const food = await FoodAvailable.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    console.error('Error in /api/restaurant/:id:', error);
    res.status(500).json({ message: 'Error fetching food data' });
  }
});

// DELETE /api/restaurant/:id - Delete a food item
router.delete('/:id', async (req, res) => {
  try {
    const food = await FoodAvailable.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error('Error in /api/restaurant/:id DELETE:', error);
    res.status(500).json({ message: 'Error deleting food' });
  }
});

module.exports = router;
