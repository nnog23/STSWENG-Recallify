const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Ensure to hash passwords
    bio: { type: String, default: '' },
    learningGoals: { type: String, default: '' },
    publicDecks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
    privateDecks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);