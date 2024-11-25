import mongoose from 'mongoose';

const deckSchema = new mongoose.Schema({
    deckId: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000, // Ensure it's a 10-digit number
        max: 9999999999,
    },
    userId: {
        type: Number,
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
});

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;