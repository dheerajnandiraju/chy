const mongoose = require('mongoose');

const foodAvailableSchema = new mongoose.Schema({
  restaurantName: { 
    type: String, 
    required: false,
    default: 'Mehfil',
    trim: true
  },
  foodName: { 
    type: String, 
    required: [true, 'Food name is required'],
    trim: true
  },
  serves: { 
    type: Number, 
    required: [true, 'Number of serves is required'],
    min: [1, 'Serves must be at least 1'],
    default: 1
  },
  expiry: {
    days: { 
      type: Number, 
      default: 0,
      min: [0, 'Days cannot be negative']
    },
    hours: { 
      type: Number, 
      default: 0,
      min: [0, 'Hours cannot be negative']
    }
  },
  address: {
    street: { 
      type: String, 
      default: 'srinivasa colony rdno:1',
      trim: true
    },
    city: { 
      type: String, 
      default: 'hyderabad',
      trim: true
    },
    pincode: { 
      type: String, 
      default: '500035',
      trim: true
    },
    latitude: { 
      type: Number, 
      default: 0
    },
    longitude: { 
      type: Number, 
      default: 0
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add pre-save middleware to validate data
foodAvailableSchema.pre('save', function(next) {
  console.log('Validating food data before save:', this);
  next();
});

module.exports = mongoose.model("FoodAvailable", foodAvailableSchema);

