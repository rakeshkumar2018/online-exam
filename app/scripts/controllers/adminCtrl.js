'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('AdminCtrl', function ($rootScope,$timeout,$location,$scope,ServerCallService) {
  	   $scope.roles=['admin','student','school'];
  	   $scope.h=['USER NAME', 'PASSWORD', 'EMAIL', 'MOBILE'];
  	   $scope.k=['userName','password','email','mobile']
       $scope.postData={
       	 'role':'school'
       }

       function regSucc(res){
       	   if(res.data.affectedRows > 0){
       	   	  $scope.msg="Registered succssfully"
       	   }else{
       	   	  $scope.msg="Not registered ....try again";

       	   }
       }

       function regFail(res){
       		$scope.msg=res.data;
       }

       $scope.fnRegister=function(){
       		ServerCallService.fnServerCall('users/register','post',$scope.postData,regSucc,regFail)
       }

       function usersSucc(res){
       	$scope.usersList=res.data;
       }
       function usersFail(res){
       }

       $scope.fnGetUsers=function(){
       	    var _dataObj={
       	    	'role':'school'
       	    }
       		ServerCallService.fnServerCall('users/getUsers','post',_dataObj,usersSucc,usersFail)
       }
       if($location.path() =='/schoolsList'){
         $scope.fnGetUsers();
       }


       $scope.fnEdit=function(userObj){
        // sessionStorage.setItem('edituser',JSON.stringify(userObj));
         $location.path('/editUser');
         $timeout(function(){
           $rootScope.$broadcast('editData',userObj);
         },2000);
       }

       $scope.fnDelete=function(userObj){
        var isOk=confirm('R u sure');
        if(isOk){
          var _dataObj={
            'id':userObj.id
          }
          ServerCallService.fnServerCall('users/delete','post',_dataObj,deleteSucc,deleteFail)
        }
       }


       function deleteSucc(res){
          if(res.data.affectedRows > 0){
            $scope.fnGetUsers();
            alert('deleted successfull');
          }else{
             alert('not deleted');
          }
          
       }

       function deleteFail(res){
          alert(res.data);
       }

      
  });
