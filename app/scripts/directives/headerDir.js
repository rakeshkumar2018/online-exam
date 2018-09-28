'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.directive:headerDir
 * @description
 * # headerDir
 * Directive of the onlinetestApp
 */
angular.module('onlinetestApp')
  .directive('headerDir', function () {
  		return{
  			'restrict':'EACM',
  			'templateUrl':'views/header.html'
  		}
  });
