# CRM Online Web API Proxy Server

All GET requests sent to this simple
[express](https://github.com/expressjs/express) server will be forwarded to the
CRM Online Web API using the [request](https://github.com/request/request)
module. The server will automatically retrieve and refresh the necessary access
token from the endpoint provided by the
[Azure Portal](https://portal.azure.com/)'s Azure AD App Registration page.

## Setup

Modify `config.js` as needed.  You'll need to register an app in  [Azure Portal](https://portal.azure.com/) to get some of these values.

``` bash
# install modules
yarn

# start server
node index.js
```
