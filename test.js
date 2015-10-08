/*
Name:           gtmetrix - test.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-gtmetrix
Feedback:       https://github.com/fvdm/nodejs-gtmetrix/issues
License:        Unlicense / Public Domain (see UNLICENSE file)
                (https://github.com/fvdm/nodejs-gtmetrix/raw/develop/LICENSE)
*/

// Setup
// $ env GTMETRIX_EMAIL= GTMETRIX_APIKEY= npm test
var email = process.env.GTMETRIX_EMAIL || null;
var apikey = process.env.GTMETRIX_APIKEY || null;
var timeout = process.env.GTMETRIX_TIMEOUT || 5000;
var location = process.env.GTMETRIX_LOCATION || 2;
var browser = process.env.GTMETRIX_BROWSER || 3;
var path = require ('path');

var app = require (path.join (__dirname, path.sep)) ({
  email: email,
  apikey: apikey,
  timeout: timeout
});

var cache = {
  url: 'http://example.net/',
  location: location || 2,
  browser: browser || 3
};

var pkg = require (path.join (__dirname, 'package.json'));
var errors = 0;
var queue = [];
var next = 0;


// handle exits
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\u001b[1mDONE, no errors.\u001b[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\u001b[1mFAIL, ' + errors + ' error' + (errors > 1 ? 's' : '') + ' occurred!\u001b[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  var testErrors = [];
  var i;

  if (err instanceof Error) {
    console.error ('\u001b[1m\u001b[31mERROR\u001b[0m - ' + label + '\n');
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    for (i = 0; i < tests.length; i++) {
      if (tests [i] [1] !== true) {
        testErrors.push (tests [i] [0]);
        errors++;
      }
    }

    if (testErrors.length === 0) {
      console.log ('\u001b[1m\u001b[32mgood\u001b[0m - ' + label);
    } else {
      console.error ('\u001b[1m\u001b[31mFAIL\u001b[0m - ' + label + ' (' + testErrors.join (', ') + ')');
    }
  }

  doNext ();
}


queue.push (function () {
  app.account.status (function (err, data) {
    doTest (err, 'account.status', [
      ['type', data instanceof Object]
    ]);
  });
});


queue.push (function () {
  app.browsers.list (function (err, data) {
    doTest (err, 'browsers.list', [
      ['type', data instanceof Array],
      ['size', data instanceof Array && data.length >= 1],
      ['item', data instanceof Array && data [0] && data [0] instanceof Object]
    ]);
  });
});


queue.push (function () {
  app.browsers.get (3, function (err, data) {
    doTest (err, 'browsers.get', [
      ['type', data instanceof Object],
      ['id', data && data.id === '3']
    ]);
  });
});


queue.push (function () {
  app.locations.list (function (err, data) {
    doTest (err, 'locations.list', [
      ['type', data instanceof Array],
      ['size', data instanceof Array && data.length >= 1],
      ['item', data instanceof Array && data [0] && data [0] instanceof Object]
    ]);
  });
});


queue.push (function () {
  app.test.create (cache, function (err, data) {
    cache = data;
    doTest (err, 'test.create', [
      ['type', data instanceof Object]
    ]);
  });
});


queue.push (function () {
  app.test.get (cache.test_id, function (err, data) {
    doTest (err, 'test.get details', [
      ['type', data instanceof Object],
      ['state', data && typeof data.state === 'string']
    ]);
  });
});


queue.push (function () {
  app.test.get (cache.test_id, 'screenshot', function (err) {
    doTest (null, 'test.get resource', [
      ['type', err instanceof Error],
      ['error', err && typeof err.error === 'string'],
      ['message', err && err.message === 'API error']
    ]);
  });
});


// Start the tests
console.log ('Running tests...');
console.log ('Node.js ' + process.versions.node);
console.log ('Module  ' + pkg.version);
console.log ();
queue [0] ();
