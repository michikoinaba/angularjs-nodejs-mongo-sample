
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
	    
	    $scope.operators =operators;
	    
	});
	
	
	 $scope.tools='';
	
	 //get the select list value and populate the month's data
	   $scope.selectedChange = function(selected_month){
		    console.log('selected '+selected_month );
		   
		   //hide the pie chart
			$scope.showPieChart =false;
			////
			rented_tools.gettool(selected_month) 
			.success(function(data) {
				
				var json_string = angular.toJson(data); 
				console.log('data '+json_string);
				//get the json string
				//var json_data = JSON.stringify(obj);
				//console.log(json_data);
				$scope.tools = json_data;
			
			});
			////
		   //console.log('selectedMonth.operator:'+$scope.selectedMonth.operator);
		 /*   //populate tools here
		    $http.post('get_selectedMonthRentedTools.php', {
		        'month' : $scope.selectedMonth.operator,
		        
		    })
		    .success(function(response){
		         
		       // dumpObject(response);
		        $scope.tools = response.records;
		       
		    
		    })
		    .error(function(data, status, headers, config){
		        Materialize.toast('Unable to retrieve record.', 4000);
		    });
		    */
	   }//  $scope.selectedChange = function(){
	   
	
	//get function
	rented_tools.get() //rented_tools is the table name.  populate all rented_tools from the rented_tools table
	.success(function(data) {
		dumpObject(data[0]);
		
		$scope.names = data;
		
	});
	

	
}]);//.controller('

