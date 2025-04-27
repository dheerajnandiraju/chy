const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  issueType: { type: String, required: true },
  comments: { type: String, required: true },
  imageFeedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);