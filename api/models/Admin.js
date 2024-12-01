const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming `User` is the model for the newUser object
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],  // For basic international format
    },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
