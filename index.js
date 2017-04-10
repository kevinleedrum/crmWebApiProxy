const express = require('express');

const proxy = require('./lib/proxy');

const app = express();
app.use('/api/', proxy);
app.listen(process.env.PORT || 80);
