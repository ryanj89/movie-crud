const express = require('express');
const router = express.Router();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/movies.json', {
  storage: fileAsync
});

// READ ALL
router.get('/movies', (req, res) => {
  const movies = db.get('movies');
  res.send(movies);
});

// READ ONE
router.get('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  const movie = db.get('movies').find({title: movieTitle});
  res.send(movie);
});

// CREATE
router.post('/movies', (req, res) => {
  console.log(req.body);
  db.get('movies')
    .push(req.body)
    .write()
    .then(newMovie => {
      res.status(201).send(newMovie);
    })
    .catch(err => {
      console.log(err);
    });
});

// UPDATE
router.put('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  db.get('movies')
    .find({title: movieTitle})
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
  db.get('movies')
    .remove({title: movieTitle})
    .write()
    .then(deletedMovie => {
      res.status(204).send();
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
