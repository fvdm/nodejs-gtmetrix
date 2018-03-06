gtmetrix
========

Node.js module for the GTmetrix API to run and access tests.

[![npm](https://img.shields.io/npm/v/gtmetrix.svg?maxAge=3600)](https://github.com/fvdm/nodejs-gtmetrix/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-gtmetrix.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-gtmetrix)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-gtmetrix/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-gtmetrix?branch=master)
[![Dependencies](https://www.bithound.io/github/fvdm/nodejs-gtmetrix/badges/dependencies.svg)](https://www.bithound.io/github/fvdm/nodejs-gtmetrix/develop/dependencies/npm)
[![Code Quality](https://www.bithound.io/github/fvdm/nodejs-gtmetrix/badges/code.svg)](https://www.bithound.io/github/fvdm/nodejs-gtmetrix)
[![Greenkeeper](https://badges.greenkeeper.io/fvdm/nodejs-gtmetrix.svg)](https://greenkeeper.io/)

* [Node.js](https://nodejs.org)
* [GTMetrix](https://gtmetrix.com)
* [API documentation](https://gtmetrix.com/api/)


Example
-------

```js
const gtmetrix = require ('gtmetrix') ({
  email: 'your@mail.tld',
  apikey: 'abc123'
});

// Run test from London with Google Chrome
const testDetails = {
  url: 'http://example.net/',
  location: 2,
  browser: 3
};

// Poll test every 5 seconds for completion, then log the result
gtmetrix.test.create (testDetails).then (data =>
  gtmetrix.test.get (data.test_id, 5000).then (console.log));
```

_(For readability I left out the error handling)_


Installation
------------

`npm install gtmetrix --save`

You need an account at GTmetrix to get an API key.
The API key can be found [here](https://gtmetrix.com/api/#api-details) when you are logged in.


Configuration
-------------

The setup function takes an _object_ with these settings.

name    | type    | required | default | description
:-------|:--------|:---------|:--------|:--------------------
email   | string  | yes      |         | Your account email
apikey  | string  | yes      |         | Your account API key
timeout | integer | no       | 5000    | Wait timeout in ms


##### Example

```js
var gtmetrix = require ('gtmetrix') ({
  email: 'your@mail.tld',
  apikey: 'abc123',
  timeout: 10000
});
```


Methods
-------

All methods return promises, but you can also provide a callback function
instead which gets the standard `err` and `data` arguments.

In the examples below I use a mix of callbacks and promises, but each method
can do both. I also left out the error handling for better readability.


### Errors

message          | description            | properties
:----------------|:-----------------------|:----------------------------------
request failed   | Request cannot be made | `error`
invalid response | Can't process response | `error` `statusCode` `contentType`
API error        | API returned an error  | `error` `statusCode` `contentType`


### test.create
**( params, callback )**

Run a test.

argument | type     | required | description
:--------|:---------|:---------|:-----------------
params   | object   | yes      | Test settings
callback | function | yes      | Callback function

[API documentation](https://gtmetrix.com/api/#api-test-start)


```js
// Run test from London with Google Chrome
var test = {
  url: 'http://example.net/',
  location: 2,
  browser: 3
};

gtmetrix.test.create (test, console.log);
```


### test.get
**( testId, [resource], [polling], callback )**

Get details about a test or one of its resources.

When you specify a binary resource, i.e. `screenshot`,
the callback `data` will be a _Buffer_ instance, so you can
post-process the binary data however you like. See example below.

argument | type     | required | description
:--------|:---------|:---------|:-----------------------------
testId   | string   | yes      | Test `id` to look up
resource | string   | no       | Retrieve a test resource
polling  | number   | no       | Retry until completion, in ms
callback | function | yes      | Callback function

[API documentation](https://gtmetrix.com/api/#api-test-state)


##### Test details

```js
// Just get test result
gtmetrix.test.get ('Ao0AYQbz', console.log);

// Get test result when it is complete, retry every 5 seconds (5000 ms)
gtmetrix.test.get ('Ao0AYQbz', 5000, console.log);
```


##### Retrieve screenshot

And retry every 5000 ms until it's ready.

```js
var fs = require ('fs');

gtmetrix.test.get ('Ao0AYQbz', 'screenshot', 5000).then (data =>
  fs.writeFile (__dirname + '/screenshot.jpg', data, console.log));
```

###### Resources

resource        | binary | content   | description
:---------------|:-------|:----------|:---------------------------------------
filmstrip       | yes    | JPEG      | Page loading filmstrip (requires video)
har             | no     | JS object | HTTP Archive
pagespeed       | no     | JS object | Pagespeed report
pagespeed-files | yes    | ZIP       | Pagespeed optimized files
report-pdf      | yes    | PDF       | Test summary
report-pdf-full | yes    | PDF       | Full test report
screenshot      | yes    | JPEG      | Screenshot image
video           | yes    | MP4       | Page loading video
yslow           | no     | JS object | YSlow report


### locations.list
**( callback )**

Get a list of available test locations.

argument | type     | required | description
:--------|:---------|:---------|:-----------------
callback | function | yes      | Callback function

[API documentation](https://gtmetrix.com/api/#api-locations)


```js
gtmetrix.locations.list (console.log);
```


### browsers.list
**( callback )**

Get a list of available test browsers.

argument | type     | required | description
:--------|:---------|:---------|:-----------------
callback | function | yes      | Callback function

[API documentation](https://gtmetrix.com/api/#api-browsers)


```js
gtmetrix.browsers.list (console.log);
```


### browsers.get
**( browserId, callback )**

Get details about a test browser.

argument  | type     | required | description
:---------|:---------|:---------|:-----------------------
browserId | number   | yes      | Browser `id` to look up
callback  | function | yes      | Callback function

[API documentation](https://gtmetrix.com/api/#api-browsers-details)


```js
gtmetrix.browsers.get (3, console.log);
```


### account.status
**( callback )**

Information about your account.

argument | type     | required | description
:--------|:---------|:---------|:-----------------
callback | function | yes      | Callback function

[API documentation](https://gtmetrix.com/api/#api-status)


```js
gtmetrix.account.status (console.log);
```


License
-------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>


Author
------

[Franklin van de Meent](https://frankl.in)

[![Buy me a coffee](https://frankl.in/u/kofi/kofi-readme.png)](https://ko-fi.com/franklin)
