'use strict';

/**
 * @ngdoc function
 * @name onlinetestApp.directive:menuDir
 * @description
 * # menuDir
 * Directive of the onlinetestApp
 */
angular.module('onlinetestApp')
  .directive('menuDir', function () {
  		return{
  			'restrict':'EMCA',
  			'templateUrl':'views/menu.html',
  			'controller':function($scope,$timeout,$rootScope,$location){
          var isLogin=sessionStorage.getItem('isLoggedIn');
          var role=sessionStorage.getItem('role');
          var uid=sessionStorage.getItem('uid');
          if(isLogin){
              $scope.isLoggedIn=true;
              $scope.role=role;
              $scope.loggedInUser=uid;
              // $timeout(function(){
              //   var homeEle=document.querySelector('.menu > a:first-child')
              //   homeEle.classList.add('active');
              // },1000);
            }else{
               $scope.isLoggedIn=false;
            }
  			

           $rootScope.$on('loginEve',function(eve,dataObj){
              debugger;
              $scope.isLoggedIn=true;
              $scope.role=dataObj.role;
              $scope.loggedInUser=dataObj.userName;
              sessionStorage.setItem('isLoggedIn',true);
              sessionStorage.setItem('uid',dataObj.userName)
              sessionStorage.setItem('role',dataObj.role)
              sessionStorage.setItem('class',dataObj.className);
              sessionStorage.setItem('phone',dataObj.mobile);
           })

           $scope.fnLogout=function(){
               $scope.isLoggedIn=false;
               sessionStorage.clear();
               $location.path('/login');
           }


           $scope.fnMenuClick=function(tabNo){
              var activeEle=document.querySelector('.menu > a.active');
              if(activeEle){
                activeEle.classList.remove('active');
              }
              var clickdEle=document.querySelector('.menu > a:nth-child('+tabNo+')');
              clickdEle.classList.add('active');
           }
  			}
  		}
  });
