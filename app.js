const express = require('express');
const app = express();
app.use(express.json());
const flagRoutes = require('./routes/flags');
const clientRoutes = require('./routes/clients');
app.use('/flags', flagRoutes);
app.use('/clients', clientRoutes);
module.exports = app;
