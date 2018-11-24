/**
 * filename: express_app.js
 */

// module dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// require the Routing File
const index = require('./routes/indexRoute');

// ** Key line that fires off an express app
var app = express();

// view engine setup (required) -- express comes with templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // JADE to make html files

// use some shit
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// tell express where static files live
app.use(express.static('client/src')); // change to 'client/dist' when you have a build process

// Call the Routes
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals on the response object, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // make the whole express 'app' available 
 