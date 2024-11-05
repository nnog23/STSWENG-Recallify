const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    decksStudied: [{ deckId: mongoose.Schema.Types.ObjectId, dateStudied: Date, score: Number }],
}, { timestamps: true });

module.exports = mongoose.model('Progress', ProgressSchema);