const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    Song_Name: String,
    Film_Name: String,
    Music_Director: String,
    Singer: String,
    Actor: String,
    Actress: String
});

module.exports = mongoose.model('Song', songSchema);
