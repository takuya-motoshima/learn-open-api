// const path = require('path');
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Allow CORS for all APIs.
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/pets', require('./routes/v1/pets'));

module.exports = app;
