const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User schema
  name: { type: String, required: true }, // Restaurant name
  email:{type:String,required:true,unique:true}, // Restaurant email
  location: { type: String, required: true }, // Restaurant location
  numberOfDeliveries: { type: Number, default: 0 }, // Track the number of deliveries
  numberOfMembersFed: { type: Number, default: 0 }, // Track the number of members fed
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
