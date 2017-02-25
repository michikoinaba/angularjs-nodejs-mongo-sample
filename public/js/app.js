
angular.module('app', ['ngRoute', 'appRoutes','ngSanitize','chart.js', 'rentedToolsCtrl','toolsCtrl', 'navCtrl', 'RentedToolService','ToolService']);



/**
 * 
 * this function remove a selected div element from the DOM

 * @param itemid

 */
function removeItem( itemid ) {
  var element='';
  element = document.getElementById(itemid ); // will return element

  element.parentNode.removeChild(element); // will remove the element from DOM
  
}//function


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


