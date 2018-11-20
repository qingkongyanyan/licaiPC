/**
 * Created by longbaobao on 2016/7/14.
 */
"use strict"
/*-----通用发布/订阅器(消息总线)------*/
app.factory('msgBus', ['$rootScope', function($rootScope) {
    var msgBus = {};
    msgBus.emitMsg = function(msg, data) {
        data = data || {};
        // 向上游rootScope中所有监听该事件的scope发出该事件
        $rootScope.$emit(msg, data);
    };  
    msgBus.onMsg = function(msg, func, scope) {
        var unbind = $rootScope.$on(msg, func);
        // 当所指定的scope存在(即在scope生命周期之内)时，监听销毁事件并执行传入的func操作
        if (scope) {
            // 这里要这么做的目的是因为如果清除该事件则在跳转到其它scope时该事件一直会被触发
            scope.$on('$destroy', unbind);
        }
    };
    return msgBus;
}]);
