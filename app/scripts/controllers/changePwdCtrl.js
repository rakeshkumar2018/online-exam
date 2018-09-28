'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:ChangepwdCtrl
 * @description
 * # ChangepwdCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('ChangepwdCtrl', function ($scope,ServerCallService) {
  		$scope.fnUpdatePwd=function(){
  			var uid=sessionStorage.getItem('uid');
  			$scope.postData.uid=uid;
  			ServerCallService.fnServerCall('users/updatePwd','post',$scope.postData,pwdSucc,pwdFail)
  		}

  		function pwdSucc(res){
  			if(res.data.affectedRows > 0){
  				$scope.msg="password changed successfully";
  			}else{
  				$scope.msg="Not updated please try again";

  			}
  		}
  		function pwdFail(res){
  				$scope.msg=res.data;
  		}
  		
  });
