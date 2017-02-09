var rented_tools = require('./models/rented_tools');

 module.exports = function(app) {
	 
	 
	  app.get('/api/rentedtools', function(req, res) {
		  
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
     app.get('*', function(req, res) {
    	 res.sendFile('/var/www/html/angularjs-nodejs-mongo/public/index.html'); // load our public/index.html file
      });
     
  
   
}//module.exports = function(app) {

 //
 /*
 var Contact = require('./models/contact');

 
 function showAllContact(response){
 	
 	Contact.find(function(err, contacts){
 		
 		if(err){
 			
 			response.send('Error message: '+err);
 		}
 		else{
 			
 			response.json(contacts); // return all contacts in JSON format
 		}
 		
 	});
 };

 function showSelectedContact(response, id){
 	
 	Contact.findById(id,function(err, contact){
 		
 		if(err){
 			
 			response.send('Error message: '+err);
 		}
 		else{
 			
 			response.json(contact); // return all contacts in JSON format
 		}
 		
 	});
 };
 //api calls


 var contactApp = function (app) {
 	
 	//default page. show all contacts
 	app.get('/api/contacts',function(request,response){
 		
 		showAllContact(response);
 	});
 	
 	//edit the selected contact
 	app.put('/api/contacts/:contact_id', function(request,response){
 		
 		Contact.findByIdAndUpdate({_id: request.params.contact_id},
 				
 				{ $set: { name: request.body.name, phone: request.body.phone }}, function (err, contact) {
 			    
 					//if there are errors, show it
 				if (err) 
 				  return  res.send(err);
 			 
 				//no errors. show the edited contact
 				showSelectedContact(response, request.params.contact_id);
 			});
 	});
 	

 	//post page to add a new contact
 	app.post('/api/contacts',function(request,response){
 		
 		Contact.create({
 			name: request.body.name,
 			phone: request.body.phone
 			
 		},function(err,contact){
 			
 			if(err){
 				
 				response.send('Error message: '+err);
 			}else{
 				
 				showAllContact(response);
 				
 			}//else
 		});
 		
 	});
 	
 };//var contactApp = function (app) {

 module.exports = contactApp; */