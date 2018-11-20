/**
 * 功能操作日志统计服务
 */
app.service('funHandleService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL=appConstant.base_url;
    var modelURL = "/log/";
    var api = {
        queryList_url : baseURL + modelURL + "getViewFunctionNumByDay"
    };
    this.getApi=function(){
        return api;
    };

    this.queryList = function (param) {
        return $http.post(api.queryList_url,param)
    };
}])