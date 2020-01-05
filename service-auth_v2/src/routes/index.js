var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/app', function(req, res, next) {
  response = {
    'method': 'GET',
    'path': '/app',
    'POD': process.env.MY_POD_NAME,
    'body': {
      'code': 100,
      'key': 'authentication',
      'value': '2.0.1'
    }
  }
  res.json(response);
});

/* GET Authenticate User. */
router.get('/authenticate', function(req, res, next) {
  response = {
    'method': 'GET',
    'path': '/authenticate',
    'POD': process.env.MY_POD_NAME,
    'body': {
      'code': 200,
      'key': 'authentication',
      'value': 'User authenticated'
    }
  }
  res.json(response);
});

module.exports = router;
