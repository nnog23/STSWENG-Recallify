const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/indexRouter.js');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use((req, res) => {
    res.status(404).send('404: Route not found.');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(router);

module.exports = app;