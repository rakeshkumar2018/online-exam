'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:ClassCtrl
 * @description
 * # ClassCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('ClassCtrl', function ($timeout,$scope,ServerCallService) {
    $scope.h=['ID','CLASS NAME'];
    $scope.k=['id','className'];
    $scope.isEdit=false;
    

    $scope.classList=function(){
        ServerCallService.fnServerCall('classes/getClasses','get',{},function(res){
          $scope.cl=res.data;
        },function(res){
        })
    }

    $scope.fnEdit=function(dataObj){
      $scope.isAdd=true;
      $scope.isEdit=true;
      $scope.postData=dataObj;
      
    }
    $scope.fnDelete=function(dataObj){
      var isOk= confirm('R u sure');
      if(isOk){
        ServerCallService.fnServerCall('classes/deleteClass?id='+dataObj.id,'get',{},(res)=>{
          debugger;
          if(res.data.affectedRows > 0){
            $scope.classList();
          }
        },function(res){
          debugger;
        });
      }
    }
  	

     //register class succ callback
    function fnRegisterClassSucc(res){
     	if(res.data.affectedRows > 0){
     		$scope.msg="inserted successfully"
     	}else{
     		$scope.msg="Not inserted";
     	}
        
     }

     //register class err callback
   function  fnRegisterClassErr(res){
     	debugger;
     	$scope.msg=res.data;
     }


    $scope.fnRegisterClass=function(){
    	ServerCallService.fnServerCall('classes/addClass','POST',$scope.postData,fnRegisterClassSucc,fnRegisterClassErr)
    }

    $scope.fnUpdateClass=function(){
      debugger;
       ServerCallService.fnServerCall('classes/updateClass','post',$scope.postData,function(res){
          debugger;
          if(res.data.affectedRows > 0){
              $scope.msg="Updated succssfully";
              $timeout(function(){
                  $scope.isEdit=false;
                  $scope.postData={};
                  $scope.msg="";
              },2000);
           }else{
              $scope.msg="Not Updated ....try again";

           }

       },function(res){
          debugger;
       });
    }
  });
