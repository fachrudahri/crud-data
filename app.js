const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const studentControllers = require('./app/controllers/student_controller');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', studentControllers.homeStudent);
app.get('/databases', studentControllers.findAllStudent);
app.get('/register', studentControllers.saveStudentForm);
app.post('/saved', studentControllers.saveStudent);
app.get('/update/:code', studentControllers.updateStudentForm);
app.post('/update', studentControllers.updateStudent);
app.get('/delete/:code', studentControllers.deleteStudent);
app.get('/detail/:code', studentControllers.findStudent);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
