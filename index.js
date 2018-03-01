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
 * @param   {string}  name  The resource name
 * @return  {object}        Resource info object
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
 * @param   {string}       msg   Error.message
 * @param   {mixed}        err   Error.error
 * @param   {number|null}  code  Error.statusCode
 * @param   {string|null}  type  Error.contentType
 * @return  {Error}
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
 * @callback  callback
 * @param     {object}      options   httpreq options
 * @param     {Error|null}  err       httpreq Error
 * @param     {object}      res       httpreq response
 * @param     {function}    callback  `(err, data)`
 * @return    {void}
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
 * @callback  callback
 * @param     {object}    props
 * @param     {boolean}   [props.binary=false]  Expect binary response
 * @param     {string}    props.method          HTTP method
 * @param     {object}    [props.params]        Method parameters
 * @param     {string}    props.path            Method path
 * @param     {function}  callback              `(err, data)`
 * @return    {void}
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

  http.doRequest (options, (err, res) => {
    apiResponse (options, err, res, callback);
  });
}


/**
 * Create test
 *
 * @callback  callback
 * @param     {object}    params
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
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
 * Process callback when polling
 *
 * @callback  callback
 * @param     {object}      props     Request properties
 * @param     {Error|null}  err       Response error
 * @param     {object}      data      Response data
 * @param     {function}    callback  `(err, data)`
 * @return    {boolean}               Stop polling? true = yes
 */

function pollingCallback (props, err, data, callback) {
  // Error, not waiting = fail
  if (err && String (err.error).match (/Data not yet available/)) {
    callback (err);
    return true;
  }

  // No error, binary expected = ok complete
  if (!err && props.binary) {
    callback (null, data);
    return true;
  }

  // No error, non-binary, complete = ok complete
  if (!err && !props.binary && data.state !== 'started' && data.state !== 'queued') {
    callback (null, data);
    return true;
  }

  // else keep polling
  return false;
}


/**
 * Get test result
 *
 * @callback  callback
 * @param     {string}    testId      Test ID
 * @param     {string}    [resource]  Resource to get, i.e. `screenshot`
 * @param     {number}    [polling]   Poll state until completion, in ms
 * @param     {function}  callback    `(err, data)`
 * @return    {void}
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
    var check;

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
      check = pollingCallback (props, err, data, callback);

      if (check) {
        return;
      }

      retryInterval = setInterval (() => {
        testGet (testId, resource, (pErr, pData) => {
          var pCheck = pollingCallback (props, pErr, pData, callback);

          if (pCheck) {
            clearInterval (retryInterval);
          }
        });
      }, polling);
    }
  });
}


/**
 * List locations
 *
 * @callback  callback
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
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
 * @callback  callback
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
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
 * @callback  callback
 * @param     {string}    browserId
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
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
 * @callback  callback
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
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
 * @param   {object}  props
 * @param   {string}  props.email           API email
 * @param   {string}  props.apikey          API key
 * @param   {number}  [props.timeout=5000]  Request timeut in ms
 * @return  {object}                        Methods
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
