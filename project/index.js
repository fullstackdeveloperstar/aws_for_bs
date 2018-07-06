var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require("fs");


//routers 
var routers = require('./router.js');

// app.use(expressSession({secret:'somesecrettokenhere'}));
app.use(expressSession({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

//body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', routers);


// static
app.use(express.static(path.join(__dirname, 'public')));


//view engine
app.set('view engine', 'pug');
app.set('views','./views');

// cookie parser
app.use(cookieParser);

app.listen(3001);
