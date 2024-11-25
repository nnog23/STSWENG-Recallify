import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    cardId: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000, // Ensure it's a 10-digit number
        max: 9999999999,
    },
    deckId: {
        type: Number,
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

export default Card;