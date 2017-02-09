

//Dependencies
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema
var Toolschema = new mongoose.Schema({
	 type: {type: String },
	 name: {type: String},
	 description: {type: String},
	 available: {type: String},
	 price: {type: Number}
});


//Return model
var tools = mongoose.model('tools', Toolschema);

//make this available to our users in our Node applications
module.exports = tools;


