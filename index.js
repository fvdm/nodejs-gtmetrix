const { doRequest } = require ('httpreq');
const { promisify } = require ('es6-promisify');


// Default config
const defaults = {
  email: null,
  apikey: null,
  timeout: 5000
};

let pkg = {
  test: {
    get: null
  },
  locations: {},
  browsers: {},
  account: {}
};

let config = {};


/**
 * Get info about resource type
 *
 * @param   {string}  name  The resource name
 * @return  {object}        Resource info object
 */

function resourceType (name) {
  let info = {
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
 * Make an error
 *
 * @return  {Error}
 *
 * @param   {string}       msg   Error.message
 * @param   {mixed}        err   Error.error
 * @param   {number|null}  code  Error.statusCode
 * @param   {string|null}  type  Error.contentType
 */

function doError (msg, err, code, type) {
  let error = new Error (msg);

  error.error = err;
  error.statusCode = code;
  error.contentType = type;
  return error;
}


/**
 * Process API response
 *
 * @callback  callback
 * @return    {void}
 *
 * @param     {object}      options   httpreq options
 * @param     {Error|null}  err       httpreq Error
 * @param     {object}      res       httpreq response
 * @param     {function}    callback  `(err, data)`
 */

function apiResponse (options, err, res, callback) {
  let type;
  let size;
  let code;
  let data;
  let error = null;

  if (err) {
    error = doError ('request failed', err, null, null);
    callback (error);
    return;
  }

  type = String (res.headers ['content-type']) .split (';') [0];
  size = String (res.headers ['content-length']);
  code = res.statusCode;
  data = res.body;

  // Received data, expecting binary
  if (size && options.binary && type.match (/\/(pdf|jpeg|tar)$/)) {
    callback (null, data);
    return;
  }

  // Received something else
  try {
    data = JSON.parse (data);

    if (data.error) {
      error = doError ('API error', data.error, code, type);
      callback (error);
      return;
    }
  } catch (e) {
    error = doError ('invalid response', e, code, type);
    callback (error);
    return;
  }

  // It's real data
  callback (null, data);
}


/**
 * Send API request
 *
 * @callback  callback
 * @return    {void}
 *
 * @param     {object}    props
 * @param     {boolean}   [props.binary=false]  Expect binary response
 * @param     {string}    props.method          HTTP method
 * @param     {object}    [props.params]        Method parameters
 * @param     {string}    props.path            Method path
 * @param     {function}  callback              `(err, data)`
 */

function apiRequest (props, callback) {
  const options = {
    url: 'https://gtmetrix.com/api/0.1/' + props.path,
    parameters: props.params || null,
    method: props.method,
    headers: {
      'User-Agent': 'gtmetrix.js (https://www.npmjs.com/package/gtmetrix)'
    },
    timeout: parseInt (config.timeout, 10) || defaults.timeout,
    auth: config.email + ':' + config.apikey,
    binary: props.binary || false
  };

  doRequest (options, (err, res) => {
    apiResponse (options, err, res, callback);
  });
}


/**
 * Create test
 *
 * @callback  callback
 * @return    {Promise<object>}
 *
 * @param     {object}    params
 * @param     {function}  [callback]  `(err, data)`
 */

pkg.test.create = promisify ((params, callback) => {
  const props = {
    method: 'POST',
    path: 'test',
    params: params
  };

  apiRequest (props, callback);
});


/**
 * Process callback when polling
 *
 * @callback  callback
 * @return    {boolean}               Stop polling? true = yes
 *
 * @param     {object}      props     Request properties
 * @param     {Error|null}  err       Response error
 * @param     {object}      data      Response data
 * @param     {function}    callback  `(err, data)`
 */

function pollingCallback (props, err, data, callback) {
  // API error saying we need to wait
  if (err && String (err.error).match (/Data not yet available/)) {
    return false;
  }

  // Another API error
  if (err) {
    callback (err);
    return true;
  }

  // No API error, binary expected = ok complete
  if (props.binary) {
    callback (null, data);
    return true;
  }

  // No error, non-binary, not running = ok complete
  if (!String (data.state).match (/^(started|queued)$/)) {
    callback (null, data);
    return true;
  }

  // else keep polling
  return false;
}


/**
 * Process test response
 *
 * @callback  callback
 * @return    {void}
 *
 * @param     {object}      params
 * @param     {bool}        params.polling   Keep polling for updates
 * @param     {string}      params.testId    Test ID
 * @param     {string}      params.resource  Test resource
 * @param     {object}      params.props     Request params
 * @param     {Error|null}  err              Response error
 * @param     {mixed}       data             Response data
 * @param     {function}    callback         `(err, data)`
 */

function testResponse (params, err, data, callback) {
  let retryInterval;
  let complete;

  if (err && !params.polling) {
    callback (err);
    return;
  }

  if (!params.polling) {
    callback (null, data);
    return;
  }

  if (params.polling === true) {
    params.polling = 5000;
  }

  if (typeof params.polling === 'number') {
    complete = pollingCallback (params.props, err, data, callback);

    if (complete) {
      return;
    }

    // Test is still running
    retryInterval = setInterval (() => {
      pkg.test.get (params.testId, params.resource, (pErr, pData) => {
        const pComplete = pollingCallback (params.props, pErr, pData, callback);

        if (pComplete) {
          clearInterval (retryInterval);
        }
      });
    }, params.polling);
  }
}


/**
 * Get test result
 *
 * @callback  callback
 * @return    {Promise<object>}
 *
 * @param     {string}    testId      Test ID
 * @param     {string}    [resource]  Resource to get, i.e. `screenshot`
 * @param     {number}    [polling]   Poll state until completion, in ms
 * @param     {function}  [callback]  `(err, data)`
 */

pkg.test.get = promisify ((testId, resource, polling, callback) => {
  let resourceInfo = {};
  let params = {
    testId,
    resource,
    polling,
    props: {
      method: 'GET',
      path: 'test/' + testId
    }
  };

  if (typeof polling === 'function') {
    callback = polling;
    params.polling = null;
  }

  switch (typeof resource) {
    case 'function':
      callback = resource;
      params.resource = null;
      params.polling = null;
      break;

    case 'number':
      params.polling = resource;
      params.resource = null;
      break;

    case 'string':
      resourceInfo = resourceType (resource);
      params.props.path += '/' + resourceInfo.path;
      params.props.binary = resourceInfo.binary;
      break;

    default:
      break;
  }

  apiRequest (params.props, (err, data) => {
    testResponse (params, err, data, callback);
  });
});


/**
 * List locations
 *
 * @callback  callback
 * @return    {Promise<object>}
 *
 * @param     {function}  [callback]  `(err, data)`
 */

pkg.locations.list = promisify ((callback) => {
  const props = {
    method: 'GET',
    path: 'locations'
  };

  apiRequest (props, callback);
});


/**
 * List browsers
 *
 * @callback  callback
 * @return    {Promise<object>}
 *
 * @param     {function}  [callback]  `(err, data)`
 */

pkg.browsers.list = promisify ((callback) => {
  const props = {
    method: 'GET',
    path: 'browsers'
  };

  apiRequest (props, callback);
});


/**
 * Get browser
 *
 * @callback  callback
 * @return    {Promise<object>}
 *
 * @param     {string}    browserId
 * @param     {function}  [callback]  `(err, data)`
 */

pkg.browsers.get = promisify ((browserId, callback) => {
  const props = {
    method: 'GET',
    path: 'browsers/' + browserId
  };

  apiRequest (props, callback);
});


/**
 * Get account status
 *
 * @callback  callback
 * @return    {Promise<object>}
 *
 * @param     {function}  [callback]  `(err, data)`
 */

pkg.account.status = promisify ((callback) => {
  const props = {
    method: 'GET',
    path: 'status'
  };

  apiRequest (props, callback);
});


/**
 * Module interface
 *
 * @return  {object}                        Methods
 *
 * @param   {object}  props
 * @param   {string}  props.email           API email
 * @param   {string}  props.apikey          API key
 * @param   {number}  [props.timeout=5000]  Request timeut in ms
 */

module.exports = (props) => {
  let key;

  for (key in props) {
    config [key] = props [key];
  }

  return pkg;
};
