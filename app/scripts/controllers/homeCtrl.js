'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('HomeCtrl', function ($scope,$rootScope) {
  	  $rootScope.$on('loginEve',function(eve,userObj){

  	  	  $scope.role=userObj.role;
  	  })
  });
