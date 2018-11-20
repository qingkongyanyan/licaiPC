"use strict"
//用户管理服务
app.service('userService',['$http','$log','appConstant',function($http,$log,appConstant) {
    var api = {
        list_url:appConstant.base_url+'/user/list.html',
        create_url:appConstant.base_url+'/user/create.html',
        edit_url:appConstant.base_url+'/user/edit.html',
        view_url:appConstant.base_url+'/user/view.html',
        reset_url:appConstant.base_url+'/user/reset.html',
        rest_url:appConstant.base_url+'/user/rest.html',
        active_url:appConstant.base_url+'/user/active.html',
        cancel_url:appConstant.base_url+'/user/cancel.html'
    };

    this.list=function(pageParam,query){
        return $http.post(api.list_url,{
            pageParam:pageParam,
            query:query
        });
    };
    this.create=function(user,productIds){
        $log.debug('create user');
        $log.debug(user);
        $log.debug(productIds);
    	return $http.post(api.create_url,{
    		user:user,
    		productIds:productIds
    	});
    };
    this.edit=function(user,productIds){
        $log.debug('edit user');
        $log.debug(user);
        $log.debug(productIds);
    	return $http.post(api.edit_url,{
    		user:user,
    		productIds:productIds
    	});
    };
    this.view=function(id){
        $log.debug('view user');
        $log.debug(id);
    	return $http.post(api.view_url,id);
    };
    this.reset=function(id){
        $log.debug('reset user');
        $log.debug(id);
        return $http.post(api.reset_url,id);
    };
    this.rest=function(id){
        $log.debug('rest user');
        $log.debug(id);
        return $http.post(api.rest_url,id);
    };
    this.active=function(id){
        $log.debug('active user');
        $log.debug(id);
        return $http.post(api.active_url,id);
    };
    this.cancel=function(id){
        $log.debug('cancel user');
        $log.debug(id);
        return $http.post(api.cancel_url,id);
    };
}]);
