var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // HTTP logger
var debug = require('debug')('grocery-2:app');
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect(
    'mongodb+srv://supermarket_2_mrd2689a:Kffm2YrahJ5&Zh@supermarket-2.znxwh.mongodb.net/supermarket-2?'
    + '=retryWrites=true&w=majority',
    { useNewUrlParser: true}
);

const db = mongoose.connection;
db.on('error', (err) => debug(`Connection error: ${err}`));
db.once('open', () => {
    debug('Connected to MongoDB');

    app.listen(app.get('port'), () => {
        debug(`Server Listening on port ${app.get('port')}`);
    });
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
