app.controller('comProblemController',['$scope','appConstant','comProblemEnum',
function($scope,appConstant,comProblemEnum){
    $scope.state ={
        data:comProblemEnum.concat(comProblemEnum.getStateEnum())
    };
}]);

app.controller('comProblemListController',['$scope','$log','comProblemService','alertWarnService','NgTableParams','$uibModal','$state',
function($scope,$log,comProblemService,alertWarnService,NgTableParams,$uibModal,$state){
    //第几页
    $scope.pageNum=1;
    //每页显示数目
    $scope.numPerPage=10;
    //分页
    $scope.comProblemTable=new NgTableParams(
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
                        question: $scope.question,
                        startTime: Date.parse(new Date(angular.element('#dkn01').val().replace(/-/g,'/'))),
                        endTime: Date.parse(new Date(angular.element('#dkn02').val().replace(/-/g,'/'))) + 86400000,
                        state:$scope.state.selected
                    }
                };
                console.log("常见问题查询请求数据："+angular.toJson(query));
                return comProblemService.queryAllList(query).then(function (response){
                    console.log("常见问题查询返回数据："+angular.toJson(response));
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
                templateUrl = 'knowledge/views/comProblem/enableWarn.html';
            }else if(state == 1){//停用
                templateUrl = 'knowledge/views/comProblem/unenableWarn.html';
            }
            var param = {
                ids:$scope.selectedUpdate,
                state:state
            }
            $uibModal.open({
                backdrop:'static',
                animation: $scope.animationsEnabled,
                templateUrl: templateUrl,
                controller: 'comProblemUpdateStateController',
                resolve:{
                    comProblemTable:function(){ return $scope.comProblemTable },
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
            controller: 'comProblemDeleteController',
            resolve:{
                comProblemTable:function(){ return $scope.comProblemTable },
                selectedUpdate:function(){ return $scope.selectedUpdate },
                param : function() {
                    return id;
                }
            }
        });
    }

    $scope.update = function(state,id){
        if(state == 0){//启用不可修改
            alertWarnService.alert("此数据为“启用”状态，不可修改!");
        }else{
            $state.go('index.comProblem.update',{id:id});
        }
    }

    $scope.list=function(){
        $scope.comProblemTable.page(1);
        $scope.comProblemTable.reload();
    };

    $scope.reset=function(){
        $scope.question = '';
        document.getElementById("dkn01").value = '';
        document.getElementById("dkn02").value = '';
        $scope.state.selected = '';
        $scope.list();
    }
}]);

app.controller('comProblemUpdateStateController',['$scope','$log','comProblemService','alertWarnService','$uibModalInstance','param','comProblemTable','selectedUpdate',
function($scope,$log,comProblemService,alertWarnService,$uibModalInstance,param,comProblemTable,selectedUpdate){
	$scope.ok=function(){
	    console.log("常见问题修改状态请求数据："+angular.toJson(param));
		comProblemService.updateState(param).then(function(response){
		console.log("常见问题修改状态返回数据："+angular.toJson(response));
			if(response.data.status){
				comProblemTable.reload();
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

app.controller('comProblemDeleteController',['$scope','$log','comProblemService','alertWarnService','$uibModalInstance','param','comProblemTable','selectedUpdate',
function($scope,$log,comProblemService,alertWarnService,$uibModalInstance,param,comProblemTable,selectedUpdate){
	$scope.ok=function(){
	    console.log("常见问题删除请求数据："+angular.toJson(param));
		comProblemService.delete(param).then(function(response){
		console.log("常见问题删除返回数据："+angular.toJson(response));
			if(response.data.status){
				comProblemTable.reload();
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

app.controller('comProblemAddController',['$scope','$state','$log','comProblemService','alertWarnService','NgTableParams',
function($scope,$state,$log,comProblemService,alertWarnService,NgTableParams){
    var comProblemAdd={};
	$scope.comProblemAdd=comProblemAdd;
    $scope.ok=function(){
        if($scope.addForm.$valid){
            console.log("常见问题增加请求数据："+angular.toJson(comProblemAdd));
            comProblemService.add(comProblemAdd).then(function (response){
                console.log("常见问题增加返回数据："+angular.toJson(response));
                if(response.data.status){
                    alertWarnService.alert("新增问题成功");
                    $state.go('index.comProblem.list');
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
        $state.go("index.comProblem.list");
    }
}]);

app.controller('comProblemEditController',['$scope','$state','$stateParams','$log','comProblemService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,comProblemService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    var param = {
        id: id
    }
    comProblemService.view(param).then(function (response){
        console.log("常见问题修改查看返回数据："+angular.toJson(response));
        if(response.data.status){
            $scope.comProblemEdit=response.data.data;
            $log.debug($scope.comProblemEdit);
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.ok=function(){
        if($scope.editForm.$valid){
            console.log("常见问题修改请求数据："+angular.toJson($scope.comProblemEdit));
            comProblemService.update($scope.comProblemEdit).then(function (response){
                console.log("常见问题修改返回数据："+angular.toJson(response));
                if(response.data.status){
                    alertWarnService.alert("修改问题成功");
                    $state.go('index.comProblem.list');
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
        $state.go("index.comProblem.list");
    }
}]);

app.controller('comProblemViewController',['$scope','$state','$stateParams','$log','comProblemService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,comProblemService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    var param = {
        id: id
    }
    console.log("常见问题查看请求数据："+angular.toJson(id));
    comProblemService.view(param).then(function (response){
    console.log("常见问题查看返回数据："+angular.toJson(response));
        if(response.data.status){
            $scope.comProblemDetail=response.data.data;
            $("#answer").html($scope.comProblemDetail.answer);
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.close=function(){
         $state.go('index.comProblem.list');
    };
}]);