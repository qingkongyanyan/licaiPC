/**
 * Created by longbaobao on 2016/7/4.
 */
//"use strict"
///**
// * http token 拦截器
// * @deprecated move to auth.interceptor.js
// */
//app.factory('sessionInterceptor', ['$log','$location','sessionService','string',function($log,$location, sessionService,string) {
//    var sessionInterceptor = {
//        //request: function(config) {
//        //    if(!(string(config.url).contains('user/views/login.htm') || string(config.url).contains('/api/user/login.html'))) {
//        //        //已经登录,所有后台请求。添加请求头部
//        //        if(string(config.url).contains('/api')) {
//        //            if(!sessionService.isAnonymus()) {
//        //                config.headers['x-session-token'] = sessionService.getToken();
//        //            }
//        //        }
//        //    }
//        //    return config;
//        //}
//    };
//    return sessionInterceptor;
//}]);