/*
Name:           gtmetrix - test.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-gtmetrix
Feedback:       https://github.com/fvdm/nodejs-gtmetrix/issues
License:        Unlicense / Public Domain (see UNLICENSE file)
                (https://github.com/fvdm/nodejs-gtmetrix/raw/develop/LICENSE)
*/

var path = require ('path');
var dotest = require ('dotest');
var app = require (path.join (__dirname, path.sep));


// Setup
// $ env GTMETRIX_EMAIL= GTMETRIX_APIKEY= npm test
var email = process.env.GTMETRIX_EMAIL || null;
var apikey = process.env.GTMETRIX_APIKEY || null;
var timeout = process.env.GTMETRIX_TIMEOUT || 5000;
var location = process.env.GTMETRIX_LOCATION || 2;
var browser = process.env.GTMETRIX_BROWSER || 3;

var gtmetrix = app ({
  email: email,
  apikey: apikey,
  timeout: timeout
});

var cache = {
  url: 'http://example.net/',
  location: location,
  browser: browser
};


dotest.add ('account.status', function (test) {
  gtmetrix.account.status (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('browsers.list', function (test) {
  gtmetrix.browsers.list (function (err, data) {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('warn', 'data[0]', data && data [0])
      .done ();
  });
});


dotest.add ('browsers.get', function (test) {
  gtmetrix.browsers.get (3, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.id', data && data.id, 3)
      .done ();
  });
});


dotest.add ('locations.list', function (test) {
  gtmetrix.locations.list (function (err, data) {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('warn', 'data[0]', data && data [0])
      .done ();
  });
});


dotest.add ('test.create', function (test) {
  gtmetrix.test.create (cache, function (err, data) {
    cache.test = data;
    test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('test.get - without polling', function (test) {
  gtmetrix.test.get (cache.test.test_id, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isString ('warn', 'data.state', data && data.state)
      .done ();
  });
});


dotest.add ('test.get - with polling', function (test) {
  gtmetrix.test.get (cache.test.test_id, 5000, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.state', data && data.state, 'completed')
      .done ();
  });
});


dotest.add ('test.get resource - binary with polling', function (test) {
  gtmetrix.test.get (cache.test.test_id, 'screenshot', 5000, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('test.get resource - non-binary with polling', function (test) {
  gtmetrix.test.get (cache.test.test_id, 'yslow', 5000, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.u', data && data.u, cache.url)
      .done ();
  });
});


dotest.add ('Error: API error - without polling', function (test) {
  gtmetrix.test.get ('0', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Error: API error - resource with default polling', function (test) {
  gtmetrix.test.get ('0', 'yslow', true, function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Error: request failed (timeout)', function (test) {
  var tmp = app ({
    email: email,
    apikey: apikey,
    timeout: 1
  });

  tmp.account.status (function (err, data) {
    var error = err && err.error;

    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', error)
      .isExactly ('warn', 'err.error.code', error && error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


// Start the tests
dotest.run (1000);
