/**
 * Created by longbaobao on 2016/8/8.
 */
app.service('tokenManagerService', ['$log', '_','localStorageService','$http','$interval','appConstant', function ($log, _, localStorageService,$http,$interval,appConstant) {
    var api = {
        token_destroy_url: appConstant.base_url + "/tokenManager/destroyToken.html",
        token_extensionExpirationTime_url: appConstant.base_url + "/tokenManager/extensionExpirationTime.html"
    };

    /**
     *
     *和服务器同步 最近活动时间
     * @todo Task
     */
    this.syncLatelyActivityTime= function() {
        if(!_.isNull(localStorageService.get('latelyActivityTime'))) {
            $http.post(api.token_extensionExpirationTime_url, {
                token:localStorageService.get('token'),
                latelyActivityTime:localStorageService.get('latelyActivityTime')
            },{
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then(
                function successCallback(response) {
                    if (response.data.status) {
                        $log.debug("online sync lately activity time success:" + localStorageService.get('latelyActivityTime'));
                    } else {
                        $log.error("online sync lately activity time error" + response.data.msg)
                    }
                },
                function errorCallback(response) {
                    $log.error(response);
                }
            )
        }
    }

    /**
     * 销毁token
     * 1.本地验证token失败后，在 sessionTimeout 事件 处理中 销毁
     * 2.用户点击退出
     * 3.访问服务端API,验证 token 失败
     */
    this.destroyToken = function() {
        localStorageService.remove('token', 'userInfo', 'createTime', 'latelyActivityTime', 'expirationTimeInterval');
    }


    //定时
    //和服务器同步 最近活动时间
    //var timer = $interval(
    //    this.syncLatelyActivityTime,
    //    30000
    //);
    //@ 不执行 ????
    timer.then(
        function() {
            $log.debug( "syncLatelyActivityTime success", _.now());
        },
        function() {
            $log.debug( "syncLatelyActivityTime fail!", _.now());
        }
    );
}]);