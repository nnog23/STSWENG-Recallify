import router from './routes/indexRouter.js';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(router);

