"use strict"
angular.module('login.route',['ui.router'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state("login",{
            url:"/login?redirectURL",
            templateUrl:"login/views/login.html", 
            controller:"signupController",
            // controllerAs:"ctrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("user.login");
                }]
            }
        })
    }]);
