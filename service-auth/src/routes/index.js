var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/app', function(req, res, next) {
  response = {
    'method': 'GET',
    'path': '/app',
    'body': {
      'code': 100,
      'key': 'authentication',
      'value': '1.0.3'
    }
  }
  res.json(response);
});

/* GET Authenticate User. */
router.get('/authenticate', function(req, res, next) {
  response = {
    'method': 'GET',
    'path': '/authenticate',
    'body': {
      'code': 200,
      'key': 'authentication',
      'value': 'User authenticated'
    }
  }
  res.json(response);
});

module.exports = router;
