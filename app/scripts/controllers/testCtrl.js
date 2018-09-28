'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('TestCtrl', function ($scope,$location,$timeout,ServerCallService) {
    $scope.isEdit=false;
  	
    $scope.qk=['id','className','subjectName','testName','questionName','opt1','opt2','opt3','opt4','ans','queType'];
    $scope.qh=['ID','CLASS NAME','SUBJECT NAME','TEST NAEM', 'QUESTION', 'OPTION 1','OPTION 2','OPTION 3', 'OPTION 4', 'ANSWER','QUESTION TYPE']
    $scope.h=['ID','CLASS NAME','SUBJECT NAME','TEST NAME'];
    $scope.k=['id','className','subjectName','testName']

    
    $scope.fnRegisterTest=function(){
       ServerCallService.fnServerCall('test/addTest','post',$scope.postData,function(res){
          if(res.data.affectedRows > 0){
            $scope.msg="Inserted successfully";

          }else{
            $scope.msg="Not inserted";
          }
        },function(res){
          $scope.msg=res.data;
        })
    }

    $scope.fnUpdateTest=function(){
          ServerCallService.fnServerCall('test/updateTest','post',$scope.postData,function(res){
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

    $scope.getClassList=function(){
        ServerCallService.fnServerCall('classes/getClasses','get',{},function(res){
            $scope.classList=res.data;
          },function(res){

          })
    }

    $scope.getSubjectList=function(){
       ServerCallService.fnServerCall('subjects/getSubjects','get',{},function(res){
            $scope.allSubjects=res.data;

        },function(res){
          $scope.msg=res.data;
        })
    }

    $scope.fnClassChange=function(className){
      $scope.subList=$scope.allSubjects.filter(function(o){
        return  o.className==className
      });
    }

    $scope.fnTestList=function(){
        ServerCallService.fnServerCall('test/getTests','get',{},function(res){
            $scope.testList=res.data;
        },function(res){
          $scope.msg=res.data;
        })
    }

    $scope.fnEdit=function(rowData){
        $scope.isAdd=true;
        $scope.isEdit=true;
        $scope.fnClassChange(rowData.className);
        $scope.postData=rowData;
    }

    $scope.fnDelete=function(rowData){
       var isDelete=confirm('R u sure');
        if(isDelete){
            ServerCallService.fnServerCall('test/deleteTest?id='+rowData.id,'get',{},function(res){
               if(res.data.affectedRows > 0){
                  alert('deleted successfully');
                   $scope.testList();
               }
            },function(res){

            });
      
        }
    }

    $scope.fnSubChange=function(clsName,subName){
      $scope.selTestList=$scope.testList.filter(function(obj){
          
          return obj.className == clsName && obj.subjectName==subName
      })
    }


   $scope.fnInsertQue=function(){
     ServerCallService.fnServerCall('questions/addQuestion','post',$scope.postData,function(res){
          if(res.data.affectedRows > 0){
            $scope.msg="Inserted successfully";
             $scope.postData={};
          }else{
            $scope.msg="Not inserted";
          }
        },function(res){
          $scope.msg=res.data;
        })
   }
   $scope.fnUpdateQue=function(){
      ServerCallService.fnServerCall('questions/updateQuestion','post',$scope.postData,function(res){
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

   $scope.fnGetQues=function(){
     ServerCallService.fnServerCall('questions/getQuestions','post',$scope.postData,function(res){
           $scope.qL=res.data;
        },function(res){
          $scope.msg=res.data;
        })
   }

   $scope.fnEditQue=function(rowData){
    $scope.isAdd=true;
    $scope.isEdit=true;
    $scope.postData=rowData;
   }
   $scope.fnDeleteQue=function(rowData){
     var isDelete=confirm('R u sure');
        if(isDelete){
            ServerCallService.fnServerCall('questions/deleteQuestion?id='+rowData.id,'get',{},function(res){
               if(res.data.affectedRows > 0){
                  alert('deleted successfully');
                  $scope.postData={
                    'className':rowData.className,
                    'subjectName':rowData.subjectName,
                    'testName':rowData.testName
                  }
                  $scope.fnGetQues();
               }
            },function(res){

            });
      
        }
   }

    $scope.getClassList();

    $scope.getSubjectList();
    if($location.path() == '/questions'){
    $scope.fnTestList();
  }
  });
