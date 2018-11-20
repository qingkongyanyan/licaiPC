/**
 * 用户意见服务
 */
app.service('custRegisterService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL=appConstant.base_url;
    var modelURL = "/person/customer/";
    var api = {
        queryList_url : baseURL + modelURL + "getCustRegisterInfo",
        add_url : baseURL + modelURL + "",
        update_url : baseURL + modelURL + "",
        delete_url : baseURL + modelURL + "",
        view_url : baseURL + modelURL + "getCustExamResultInfo"
    };
    this.getApi=function(){
        return api;
    };

    this.queryList = function (param) {
        return $http.post(api.queryList_url,param)
    };

    this.add = function(param){
        return $http.post(api.add_url,param)
    };

    this.update = function(param){
        return $http.post(api.update_url,param)
    };

    this.delete = function(param){
        return $http.post(api.delete_url,param)
    };

    this.view = function(param){
        return $http.post(api.view_url,param)
    };
}])