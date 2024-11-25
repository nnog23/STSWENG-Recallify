import router from "./src/routes/indexRouter.js";

require('dotenv').config()

const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(router);

