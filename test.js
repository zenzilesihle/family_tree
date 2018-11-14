var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var mysql = require('mysql');

//MySQL database configuration
var connection =     mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
});

//Create database
connection.connect(function(err){
  if(err)
    console.log("Could not connect to the localhost: "+err)
  else {
    var createDBQuery = 'create database if not exists  family_tree  default character set utf8 default collate utf8_general_ci;';
    // var createDBQuery = 'drop database  family_tree';
    connection.query(createDBQuery, function(errorCreateDB, results){
      if(errorCreateDB)
        console.log("Could not create database family_tree: "+ errorCreateDB);
      else
        console.log("Successfully created database family_tree.")
    });

    connection = mysql.createPool({
      host     : 'localhost',
      user     : 'root',
      password : 'admin',
      database: 'family_tree',
    })

    //Create admin table
    var adminTableQuery = createAdminTable();
    connection.query(adminTableQuery, function(err, results){
      if(err)
        console.log("Could not create admin table : "+ err.sqlMessage)
      else
        console.log("Successfully created admin table.")
    })

  }
});

function createAdminTable(){
  var adminTable = 'CREATE TABLE IF NOT EXISTS admin'+
    '(user_id INT(70) NOT NULL AUTO_INCREMENT,'+
      'email_address VARCHAR(45) NOT NULL,'+
      'password VARCHAR(45) NOT NULL,'+
      'first_name VARCHAR(45) NOT NULL,'+
      'last_name VARCHAR(45) NOT NULL,'+
      'join_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,'+
      'PRIMARY KEY (user_id),'+
      'UNIQUE INDEX user_email_UNIQUE (email_address ASC))';

      return adminTable;
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
