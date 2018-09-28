'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('LoginCtrl', function ($scope,$location,$rootScope,ServerCallService) {
  		function loginSucc(res){
  			debugger;
  			if(res.data.length){
  				$rootScope.$broadcast('loginEve',res.data[0]);
  				$location.path('/home')
  			}else{
  				$scope.msg="Please check u r uid or pwd";
  			}
  		}
  		function loginFail(res){
  			debugger;
  			$scope.msg=res.data;
  		}
  		$scope.fnLogin=function(){
  			ServerCallService.fnServerCall('users/login','post',$scope.postData,loginSucc,loginFail)
  		}
  });
