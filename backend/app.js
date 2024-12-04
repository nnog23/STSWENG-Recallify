const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/indexRouter.js');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();  

const mongoURI = process.env.MONG_URI;

const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://stsweng-recallify.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],  // Allow all common methods
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    console.log('Origin:', req.headers.origin);
    console.log('Path:', req.path);
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err) => {
    console.error("MongoDB connection failed:", err.message);
});

const PORT = process.env.PORT || 3000;

// Simple route to test server
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Use the router (for handling other routes)
app.use(router);

// 404 route for unhandled requests
app.use((req, res) => {
    res.status(404).send('404: Route not found.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;