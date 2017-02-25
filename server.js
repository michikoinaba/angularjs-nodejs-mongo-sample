// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');////Handles put requests
var database = require('./config/database');
//var errorhandler = require('errorhandler')
var path = require('path');

var port     = process.env.PORT || 2000;


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
var app      = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
//override with POST having ?_method=DELETE 
app.use(methodOverride('_method'))


var router = express.Router();
//setting up the routes
require('./app/routes.js')(router);


app.use(express.static(path.join(__dirname, 'public')));


//angularjs
app.set('views', __dirname + '/views');


//development only
//if ('development' == app.get('env')) {
//	router.use(errorhandler());
//}


app.use(router);

// launch ======================================================================
app.listen(port);
console.log('The port ' + port);
//expose app     
module.exports = app;  
