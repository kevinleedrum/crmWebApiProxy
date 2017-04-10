const https = require('https');
const config = require('../config');

const getHostName = url => url.split('/')[2];
const getPath = url => '/' + url.split('/').slice(3).join('/');

const requestString = generateRequestString(config);
const requestOptions = {
  host: getHostName(config.oauthEndpoint),
  path: getPath(config.oauthEndpoint),
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(requestString)
  }
};

module.exports = function authenticate (currentToken, next) {
  if (isExpired(currentToken)) {
    requestNewToken(next);
  } else {
    next(null, currentToken);
  }
};

function requestNewToken (next) {
  let responseData = [];
  let authenticationRequest = https.request(requestOptions, response => {
    response.on('data', chunk => responseData.push(chunk));
    response.on('end', () => parseToken(responseData, next));
  });
  authenticationRequest.on('error', err => next(err));
  authenticationRequest.write(requestString);
  authenticationRequest.end();
}

function isExpired (token) {
  if (!token.expires_on) return true;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return +token.expires_on <= nowInSeconds;
}

function parseToken (responseData, next) {
  let token = JSON.parse(responseData.join(''));
  let invalidTokenData = !isValid(token) ? token : null;
  next(invalidTokenData, token);
}

function isValid (token) {
  if (typeof token !== 'object') return false;
  return 'access_token' in token;
}

function generateRequestString ({ applicationId, crmUrl, username, password, secret }) {
  crmUrl = encodeURIComponent(crmUrl);
  username = encodeURIComponent(username);
  password = encodeURIComponent(password);
  secret = encodeURIComponent(secret);
  return `client_id=${applicationId}&resource=${crmUrl}&username=${username}&password=${password}&client_secret=${secret}&grant_type=password`;
}
