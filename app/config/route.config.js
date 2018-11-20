/*
 *  cofig for ui.router
 */
"use strict"
// 总路由模块，只做聚合作用，聚合其余模块的所有路由配置
angular.module('route', [
        'login.route',//用户登录模块
        'system.route',//系统管理模块
        'picture.route',//轮播图管理模块
        'knowledge.route',//知识库管理模块
        'statistics.route'//数据统计模块
    ])
    .config(['$stateProvider', '$urlRouterProvider',
       function ($stateProvider, $urlRouterProvider) {
           $urlRouterProvider.deferIntercept();
           $urlRouterProvider.otherwise("/login");
           $stateProvider.state('index', {
               url: '/index',
               templateUrl: 'common/views/index.html',
               controller:"oindexController",
               resolve:{
                   deps:["$ocLazyLoad",function($ocLazyLoad){
                       return $ocLazyLoad.load("oindexControl");
                   }]
               }
           });
       }])



