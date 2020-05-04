require('./config/database');

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use('/api', require('./routes/api'));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    result: 'error',
    message: err.message
  });
});

module.exports = app;
