const path = require('path');

require('dotenv').config({ path: path.join(__dirname, 'config/config.env') });

const express = require('express');
const schoolRouter = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(schoolRouter);

app.listen(process.env.PORT);
