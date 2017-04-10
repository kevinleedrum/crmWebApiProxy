// These first three values are from the Azure Portal's Azure AD App Registration
const applicationId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const oauthEndpoint = 'https://login.windows.net/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/oauth2/token';
// Add a client_secret key to your app in the Azure portal to generate this
const secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const instance = 'CRM_INSTANCE_NAME';
const crmUrl = `https://${instance}.crm.dynamics.com`;
const apiUrl = `https://${instance}.api.crm.dynamics.com`;
const username = 'USERNAME';
const password = 'PASSWORD';

module.exports = {
  applicationId,
  oauthEndpoint,
  instance,
  crmUrl,
  apiUrl,
  username,
  password,
  secret
};
