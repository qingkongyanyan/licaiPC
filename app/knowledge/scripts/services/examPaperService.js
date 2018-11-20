/**
 * 考卷服务
 */
app.service('examPaperService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL = appConstant.base_url;
    var modelURL = "/person/knowledge/";
    var api = {
        queryList_url : baseURL + modelURL + "getAllExamPapersByPage",
        add_url : baseURL + modelURL + "addExamScoreType",
        update_url : baseURL + modelURL + "updateExamPaperState",
        delete_url : baseURL + modelURL + "deleteExamPaper",
        view_url : baseURL + modelURL + "getExamPaperDetailByPaperId",
        download_url : baseURL + modelURL + "downloadExcelTemplate",
        setting_url : baseURL + modelURL + "addExamScoreType"
    };
    this.getApi=function(){
        return api;
    }

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
    }

    this.download = function(){
        location.href = api.download_url;
    }

    this.setting = function(param){
        return $http.post(api.setting_url,param)
    }
}])