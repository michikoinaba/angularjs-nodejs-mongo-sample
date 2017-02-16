var rented_tools = require('./models/rented_tools');
var tools = require('./models/tools');

//var router = require('express').Router();

 module.exports = function(router) {
	 
	 
	 //populate all tools data from the tools table.
	 router.get('/api/tools', function(req, res) {
		
         // use mongoose to get all nerds in the database
		  tools.find(function(err, data) {

             // if there is an error retrieving, send the error. 
                             // nothing after res.send(err) will execute
             if (err)
                 res.send(err);
         
           res.json(data); // return all nerds in JSON format
         });
     });
	 
	  
	//get the selected tool
	 router.get('/api/tools/:_id', function(request,response){
	 
	    
	    tools.findById( {_id:request.params._id }, function(err, tool){
			   if(err){
				   return  response.send('ERROR!! '+err);
			   }
			   else{
				   response.json(tool);
				 
			   }
			   
		   });
	
		});
		
	//update the selected tool
	///
	 router.put('/api/tools/:_id', function (req, res){
	
		  return tools.findById(req.params._id, function (err, tool) {
		     tool.name = req.body.name;
		     tool.type = req.body.type;
		     tool.description = req.body.description;
		     tool.price = req.body.price;
		     
		     if(req.body.edit_available==1)	
		     tool.available = 1;
		     else
		     tool.available = 0;
		     //console.log(JSON.stringify(req.body));
		    return tool.save(function (err) {
		      if (err) {
		      
		        console.log('Error '+err);
		      }
		      return res.send(tool);
		    });
		  });
		 
		});
	////
	/* app.put('/api/tools/:_id', function(request,response){
		
		
		 var values = request.body;
		    var id = request.params._id;
		    tools.update({_id: id}, values, function(err, values) {
		        if (!err) {
		        	response.json(values);
		        } else {
		        	response.write("fail");
		        }
		    });
		//response.json({type:request, _id: request.params._id});
		tools.save({ _id: request.params._id },  { $set: { name: request.body.name, description: request.body.description,price: request.body.price ,
			
			type: request.body.type,  available: request.body.available }},
			
			function(err, tool){
				if(err)
					 return  response.send('ERROR!! '+err);
				
				
			});
			
		
		});
	 */
	 router.get('/api/rentedtools', function(req, res) {
		  
          // use mongoose to get all nerds in the database
		  rented_tools.find(function(err, data) {

              // if there is an error retrieving, send the error. 
                              // nothing after res.send(err) will execute
              if (err)
                  res.send(err);
          	
             // var output, property;
             // for (property in data) {
              	
               //   output += property + ': ' + data[property] + '; ';
             // }
             // console.log(' dumpObject '+output);
              res.json(data); // return all nerds in JSON format
          });
      });

	 /*
		//default page. show all rented tools
		app.get('/api/rentedtools',function(req, res){
			
		   // if (err)
		    //	res.send('ERROR!!! '+err);

		    res.json(res); // return all nerds in JSON format
		});
		
		*/
	// frontend routes =========================================================
     // route to handle all angular requests
	 router.get('*', function(req, res) {
    	 res.sendFile('/var/www/html/angularjs-nodejs-mongo/public/index.html'); // load our public/index.html file
      });
     
  
   
}//module.exports = function(app) {
 


 /**
  * chome way to output an object
  * 
  * @param obj
  */
 function dumpObject (obj) {
     var output, property;
     for (property in obj) {
     	
         output += property + ': ' + obj[property] + '; ';
     }
     console.log(' dumpObject '+output);
 }

