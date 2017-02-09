// public/js/services/
angular.module('RentedToolService', []).factory('rented_tools', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/rentedtools');
        },


                // these will work when more API routes are defined on the Node side of things
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