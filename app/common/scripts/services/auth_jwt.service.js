/**
 * Created by longbaobao on 2016/7/4.
 */
"use strict"
/**
 * 记录用户登录session信息
 */
app.service('authJwtService', ['$log', '_','localStorageService','jwtHelper','$rootScope','AUTH_EVENTS', function ($log, _,localStorageService,jwtHelper,$rootScope,AUTH_EVENTS) {

    this.getToken = function () {
            return localStorageService.get('token');
    }
    /**
     * 登录成功后，
     * 设置token信息
     * @param token
     */
    this.loginSuccess = function (data) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess,data);
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
     * 没有过期：当前时间<过期时间
     * 若，过期时间-当前时间<token活跃时间/50,则重新置换token
     */
    this.localValidateToken = function(){
        var tokenPayload = jwtHelper.decodeToken(localStorageService.get('token'));

        var expire = tokenPayload.expire;
        //$log.error(localStorageService.get('token'));
        //$log.error(tokenPayload);
        //$log.error('--------------------------------------'+(expire - _.now()));
        if(_.now()<expire) {
            //若，过期时间-当前时间<30s
            //tokenPayload.activeTime
            if((expire-_.now())<=(tokenPayload.activeTime/2)) {
                $rootScope.$broadcast(AUTH_EVENTS.jwtReplaceToken,{token:localStorageService.get('refreshToken')});
            }
            return true;
        } else {
            return false;
        }
    }

}]);