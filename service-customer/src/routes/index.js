var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/app', function(req, res, next) {
  response = {
    'method': 'GET',
    'path': '/app',
    'body': {
      'key': 'customer',
      'value': '1.0.5'
    }
  }
  res.json(response);
});

/* GET Authenticate User. */
router.get('/login', function(req, res, next) {

  axios({
    method: 'GET',
    url: `${process.env.AUTHENTICATION_SERVICE_URL}`
  }).then((resp) => {
    response = {
      'method': 'GET',
      'path': '/login',
      'body': {
        'key': 'authentication',
        'value': 'User logged in successfully',
        'response': resp.data
      }
    }
    res.json(response);
  }).catch((error) => {
    response = {
      'method': 'GET',
      'path': '/login',
      'body': {
        'key': 'authentication',
        'value': 'User login failed',
        'response': error.response
      }
    }
    console.error(error);
    res.json(response);
  });
});

module.exports = router;
