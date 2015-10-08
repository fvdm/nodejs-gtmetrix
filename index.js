var http = require ('httpreq');
var config = {
  email: null,
  apikey: null,
  timeout: 5000
};

function talk (props, callback) {
  var options = {
    url: 'https://gtmetrix.com/api/0.1/' + props.path,
    parameters: props.params || null,
    method: props.method || 'GET',
    headers: {
      'User-Agent': 'gtmetrix.js (https://www.npmjs.com/package/gtmetrix)'
    },
    timeout: config.timeout || 5000,
    auth: config.email + ':' + config.apikey,
    binary: props.binary || false
  };

  http.doRequest (options, function (err, res) {
    var type = res && res.headers ['content-type'] .split (';') [0] || '';
    var size = res && res.headers ['content-length'] || null;
    var code = res && res.statusCode;
    var data = res && res.body || null;
    var error = null;

    if (err) {
      error = new Error ('request failed');
      error.error = err;
      callback (error);
      return;
    }

    if (size && props.binary && type.match (/\/(pdf|jpeg|tar)$/)) {
      callback (null, data);
      return;
    }

    try {
      data = JSON.parse (data);
    } catch (e) {
      error = new Error ('invalid response');
      error.statusCode = code;
      error.contentType = type;
      error.error = e;
      data = null;
    }

    if (data && data.error) {
      error = new Error ('API error');
      error.statusCode = code;
      error.contentType = type;
      error.error = data.error;
      data = null;
    }

    callback (error, data);
  });
}

module.exports = function (props) {
  var key;

  for (key in props) {
    config [key] = props [key];
  }

  return {
    test: {
      create: function (params, callback) {
        talk ({ method: 'POST', path: 'test', params: params }, callback);
      },
      get: function (testId, resource, callback) {
        var params = {
          method: 'GET',
          path: 'test/' + testId
        };

        if (typeof resource === 'string') {
          params.path += '/' + resource;
          params.binary = resource.match (/(screenshot)/);
        } else {
          callback = resource;
        }

        talk (params, callback);
      }
    },
    locations: {
      list: function (callback) {
        talk ({ method: 'GET', path: 'locations' }, callback);
      }
    },
    browsers: {
      list: function (callback) {
        talk ({ method: 'GET', path: 'browsers' }, callback);
      },
      get: function (browserId, callback) {
        talk ({ method: 'GET', path: 'browsers/' + browserId }, callback);
      }
    },
    account: {
      status: function (callback) {
        talk ({ method: 'GET', path: 'status' }, callback);
      }
    }
  };
};
