const express = require('express');
const mongoose = require('mongoose');
const songRoutes = require('./routes/songRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/music', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"));

app.use('/', songRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
