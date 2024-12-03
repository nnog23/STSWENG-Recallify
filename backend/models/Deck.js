const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        default: '',
    },
    private: {
        type: Boolean,
        default: false,
    },
    cardcount: {
        type: Number,
        default: 0,
    },
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;