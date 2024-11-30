const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Volunteer’s name
  email: { type: String, required: true, unique: true }, // Volunteer’s email
  phoneNumber: { type: String, required: true, unique: true }, // Volunteer’s phone number
  volunteerId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true }, // Unique volunteer ID
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
