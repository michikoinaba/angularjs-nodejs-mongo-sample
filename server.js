// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var mongoose = require('mongoose');
var errorhandler = require('errorhandler')
var path = require('path');
var bodyParser = require('body-parser');
var database = require('./config/database');
var app      = express();
var port     = process.env.PORT || 2000;
var router = express.Router();
app.use(router);
/*
const  MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/tool_rental',function (err, database){
	 if (err) {
		  console.log ('ERROR connecting to: ' + 'mongodb://localhost:27017/tool_rental' + '. ' + err);
		  } else {
		  console.log ('Succeeded connected to: ' + 'mongodb://localhost:27017/tool_rental');
		  }
})
*/
//mongo db connect
//mongoose.connect(database.localUrl); 

//Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(database.localUrl, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + database.localUrl + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + database.localUrl);
  }
});

// set up our express application

//app.use(morgan('dev')); // log every request to the console
//app.use(cookieParser()); // read cookies (needed for auth)
router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(bodyParser.json());

//angularjs
app.set('views', __dirname + '/views');

router.use(express.static(path.join(__dirname, 'public')));


//setting up the routes
require('./app/routes.js')(router);
//development only
if ('development' == app.get('env')) {
	router.use(errorhandler());
}
// launch ======================================================================
app.listen(port);
console.log('The port ' + port);
//expose app     
exports = module.exports = app;  
