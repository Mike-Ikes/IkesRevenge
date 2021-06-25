var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var productRouter = require('./routes/productRoute');

//connect to database
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
mongoose.connect('mongodb://localhost:27017/products', options)
  .then(() => console.log("Connected to Mongo!"))
  .catch(err => console.error("Mongoose error: " + err))

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  
//handle incoming request routing to individual models
app.use('/products', productRouter);
module.exports = app;




