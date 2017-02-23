// public/js/appRoutes.js
    angular.module('appRoutes', [])//,'ngMessages','chart.js','ngSanitize'
    .config( function($routeProvider, $locationProvider,$compileProvider) {
        
    	$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
    
     $routeProvider
    .when('/', {
        templateUrl: 'views/read.html',
        controller: 'toolsCtrl',
        
      })
      .when('/rented', {
          templateUrl: 'views/rentedtools.html',
          controller: 'rentedToolsCtrl',
          
        })
   
      .otherwise({
        redirectTo: '/'
      });

   // $locationProvider.html5Mode(true);

}).run(function($rootScope){
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        console.log(event, current, previous, rejection)
      })
    });

    
  