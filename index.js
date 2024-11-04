const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON bodies

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB connected"))
   .catch(error => console.log(error));

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

