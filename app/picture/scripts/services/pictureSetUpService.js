/**
 * 轮播图服务
 */
app.service('pictureSetUpService', ['$log','$http','appConstant', function($log,$http,appConstant){
    var baseURL = appConstant.base_url;
    var modelURL = "/person/picture/";
    var api = {
        queryAllList_url : baseURL + modelURL + "getAllLunboPics",
        add_url : baseURL + modelURL + "addLunboPic",
        update_url : baseURL + modelURL + "modLunboPic",
        delete_url : baseURL + modelURL + "delLunboPic",
        modSort_url : baseURL + modelURL + "modLunboPicsSort",
        modState_url : baseURL + modelURL + "modLunboPicsState",
        view_url : baseURL + modelURL + "getLunboPicById"
    };

    this.getApi=function(){
        return api;
    }

    this.queryList = function (param) {
        return $http.post(api.queryList_url,param)
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
    }

    this.modSort = function(param){
        return $http.post(api.modSort_url,param)
    }

    this.modState = function(param){
        return $http.post(api.modState_url,param)
    }

    this.view = function(param){
        return $http.post(api.view_url,param)
    }
}])