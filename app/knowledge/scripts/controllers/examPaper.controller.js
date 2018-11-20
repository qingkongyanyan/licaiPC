app.controller('examPaperController',['$scope','appConstant',
function($scope,appConstant){

}]);

app.controller('examPaperListController',['$scope','$state','$log','examPaperService','alertWarnService','NgTableParams','$uibModal',
function($scope,$state,$log,examPaperService,alertWarnService,NgTableParams,$uibModal){
    //第几页
    $scope.pageNum=1;
    //每页显示数目
    $scope.numPerPage=10;
    //分页
    $scope.examPaperTable=new NgTableParams(
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
                        title: $scope.title,
                        startTime: Date.parse(new Date(angular.element('#dkn05').val().replace(/-/g,'/'))),
                        endTime: Date.parse(new Date(angular.element('#dkn06').val().replace(/-/g,'/'))) + 86400000
                    }
                };
                console.log("考卷查询请求数据："+angular.toJson(query));
                return examPaperService.queryList(query).then(function (response){
                    console.log("考卷查询返回数据："+angular.toJson(response));
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
    $scope.selectedUpdateId = [];
    var updateSelected = function(type, action, obj){
        if(type == "update"){
            if(action == 'add' && $scope.selectedUpdate.indexOf(obj) == -1){
                $scope.selectedUpdate.push(obj);
                $scope.selectedUpdateId.push(obj.id);
            }
            if(action == 'remove' && $scope.selectedUpdate.indexOf(obj)!=-1){
                var idx = $scope.selectedUpdate.indexOf(obj);
                $scope.selectedUpdate.splice(idx,1);
                var idxId = $scope.selectedUpdateId.indexOf(obj.id);
                $scope.selectedUpdateId.splice(idxId,1);
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
        if($scope.selectedUpdateId.length > 0){
            var templateUrl = '';
            if(state == 0){//启用
                templateUrl = 'knowledge/views/examPaper/enableWarn.html';
            }else if(state == 1){//停用
                templateUrl = 'knowledge/views/examPaper/unenableWarn.html';
            }
            var param = {
                ids:$scope.selectedUpdateId,
                state:state
            }
            $uibModal.open({
                backdrop:'static',
                animation: $scope.animationsEnabled,
                templateUrl: templateUrl,
                controller: 'examPaperUpdateStateController',
                resolve:{
                    examPaperTable:function(){ return $scope.examPaperTable },
                    selectedUpdate:function(){ return $scope.selectedUpdate },
                    selectedUpdateId:function(){ return $scope.selectedUpdateId },
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

    $scope.examPaperSetting = function(){
        if($scope.selectedUpdate.length == 1){
            if($scope.selectedUpdate.state == 0){//启用不可修改
                alertWarnService.alert("此数据为“启用”状态，不可设置考卷!");
            }else{
//                $state.go('index.examPaper.setting',{id:id});
                $uibModal.open({
                    backdrop:'static',
                    animation: $scope.animationsEnabled,
                    templateUrl: 'knowledge/views/examPaper/setting.html',
                    controller: 'examPaperSettingController',
                    resolve:{
                        examPaperTable:function(){ return $scope.examPaperTable },
                        selectedUpdate:function(){ return $scope.selectedUpdate },
                        selectedUpdateId:function(){ return $scope.selectedUpdateId }
                    }
                });
            }
        }else{
            if($scope.selectedUpdate.length == 0){
                alertWarnService.alert("请选择要设置考卷的数据！");
            }
            if($scope.selectedUpdate.length > 1){
                alertWarnService.alert("只能选择一条设置考卷的数据！");
            }
        }
    }

    $scope.delete = function(id){
        $uibModal.open({
            backdrop:'static',
            animation: $scope.animationsEnabled,
            templateUrl: 'common/views/deleteWarn.html',
            controller: 'examPaperDeleteController',
            resolve:{
                examPaperTable:function(){ return $scope.examPaperTable },
                selectedUpdate:function(){ return $scope.selectedUpdate },
                selectedUpdateId:function(){ return $scope.selectedUpdateId },
                param : function() {
                    return id;
                }
            }
        });
    }

    $scope.download = function(){
        examPaperService.download();
//        .then(function(response){
//            console.log("导出考卷模板返回数据："+angular.toJson(response));
//            if(response.status == 200){
//                var blob = new Blob(response.data, {type: "application/octet-stream"});
//                location.href = blob;
//            }else{
//                alertWarnService.alert(response.data.msg);
//            }
//        });
    }

    $scope.list=function(){
        $scope.examPaperTable.page(1);
        $scope.examPaperTable.reload();
    };

    $scope.reset=function(){
        $scope.title = '';
        document.getElementById("dkn05").value = '';
        document.getElementById("dkn06").value = '';
        $scope.list();
    }
}]);

app.controller('examPaperUpdateStateController',['$scope','$log','examPaperService','alertWarnService','$uibModalInstance','param','examPaperTable','selectedUpdate','selectedUpdateId',
function($scope,$log,examPaperService,alertWarnService,$uibModalInstance,param,examPaperTable,selectedUpdate,selectedUpdateId){
	$scope.ok=function(){
	    console.log("考卷修改状态请求数据："+angular.toJson(param));
		examPaperService.update(param).then(function(response){
		console.log("考卷修改状态返回数据："+angular.toJson(response));
			if(response.data.status){
				examPaperTable.reload();
				$scope.cancel();
				param.length = 0;
				selectedUpdate.length = 0;
				selectedUpdateId.length = 0;
				alertWarnService.alert('修改成功！');
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

app.controller('examPaperDeleteController',['$scope','$log','examPaperService','alertWarnService','$uibModalInstance','param','examPaperTable','selectedUpdate','selectedUpdateId',
function($scope,$log,examPaperService,alertWarnService,$uibModalInstance,param,examPaperTable,selectedUpdate,selectedUpdateId){
	$scope.ok=function(){
	    console.log("考卷删除请求数据："+angular.toJson(param));
		examPaperService.delete(param).then(function(response){
		console.log("考卷删除返回数据："+angular.toJson(response));
			if(response.data.status){
				examPaperTable.reload();
				$scope.cancel();
				selectedUpdate.length = 0;
				selectedUpdateId.length = 0;
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

app.controller('examPaperAddController',['$scope','$state','$log','examPaperService','alertWarnService','NgTableParams',
function($scope,$state,$log,examPaperService,alertWarnService,NgTableParams){
    var examPaperAdd={};
	$scope.examPaperAdd=examPaperAdd;
    $scope.ok=function(){
        if($scope.addForm.$valid){
            console.log("考卷增加请求数据："+angular.toJson(examPaperAdd));
            examPaperService.add(examPaperAdd).then(function (response){
                console.log("考卷增加返回数据："+angular.toJson(response));
                if(response.data.status){
                    alertWarnService.alert("新增问题成功");
                    $state.go('index.examPaper.list');
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
        $state.go("index.examPaper.list");
    }
}]);

app.controller('examPaperViewController',['$scope','$state','$stateParams','$log','examPaperService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,examPaperService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    console.log("考卷查看请求数据："+angular.toJson(id));
    examPaperService.view(id).then(function (response){
    console.log("考卷查看返回数据："+angular.toJson(response));
        if(response.data.status){
            $scope.examPaperDetail=response.data.data;
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.close=function(){
         $state.go('index.examPaper.list');
    };
}]);

app.controller('examPaperSettingController',['$scope','$state','$log','examPaperService','alertWarnService','$uibModalInstance','NgTableParams','examPaperTable','selectedUpdate','selectedUpdateId','examPaperEnum',
function($scope,$state,$log,examPaperService,alertWarnService,$uibModalInstance,NgTableParams,examPaperTable,selectedUpdate,selectedUpdateId,examPaperEnum){
    $scope.investmentType ={
        data:examPaperEnum.concat(examPaperEnum.getInvestmentTypeEnum())
    };
    var id=selectedUpdateId[0];
    $scope.ok=function(){
        if($scope.settingForm.$valid){
            var param = {
                paperId : id,
                paperName : $scope.examPaperSetting.paperName,
                totalScore : $scope.examPaperSetting.totalScore
//                list : [{
//                    paperId : id,
//                    typeCode : "",
//                    typeName : "",
//                    lowScore : ,
//                    highScore :
//                }]
            }
            console.log("考卷增加请求数据："+angular.toJson(param));
            examPaperService.setting(param).then(function (response){
                console.log("考卷增加返回数据："+angular.toJson(response));
                if(response.data.status){
                    alertWarnService.alert("设置考卷成功");
                    $state.go('index.examPaper.list');
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }else{
            alertWarnService.alert('请填写合法的数据！');
            $scope.settingForm.submitted=true;
        }
    };
    $scope.cancel=function(){
         $uibModalInstance.dismiss('cancel');
    };
}]);