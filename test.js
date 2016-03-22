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


dotest.add ('account.status', function () {
  gtmetrix.account.status (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('browsers.list', function () {
  gtmetrix.browsers.list (function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('warn', 'data[0]', data && data [0])
      .done ();
  });
});


dotest.add ('browsers.get', function () {
  gtmetrix.browsers.get (3, function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.id', data && data.id, '3')
      .done ();
  });
});


dotest.add ('locations.list', function () {
  gtmetrix.locations.list (function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('warn', 'data[0]', data && data [0])
      .done ();
  });
});


dotest.add ('test.create', function () {
  gtmetrix.test.create (cache, function (err, data) {
    cache = data;
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('test.get details', function () {
  gtmetrix.test.get (cache.test_id, function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isString ('fail', 'data.state', data && data.state)
      .done ();
  });
});


dotest.add ('test.get resource', function () {
  gtmetrix.test.get (cache.test_id, 'screenshot', function (err) {
    dotest.test ()
      .isError ('fail', 'err', err)
      .isString ('fail', 'err.error', err && err.error)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .done ();
  });
});


// Start the tests
dotest.run ();
