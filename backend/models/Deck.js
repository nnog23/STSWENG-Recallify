const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    cards: [{ 
        question: { type: String, required: true },
        answer: { type: String, required: true }
    }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Deck', DeckSchema);