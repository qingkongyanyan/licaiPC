/**
 * Created by user on 2016/8/3.
 */
"use strict"
/**
 * 通知服务
 */
app.service('alertWarnService', ['$uibModal','$rootScope',function($uibModal,$rootScope) {
    this.alert=function(str){
        $uibModal.open({
            animation: true,
            templateUrl: 'common/views/alertWarn.html',
            controller: 'alertWarnControl',
            resolve:{
                str : function() { return str}
            }
        });
    }
    this.showError=function(code,error){
        if(code=="10000001"||code=="10000010"){
            //弹窗;
            $uibModal.open({
                animation: true,
                templateUrl: 'common/views/alertWarn.html',
                controller: 'reloadControl',
                resolve:{
                    str : function() { return $rootScope.M[code]}
                }
            });
        }else{
            if($rootScope.M[code]!=null){
                error.errorMessage=$rootScope.M[code];
            }else{
                //默认错误
                error.errorMessage=$rootScope.M["10000000"];
            }
            error.showError=true;
        }
    }
}]);
//点确认才刷新的弹框
app.controller('reloadControl',['$scope',"$uibModalInstance",'str','$state',
    function($scope,$uibModalInstance,str,$state){
        $scope.str=str;
        $scope.ok=function(){
            $uibModalInstance.dismiss('cancel');
            $state.reload();
        }
    }
]);
//自动关闭的弹框
app.controller('alertWarnControl',['$scope',"$uibModalInstance","$timeout",'str',
    function($scope,$uibModalInstance,$timeout,str){
        $scope.str=str;
    $timeout(function(){
        $uibModalInstance.dismiss('cancel');
    },2000)
}
]);