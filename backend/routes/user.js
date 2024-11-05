const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassWord = await bcrypt.hash(password, salt);
        const newUser = new User({ username, email, password: hashedPassWord }); // to hash
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Log-in
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });    
        res.json({ message: 'Logged in successfully', userId: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch user profile
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);

        // Fetch progress and public decks
        const [progress, publicDecks] = await Promise.all([
            Progress.findOne({ userId: user._id }),
            Deck.find({ owner: user._id, isPublic: true })
        ]);

        res.json({
            user,
            progress,
            publicDecks,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.put('/:id', [

    body('email').isEmail().optional(),
    body('username').isLength({ min: 3}).optional(),
    body('bio').optional(),
    body('learningGoals').optional(),

    ], async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });

            return res.json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
});

// Update user profile -- without validation
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Update Progress

// Progress
router.post('/progress', async (req, res) => {
    const { userId, deckId, score } = req.body;
    try {
        const progress = await Progress.findOneAndUpdate(
            { userId },
            { $push: {decksStudied: {deckId, dateStudied: new Date(), score }}},
            { new: true, upsert: true}
        );
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;