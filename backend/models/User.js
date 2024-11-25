const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000, // Ensure it's a 10-digit number
        max: 9999999999,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    encryptedPassword: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    reviewHistory: {
        type: Map,
        of: Number,
    },
    bio: {
        type: String,
        default: '',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;