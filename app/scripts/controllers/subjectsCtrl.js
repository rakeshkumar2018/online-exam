'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('SubjectCtrl', function ($scope,$timeout,ServerCallService) {
    $scope.ansObj={};
    $scope.isEdit=false;
  	$scope.h=['ID','CLASS NAME','SUBJECT NAEME'];
    $scope.k=['id','className','subjectName'];
  		$scope.postData={
  			'className':'CLASS 1'
  		};


      $scope.getClassList=function(){
          ServerCallService.fnServerCall('classes/getClasses','get',{},function(res){
            $scope.classList=res.data;
          },function(res){

          })
        
      }

      $scope.getClassList();
      
      $scope.fnRegisterSubjects=function(){
        ServerCallService.fnServerCall('subjects/addSubject','post',$scope.postData,function(res){
          if(res.data.affectedRows > 0){
            $scope.msg="Inserted successfully";

          }else{
            $scope.msg="Not inserted";
          }
        },function(res){
          $scope.msg=res.data;
        })
      }

      $scope.subjectsList=function(){
        ServerCallService.fnServerCall('subjects/getSubjects','get',{},function(res){
            $scope.subList=res.data;
        },function(res){
          $scope.msg=res.data;
        })
      }

      $scope.fnEdit=function(rowData){
            $scope.isAdd=true;
            $scope.postData=rowData;
            $scope.isEdit=true;
      }
      $scope.fnDelete=function(rowData){
        var isDelete=confirm('R u sure');
        if(isDelete){
            ServerCallService.fnServerCall('subjects/deleteSubject?id='+rowData.id,'get',{},function(res){
               if(res.data.affectedRows > 0){
                  alert('deleted successfully');
                   $scope.subjectsList();
               }
            },function(res){

            });
      
        }
      }

      $scope.fnUpdateSubject=function(){
        ServerCallService.fnServerCall('subjects/updateSubject','post',$scope.postData,function(res){
            if(res.data.affectedRows > 0){
              $scope.msg="Updated succssfully";
              $timeout(function(){
                  $scope.isEdit=false;
                  $scope.postData={};
                  $scope.postData={
                    'className':'CLASS 1'
                     };
                  $scope.msg="";
              },2000);
           }else{
              $scope.msg="Not Updated ....try again";

           }

        },function(res){
          $scope.msg=res.data;
        })     

         }
     
  });
