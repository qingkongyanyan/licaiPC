/**
 * Created by longbaobao on 2016/7/11.
 */
"use strict"
/**
 * api 权限拦截器
 */
app.factory('authInterceptor', ['$rootScope','$q','AUTH_EVENTS','$log','authJwtService','string',function ($rootScope, $q, AUTH_EVENTS, $log,authJwtService,string) {
    var authInterceptor = {
        //
        request: function(config) {
            if(!(string(config.url).contains('user/views/login.htm') || string(config.url).contains('/person/account/getUserLogin'))) {
                //已经登录,所有后台API请求。添加请求头部
                if(string(config.url).contains('/api')) {
                    //tokenManager api 不验证本地token
                    if (string(config.url).contains('tokenManager')){
                        config.headers['x-session-token'] = authJwtService.getToken();
                    } else if(authJwtService.existToken() && authJwtService.localValidateToken()) {
                        config.headers['x-session-token'] = authJwtService.getToken();
                    } else  {
                        //token 不存在
                        //广播 notAuthenticated 事件
                        if (!authJwtService.existToken()) {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,{

                            });
                        }
                        //token 无效
                        //广播 sessionTimeout 事件
                        if(!authJwtService.localValidateToken()) {

                            $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,{

                            });

                        }
                    }
                }
            }
            return config;
        },

        response: function(response) {
            $log.debug("auth success Url:" + response.config.url);
            //访问服务端API成功，更新本地 token最近活动时间
            //不包括tokenManager 同步

            if(string(response.config.url).contains('/api') && !string(response.config.url).contains('tokenManager')) {
                // sessionService.updateLatelyActivityTime();
            }
            return response;

            //$log.debug("auth success Url:" + response.config.url);
        },
        responseError: function (rejection) {
            $log.debug("auth fail Url:" + rejection.config.url);
            switch (rejection.status) {
                case (401):
                    rejection.statusText="用户没有登录";
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,rejection);
                    break;
                case (403):
                    rejection.statusText="没有功能操作权限";
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized,rejection);
                    break;
                case (419):
                    rejection.statusText="session超时事件";
                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,rejection);
                    break;
                case (440):
                    rejection.statusText="session超时事件";
                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,rejection);
                    break;
            }
            //$rootScope.$broadcast({
            //    401: AUTH_EVENTS.notAuthenticated,//用户没有登录
            //    403: AUTH_EVENTS.notAuthorized,//用户已登录，但是没有功能操作权限
            //    419: AUTH_EVENTS.sessionTimeout,//session超时事件
            //    440: AUTH_EVENTS.sessionTimeout
            //}[response.status], response);
            return $q.reject(rejection);
        }

    };
    return authInterceptor;
}]);
