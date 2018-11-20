/**
 * Created by longbaobao on 2016/7/4.
 */
"use strict"
/**
 * 记录用户登录session信息
 */
app.service('sessionService', ['$log', '_','localStorageService','jwtHelper', function ($log, _,localStorageService,jwtHelper) {

    //var token = null;//用户登录后获取token
    //var userInfo = null;//用户基本信息
    //var createTime = null;//token 服务器创建时间
    //var latelyActivityTime = null;//token最近活动时间
    //var expirationTimeInterval = 30;// 过期时间间隔 单位分钟
    var syncTimeInterval = 30000; //最近访问时间 同步间隔  30s
    /**
     * 初始化本地缓存
     */
    this.initLocalStorage = function() {
        if(_.isNull(localStorageService.get('token'))) {
            localStorageService.set('token',null);
        }
        if(_.isNull(localStorageService.get('userInfo'))) {
            localStorageService.set('userInfo',null);
        }
        if(_.isNull(localStorageService.get('createTime'))) {
            localStorageService.set('createTime',null);
        }
        if(_.isNull(localStorageService.get('latelyActivityTime'))) {
            localStorageService.set('latelyActivityTime',null);
        }
        if(_.isNull(localStorageService.get('expirationTimeInterval'))) {
            localStorageService.set('expirationTimeInterval',30);
        }
    };
   //this.initLocalStorage();

    this.getToken = function () {
            return localStorageService.get('token');
    }
    /**
     * 登录成功后，
     * 设置token信息
     * @param token
     */
    this.assignToken = function (data) {
        localStorageService.set('token',data.token);
        localStorageService.set('userInfo',data.userInfo);
        localStorageService.set('createTime',data.createTime);
        localStorageService.set('latelyActivityTime',localStorageService.get('createTime'));
        localStorageService.set('expirationTimeInterval',_.isUndefined(data.expirationTimeInterval)?30:data.expirationTimeInterval);
    }
    /**
     *登出
     * @param token
     */
    this.logout = function () {
        $rootScope.$broadcast(ERROR_EVENTS.logoutSuccess,{});
    }
    /**
     * 验证是否存在token
     */
    this.existToken = function () {
        return !_.isNull(localStorageService.get('token'));
    }
    /**
     * 本地验证token是否有效
     * 没有过期：最近活动时间+过期时间间隔>当前时间
     */
    this.localValidateToken = function(){
        return (localStorageService.get('latelyActivityTime') + localStorageService.get('expirationTimeInterval')*60*1000)>_.now();
    }


    /**
     * 更新 最近活动时间
     * 1.route state 变化，且token 有效时 更新
     * 2.访问 服务端 api 成功时，更新
     */
    this.updateLatelyActivityTime= function() {
        var tokenPayload = jwtHelper.decodeToken(localStorageService.get('token'));
        if(!_.isNull(localStorageService.get('latelyActivityTime'))) {
            var  expiresTime = localStorageService.get('latelyActivityTime') + (localStorageService.get('expirationTimeInterval') *60*1000) ;
            //若访问时还剩 syncTimeInterval * 1.2 时间过期，则强制同步服务器 最近访问时间
            if( _.now() < expiresTime) {
                if(expiresTime - _.now() <= syncTimeInterval * 1.2) {
                    $rootScope.$broadcast(ERROR_EVENTS.refreshToken,{});
                }
            }
            localStorageService.set('latelyActivityTime', _.now());
            $log.debug("update lately activity time:" + localStorageService.get('latelyActivityTime'));

        }
    }


}]);