
angular.module('rentedToolsCtrl', [])

//inject the Todo service factory into our controller
.controller('rentedToolsCtrl',['$scope','$http','rented_tools', function($scope, $http,rented_tools ) {
	
	//get all rented_date from then rented_tools table
	rented_tools.getdate()
	.success(function(data) {
		//dumpObject(data[0]);
        var months =data;
        
        //get the months object and create options array for the dropdown list
	    if(months !=''){
	    	
	    	var operators=[];
	    	var month='';
	    	var previous_month=''
	    	var count=0;
	    	
	    		
	    	//default selection
	        $scope.selectedMonth = {
	            operator: 'selectmonth'
	        }

	    	//first option (which is a default option)
	    	operators[count++]={value: 'selectmonth', displayName: '-Select One-' }
	    	
	    	for (property in months) {
		    	 // console.log('property '+months[property].rented_date);
		    	  
	    		//remove the time from rented_date string (ex  2016-10-31 18:49:15)
		    	  var dates_array = months[property].rented_date.split(' ');
					
					//get the yyyy-mm-dddd part.
					date = dates_array[0].trim();
					
					//now get only yyyy-mm part
					var months_array = date.split('-');
					
					//create yyyy-mm string here
					month = months_array[0]+'-'+months_array[1];
					
					//dont want to add duplicate elements. so check if this month string is not the same as the pre month string
					if((month !='') && (previous_month!=month))
						operators[count++]={ value: month, displayName: month};
		    	 
					//assign this month as a previous month
					previous_month = month;
					
		    }// for (property in months) {
	    	
	    }//if(months !=''){
	    //console.log(JSON.stringify(operators));
	  
	    $scope.operators =operators;
	    
	});
	
	
	 $scope.tools='';
	
	 //get the select list value and populate the month's data
	   $scope.selectedChange = function(selected_month){
		   // console.log('selected '+selected_month );
		   
		   //hide the pie chart
			$scope.showPieChart =false;
		
			rented_tools.gettool(selected_month) 
			.success(function(data) {
			
			//generate json string
			var json_string=jQuery.parseJSON(data);
				$scope.tools = json_string;
			})
			 .error(function(data, status, headers, config){
			        Materialize.toast('Unable to retrieve record.', 4000);
			 });
		
	   }//  $scope.selectedChange = function(){
	   
	
	//get function
	rented_tools.get() //rented_tools is the table name.  populate all rented_tools from the rented_tools table
	.success(function(data) {
		//dumpObject(data[0]);
		
		$scope.names = data;
		
	});
	
	
	//show a pie chart
	$scope.showChart = function(){
		
		//show or hidden the pie chart (Chart button to show/hide)
		$scope.showPieChart =! $scope.showPieChart;
		
		
		//no tools are in the table. so show the error message
		if($scope.tools ==''){
			message="No month is selected";
			 Materialize.toast(message, 4000);
			
		}else{
			//console.log('tool ids '+ $scope.tools);
			
			var tools = $scope.tools;
			var labels=[];
			var tool_ids=[];
			var data=[];
			
			
			 //get all rented tools ids
			for (property in tools) {
		    
				 //adding into the ids array
				tool_ids.push(tools[property]._id);
				  
		    }//for (property in tools) {
			
			//console.log(JSON.stringify(tool_ids));
			
			
			//now populate all rented tools(not distinct tool_id but all duplicate tool_id to count how many time each tool was rented in the month)
			
			//get all tools ids.
			rented_tools.gettool($scope.selectedMonth.operator) 
			.success(function(data) {
			
				
			//generate json string
			  var json_string=jQuery.parseJSON(data);
			  var allTools = json_string;
			  
			console.log(JSON.stringify(data));
			  //loop thru tools obj and id obj.
		        //get the number of tool ids that was rented.
		        var len = tool_ids.length;
		        for(var i = 0; i < len; i++) {
		        	
		        	 //count the number of each tool_id
			        var counter=0;
			        
		        	for(toolProp in allTools) {
		        		
		        		//console.log('tool_id '+tool_ids[i] );
		        		//console.log('allTools '+allTools[toolProp]._id);
		        		
		        		if(tool_ids[i] ==allTools[toolProp]._id ){
		        			
		        			//increment the counter
		        			counter++;
		        			
		        		}//if(tool_ids[i] ==allTools[toolProp].id ){
		           
		           
		        	}//for (toolProp in allTools) {
		        	allTools.push(counter);
					
		        }//  for (var i = 0; i < len; i++) {
		      
		        //now add labels from the tool_ids
		        for(var j = 0; j < len; j++) {
		        	
		        	for (prop in tools) {
		        		
		        		//console.log('data '+tool_ids[j] + ' tools.id '+tools[prop]._id +'tool.name '+tools[prop].name );
		        		if(tool_ids[j] == tools[prop]._id ){
		        			
		        			labels.push(tools[prop].name);
		        			
		        		}//if(data[j] ==tools[prop].id ){
		        		
		        	}//for (prop in tools) {	
		   
		        }//  for(var j = 0; j < data_len; j++) {
		        
		    	//console.log(JSON.stringify(labels));
				//console.log(JSON.stringify(allTools));
		    	//labels
				$scope.labels = labels;
				
				//chart data
				$scope.data = allTools;
				
				//show legend
				$scope.options = {legend: {display: true}};
		    })// .success(function(response){
		       
			.error(function(data, status, headers, config){
				Materialize.toast('Unable to retrieve all rented tools record.', 4000);
			 });	
			  
		
		}//else
		
	
	}//$scope.showChart = function(){	
	
}]);//.controller('

