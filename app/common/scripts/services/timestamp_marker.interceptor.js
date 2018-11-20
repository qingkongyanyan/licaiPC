/**
 * Created by longbaobao on 2016/7/4.
 */
"use strict"
/**
 * http 时间拦截器
 */
app.factory('timestampMarkerInterceptor', ['$log',function($log) {
    var timestampMarker = {
        request: function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.config.responseTimestamp = new Date().getTime();
            var time = response.config.responseTimestamp - response.config.requestTimestamp;
            $log.debug("Load Url:" + response.config.url);
            $log.debug('The request took ' + time  + ' millisecond.');
            return response;
        }
    };
    return timestampMarker;
}]);