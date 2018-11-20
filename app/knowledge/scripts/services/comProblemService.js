/**
 * 常见问题服务
 */
app.service('comProblemService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL = appConstant.base_url;
    var modelURL = "/person/knowledge/";
    var api = {
        queryAllList_url : baseURL + modelURL + "getAllQA",
        add_url : baseURL + modelURL + "addQuestionAnswer",
        update_url : baseURL + modelURL + "updateQuestionAnswerById",
        updateState_url : baseURL + modelURL + "updateQAState",
        delete_url : baseURL + modelURL + "deleteQuestionAnswer",
        view_url : baseURL + modelURL + "getQuestionAnswerById"
    };
    this.getApi=function(){
        return api;
    }

    this.queryAllList = function (param) {
        return $http.post(api.queryAllList_url,param)
    };

    this.add = function(param){
        return $http.post(api.add_url,param)
    };

    this.update = function(param){
        return $http.post(api.update_url,param)
    };

    this.updateState = function(param){
        return $http.post(api.updateState_url,param)
    };

    this.delete = function(param){
        return $http.post(api.delete_url,param)
    };

    this.view = function(param){
        return $http.post(api.view_url,param)
    }
}])