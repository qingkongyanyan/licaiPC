app.controller('userOpinionController',['$scope','$log','appConstant','userOpinionEnum',
function($scope,$log,appConstant,userOpinionEnum){
    //状态枚举
    $scope.roleCode ={
        data:userOpinionEnum.concat(userOpinionEnum.getRoleCodeEnum())
    };
    $scope.state ={
        data:userOpinionEnum.concat(userOpinionEnum.getStateEnum())
    };
    $scope.functionTypeEnum=[{key:1,value:'工作管理'},
                             {key:2,value:'投资预约'},
                             {key:3,value:'工作提醒'},
                             {key:4,value:'客户管理'},
                             {key:5,value:'业绩分析'},
                             {key:6,value:'公司动态'},
                             {key:7,value:'产品在线'},
                             {key:8,value:'客户评级'},
                             {key:9,value:'客户归属'},
                             {key:11,value:'创新预约'}];
}]);

app.controller('userOpinionListController',['$scope','$log','userOpinionService','alertWarnService','NgTableParams','$uibModal',
function($scope,$log,userOpinionService,alertWarnService,NgTableParams,$uibModal){
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    $scope.initTime = new Date().Format("yyyy-MM-dd");
    $scope.startTime = $scope.initTime;
    $scope.endTime = $scope.initTime;
    document.getElementById("dus01").value = $scope.initTime;
    document.getElementById("dus02").value = $scope.initTime;
    //第几页
    $scope.pageNum=1;
    //每页显示数目
    $scope.numPerPage=10;
    //分页
    $scope.userOpinionTable=new NgTableParams({
        page:$scope.pageNum,
        count:$scope.numPerPage
    },{
        getData:function(params){
            var query={
                pageNum:params.page(),
                numPerPage:params.count(),
                filter:{
                    requestFrom: '02',
                    userName: $scope.userName,
                    roleCode: $scope.roleCode.selected,
                    startTime: Date.parse(new Date(angular.element('#dus01').val().replace(/-/g,'/'))),
                    endTime: Date.parse(new Date(angular.element('#dus02').val().replace(/-/g,'/'))) + 86400000,
                    state:$scope.state.selected
                }
            };
            console.log("用户意见反馈统计查询请求数据："+angular.toJson(query));
            return userOpinionService.queryAllList(query).then(function (response){
                console.log("用户意见反馈统计查询返回数据："+angular.toJson(response));
                if(response.data.status){
                    params.total(response.data.data.totalCount);
                    return response.data.data.recordList;
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }
    });

    //*********表格复选框Start***********
    $scope.selectedCommon = [];
    $scope.selectedCommonId = [];
    var updateSelected = function(type, action, obj){
        if(type == "common"){
            if(action == 'add' && $scope.selectedCommon.indexOf(obj) == -1){
                $scope.selectedCommon.push(obj);
                $scope.selectedCommonId.push(obj.id);
            }
            if(action == 'remove' && $scope.selectedCommon.indexOf(obj)!=-1){
                var idx = $scope.selectedCommon.indexOf(obj);
                var idxId = $scope.selectedCommonId.indexOf(obj.id);
                $scope.selectedCommon.splice(idx,1);
                $scope.selectedCommonId.splice(idxId,1);
            }
        }
    }
    $scope.updateSelection = function(type, $event, obj){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(type, action, obj);
    }
    $scope.isSelected = function(type, obj){
        if(type == "common"){
            return $scope.selectedCommon.indexOf(obj)>=0;
        }
    }
    //*********表格复选框End***********

    $scope.confirm=function(){
        if($scope.selectedCommonId.length > 0){
            var param = {
                ids:$scope.selectedCommonId,
                state:1
            }
            $uibModal.open({
                backdrop:'static',
                animation: $scope.animationsEnabled,
                templateUrl: 'statistics/views/userOpinion/confirmWarn.html',
                controller: 'userOpinionUpdateStateController',
                resolve:{
                    userOpinionTable:function(){ return $scope.userOpinionTable },
                    selectedCommon:function(){ return $scope.selectedCommon },
                    selectedCommonId:function(){ return $scope.selectedCommonId },
                    param : function() {
                        return param;
                    }
                }
            });
        }else{
            alertWarnService.alert("请选择要确认的数据！");
        }
    }

    $scope.delete=function(){
        var flag = '0';
        if($scope.selectedCommon.length > 0){
            for(var i=0;i<$scope.selectedCommon.length;i++){
                if($scope.selectedCommon[i].state == 1){
                    flag = '1';
                }
            }
        }
        if(flag == '0'){
            if($scope.selectedCommonId.length > 0){
                var param = $scope.selectedCommonId;
                $uibModal.open({
                    backdrop:'static',
                    animation: $scope.animationsEnabled,
                    templateUrl: 'common/views/deleteWarn.html',
                    controller: 'userOpinionDeleteController',
                    resolve:{
                        userOpinionTable:function(){ return $scope.userOpinionTable },
                        selectedCommon:function(){ return $scope.selectedCommon },
                        selectedCommonId:function(){ return $scope.selectedCommonId },
                        param : function() {
                            return param;
                        }
                    }
                });
            }else{
                alertWarnService.alert("请选择要删除的数据！");
            }
        }else{
            alertWarnService.alert("已确认的数据不能删除！");
        }
    }

    $scope.list=function(){
        $scope.userOpinionTable.page(1);
        $scope.userOpinionTable.reload();
    };

    $scope.reset=function(){
        $scope.userName = '';
        $scope.roleCode.selected = '';
        document.getElementById("dus01").value = $scope.initTime;
        document.getElementById("dus02").value = $scope.initTime;
        $scope.state.selected = '';
        $scope.list();
    }
}]);

app.controller('userOpinionUpdateStateController',['$scope','$log','userOpinionService','alertWarnService','$uibModalInstance','param','userOpinionTable','selectedCommon','selectedCommonId',
function($scope,$log,userOpinionService,alertWarnService,$uibModalInstance,param,userOpinionTable,selectedCommon,selectedCommonId){
	$scope.ok=function(){
	    console.log("用户意见反馈统计修改确认请求数据："+angular.toJson(param));
		userOpinionService.update(param).then(function(response){
		console.log("用户意见反馈统计修改确认返回数据："+angular.toJson(response));
			if(response.data.status){
				userOpinionTable.reload();
				$scope.cancel();
				param.length = 0;
				selectedCommon.length = 0;
				selectedCommonId.length = 0;
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

app.controller('userOpinionDeleteController',['$scope','$log','userOpinionService','alertWarnService','$uibModalInstance','param','userOpinionTable','selectedCommon','selectedCommonId',
function($scope,$log,userOpinionService,alertWarnService,$uibModalInstance,param,userOpinionTable,selectedCommon,selectedCommonId){
	$scope.ok=function(){
	    console.log("用户意见反馈统计删除请求数据："+angular.toJson(param));
		userOpinionService.delete(param).then(function(response){
		console.log("用户意见反馈统计删除返回数据："+angular.toJson(response));
			if(response.data.status){
				userOpinionTable.reload();
				$scope.cancel();
				param.length = 0;
				selectedCommon.length = 0;
				selectedCommonId.length = 0;
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

app.controller('userOpinionViewController',['$scope','$state','$stateParams','$log','userOpinionService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,userOpinionService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    console.log("用户意见反馈统计查看请求数据："+angular.toJson(id));
    userOpinionService.view(id).then(function (response){
    console.log("用户意见反馈统计查看返回数据："+angular.toJson(response));
        if(response.data.status){
            $scope.userOpinionDetail=response.data.data;
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.close=function(){
         $state.go('index.userOpinion.list');
    };
}]);