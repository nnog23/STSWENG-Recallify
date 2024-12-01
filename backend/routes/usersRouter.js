const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const usersRouter = Router();

// Signup Route
usersRouter.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, encryptedPassword: hashedPassword });
        await newUser.save();

        // Send response
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Server error during signup' });
    }
});

// Login Route
usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.encryptedPassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Store user information in session
        req.session.user = { userId: user._id, username: user.username };  // Store user in session

        // Send response with the userId
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Logout Route
usersRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});


usersRouter.get('/user/:userId/decks', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch the user's decks, assuming the Deck model has a `userId` field
        const decks = await Deck.find({ userId: user._id }); // This assumes you have a userId field in the Deck model

        if (decks.length === 0) {
            return res.status(404).json({ message: 'No decks found for this user' });
        }

        // Send the decks in the response
        res.status(200).json({ decks });
    } catch (err) {
        console.error('Error fetching decks:', err);
        res.status(500).json({ error: 'Server error while fetching decks' });
    }
});

module.exports = usersRouter;

