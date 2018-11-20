// 系统管理-->用户管理模块的route
"use strict"
angular.module('user.route',['ui.router'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index.user',{
        url:'/user',
        abstract:true,
        templateUrl:'system/views/user/user.html',
        controller:'userController',
        resolve:{
            deps:['$ocLazyLoad',function($ocLazyLoad){
                 $ocLazyLoad.load('system.user');
            }]
            //下面的方式不可行
            // busiTunnelList:['$log','productService',function($log,productService){
            //     productService.busiTunnelList().then(function (response){
            //         $log.debug(response.data);
            //         if(response.data.status){
            //             $log.debug('busiTunnelList inited');
            //             return response.data.data;
            //         }else{
            //             alert('加载业务渠道列表失败:'+response.data.msg);
            //             return [];
            //         }
            //     });
            // }],
            // productList:['$log','productService',function($log,productService){
            //     productService.productList().then(function (response){
            //         $log.debug(response.data);
            //         if(response.data.status){
            //             $log.debug('productList inited');
            //             return response.data.data;
            //         }else{
            //             alert('加载产品列表失败:'+response.data.msg);
            //             return [];
            //         }
            //     });
            // }]
        }
    })
    .state('index.user.list',{
        url:'',
        templateUrl:'system/views/user/list.html',
        controller: 'userListController'
    })
    .state('index.user.create',{
        url:'/create',
        templateUrl:'system/views/user/create.html',
        controller: 'userCreateController'
    })
    .state('index.user.edit',{
        url:'/edit/:id',
        templateUrl:'system/views/user/edit.html',
        controller: 'userEditController'
    })
    .state('index.user.view',{
        url:'/view/:id',
        templateUrl:'system/views/user/view.html',
        controller: 'userViewController'
    });
}]);

// 系统管理-->字典管理模块的route
angular.module('dict.route',['ui.router'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index.dict',{
        url:'/dict',
        abstract:true,
        templateUrl:'system/views/dict/dict.html',
        controller:'dictController',
        resolve:{
            deps:['$ocLazyLoad',function($ocLazyLoad){
                $ocLazyLoad.load('system.dict');
            }]
        }
    })
    .state('index.dict.list',{
        url:'',
        templateUrl:'system/views/dict/list.html',
        controller: 'dictListController'
    })
    .state('index.dict.create',{
        url:'/create',
        templateUrl:'system/views/dict/create.html',
        controller: 'dictCreateController'
    })
    .state('index.dict.edit',{
        url:'/edit/:id',
        templateUrl:'system/views/dict/edit.html',
        controller: 'dictEditController'
    })
    .state('index.dict.view',{
        url:'/view/:id',
        templateUrl:'system/views/dict/view.html',
        controller: 'dictViewController'
    })
    .state('index.dict.pairList',{
        url:'/pair/:dictId',
        templateUrl:'system/views/dict/pairList.html',
        controller: 'pairListController'
    });
}]);
// 系统管理模块的route
angular.module('system.route',[
    'user.route',
    'dict.route'
]);