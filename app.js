var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var productRouter = require('./routes/productRoute');
var cors = require('cors');


//connect to database
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
mongoose.connect('mongodb://mongodb:27017/products', options)
  .then(() => console.log("Connected to Mongo on localhost:27017/products!"))
  .catch(err => console.error("Mongoose error: " + err))
var app = express();


//UNSAFE_ bypass CORS reestrictions
  //credentials is legacy access-control-allow-credentials
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    optionSuccessStatus: 200,
  }
  
  app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  
//handle incoming request routing to individual models
app.use('/products', productRouter);
module.exports = app;