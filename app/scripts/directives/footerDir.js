'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.directive:footerDir
 * @description
 * # footerDir
 * Directive of the onlinetestApp
 */
angular.module('onlinetestApp')
  .directive('footerDir', function () {
  		return{
  			'restrict':'EAMC',
  			'templateUrl':'views/footer.html'
  		}
  });
