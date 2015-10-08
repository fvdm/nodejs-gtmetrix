gtmetrix
========

Node.js module for the GTmetrix API to run and access tests.

[![Build Status](https://travis-ci.org/fvdm/nodejs-gtmetrix.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-gtmetrix)

* [Node.js](https://nodejs.org)
* [GTMetrix](https://gtmetrix.com)
* [API documentation](https://gtmetrix.com/api/)


Example
-------

```js
var gtmetrix = require ('gtmetrix') ({
  email: 'your@mail.tld',
  apikey: 'abc123'
});

// Run test from London with Google Chrome
var test = {
  url: 'http://example.net/',
  location: 2,
  browser: 3
};

gtmetrix.test.create (test, console.log);
```

##### Result

```js
{ test_id: 'Ao0AYQbz',
  poll_state_url: 'https://gtmetrix.com/api/0.1/test/Ao0AYQbz' }
```


Installation
------------

`npm install gtmetrix`

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


Error handling
--------------

The methods require a callback _function_ argument to process the results.
This `callback` receives two arguments: `err` and `data`, as per industry standards.

When an error occurs `err` is an instance of `Error` with additional properties.

message          | description            | properties
:----------------|:-----------------------|:----------------------------------
request failed   | Request cannot be made | `error`
invalid response | Can't process response | `error` `statusCode` `contentType`
API error        | API returned an error  | `error` `statusCode` `contentType`


Methods
-------

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
**( testId, [resource], callback )**

Get details about a test or one of its resources.

When you specify a binary resource, i.e. `screenshot`,
the callback `data` will be a _Buffer_ instance, so you can
post-process the binary data however you like. See example below.

argument | type     | required | description
:--------|:---------|:---------|:------------------------
testId   | string   | yes      | Test `id` to look up
resource | string   | no       | Retrieve a test resource
callback | function | yes      | Callback function

[API documentation](https://gtmetrix.com/api/#api-test-state)


##### Test details

```js
gtmetrix.test.get ('Ao0AYQbz', console.log);
```


##### Retrieve screenshot

```js
var fs = require ('fs');

gtmetrix.test.get ('Ao0AYQbz', 'screenshot', function (err, data) {
  if (err) { return console.log (err); }

  // Store on disk
  fs.writeFile (__dirname + '/screenshot.jpg', data, console.log);
});
```


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

Franklin van de Meent
| [Website](https://frankl.in)
| [Github](https://github.com/fvdm)
