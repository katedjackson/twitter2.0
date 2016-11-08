const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list, showForm: false } );
});

router.get('/tweets/:id', function(req, res) {
  var id = Number(req.params.id);
  var tweet = tweetBank.find( {id: id} );
  res.render( 'index', { tweets: tweet } );
});

module.exports = router;
