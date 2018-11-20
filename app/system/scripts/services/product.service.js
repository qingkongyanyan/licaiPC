"use strict"
//业务渠道列表和产品列表
app.service('productService',['$http','$q','appConstant',function($http,$q,appConstant) {
    var api = {
        busiTunnelList_url:appConstant.base_url+'/busi_tunnel/list/all.html',
        productList_url:appConstant.base_url+'/product/list/all.html',
    };
    this.busiTunnelList=function(){
        var deferred = $q.defer();
        $http.post(api.busiTunnelList_url).then(function successCallBack(response){
            deferred.resolve(response);
        },function errorCallBack(response){
            deferred.reject(response);
        });
        return deferred.promise;
    };
    this.productList=function(){
        return $http.post(api.productList_url);
    };
}]);