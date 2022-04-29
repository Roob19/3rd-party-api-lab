var express = require('express');
var router = express.Router();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const rootURL = 'https://api.chucknorris.io/jokes/random';

/* GET home page. */
router.get('/', function(req, res, next) {
  let jokeData;
  fetch(`${rootURL}`)
    .then(res => res.json())
    .then(joke => {
      jokeData = joke;
      return fetch(joke.url);
    })
    .then(res => res.json())
    .then(data => {
      jokeData.data = data;
      res.render('index', { jokeData });
    });
});

module.exports = router;