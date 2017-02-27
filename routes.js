const express = require('express');
const router = express.Router();
const low = require('lowdb');
const path = require('path');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/movies.json', {
  storage: fileAsync
});

// ALL MOVIES
const movies = db.get('movies');

// ROOT
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

// READ ALL
router.get('/movies', (req, res) => {
  res.send(movies);
});

// READ ONE
router.get('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  const movie = movies.find({title: movieTitle});
  res.send(movie);
});

// EDIT PAGE
router.get('/edit/:title', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/edit.html'));
});

// SHOW PAGE
router.get('/show/:title', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/show.html'));
});

// CREATE
router.post('/movies', (req, res) => {
  movies.push(req.body)
    .write()
    .then(newMovie => {
      res.status(201).sendFile(path.join(__dirname + '/public/index.html'));
    })
    .catch(err => {
      console.log(err);
    });
});

// UPDATE
router.put('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  movies.find({title: movieTitle})
    .assign(req.body)
    .write()
    .then(updatedMovie => {
      res.send(updatedMovie);
    })
    .catch(err => {
      console.log(err);
    });
});

// DELETE
router.delete('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  movies.remove({title: movieTitle})
    .write()
    .then(deletedMovie => {
      res.status(204).send();
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
