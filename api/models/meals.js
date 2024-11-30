const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  mealItems: [{ type: String, required: true }], // List of meal items
  numPeople: { type: Number, required: true },  // Number of people who can eat
  expireTime: { type: Date, required: true },  // Expiration time
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
