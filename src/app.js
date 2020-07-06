const path = require('path');

require('dotenv').config({ path: path.join(__dirname, 'config/config.env') });
require('./db');

const express = require('express');
const { schoolRouter, authRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(schoolRouter);
app.use(authRouter);

module.exports = app;
