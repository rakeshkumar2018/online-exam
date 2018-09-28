'use strict';

/**
 * @ngdoc overview
 * @name onlinetestApp
 * @description
 * # onlinetestApp
 *
 * Main module of the application.
 */
angular
  .module('onlinetestApp', [
    'ngRoute',
    'nvd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
       .when('/editUser', {
        templateUrl: 'views/editUser.html',
        controller: 'EditCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/createSchool', {
        templateUrl: 'views/admin/createSchool.html',
        controller: 'AdminCtrl'
      })
      .when('/schoolsList', {
        templateUrl:'views/admin/schoolsList.html',
        controller: 'AdminCtrl'
      })


      .when('/writeTest', {
        templateUrl:'views/student/writeTest.html',
        controller: 'StudentCtrl'
      })
       .when('/result', {
        templateUrl:'views/student/result.html',
        controller: 'ResultCtrl'
      })


      .when('/class', {
        templateUrl:'views/school/class.html',
        controller: 'ClassCtrl'
      })
       .when('/subject', {
        templateUrl:'views/school/subjects.html',
        controller: 'SubjectCtrl'
      })
        .when('/student', {
        templateUrl:'views/school/student.html',
        controller: 'StudentCtrl'
      })
       .when('/test', {
        templateUrl:'views/school/test.html',
        controller: 'TestCtrl'
      })  
      .when('/questions', {
        templateUrl:'views/school/questions.html',
        controller: 'TestCtrl'
      })
    


      .when('/changePwd',{
        templateUrl:'views/changePwd.html',
        controller:'ChangepwdCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope,$location){
     $rootScope.$on('$routeChangeStart',function(){
         var uid=sessionStorage.getItem('uid');
         var path=$location.path();
         if(uid == null   && path != '/' && path!= '/login'){
            $location.path('/login');
         }
     })
  });
  
