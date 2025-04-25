const express = require('express');
const router = express.Router();
const FoodRequest = require('../models/FoodRequest'); // Adjust the path as needed

// GET all food requests
router.get('/food-requests', async (req, res) => {
  try {
    console.log('Fetching all food requests...');
    const requests = await FoodRequest.find();
    console.log(`Found ${requests.length} food requests`);
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error in GET /food-requests:', error);
    res.status(500).json({ 
      message: 'Error fetching requests', 
      error: error.message,
      stack: error.stack 
    });
  }
});

// GET a specific food request
router.get('/food-requests/:id', async (req, res) => {
  try {
    console.log('Fetching food request:', req.params.id);
    const request = await FoodRequest.findById(req.params.id);
    if (!request) {
      console.log('Request not found:', req.params.id);
      return res.status(404).json({ message: 'Request not found' });
    }
    console.log('Found request:', request);
    res.status(200).json(request);
  } catch (error) {
    console.error('Error in GET /food-requests/:id:', error);
    res.status(500).json({ 
      message: 'Error fetching request', 
      error: error.message,
      stack: error.stack 
    });
  }
});

// POST a new food request
router.post('/food-requests', async (req, res) => {
  try {
    console.log('Received food request data:', req.body);
    
    const { croptype, additional, activityType, price, ngo, status } = req.body;
    
    // Validate required fields
    if (!croptype) {
      console.log('Validation failed: croptype is required');
      return res.status(400).json({ message: 'Crop type is required' });
    }

    if (!ngo) {
      console.log('Validation failed: ngo is required');
      return res.status(400).json({ message: 'Organization is required' });
    }

    console.log('Creating new food request with data:', {
      croptype,
      additional,
      activityType,
      price,
      ngo,
      status
    });

    const newRequest = new FoodRequest({ 
      croptype, 
      additional, 
      activityType, 
      price, 
      ngo,
      status: status || 'pending'
    });

    console.log('Saving food request to database...');
    const savedRequest = await newRequest.save();
    console.log('Food request saved successfully:', savedRequest);

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating food request:', error);
    res.status(400).json({ 
      message: 'Error creating request', 
      error: error.message,
      stack: error.stack 
    });
  }
});

// PUT update a food request
router.put('/food-requests/:id', async (req, res) => {
  try {
    console.log('Updating food request:', req.params.id);
    const { status } = req.body;
    
    const updatedRequest = await FoodRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      console.log('Request not found:', req.params.id);
      return res.status(404).json({ message: 'Request not found' });
    }

    console.log('Request updated successfully:', updatedRequest);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ 
      message: 'Error updating request', 
      error: error.message,
      stack: error.stack 
    });
  }
});

// DELETE a food request by ID
router.delete('/food-requests/:id', async (req, res) => {
  try {
    console.log('Deleting food request:', req.params.id);
    const deletedRequest = await FoodRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      console.log('Request not found:', req.params.id);
      return res.status(404).json({ message: 'Request not found' });
    }
    console.log('Request deleted successfully:', deletedRequest);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ 
      message: 'Error deleting request', 
      error: error.message,
      stack: error.stack 
    });
  }
});

module.exports = router;
