var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/app', function(req, res, next) {
  response = {
    'method': 'GET',
    'path': '/app',
    'POD': process.env.MY_POD_NAME,
    'body': {
      'key': 'payments',
      'value': '1.0.2'
    }
  }
  res.json(response);
});

/* GET Authenticate User. */
router.get('/pay', function(req, res, next) {

  var transactionResponse = '';

  axios({
    method: 'GET',
    url: `${process.env.CUSTOMER_SERVICE_LOGIN_URL}`
  }).then((resp) => {
    transactionResponse = {
      'method': 'GET',
      'path': '/pay',
      'POD': process.env.MY_POD_NAME,
      'body': {
        'key': 'authentication',
        'value': 'User logged in successfully',
        'response': resp.data
      }
    }
  }).then(() => {
    axios({
      method: 'GET',
      url: `${process.env.MOCKY_EXTERNAL_URL}`
    }).then((resp) => {
      transactionResponse.request2 =
      {
        'method': 'GET',
        'path': `${process.env.MOCKY_EXTERNAL_URL}`,
        'body': {
          'key': 'mocky',
          'value': 'User payment processed successfully',
          'response': resp.data
        }
      };
      res.json(transactionResponse);
    })
  }).catch((error) => {
    transactionResponse = {
      'method': 'GET',
      'path': '/pay',
      'POD': process.env.MY_POD_NAME,
      'body': {
        'key': 'payment',
        'value': 'User payment failed',
        'response': error.response
      }
    }
    console.error(error);
    res.json(transactionResponse);
  });
});

module.exports = router;
