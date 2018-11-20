/**
 * Created by longbaobao on 2016/7/5.
 */
"use strict"
/**
 * 异常 拦截器
 */
app.factory('responseErrorInterceptor', ['$rootScope','$q','$log','$location','string','alertService','ERROR_EVENTS',
    function($rootScope,$q,$log,$location,string,alertService,ERROR_EVENTS) {
    var responseErrorInterceptor = {
        responseError: function(rejection) {
            switch (rejection.status) {
                case (-1):
                    rejection.statusText="网络不可用";
                    $rootScope.$broadcast(ERROR_EVENTS.networkNotAvailable,rejection);
                    break;
                case (500):
                    rejection.statusText="服务器系统内部错误";
                    $rootScope.$broadcast(ERROR_EVENTS.webServerInternalError,rejection);
                    break;
                case (408):
                    rejection.statusText="请求超时";
                    $rootScope.$broadcast(ERROR_EVENTS.requestTimeout,rejection);
                    break;
                default:
                    rejection.statusText="未知错误";
                    $rootScope.$broadcast(ERROR_EVENTS.unknow,rejection);
            }

            return $q.reject(rejection);
        }
    };
    return responseErrorInterceptor;
}]);