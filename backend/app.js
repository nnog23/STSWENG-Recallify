const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const deckRoutes = require('./routes/deck');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

mongoose.connect('mongodb://localhost:27017/recalify_test')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// user routes
app.use('/api/users', userRoutes);

// deck routes
app.use('/api/decks', deckRoutes);

// start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});