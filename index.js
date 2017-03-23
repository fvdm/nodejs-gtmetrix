var http = require ('httpreq');

// Defaults
var config = {
  email: null,
  apikey: null,
  timeout: 5000
};


/**
 * Get info about resource type
 *
 * @param name {string} - The resource name
 * @return     {object} - Resource info object
 */

function resourceType (name) {
  var info = {
    binary: false,
    path: name.replace ('_', '-')
  };

  if (info.path.match (/^(filmstrip|pagespeed-files|report-pdf(-full)?|screenshot|video)$/)) {
    info.binary = true;
  }

  if (info.path === 'report-pdf-full') {
    info.path = 'report-pdf?full=1';
  }

  return info;
}


/**
 * Callback an error
 *
 * @param msg {string} - Error.message
 * @param err {mixed} - Error.error
 * @param code {number|null} - Error.statusCode
 * @param type {string|null} - Error.contentType
 * @return {Error}
 */

function doError (msg, err, code, type) {
  var error = new Error (msg);

  error.error = err;
  error.statusCode = code;
  error.contentType = type;
  return error;
}


/**
 * Process API response
 *
 * @callback callback
 * @param options {object} - httpreq options
 * @param err {Error|null} - httpreq Error
 * @param res {object} - httpreq response
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function apiResponse (options, err, res, callback) {
  var type = res && res.headers ['content-type'] .split (';') [0] || '';
  var size = res && res.headers ['content-length'] || null;
  var code = res && res.statusCode;
  var data = res && res.body || null;
  var error = null;

  if (err) {
    error = doError ('request failed', err, null, null);
    callback (error);
    return;
  }

  if (size && options.binary && type.match (/\/(pdf|jpeg|tar)$/)) {
    callback (null, data);
    return;
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    error = doError ('invalid response', e, code, type);
    data = null;
  }

  if (data && data.error) {
    error = doError ('API error', data.error, code, type);
    data = null;
  }

  callback (error, data);
}


/**
 * Send API request
 *
 * @callback callback
 * @param props {object}
 * @param [props.binary=false] {boolean} - Expect binary response
 * @param props.method {string} - HTTP method
 * @param [props.params] {object} - Method parameters
 * @param props.path {string} - Method path
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function apiRequest (props, callback) {
  var options = {
    url: 'https://gtmetrix.com/api/0.1/' + props.path,
    parameters: props.params || null,
    method: props.method,
    headers: {
      'User-Agent': 'gtmetrix.js (https://www.npmjs.com/package/gtmetrix)'
    },
    timeout: config.timeout,
    auth: config.email + ':' + config.apikey,
    binary: props.binary || false
  };

  http.doRequest (options, function (err, res) {
    apiResponse (options, err, res, callback);
  });
}


/**
 * Create test
 *
 * @callback callback
 * @param params {object}
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function testCreate (params, callback) {
  var props = {
    method: 'POST',
    path: 'test',
    params: params
  };

  apiRequest (props, callback);
}


/**
 * Get test result
 *
 * @callback callback
 * @param testId {string} - Test ID
 * @param [resource] {string} - Resource to get, i.e. `screenshot`
 * @param [polling] {number} - Poll state until completion, in ms
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function testGet (testId, resource, polling, callback) {
  var resourceInfo = {};

  var props = {
    method: 'GET',
    path: 'test/' + testId
  };

  if (typeof polling === 'function') {
    callback = polling;
    polling = null;
  }

  switch (typeof resource) {
    case 'function':
      callback = resource;
      resource = null;
      polling = null;
      break;

    case 'number':
      polling = resource;
      resource = null;
      break;

    case 'string':
      resourceInfo = resourceType (resource);
      props.path += '/' + resourceInfo.path;
      props.binary = resourceInfo.binary;
      break;

    default:
      break;
  }

  apiRequest (props, function (err, data) {
    var retryInterval;

    if (err && !polling) {
      callback (err);
      return;
    }

    if (!polling) {
      callback (null, data);
      return;
    }

    if (polling === true) {
      polling = 5000;
    }

    if (typeof polling === 'number') {
      retryInterval = setInterval (function () {
        testGet (testId, resource, function (pErr, pData) {
          // Error, non-binary = fail
          if (pErr && !props.binary) {
            clearInterval (retryInterval);
            callback (pErr);
            return;
          }

          // No error, binary expected = ok
          if (!pErr && props.binary) {
            clearInterval (retryInterval);
            callback (null, pData);
            return;
          }

          // Error, binary expected, not waiting = fail
          if (pErr && props.binary && !pErr.error.match (/Data not yet available/)) {
            clearInterval (retryInterval);
            callback (pErr);
            return;
          }

          // No error, non-binary, complete = ok
          if (!pErr && !props.binary && pData.state !== 'started' && pData.state !== 'queued') {
            clearInterval (retryInterval);
            callback (null, pData);
          }
        });
      }, polling);
    }
  });
}

/**
 * List locations
 *
 * @callback callback
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function locationsList (callback) {
  var props = {
    method: 'GET',
    path: 'locations'
  };

  apiRequest (props, callback);
}


/**
 * List browsers
 *
 * @callback callback
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function browsersList (callback) {
  var props = {
    method: 'GET',
    path: 'browsers'
  };

  apiRequest (props, callback);
}


/**
 * Get browser
 *
 * @callback callback
 * @param browserId {string}
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function browsersGet (browserId, callback) {
  var props = {
    method: 'GET',
    path: 'browsers/' + browserId
  };

  apiRequest (props, callback);
}


/**
 * Get account status
 *
 * @callback callback
 * @param callback {function} - `(err, data)`
 * @return {void}
 */

function accountStatus (callback) {
  var props = {
    method: 'GET',
    path: 'status'
  };

  apiRequest (props, callback);
}


/**
 * Module interface
 *
 * @param props {object}
 * @param props.email {string} - API email
 * @param props.apikey {string} - API key
 * @param [props.timeout=5000] {number} - Request timeut in ms
 * @return {object} - Methods
 */

module.exports = function (props) {
  var key;

  for (key in props) {
    config [key] = props [key];
  }

  return {
    test: {
      create: testCreate,
      get: testGet
    },
    locations: {
      list: locationsList
    },
    browsers: {
      list: browsersList,
      get: browsersGet
    },
    account: {
      status: accountStatus
    }
  };
};
