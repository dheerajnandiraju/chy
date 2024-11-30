const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Organization name
  phoneNumber: { type: String, required: true, unique: true }, // Organization phone number
  location: { type: String, required: true }, // Organization location
  organizationId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true }, // Organization unique ID
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
