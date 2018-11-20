app.controller('custRegisterController',['$scope','$log','appConstant',
function($scope,$log,appConstant){

}]);

app.controller('custRegisterListController',['$scope','$log','custRegisterService','alertWarnService','NgTableParams','$uibModal',
function($scope,$log,custRegisterService,alertWarnService,NgTableParams,$uibModal){
    //第几页
    $scope.pageNum=1;
    //每页显示数目
    $scope.numPerPage=10;
    //分页
    $scope.custRegisterTable=new NgTableParams(
        angular.extend({
            page:$scope.pageNum,
            count:$scope.numPerPage
        }),{
            getData:function(params){
                var query={
                    pageNum:params.page(),
                    numPerPage:params.count(),
                    filter:{
                        requestFrom: '02',
                        custName: $scope.custName,
                        tel: $scope.tel,
                        startTime: Date.parse(new Date(angular.element('#dus05').val().replace(/-/g,'/'))),
                        endTime: Date.parse(new Date(angular.element('#dus06').val().replace(/-/g,'/'))) + 86400000
                    }
                };
                console.log("客户注册统计查询请求数据："+angular.toJson(query));
                return custRegisterService.queryList(query).then(function (response){
                    //console.log("客户注册统计查询返回数据："+angular.toJson(response));
                    if(response.data.status){
                        params.total(response.data.data.totalCount);
                        return response.data.data.recordList;
                    }else{
                        alertWarnService.alert(response.data.msg);
                    }
                });
            }
        }
    );

    $scope.list=function(){
        $scope.custRegisterTable.page(1);
        $scope.custRegisterTable.reload();
    };

    $scope.reset=function(){
        $scope.custName = null;
        $scope.tel = null;
        document.getElementById("dus05").value = '';
        document.getElementById("dus06").value = '';
        $scope.list();
    }
}]);

app.controller('custRegisterViewController',['$scope','$state','$stateParams','$log','custRegisterService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,custRegisterService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    //console.log("客户注册统计查看请求数据："+angular.toJson(id));
    custRegisterService.view(id).then(function (response){
    //console.log("客户注册统计查看返回数据："+angular.toJson(response));
        if(response.data.status){
            $scope.custRegisterDetail=response.data.data;
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.close=function(){
         $state.go('index.custRegister.list');
    };
}]);