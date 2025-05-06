const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// c) Insert 5 songs
router.post('/insert', async (req, res) => {
    await Song.insertMany(req.body);
    res.send('Songs inserted');
});

// d) Display all + count
router.get('/all', async (req, res) => {
    const songs = await Song.find();
    res.send({ count: songs.length, songs });
});

// e) Songs by music director
router.get('/by-director/:name', async (req, res) => {
    const songs = await Song.find({ Music_Director: req.params.name });
    res.send(songs);
});

// f) Songs by music director & singer
router.get('/by-director-singer/:director/:singer', async (req, res) => {
    const songs = await Song.find({ Music_Director: req.params.director, Singer: req.params.singer });
    res.send(songs);
});

// g) Delete by song name
router.delete('/delete/:name', async (req, res) => {
    await Song.deleteOne({ Song_Name: req.params.name });
    res.send('Deleted');
});

// h) Add favorite song
router.post('/add', async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.send('Added');
});

// i) Songs by singer from film
router.get('/by-singer-film/:singer/:film', async (req, res) => {
    const songs = await Song.find({ Singer: req.params.singer, Film_Name: req.params.film });
    res.send(songs);
});

// j) Update actor & actress
router.put('/update/:song', async (req, res) => {
    await Song.updateOne(
        { Song_Name: req.params.song },
        { $set: { Actor: req.body.Actor, Actress: req.body.Actress } }
    );
    res.send('Updated');
});

// k) Display in tabular form
router.get('/table', async (req, res) => {
    const songs = await Song.find();
    let html = `<table border="1"><tr><th>Song</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
    songs.forEach(song => {
        html += `<tr><td>${song.Song_Name}</td><td>${song.Film_Name}</td><td>${song.Music_Director}</td><td>${song.Singer}</td><td>${song.Actor}</td><td>${song.Actress}</td></tr>`;
    });
    html += `</table>`;
    res.send(html);
});

module.exports = router;
