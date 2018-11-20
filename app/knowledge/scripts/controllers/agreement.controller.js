app.controller('agreementController',['$scope','appConstant','comProblemEnum',
function($scope,appConstant,comProblemEnum){
    $scope.state ={
        data:comProblemEnum.concat(comProblemEnum.getStateEnum())
    };
}]);

app.controller('agreementListController',['$scope','$log','agreementService','alertWarnService','NgTableParams','$uibModal','$state',
function($scope,$log,agreementService,alertWarnService,NgTableParams,$uibModal,$state){
    //第几页
    $scope.pageNum=1;
    //每页显示数目
    $scope.numPerPage=10;
    //分页
    $scope.agreementTable=new NgTableParams(
        angular.extend({
            page: $scope.pageNum,            // 第一页
            count: $scope.numPerPage
        })
        ,{
            getData:function(params){
                var query={
                    pageNum:params.page(),
                    numPerPage:params.count(),
                    filter:{
                        requestFrom: '02',
                        title: $scope.title,
                        startTime: Date.parse(new Date(angular.element('#dkn03').val().replace(/-/g,'/'))),
                        endTime: Date.parse(new Date(angular.element('#dkn04').val().replace(/-/g,'/'))) + 86400000,
                        state:$scope.state.selected
                    }
                };
                console.log("协议查询请求数据："+angular.toJson(query));
                return agreementService.queryAllList(query).then(function (response){
                    console.log("协议查询返回数据："+angular.toJson(response));
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

    //*********表格复选框Start***********
    $scope.selectedUpdate = [];
    var updateSelected = function(type, action, obj){
        if(type == "update"){
            if(action == 'add' && $scope.selectedUpdate.indexOf(obj) == -1){
                $scope.selectedUpdate.push(obj);
            }
            if(action == 'remove' && $scope.selectedUpdate.indexOf(obj)!=-1){
                var idx = $scope.selectedUpdate.indexOf(obj);
                $scope.selectedUpdate.splice(idx,1);
            }
        }
    }
    $scope.updateSelection = function(type, $event, obj){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(type, action, obj);
    }
    $scope.isSelected = function(type, obj){
        if(type == "update"){
            return $scope.selectedUpdate.indexOf(obj)>=0;
        }
    }
    //*********表格复选框End***********

    $scope.updateState = function(state){
        if($scope.selectedUpdate.length > 0){
            var templateUrl = '';
            if(state == 0){//启用
                templateUrl = 'knowledge/views/agreement/enableWarn.html';
            }else if(state == 1){//停用
                templateUrl = 'knowledge/views/agreement/unenableWarn.html';
            }
            var param = {
                ids:$scope.selectedUpdate,
                state:state
            }
            $uibModal.open({
                backdrop:'static',
                animation: $scope.animationsEnabled,
                templateUrl: templateUrl,
                controller: 'agreementUpdateStateController',
                resolve:{
                    agreementTable:function(){ return $scope.agreementTable },
                    selectedUpdate:function(){ return $scope.selectedUpdate },
                    param : function() {
                        return param;
                    }
                }
            });
        }else{
            if(state == 0){
                alertWarnService.alert("请选择要启用的数据！");
            }else if(state == 1){
                alertWarnService.alert("请选择要停用的数据！");
            }
        }
    }

    $scope.delete = function(id){
        $uibModal.open({
            backdrop:'static',
            animation: $scope.animationsEnabled,
            templateUrl: 'common/views/deleteWarn.html',
            controller: 'agreementDeleteController',
            resolve:{
                agreementTable:function(){ return $scope.agreementTable },
                selectedUpdate:function(){ return $scope.selectedUpdate },
                param : function() {
                    return id;
                }
            }
        });
    }

    $scope.updateCheck = function(state,id){
        if(state == 0){//启用不可修改
            alertWarnService.alert("此数据为“启用”状态，不可修改!");
            return false;
        }else{
             $state.go('index.agreement.update',{id:id});
         }
    }

    $scope.list=function(){
        $scope.agreementTable.page(1);
        $scope.agreementTable.reload();
    };

    $scope.reset=function(){
        $scope.title = '';
        document.getElementById("dkn03").value = '';
        document.getElementById("dkn04").value = '';
        $scope.state.selected = '';
        $scope.list();
    }
}]);

app.controller('agreementUpdateStateController',['$scope','$log','agreementService','alertWarnService','$uibModalInstance','param','agreementTable','selectedUpdate',
function($scope,$log,agreementService,alertWarnService,$uibModalInstance,param,agreementTable,selectedUpdate){
	$scope.ok=function(){
	    console.log("协议修改状态请求数据："+angular.toJson(param));
		agreementService.updateState(param).then(function(response){
		console.log("协议修改状态返回数据："+angular.toJson(response));
			if(response.data.status){
				agreementTable.reload();
				$scope.cancel();
				param.length = 0;
				selectedUpdate.length = 0;
			}else{
				alertWarnService.alert(response.data.msg);
				$scope.cancel();
			}
		});
	};
	$scope.cancel=function(){
		 $uibModalInstance.dismiss('cancel');
	};
}]);

app.controller('agreementDeleteController',['$scope','$log','agreementService','alertWarnService','$uibModalInstance','param','agreementTable','selectedUpdate',
function($scope,$log,agreementService,alertWarnService,$uibModalInstance,param,agreementTable,selectedUpdate){
	$scope.ok=function(){
	    console.log("协议删除请求数据："+angular.toJson(param));
		agreementService.delete(param).then(function(response){
		console.log("协议删除返回数据："+angular.toJson(response));
			if(response.data.status){
				agreementTable.reload();
				$scope.cancel();
				selectedUpdate.length = 0;
			}else{
				alertWarnService.alert(response.data.msg);
				$scope.cancel();
			}
		});
	};
	$scope.cancel=function(){
		 $uibModalInstance.dismiss('cancel');
	};
}]);

app.controller('agreementAddController',['$scope','$state','$log','agreementService','alertWarnService','NgTableParams',
function($scope,$state,$log,agreementService,alertWarnService,NgTableParams){
    var agreementAdd={};
	$scope.agreementAdd=agreementAdd;
    $scope.ok=function(){
        if($scope.addForm.$valid){
            console.log("协议增加请求数据："+angular.toJson(agreementAdd));
            agreementService.add(agreementAdd).then(function (response){
                console.log("协议增加返回数据："+angular.toJson(response));
                if(response.data.status){
                    alertWarnService.alert("新增协议成功");
                    $state.go('index.agreement.list');
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }else{
            alertWarnService.alert('请填写合法的数据！');
            $scope.addForm.submitted=true;
        }
    };
    $scope.cancel=function(){
        $state.go("index.agreement.list");
    }
}]);

app.controller('agreementEditController',['$scope','$state','$stateParams','$log','agreementService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,agreementService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    agreementService.view(id).then(function (response){
        console.log("协议修改查看返回数据："+angular.toJson(response));
        if(response.data.status){
            $scope.agreementEdit=response.data.data;
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.ok=function(){
        if($scope.editForm.$valid){
            console.log("协议修改请求数据："+angular.toJson($scope.agreementEdit));
            agreementService.update($scope.agreementEdit).then(function (response){
                console.log("协议修改返回数据："+angular.toJson(response));
                if(response.data.status){
                    alertWarnService.alert("修改协议成功");
                    $state.go('index.agreement.list');
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }else{
            alertWarnService.alert('请填写合法的数据！');
            $scope.editForm.submitted=true;
        }
    };
    $scope.cancel=function(){
        $state.go("index.agreement.list");
    }
}]);

app.controller('agreementViewController',['$scope','$state','$stateParams','$log','agreementService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,agreementService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    console.log("协议查看请求数据："+angular.toJson(id));
    agreementService.view(id).then(function (response){
    console.log("协议查看返回数据："+angular.toJson(response));
        if(response.data.status){
            $scope.agreementDetail=response.data.data;
            $("#content").html($scope.agreementDetail.content);
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.close=function(){
         $state.go('index.agreement.list');
    };
}]);