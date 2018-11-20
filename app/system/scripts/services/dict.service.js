"use strict"
//字典管理的所有服务
app.service('dictService',['$http','$log','appConstant',function($http,$log,appConstant) {
    var api = {
        list_url:appConstant.base_url+'/dict/list.html',
        create_url:appConstant.base_url+'/dict/create.html',
        edit_url:appConstant.base_url+'/dict/edit.html',
        view_url:appConstant.base_url+'/dict/view.html',
        pairList_url:appConstant.base_url+'/dict/pair/list.html',
        pairCreate_url:appConstant.base_url+'/dict/pair/create.html',
        pairEdit_url:appConstant.base_url+'/dict/pair/edit.html',
        pairView_url:appConstant.base_url+'/dict/pair/view.html',
        pairDelete_url:appConstant.base_url+'/dict/pair/delete.html',
    };

    this.list=function(pageParam,query){
        return $http.post(api.list_url,{
            pageParam:pageParam,
            code:query.code,
            name:query.name
        });
    };
    this.create=function(dict){
        $log.debug('create dict');
        $log.debug(dict);
    	return $http.post(api.create_url,dict);
    };
    this.edit=function(dict){
        $log.debug('edit dict');
        $log.debug(dict);
    	return $http.post(api.edit_url,dict);
    };
    this.view=function(id){
        $log.debug('view dict');
        $log.debug(id);
    	return $http.post(api.view_url,id);
    };
    this.pairList=function(pageParam,dictId){
        return $http.post(api.pairList_url,{
            pageParam:pageParam,
            dictId:dictId
        });
    };
    this.pairCreate=function(pair){
        $log.debug('create pair');
        $log.debug(pair);
        return $http.post(api.pairCreate_url,pair);
    };
    this.pairEdit=function(pair){
        $log.debug('edit pair');
        $log.debug(pair);
        return $http.post(api.pairEdit_url,pair);
    };
    this.pairView=function(id){
        $log.debug('view pair');
        $log.debug(id);
        return $http.post(api.pairView_url,id);
    };
    this.pairDelete=function(id){
        $log.debug('delete pair');
        $log.debug(id);
        return $http.post(api.pairDelete_url,id);
    };
}]);
