'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.directive:tableDir
 * @description
 * # tableDir
 * Directive of the onlinetestApp
 */
angular.module('onlinetestApp')
  .directive('tableDir', function () {
  		return{
  			'restrict':'E',
  			'templateUrl':'views/table.html',
  			'scope':{
  				'headers':'=',
  				'keys':'=',
  				'data':'=',
          'fnEdit':'&',
          'fnDelete':'&'
  			}
  		}
  });
