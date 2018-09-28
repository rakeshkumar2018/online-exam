'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.directive:subMenuDir
 * @description
 * # subMenuDir
 * Directive of the onlinetestApp
 */
angular.module('onlinetestApp')
  .directive('subMenuDir', function () {
  		return{
  			'restrict':'E',
  			'template':'<div class="sub-menu"><a ng-click="isNew=true" ng-class="{active:isNew}">Add/Update</a><a ng-class="{active:!isNew}" ng-click="isNew=false;fnView()">View</a></div>',
  			'scope':{
  				'isNew':'=',
  				'fnView':'&'
  			},
  			controller:function($scope){
  				$scope.isNew=true;
  			}
  		}
  });
