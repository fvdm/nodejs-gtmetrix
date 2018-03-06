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
// $ GTMETRIX_EMAIL= GTMETRIX_APIKEY= npm test
var email = process.env.GTMETRIX_EMAIL;
var apikey = process.env.GTMETRIX_APIKEY;
var timeout = String (process.env.GTMETRIX_TIMEOUT);
var location = process.env.GTMETRIX_LOCATION || 2;
var browser = process.env.GTMETRIX_BROWSER || 3;

var gtmetrix = app ({
  email: email,
  apikey: apikey,
  timeout: timeout
});

var cache = {
  url: 'http://example.net/',
  location,
  browser
};


dotest.add ('Interface', test => {
  const tst = gtmetrix && gtmetrix.test;
  const locations = gtmetrix && gtmetrix.locations;
  const browsers = gtmetrix && gtmetrix.browsers;
  const account = gtmetrix && gtmetrix.account;

  test()
    .isFunction ('fail', 'export', app)
    .isObject ('fail', 'module', gtmetrix)

    .isObject ('fail', '.test', tst)
    .isFunction ('fail', '.test.create', tst && tst.create)
    .isFunction ('fail', '.test.get', tst && tst.get)

    .isObject ('fail', '.locations', locations)
    .isFunction ('fail', '.locations.list', locations && locations.list)

    .isObject ('fail', '.browsers', browsers)
    .isFunction ('fail', '.browsers.list', browsers && browsers.list)
    .isFunction ('fail', '.browsers.get', browsers && browsers.get)

    .isObject ('fail', '.account', account)
    .isFunction ('fail', '.account.status', account && account.status)
    .done();
});


/**
 * Promise handling
 */

dotest.add ('Promise - account.status', test => {
  gtmetrix.account.status ()
    .catch (err => test (err).done())
    .then (data => test()
      .isObject ('fail', 'data', data)
      .done()
    );
});


dotest.add ('Promise - Error: API error - without polling', test => {
  gtmetrix.test.get ('0')
    .catch (err => {
      test()
        .isError ('fail', 'err', err)
        .isExactly ('fail', 'err.message', err && err.message, 'API error');
    })
    .then (data => {
      test()
        .isUndefined ('fail', 'data', data)
        .done();
    });
});


/**
 * Callback handling
 */

dotest.add ('Callback - account.status', test => {
  gtmetrix.account.status ((err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Callback - browsers.list', test => {
  gtmetrix.browsers.list ((err, data) => {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('warn', 'data[0]', data && data [0])
      .done ();
  });
});


dotest.add ('Callback - browsers.get', test => {
  gtmetrix.browsers.get (3, (err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.id', data && data.id, 3)
      .done ();
  });
});


dotest.add ('Callback - locations.list', test => {
  gtmetrix.locations.list ((err, data) => {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('warn', 'data[0]', data && data [0])
      .done ();
  });
});


dotest.add ('Callback - test.create', test => {
  gtmetrix.test.create (cache, (err, data) => {
    cache.test = data;
    test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Callback - test.get - without polling', test => {
  gtmetrix.test.get (cache.test.test_id, (err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .isString ('warn', 'data.state', data && data.state)
      .done ();
  });
});


dotest.add ('Callback - test.get - with polling', test => {
  gtmetrix.test.get (cache.test.test_id, 5000, (err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.state', data && data.state, 'completed')
      .done ();
  });
});


dotest.add ('Callback - test.get resource - binary with polling', test => {
  gtmetrix.test.get (cache.test.test_id, 'report-pdf-full', 5000, (err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Callback - test.get resource - non-binary with polling', test => {
  gtmetrix.test.get (cache.test.test_id, 'yslow', 5000, (err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.u', data && data.u, cache.url)
      .done ();
  });
});


dotest.add ('Callback - Error: API error - without polling', test => {
  gtmetrix.test.get ('0', (err, data) => {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Callback - Error: API error - resource with default polling', test => {
  gtmetrix.test.get ('0', 'yslow', true, (err, data) => {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Callback - Error: request failed (timeout)', test => {
  var tmp = app ({
    email: email,
    apikey: apikey,
    timeout: 1
  });

  tmp.account.status ((err, data) => {
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
