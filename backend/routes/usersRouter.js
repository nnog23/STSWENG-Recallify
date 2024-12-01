const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const usersRouter = Router();

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

        // Create a JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send response with the token
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
});


module.exports = usersRouter;