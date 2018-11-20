/**
 * 用户意见服务
 */
app.service('userOpinionService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL=appConstant.base_url;
    var modelURL = "/person/knowledge/";
    var api = {
        queryAllList_url : baseURL + modelURL + "getUserSuggestionByPage",
        add_url : baseURL + modelURL + "addUserSuggestion",
        update_url : baseURL + modelURL + "updateUserSuggestionState",
        delete_url : baseURL + modelURL + "deleteUserSuggestion",
        view_url : baseURL + modelURL + "getUserSuggestionById"
    };
    this.getApi=function(){
        return api;
    };

    this.queryAllList = function (param) {
        return $http.post(api.queryAllList_url,param)
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