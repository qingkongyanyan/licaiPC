/**
 * 预售产品服务
 */
app.service('preSaleProService', ['$log','$http','$state','appConstant', function($log,$http,$state,appConstant){
    var baseURL = appConstant.base_url;
    var modelURLS = "/stats/profeedback/";
    var modelURLP = "/perf/commquery/";
    var modelURLI = "/invest/";

    var api = {
        queryFeedBackList_url : baseURL + modelURLS + "qryStatsProFeedBack",
        queryFeedBackDetlList_url : baseURL + modelURLS + "qryStatsProFeedBackDetl",
        qryProFeedBackDetlSum_url : baseURL + modelURLS + "qryProFeedBackDetlSum",
        getProject_url : baseURL + modelURLI + "getProject",
        getProduct_url : baseURL + modelURLP + "getProduct",
        getOrgInfo_url:baseURL + modelURLP + "qryOrgInfo"
    };
    this.getApi=function(){
        return api;
    }

    this.queryFeedBackList = function (param) {
        return $http.post(api.queryFeedBackList_url,param)
    };

    this.queryFeedBackDetlList = function (param) {
        return $http.post(api.queryFeedBackDetlList_url,param)
    };

    this.qryProFeedBackDetlSum = function (param) {
        return $http.post(api.qryProFeedBackDetlSum_url,param)
    };

    this.getProject = function(param){
        return $http.post(api.getProject_url,param)
    };

    this.getProduct = function(param){
        return $http.post(api.getProduct_url,param)
    };
    /**
     * parentOrgCode
     * orgLevel
     * @param param
     * @returns {HttpPromise}
     */
    this.getOrgInfo = function(param) {
        return $http.post(api.getOrgInfo_url,param)
    }
}])