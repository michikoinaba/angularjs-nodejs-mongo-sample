// public/js/services/
angular.module('RentedToolService', []).factory('rented_tools', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/rentedtools');
        },

        //get all rented_date
        getdate: function(){
        	return $http.get('/api/rentedtools');
        	
        },
        
        //populate all tools data for the selected date
        gettool: function(date){
        	return $http.get('/api/rentedtools/'+date);
        	
        },
        
        
        // call to POST and create a new nerd
        create : function(data) {
            return $http.post('/api/rentedtools', data);
        },

        // call to DELETE a nerd
      //  delete : function(id) {
       //     return $http.delete('/api/nerds/' + id);
       // }
    }       

}]);