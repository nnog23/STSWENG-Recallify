const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/indexRouter.js');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();  

const mongoURI = process.env.MONG_URI;

const app = express();

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']  // Allow all common methods
}));



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

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use(router);

app.use((req, res) => {
    res.status(404).send('404: Route not found.');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;