
angular.module('toolsCtrl', [])

//inject the Todo service factory into our controller
.controller('toolsCtrl',['$scope','$http','$route','tools', function($scope, $http,$route,tools ) {
	
	 // hide the create form modal
	$scope.showModal = true;
	
	$(document).ready(function(){
	    // initialize modal
	    $('.modal').modal();
	  
	});
	//get function
	//get function is coming from ToolService.js
	tools.get() //tools is the table name.  populate all tools from the tools table
	.success(function(data) {
		//dumpObject(data[0]);
		
		$scope.names = data;
		
	});
	

	$scope.showEditForm = function(tool_id){
		$scope.formData={};
	    //remove all form values from previous modal.
	    $scope.clearForm();
	    ///
	    if(tool_id!= undefined){
			
	    	//get tool row for the selected tool_id with getone which defines in the ToolService.js
			tools.getone(tool_id)
			.success(function(data) {
				//dumpObject(data);
				// put the values in form
				 //assign data to the formData
		        $scope.formData=data;
		      
				$scope.id = data["_id"];
		        
		        if(data['available']=='1')
		        	$scope.formData.edit_available = 1;
		        else
		        	$scope.formData.edit_available = 0;
		        
		       
		        // show modal
		        $('#modal-edit-form').modal('open');
			})  .error(function(data, status, headers, config){
		        Materialize.toast('Unable to retrieve record.', 4000);
		    });
			
		}// if(tool_id!=''){
	    
	 
	}//	$scope.showEditForm = function(){
	
	
	// update tool data
	$scope.updateTool = function(){
	         
		
		//console.log('available '+$scope.available.value);
		
		if($scope.edit_available==undefined){
			
			$scope.available_error = 'Available field is required';
			
			//console.log('available '+$scope.available_error);
		}//if($scope.available==undefined){
		
		if ($scope.modalEditForm.form.$valid) {
            
			//since the price string has (dollars per week) in the end, split the () from the string.
			//price field only takes a decimal in database.
			var price_array = $scope.price.split('(');
			
			//price decimal
			var price = price_array[0].trim();
		
			//console.log('selected id '+ $scope.id);
			//dumpObject($scope.formData);
			//edit is coming from the ToolService.js
			tools.update( $scope.id,   $scope.formData)
			.success(function(data) {
				 $scope.formData = {}; // clear the form so our user is ready to enter another
	             $scope.names = data;
	             // console.log(data);
		        
	             // close modal
			        $('#modal-edit-form').modal('close');
		        //refresh the page to show the new row of  tools.
		        $route.reload();
			})  .error(function(data, status, headers, config){
				//show error message
		        Materialize.toast('Unable to update record.', 4000);
		    });
	    
		 }//if ($scope.modalForm.$valid) {
		 
       
	}//$scope.updateTool = function(){
	
	// clear variable / form values
	$scope.clearForm = function(){
		
		//reset all validation error messages.
		$scope.modalEditForm.form.$setPristine();
		$scope.modalEditForm.form.$setUntouched();
		$scope.available_error='';
		
	    $scope.id = "";
	    $scope.type = "";
	    $scope.name = "";
	    $scope.description = "";
	    $scope.price = "";
	    $scope.edit_available = "";
	}//$scope.clearForm = function(){
	
	
}]);//.controller('
