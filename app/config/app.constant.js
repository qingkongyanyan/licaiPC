/**
 * Created by longbaobao
 */
'use strict';
/**
 * Config constant
 */
 var host = location.hostname,
    port = 80;

if (__ENV__.isDev) { //local开发环境的前台，连200后台
    if ('pre.nuoyuan.com.cn' === host) { //local开发环境的前台，连预发布后台
        host = __ENV__.preReleaseDomain;
    } else {
        host = __ENV__.developmentDomain;
        port = 8280;
    }
    window.upload_ServerUrl =  __ENV__.developmentPicDomain;
    window.upload_UE_ServerUrl =  window.upload_ServerUrl + "/jsp/controller.jsp";
}
if(__ENV__.isPre){
    window.upload_ServerUrl =  __ENV__.preReleasePicDomain;
    window.upload_UE_ServerUrl =  window.upload_ServerUrl + "/jsp/controller.jsp";
    port = 8280;
}
if(__ENV__.isPro){
    window.upload_ServerUrl =  __ENV__.productionPicDomain;
    window.upload_UE_ServerUrl =  window.upload_ServerUrl + "/jsp/controller.jsp";
    port = 8480;
}
if(__ENV__.isNewPro){
    window.upload_ServerUrl =  __ENV__.newProductionPicDomain;
    window.upload_UE_ServerUrl =  window.upload_ServerUrl + "/jsp/controller.jsp";
    port = 8280;
}

app.constant('appConstant', {
//        base_url: "http://localhost:8888/financeh5-web-boss/api",
         base_url: "http://" + host + (80 === port ? '' : (':' + port)) + "/financeh5-web-boss/api"
        //base_url: "http://10.1.26.200:8280/financeh5-web-boss/api"
    })
    //auth事件
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',//登录成功事件
        loginFailed: 'auth-login-failed',//登录失败事件
        logoutSuccess: 'auth-logout-success',//退出成功事件
        sessionTimeout: 'auth-session-timeout',//session超时事件
        notAuthenticated: 'auth-not-authenticated',//用户没有登录
        notAuthorized: 'auth-not-authorized',//用户已登录，但是没有授权功能操作权限,
        refreshToken: 'refreshToken',//token 延时
        jwtReplaceToken: 'jwt-replace-token',//jwt token 即将超时，重新置换token
        repeatLogin: 'repeatLogin' //用户已经登录，则不允许访问登录界面,触发事件
    })
    //错误事件
    .constant('ERROR_EVENTS', {
        networkNotAvailable: 'error-network-not-available',//网络不可用
        webServerInternalError: 'error-web-server-internal-error',//web服务内部错误
        requestTimeout:'error-request-timeout',//请求超时
        unknow:'error-uknow'//未知错误
    })
    //lodash
    .constant('_', window._)
