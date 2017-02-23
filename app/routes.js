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
	 
	 
	 ///add new tool
	 router.post('/api/tools', function (req, res){
		    var available;
		    
		    if(req.body.add_available==1)	
			     available = 1;
			     else
			     available = 0;
		    
		    // create a new tool
		    var tool = tools({
		      name: req.body.name,
		      type: req.body.type,
		      description: req.body.description,
		      price:req.body.price,
		      available:available
		      
		    });
		 	
		     
		 return tool.save(function(err){
			
			 if(err)
				 console.log('Error '+err);
			 
			 return res.send(tool);
		 });
		
		 
		});
	 
	 //delete a tool from the selected id
	//get the selected tool
	 router.delete('/api/tools/:_id', function(req,res){
		 
		 tools.remove({
	            _id: req.params._id
	        }, function(err, tool) {
	            if (err)
	                res.send(err);
	            else
	           res.json({ message: 'Successfully deleted a tool' });
	        });
		});
	 
	//////////////rented_tools/////////////////////////////////////
	 
	 //get all rented_date values.
	 router.get('/api/rentedtools', function(req, res) {
		 
		 rented_tools.find({},'rented_date',function(err, data){
			  if (err)
              res.send(err);
			  else
			  res.json(data);
		 });
      });
	 
	 //get all tools for the selected rented date
	 router.get('/api/rentedtools/:_date', function(req, res) {
		 
		 var all_tools=[];
		 var selected_date = req.params._date;
		 
		  //res.send({'selected date ':req.params._date});
		 rented_tools.find({'rented_date':  {'$regex': selected_date}},function(err, data){
			  
			 if (err){
				 err_message= makeMongooseErrorMsgArray(err);
				  res.send(err_message);
			  }
              
			  else{
				  
				  var i=0;
				  //get the length of this data
				  var len = data.length;
				
				  //loop thru the data object and populate tools from the tool_id
				  for (property in data) {
				    	var tool_id = data[property].tool_id;	 
					    tools.findById( {_id:data[property].tool_id }, function(error, tool){
							
					    	var obj = tool.toObject();
					    	//console.log(JSON.stringify(obj));
					    	if(error){
								return  res.send('ERROR!! '+error);
							}
							else{
								//adding all tool info into all_tools object
								all_tools.push(obj);
								i++;
							}//else
					    	
					    	//if this is the last item of the data, send the all_tools object
					    	if(i==len){
					    		
					    		res.json(all_tools);
					    	}
					    			   
						});
						 
				  }//  for (property in data) {
			
			  }//else
			
		 });
      });
	 
	 

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
 * output error message from mongoose
 * 
 */
 var makeMongooseErrorMsgArray = function(err){
	    var msgArray = [];
	    if (err.errors) { // validation errors
	        $.each(err.errors, function (key, val) {
	            msgArray.push(val.message);
	        });
	    } else if (err.message){ // should be execution error without err.errors
	       // errLogr.log(err); // log execution errors
	        msgArray.push(err.message);
	    } else {
	        msgArray.push('Unknown error');
	    }
	    return msgArray;
	}


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

