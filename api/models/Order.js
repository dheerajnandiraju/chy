const mongoose = require('mongoose');

// Order schema
const orderSchema = new mongoose.Schema({
  // Restaurant details
  restaurant: {
    name: {
      type: String,
      required: true,
      description: 'Restaurant name'
    },
    location: {
      type: String,
      required: true,
      description: 'Restaurant address or location'
    },
    phoneNumber: {
      type: String,
      required: true,
      description: 'Restaurant phone number'
    }
  },
  
  // Organization details
  organization: {
    name: {
      type: String,
      description: 'Organization name'
    },
    location: {
      type: String,
      description: 'Organization address or location'
    },
    phoneNumber: {
      type: String,
      description: 'Organization phone number'
    }
  },
  
  // Volunteer details
  volunteer: {
    name: {
      type: String,
      description: 'Volunteer name'
    },
    phoneNumber: {
      type: String,
      description: 'Volunteer phone number'
    },
    extra: {
      type: String,
      description: 'Additional info about the volunteer (optional)'
    }
  },
  
  // Meal details
    meal: {
      type: String,
      required: true,
      description: 'The type of meal (e.g., Pasta, Salad)'
    },
    servings: {
      type: Number,
      required: true,
      description: 'Number of people to be served'
    },
    expirationDays: {
      type: Number,
      required: true,
      description: 'Number of days until meal expiration'
    },
    expirationHours: {
      type: Number,
      required: true,
      description: 'Number of hours until meal expiration'
    },
  
  // Order status
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Picked','Completed', 'Cancelled'],
    default: 'Pending',
    description: 'The current status of the order'
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order ;
