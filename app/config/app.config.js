'use strict';
    app
        .config(['$provide','$compileProvider','$controllerProvider','$filterProvider',
            function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
            }])
        //配置$httpProvider
        .config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.defaults.timeout = 2000;
                $httpProvider.interceptors.push('timestampMarkerInterceptor');
                $httpProvider.interceptors.push('authInterceptor');
                $httpProvider.interceptors.push('responseErrorInterceptor');
            }])
        .config([
            'localStorageServiceProvider',function(localStorageServiceProvider) {
                localStorageServiceProvider.setPrefix('finance-h5-web-boss');
                localStorageServiceProvider.setStorageType('localStorage');
                localStorageServiceProvider.setDefaultToCookie(true);
                localStorageServiceProvider.setNotify(true, true);
            }
        ]);
    ;
////监听模块加载事件
//app.controller('AppCtrl',['$scope', function ($scope) {

//    }])
//    .controller('TabsDemoCtrl', function ($scope, $window, $state) {
//    //新添加的Tab
//    $scope.newTab;
//
//    $scope.addNewTab = function (title, action, icon) {
//        //判断是否找到这个地址,如果找到就意味着已经存在了,不需要添加了
//        $scope.hasAddTab = false;
//        angular.forEach($scope.tabs, function (tabs) {
//            if (tabs.action == action) {
//                $scope.hasAddTab = true;
//            }
//        });
//        //添加tab
//        if (!$scope.hasAddTab) {
//            //将其他tab active设置为flase
//            angular.forEach($scope.tabs, function(value, key) {
//                value.active=false;
//            });
//            $scope.newTab = {
//                title: title,
//                action: action,
//                icon: icon,
//                active: true
//            }
//            $scope.tabs.push($scope.newTab);
//
//        }
//    };
//    $scope.tabs = [
//        {title: "tab1", action:"tab1" , icon: "icon-tab1", active: false},
//        //{title: "tab2", action:"tab2" , icon: "icon-tab2", active: true},
//        //{title: "tab3", action:"tab3" , icon: "icon-tab3", active: false}
//    ];
//    $scope.tabActive  = {
//        index : 0
//    };
//
//    $scope.$watch('newTab',function(newVal, oldVal, scope) {
//        if(newVal) {
//            $state.go(newVal.action);
//        }
//        //console.dir("tabs ");
//        /*
//         var activeTab;
//         for(var i = 0; i < $scope.tabs.length; i++) {
//         if($scope.tabs[i].active) {
//         activeTab = $scope.tabs[i];
//         $scope.tab.active = i;
//         break;
//         }
//         }*/
//        /*
//         if(activeTab) {
//         // $state.go(activeTab.action);
//         }*/
//    });
//    //$state.go($scope.tabs[0].action);
//});


