const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Order Schema
const orderSchema = new Schema({
  // Restaurant Details
  restaurant: {
    name: { type: String, required: true },
    id: { type: Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
    location: { type: String, required: true },
    contactNumber : {type:Number, required: true},
  },

  // Meal Details
  mealType: { type: String, required: true }, // e.g., 'Veg', 'Non-Veg'
  servings: { type: Number, required: true },  // Number of servings
  expiration: {
    days: { type: Number, required: true },
    hours: { type: Number, required: true }
  },

  // Organization Details
  organization: {
    name: { type: String },
    id: { type: Schema.Types.ObjectId, ref: 'Organization' },
    location: { type: String }
  },

  // Volunteer Details
  volunteer: {
    name: { type: String },
    id: { type: Schema.Types.ObjectId, ref: 'Volunteer' }
  },

  // Status: ['posted', 'assigned', 'picked', 'delivered']
  status: {
    type: String,
    enum: ['posted', 'assigned', 'picked', 'delivered'],
    default: 'posted'
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Order Model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
