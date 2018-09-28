'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('EditCtrl', function ($rootScope,$timeout,$location,$scope,ServerCallService) {
    $scope.roles=['admin','student','school'];
    // $timeout(function(){
    //   $scope.postData=JSON.parse(sessionStorage.getItem('edituser'));
    // },500)

    $rootScope.$on('editData',function(eve,data){
      $scope.postData=data;
    })

    function updateSucc(res){
        if(res.data.affectedRows > 0){
              $scope.msg="Updated succssfully";
              $timeout(function(){
                $location.path('/schoolsList');
              },2000);
           }else{
              $scope.msg="Not Updated ....try again";

           }
       }
       function updateFail(res){
       }

       $scope.fnUpdate=function(){
        ServerCallService.fnServerCall('users/update','post',$scope.postData,updateSucc,updateFail)
       }
  });
