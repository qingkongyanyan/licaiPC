/**
 * Created by longbaobao on 2016/7/5.
 */
"use strict"
/**
 * 通知服务
 */
app.factory('alertService', ['$rootScope','$timeout',function($rootScope,$timeout) {
    var alertService = {};

    // 创建一个全局的 alert 数组
    $rootScope.alerts = [];

    alertService.add = function(type, msg) {
        $rootScope.alerts.push({'type': type, 'msg': msg, 'close': function(){ alertService.closeAlert(this); }});
        $timeout(function(){
            if( $rootScope.alerts.length>0) {
                $rootScope.alerts.shift();
            }
        },1000)
    };

    alertService.closeAlert = function(alert) {
        alertService.closeAlertIdx($rootScope.alerts.indexOf(alert));
    };

    alertService.closeAlertIdx = function(index) {
        $rootScope.alerts.splice(index, 1);
    };
    return alertService;
}]);