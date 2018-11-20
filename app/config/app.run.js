/**
 * Created by longbaobao on 2016/7/1.
 */
'use strict';
(function() {
    var env = window.__ENV__ = {
        //        'productionDomain': '114.55.4.224',
        'productionDomain': '114.55.237.90',
        'preReleaseDomain': '114.55.248.36',
        //'developmentDomain': '10.1.26.203',
         'developmentDomain': '10.1.26.200',
        /*新环境*/
        'newProductionDomain': '10.20.20.34',
        'production': 'PRODUCTION',
        'prerelease': 'PRERELEASE',
        'development': 'DEVELOPMENT',
        'newProduction': 'NEWPRODUCTION',
        'productionPicDomain': 'http://114.55.4.224:8190/utf8-jsp',
        'preReleasePicDomain': 'http://120.26.131.205:8190/utf8-jsp',
        'developmentPicDomain': 'http://10.1.26.7:8880/utf8-jsp',
        'newProductionPicDomain': 'http://10.20.20.105:8085/utf8-jsp',
    };
    var host = location.hostname,
        envName;
    // envName = env.productionDomain === host ? env.production : env.preReleaseDomain === host ? env.prerelease : env.development;
    if (env.productionDomain === host) {
        envName = env.production;
    } else if (env.preReleaseDomain === host) {
        envName = env.prerelease;
    } else if (env.newProductionDomain === host) {
        envName = env.newProduction;
    } else {
        envName = env.development;
    }

    env.name = envName;
    env.isPro = envName === env.production;
    env.isPre = envName === env.prerelease;
    env.isDev = envName === env.development;
    env.isNewPro = envName === env.newProduction;
})();

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngAnimate',
    'ngMessages',
    'ngSanitize',
    'route', //route.config.js中定义的route模块
    'ui.bootstrap',
    'oc.lazyLoad',
    'ui.bootstrap.datetimepicker',
    'ui.dateTimeInput',
    'string', /**ng-string 工具类**/
    'angular-loading-bar', /**loading bar 模块**/
    'ngTable',
    'LocalStorageModule', /*本地存储*/
    'angular-jwt',
    'naif.base64',
    'ui.select'
]);
app.run(['$rootScope', '$urlRouter', '$log', '$location', '$state', '$stateParams', '$timeout', 'string', 'authJwtService', 'alertService', 'AUTH_EVENTS', 'ERROR_EVENTS', '_', 'tokenManagerJwtService',
    function(
        $rootScope,
        $urlRouter, //路由服务
        $log, //日志服务
        $location,
        $state, //路由状态
        $stateParams, //路由参数
        $timeout,
        string,
        authJwtService,
        alertService,
        AUTH_EVENTS,
        ERROR_EVENTS,
        _, //lodash工具,
        tokenManagerJwtService
    ) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;



        //监听事件
        //Broadcasted before a URL will change.
        $rootScope.$on('$locationChangeStart', function(evt, newUrl, oldUrl) {
            console.debug("request url:", $location.absUrl());
            console.debug("newUrl:", newUrl);
            console.debug("oldUrl:", oldUrl);
            var params = $location.search();
            console.debug("params:", params);

        });

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                //不是登陆页面,则判断是否已经登录
                //若没有登录跳转到登录页面
                if (!string(toState.name).contains("login")) {
                    //不存在token 则说明没有登录
                    //广播 notAuthenticated 事件authJwtService
                    if (!authJwtService.existToken()) {
                        event.preventDefault();
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, {
                            state: toState,
                            params: toParams,
                        });
                        //token 存在 本地校验token有效性
                    } else {
                        //token 无效
                        //广播 sessionTimeout 事件
                        if (!authJwtService.localValidateToken()) {
                            event.preventDefault();
                            $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, {
                                state: toState,
                                params: toParams,
                            });
                            //token 有效 更新 最近活动时间
                        } else {
                            //sessionService.updateLatelyActivityTime()
                        }
                    }
                } else {
                    //若是token 存在且有效，则不允许继续登录
                    if (authJwtService.existToken() && authJwtService.localValidateToken()) {
                        if (fromState.name == "" || fromState.name == "login") {

                            event.preventDefault();
                            $state.go('index'); //登录成功跳转到index
                            return;
                        }
                        event.preventDefault();
                        $rootScope.$broadcast(AUTH_EVENTS.repeatLogin, {
                            state: toState,
                            params: toParams,
                        });
                    }
                }
            });
        //Broadcasted after a URL was changed.
        $rootScope.$on('$locationChangeSuccess', function(evt, args) {

            //evt.preventDefault();
            // Continue with the update and state transition if logic allows
            $urlRouter.sync();
        });

        /**
         *登录成功
         */
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
            alertService.add('warning', '登录成功！');
            //添加本地token
            $log.debug(data.loginInfo);
            tokenManagerJwtService.assignToken(data.loginInfo);
            if (!_.isUndefined(data.redirectURL)) {
                $location.url(data.redirectURL);
                $location.replace();
            } else {
                $state.go('index'); //登录成功跳转到index
            }

        });
        /**
         *登录失败
         */
        $rootScope.$on(AUTH_EVENTS.loginFailed, function(event, data) {
            var $scope = data.scope;
            $scope.signupForm.userName.$setValidity('custom', false);
            $timeout(function() {
                $scope.signupForm.userName.$setValidity('custom', true);
            }, 2000);
        });

        /**
         *重复登录登录
         */
        $rootScope.$on(AUTH_EVENTS.repeatLogin, function(event, data) {
            $log.debug("repat login!");
            alertService.add('warning', '不允许重复登录！');
        });


        /**
         *退出登录
         */
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
            $log.debug("login out!");
            tokenManagerJwtService.destroyToken();
        });
        /**
         *用户已登录，但是没有功能操作权限
         */
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(event, data) {

        });
        /**
         *用户未登录
         */
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event, data) {
            $log.debug("not login!");
            alertService.add('warning', '还没有登录！');
            $state.go('login', { redirectURL: $location.url() });
        });
        /**
         *Session超时
         */
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function(event, data) {
            $log.debug("token timeout!");
            alertService.add('warning', '令牌超时！');
            //销毁token
            tokenManagerJwtService.destroyToken();
            $state.go('login', { redirectURL: $location.url() });
        });

        ///**
        // *token 延时
        // */
        //$rootScope.$on(AUTH_EVENTS.refreshToken, function (event, data) {
        //    $log.debug("refreshToken!");
        //    tokenManagerService.syncLatelyActivityTime();
        //});

        /**
         *jwt token 延时
         */
        $rootScope.$on(AUTH_EVENTS.jwtReplaceToken, function(event, data) {
            $log.debug("jwtReplaceToken!");
            tokenManagerJwtService.jwtReplaceToken(data.token);
        });

        /**
         *网络不可用
         */
        $rootScope.$on(ERROR_EVENTS.networkNotAvailable, function(event, data) {
            alertService.add('warning', '网络不可用！');
        });

        /**
         *服务器内部错误
         */
        $rootScope.$on(ERROR_EVENTS.webServerInternalError, function(event, data) {
            alertService.add('warning', '服务器内部错误！');
        });

        /**
         *请求超时错误
         */
        $rootScope.$on(ERROR_EVENTS.requestTimeout, function(event, data) {
            alertService.add('warning', '请求超时错误！');
        });

        /**
         *未知错误
         */
        $rootScope.$on(ERROR_EVENTS.unknow, function(event, data) {
            alertService.add('warning', '未知错误！');
        });

        // Configures $urlRouter's listener *after* your custom listener
        //$urlRouter.listen();
    }
]);

// 改造ng-table的分页
!(function() {
    angular.module('ngTable').run(['$templateCache', function($templateCache) {
        $templateCache.put('ng-table/pager.html', '\
        <div class="ng-cloak ng-table-pager pos_re" ng-if="params.data.length" ng-init="params.numPerPage=params.count()">\
            <span ng-if="params.settings().counts.length" class="table_span_w"><main class="float_l" style="margin-right:6px">每页</main>\
            <div class="float_l table_w">\
            <ui-select on-select="params.count(params.numPerPage)" ng-model="params.numPerPage" theme="bootstrap" append-to-body="false">\
                 <ui-select-match placeholder="10">{{$select.selected}}</ui-select-match>\
                <ui-select-choices repeat="item in params.settings().counts | filter: $select.search">\
                    <small ng-bind-html="item | highlight: $select.search"></small>\
                </ui-select-choices>\
            </ui-select>\
            <label></label>\
            </div>\
            <main class="float_l" style="margin-left:6px">条</main>\
            <ul ng-if="pages.length" class="pagination ng-table-pagination">\
                <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type">\
                    <a ng-switch-when="prev" ng-click="params.page(page.number)" href="" class="prev-page">&nbsp;</a>\
                    <a ng-switch-when="first" ng-click="params.page(page.number)" href="" class="first-page"><span ng-bind="page.number"></span></a>\
                    <a ng-switch-when="page" ng-click="params.page(page.number)" href="" class="page-page"><span ng-bind="page.number"></span></a>\
                    <a ng-switch-when="more" ng-click="params.page(page.number)" href="" class="more-page">&#8230;</a>\
                    <a ng-switch-when="last" ng-click="params.page(page.number)" href="" class="last-page"><span ng-bind="page.number"></span></a>\
                    <a ng-switch-when="next" ng-click="params.page(page.number)" href="" class="next-page">&nbsp;</a>\
                </li>\
            </ul>\
            <ul ng-if="pages.length === 0" class="pagination ng-table-pagination">\
                <li ng-class="{\'disabled\': true}">\
                    <a ng-click="" href="" class="prev-page">&nbsp;</a>\
                </li>\
                <li ng-class="{\'disabled\': true}">\
                    <a ng-click="" href="" class="page-page"><span>1</span></a>\
                </li>\
                <li ng-class="{\'disabled\': true}">\
                    <a ng-click="" href="" class="next-page">&nbsp;</a>\
                </li>\
            </ul>\
            <span ng-if="pages.length">共{{params.total() |numFliter:params.numPerPage}}页</span>\
            <span ng-if="pages.length === 0">共1页</span>\
            <span >共{{params.total()}}条</span>\
        </span>\
        </div>\
        ');
    }]);
})();

app.filter("numFliter", function() {
    return function(num, n) {
        return num % n > 0 ? parseInt(num / n) + 1 : parseInt(num / n)

    }
})