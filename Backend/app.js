var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // allows the Vue.js application to make cross-origin requests  // on a different domain and port
require('dotenv').config(); // enables you to load environment variables from a .env file into the process.env global variable // loads values from a .env file, which can be stored outside of your codebase and kept secret.

const conn = require('./connection/connect');
global.conn = require('./connection/connect');

conn.connect((err) => {
  if(err) throw err;
  console.log('Connected to database!');
});

var customerRouter = require('./routes/customer');
var employeeRouter = require('./routes/employee');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var supplierRouter = require('./routes/supplier');
var shipperRouter = require('./routes/shipper');
var orderRouter = require('./routes/order');

var app = express();
app.use(cors()); // ensures that Vue.js can make HTTP requests to the backend and retrieve the data it needs

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/catergory', categoryRouter);
app.use('/product', productRouter);
app.use('/supplier', supplierRouter);
app.use('/shipper', shipperRouter);
app.use('/order', orderRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
