const mongoose = require('mongoose');

const foodRequestSchema = new mongoose.Schema({
  croptype: { type: String, required: true },
  additional: { type: String },
  activityType: { type: String, required: true },
  price: { type: Number, default: 0 },
  ngo: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

module.exports = mongoose.model("FoodRequest", foodRequestSchema);
