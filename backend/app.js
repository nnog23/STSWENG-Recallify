import express from 'express';
import dotenv from 'dotenv';
import router from './routes/indexRouter.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(router);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default app;