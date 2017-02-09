
angular.module('rentedToolsCtrl', [])

//inject the Todo service factory into our controller
.controller('rentedToolsCtrl',['$scope','$http','rented_tools', function($scope, $http,rented_tools ) {
	
	
	
	//get function
	rented_tools.get() //rented_tools is the table name.  populate all rented_tools from the rented_tools table
	.success(function(data) {
		dumpObject(data[0]);
		
		$scope.names = data;
		
	});
	

	
}]);//.controller('

