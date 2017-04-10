const request = require('request');

const authenticate = require('./auth');
const config = require('../config');

let currentToken = {};

module.exports = function proxyRequest (req, res) {
  authenticate(currentToken, (err, token) => {
    if (err) {
      res.status(500).send({ err });
      return;
    }
    currentToken = token;
    const requestOptions = generateRequestOptions(token, req);
    req.pipe(request(requestOptions)).pipe(res);
  });
};

function generateRequestOptions (token, req) {
  const url = config.apiUrl + '/api' + req.url;
  const headers = {
    'Authorization': 'Bearer ' + token.access_token,
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
  };
  return { url, headers };
}
