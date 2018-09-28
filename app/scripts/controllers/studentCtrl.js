'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.controller:StudentCtrl
 * @description
 * # StudentCtrl
 * Controller of the onlinetestApp
 */
angular.module('onlinetestApp')
  .controller('StudentCtrl', function ($interval,$scope,$timeout,ServerCallService) {
  		  $scope.h=['ID','NAME','PASSWORD','CLASS NAME','EMAIL','MOBILE'];
        $scope.k=['id','userName','password','className','email','mobile'];
         $scope.classList=[{
          'className':sessionStorage.getItem('class')
         }];
        $scope.ansObj={};
        $scope.isShow=true;
        $scope.isEdit=false;
        

    $scope.fnRegister=function(){
        debugger;
        $scope.postData.role='student';
        ServerCallService.fnServerCall('users/register','post',$scope.postData,function(res){
          if(res.data.affectedRows > 0){
            $scope.msg="Inserted successfully";
              $scope.postData={};
              $scope.postData={
            'className':'CLASS 1'
        };
          }else{
            $scope.msg="Not inserted";
          }
        },function(res){
          $scope.msg=res.data;
        })
    }


    $scope.studentsList=function(){
         ServerCallService.fnServerCall('users/getUsers','post',{'role':'student'},function(res){
          $scope.stdList=res.data;
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
            ServerCallService.fnServerCall('users/delete','post',{'id':rowData.id},function(res){
               if(res.data.affectedRows > 0){
                  alert('deleted successfully');
                   $scope.studentsList();
               }
            },function(res){

            });
      
        }
    }

    $scope.fnUpdate=function(){
        ServerCallService.fnServerCall('users/update','post',$scope.postData,function(res){
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

  $scope.fnSubmitTest=function(){
     $interval.cancel($scope.timeInterval);
     $scope.isShow=false;
      var keyObj=$scope.questions.reduce(function(io,o){
        io[o.id]=o.ans;
          return io;
      },{});
      var marks=0;
     
      angular.forEach($scope.ansObj,function(v,k){
        var ans='';
          if(typeof(v)=='string'){
            ans=v;
          }else{
            var ansArr=[];
            angular.forEach(v,function(v1,k1){
               if(v1){
                ansArr.push(k1);
               }
            })
            ans=ansArr.sort().join("");
          }
          if(keyObj[k] == ans){
            ++marks;
          }
      });
      var marksPer=(marks/$scope.postData.noOfQue)*100;
      $scope.postData.marks=marksPer;
      $scope.postData.testDate=new Date();
      $scope.postData.userName=sessionStorage.getItem('uid')

      ServerCallService.fnServerCall('results/saveResult','post',$scope.postData,function(res){
       $scope.getLast3TestInfo();
      },function(res){
      })
    }

   $scope.getLast3TestInfo=function(){
      ServerCallService.fnServerCall('results/getResults','post',{'userName':sessionStorage.getItem('uid')},function(res){
        debugger;
        $scope.options=ServerCallService.barOptions;
        var values=[];
        res.data.forEach(function(obj,i){
          values.push({
            "label" : (i+1)+"_" + obj.date.toString(),
            "value" : obj.marks             
          })
        })
        $scope.data = [
            {
                key: "Result",
                values: values
            }
        ]
      },function(res){
      })
   }

 
  $scope.timer=function(){
      $scope.timeInterval=$interval(function(){
                --$scope.timeLeft;
                if($scope.timeLeft== 0){
                  $scope.fnSubmitTest();
                }
              },1000);
  }
  $scope.fnGetQues=function(){
     ServerCallService.fnServerCall('questions/writTest','post',$scope.postData,function(res){
           $scope.questions=res.data;
           if($scope.questions.length > 0){
              $scope.timeLeft=$scope.postData.time;
              var ti=60000;
           $scope.timeInterval=$interval(function(){
                --$scope.timeLeft;
                if($scope.timeLeft== 1){
                  $interval.cancel($scope.timeInterval);
                  $scope.timeLeft=60;
                  $scope.timer();
                }
              },60000);

           }
        },function(res){
          $scope.msg=res.data;
        })
   }

    $scope.fnClassChange=function(className){
      $scope.subList=$scope.allSubjects.filter(function(o){
        return  o.className==className
      });
    }

    $scope.fnSubChange=function(clsName,subName){
      $scope.selTestList=$scope.testList.filter(function(obj){
          
          return obj.className == clsName && obj.subjectName==subName
      })
    }

    $scope.fnTestList=function(){
        ServerCallService.fnServerCall('test/getTests','get',{},function(res){
            $scope.testList=res.data;
        },function(res){
          $scope.msg=res.data;
        })
    }

    $scope.getSubjectList=function(){
       ServerCallService.fnServerCall('subjects/getSubjects','get',{},function(res){
            $scope.allSubjects=res.data;

        },function(res){
          $scope.msg=res.data;
        })
    }


    $scope.getSubjectList();
    $scope.fnTestList();
      
  });
    
