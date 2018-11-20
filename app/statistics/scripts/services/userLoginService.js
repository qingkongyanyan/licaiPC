/**
 * 用户登录统计服务
 */
app.service('userLoginService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL=appConstant.base_url;
    var modelURL = "/log/";
    var api = {
        queryList_url : baseURL + modelURL + "getLoginListInfo",
        queryListCount_url : baseURL + modelURL + "getLoginListCount",
        view_url : baseURL + modelURL + "getViewFunctionNum"
    };
    this.getApi=function(){
        return api;
    };

    this.queryList = function (param) {
        return $http.post(api.queryList_url,param)
    };

    this.queryListCount = function(param){
        return $http.post(api.queryListCount_url,param)
    };

    this.view = function(param){
        return $http.post(api.view_url,param)
    };
}])