const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    deckId: {
        type: String,
        required: true,
    },
    front: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    repetitionCount: {
        type: Number,
        default: 0,
    },
    intervalDays: {
        type: Number,
        default: 0,
    },
    easeFactor: {
        type: Number,
        default: 2.5,
    },
    nextReviewDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;