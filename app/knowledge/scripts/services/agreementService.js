/**
 * 协议管理服务
 */
app.service('agreementService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL = appConstant.base_url;
    var modelURL = "/person/knowledge/";
    var api = {
        queryAllList_url : baseURL + modelURL + "getAllProtocolRecords",
        add_url : baseURL + modelURL + "addProtocolRecord",
        update_url : baseURL + modelURL + "updateProtocolRecordById",
        updateState_url : baseURL + modelURL + "updateProtocolRecordState",
        delete_url : baseURL + modelURL + "deleteProtocolRecord",
        view_url : baseURL + modelURL + "getProtocolRecordById"
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