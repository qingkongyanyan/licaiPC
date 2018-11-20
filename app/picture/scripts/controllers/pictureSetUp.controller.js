app.controller('pictureSetUpController',['$scope','appConstant',
function($scope,appConstant){
    $scope.picStateEnum=[{key:0,value:'已上架'},{key:1,value:'未上架'}];
    $scope.picEnvironmental = window.upload_ServerUrl;
}]);

app.controller('pictureSetUpListController',['$scope','$log','pictureSetUpService','alertWarnService','NgTableParams','$uibModal',
function($scope,$log,pictureSetUpService,alertWarnService,NgTableParams,$uibModal){
//    $scope.pageNum=1;
//    $scope.numPerPage=10;
    //分页
    $scope.pictureSetUpShelvesTable=new NgTableParams({
        page:1,
        count:10
    },{
        getData:function(params){
            var shelvesParam = {
                pageNum:params.page(),
                numPerPage:params.count(),
                filter:{
                    requestFrom:"02",
                    state:0
                }
            };
            return pictureSetUpService.queryAllList(shelvesParam).then(function (response){
                console.log("轮播图上架查询返回数据："+angular.toJson(response));
                if(response.data.status){
                    params.total(response.data.data.totalCount);
                    return response.data.data.recordList;
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }
    });

    $scope.pictureSetUpUnshelvesTable=new NgTableParams({
        page:1,
        count:10
    },{
        getData:function(params){
            var unshelvesParam = {
                pageNum:params.page(),
                numPerPage:params.count(),
                filter:{
                    requestFrom:"02",
                    state:1
                }
            };
            return pictureSetUpService.queryAllList(unshelvesParam).then(function (response){
                console.log("轮播图所有查询返回数据："+angular.toJson(response));
                if(response.data.status){
                    params.total(response.data.data.totalCount);
                    return response.data.data.recordList;
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }
    });

    $scope.list=function(){
        $scope.pictureSetUpShelvesTable.reload();
        $scope.pictureSetUpUnshelvesTable.reload();
    };

    //*********表格复选框Start***********
    $scope.selectedUnshelves = [];
    $scope.selectedShelves = [];
    $scope.selectedDeleteId = [];
    var updateSelected = function(type, action, obj){
        if(type == "unshelves"){
            if(action == 'add' && $scope.selectedUnshelves.indexOf(obj) == -1){
                $scope.selectedUnshelves.push(obj);
            }
            if(action == 'remove' && $scope.selectedUnshelves.indexOf(obj)!=-1){
                var idx = $scope.selectedUnshelves.indexOf(obj);
                $scope.selectedUnshelves.splice(idx,1);
            }
        }
        if(type == "deleteOrShelves"){
            if(action == 'add' && $scope.selectedShelves.indexOf(obj) == -1){
                $scope.selectedShelves.push(obj);
                $scope.selectedDeleteId.push(obj.id);
            }
            if(action == 'remove' && $scope.selectedShelves.indexOf(obj)!=-1){
                var idx = $scope.selectedShelves.indexOf(obj);
                var idxId = $scope.selectedDeleteId.indexOf(obj.id);
                $scope.selectedShelves.splice(idx,1);
                $scope.selectedDeleteId.splice(idxId,1);
            }
        }
    }
    $scope.updateSelection = function(type, $event, obj){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(type, action, obj);
    }
    $scope.isSelected = function(type, obj){
        if(type == "unshelves"){
            return $scope.selectedUnshelves.indexOf(obj)>=0;
        }
        if(type == "deleteOrShelves"){
            return $scope.selectedShelves.indexOf(obj)>=0;
        }
    }
    //*********表格复选框End***********

    $scope.shelves = function(status){
        var flag = '0';
        var templateUrl = '';
        if(status == 0){//上架
            if($scope.selectedShelves.length > 0){
                flag = '1';
                templateUrl = 'picture/views/pictureSetUp/shelvesWarn.html';
            }else{
                alertWarnService.alert("请选择要上架的数据！");
            }
        }else if(status == 1){//下架
            if($scope.selectedUnshelves.length > 0){
                flag = '1';
                templateUrl = 'picture/views/pictureSetUp/unshelvesWarn.html';
            }else{
                alertWarnService.alert("请选择要下架的数据！");
            }
        }
        if(flag == '1'){
            $uibModal.open({
                backdrop:'static',
                animation: $scope.animationsEnabled,
                templateUrl: templateUrl,
                controller: 'pictureSetUpShelvesController',
                resolve:{
                    pictureSetUpShelvesTable:function(){ return $scope.pictureSetUpShelvesTable },
                    pictureSetUpUnshelvesTable:function(){ return $scope.pictureSetUpUnshelvesTable },
                    selectedShelves:function(){ return $scope.selectedShelves },
                    selectedUnshelves:function(){ return $scope.selectedUnshelves },
                    selectedDeleteId:function(){ return $scope.selectedDeleteId },
                    status : function() {return status;}
                }
            });
        }
    }

    $scope.delete = function(){
        if($scope.selectedDeleteId.length > 0){
            $uibModal.open({
                backdrop:'static',
                animation: $scope.animationsEnabled,
                templateUrl: 'common/views/deleteWarn.html',
                controller: 'pictureSetUpDeleteController',
                resolve:{
                    pictureSetUpShelvesTable:function(){ return $scope.pictureSetUpShelvesTable },
                    pictureSetUpUnshelvesTable:function(){ return $scope.pictureSetUpUnshelvesTable },
                    selectedShelves:function(){ return $scope.selectedShelves },
                    selectedUnshelves:function(){ return $scope.selectedUnshelves},
                    selectedDeleteId:function(){ return $scope.selectedDeleteId},
                    param : function() { return $scope.selectedDeleteId}
                }
            });
        }else{
            alertWarnService.alert("请选择要删除的数据！");
        }
    }
}]);

app.controller('pictureSetUpShelvesController',['$scope','$log','pictureSetUpService','alertWarnService','$uibModalInstance','status','pictureSetUpShelvesTable','pictureSetUpUnshelvesTable','selectedShelves','selectedUnshelves','selectedDeleteId',
function($scope,$log,pictureSetUpService,alertWarnService,$uibModalInstance,status,pictureSetUpShelvesTable,pictureSetUpUnshelvesTable,selectedShelves,selectedUnshelves,selectedDeleteId){
	$scope.ok=function(){
	    var param = [];
	    if(status == 0){
            for(var i=0;i<selectedShelves.length;i++){
                selectedShelves[i].picState = status;
            };
            param = selectedShelves;
        }else if(status == 1){
            for(var i=0;i<selectedUnshelves.length;i++){
                selectedUnshelves[i].picState = status;
            };
            param = selectedUnshelves;
        }
	    console.log("轮播图修改上下架请求数据："+angular.toJson(param));
		pictureSetUpService.modState(param).then(function(response){
		console.log("轮播图修改上下架返回数据："+angular.toJson(response));
			if(response.data.status){
				pictureSetUpShelvesTable.reload();
				pictureSetUpUnshelvesTable.reload();
				$scope.cancel();
				param.length = 0;
				selectedShelves.length = 0;
                selectedUnshelves.length = 0;
				selectedDeleteId.length = 0;
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

app.controller('pictureSetUpDeleteController',['$scope','$log','pictureSetUpService','alertWarnService','$uibModalInstance','param','pictureSetUpShelvesTable','pictureSetUpUnshelvesTable','selectedShelves','selectedUnshelves','selectedDeleteId',
function($scope,$log,pictureSetUpService,alertWarnService,$uibModalInstance,param,pictureSetUpShelvesTable,pictureSetUpUnshelvesTable,selectedShelves,selectedUnshelves,selectedDeleteId){
	$scope.ok=function(){
	console.log("轮播图删除请求数据："+angular.toJson(param));
		pictureSetUpService.delete(param).then(function(response){
			console.log("轮播图删除返回数据："+angular.toJson(response));
			if(response.data.status){
			    pictureSetUpUnshelvesTable.reload();
				pictureSetUpShelvesTable.reload();
				$scope.cancel();
				param.length = 0;
				selectedShelves.length = 0;
				selectedUnshelves.length = 0;
				selectedDeleteId.length = 0;
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

app.controller('pictureSetUpAddController',['$scope','$state','$log','pictureSetUpService','alertWarnService','NgTableParams',
function($scope,$state,$log,pictureSetUpService,alertWarnService,NgTableParams){
    $scope.uploadAndSave = function () {
        if($scope.pictureSetUp.file.length > 3 * 1024 * 1024){
            alertWarnService.alert("您选择的图片大于3M，请重新选择！");
            return null;
        }
        var param = {
            picName : $scope.pictureSetUp.picName,
            picUrl: $scope.pictureSetUp.picUrl,
            arcFile:  $scope.pictureSetUp.file
        }
        console.log("轮播图新增请求数据："+angular.toJson(param));
        pictureSetUpService.add(param).then(
            function (response) {
                console.log("轮播图新增返回数据："+angular.toJson(response));
                if (response.data.status) {
                    alertWarnService.alert("新增成功！");
                    $state.go("index.pictureSetUp.list");
                } else {
                    alertWarnService.alert(response.data.msg);
//                    alertWarnService.showError(response.data.code,$scope.error);
                }
            },
            function (response) {
                $log.debug(response);
            }
        )
    }
    $scope.cancel=function(){
        $state.go("index.pictureSetUp.list");
    }
}]);

app.controller('pictureSetUpEditController',['$scope','$state','$stateParams','$log','pictureSetUpService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,pictureSetUpService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    pictureSetUpService.view(id).then(function (response){
        $log.debug(response);
        if(response.data.status){
            $scope.pictureSetUpUpdate=response.data.data;
            $scope.pictureSetUpUpdate.file = $scope.picEnvironmental + $scope.pictureSetUpUpdate.picAddress;
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.uploadAndSave = function () {
        if($scope.pictureSetUpUpdate.file == $scope.picEnvironmental + $scope.pictureSetUpUpdate.picAddress){
            $scope.pictureSetUpUpdate.file = '';
        }
        var param = {
            id : id,
            picName : $scope.pictureSetUpUpdate.picName,
            picUrl: $scope.pictureSetUpUpdate.picUrl,
            arcFile:  $scope.pictureSetUpUpdate.file
        }
        console.log("轮播图修改请求数据："+angular.toJson(param));
        pictureSetUpService.update(param).then(
            function (response) {
                console.log("轮播图修改返回数据："+angular.toJson(response));
                if (response.data.status) {
                    alertWarnService.alert("修改成功！");
                    $state.go("index.pictureSetUp.list");
                } else {
                    $scope.pictureSetUpUpdate.file = $scope.picEnvironmental + $scope.pictureSetUpUpdate.picAddress;
                    alertWarnService.alert(response.data.msg);
//                    alertWarnService.showError(response.data.code,$scope.error);
                }
            },
            function (response) {
                $log.debug(response);
            }
        )
    }
    $scope.cancel=function(){
        $state.go("index.pictureSetUp.list");
    }
}]);

app.controller('pictureSetUpViewController',['$scope','$state','$stateParams','$log','pictureSetUpService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,pictureSetUpService,alertWarnService,NgTableParams){
    var id=$stateParams.id;
    pictureSetUpService.view(id).then(function (response){
        if(response.data.status){
            $scope.pictureSetUpDetail=response.data.data;
            $scope.pictureSetUpDetail.picAddress = $scope.picEnvironmental + $scope.pictureSetUpDetail.picAddress;
        }else{
            alertWarnService.alert(response.data.msg);
        }
    });
    $scope.cancel=function(){
        $state.go("index.pictureSetUp.list");
    }
}]);

app.controller('pictureSetUpSortController',['$scope','$state','$log','pictureSetUpService','alertWarnService','NgTableParams',
function($scope,$state,$log,pictureSetUpService,alertWarnService,NgTableParams){
    //分页
    $scope.pictureSetUpSortTable=new NgTableParams({
        page:1,
        count:10
    },{
        getData:function(params){
            var shelvesParam = {
                pageNum:params.page(),
                numPerPage:params.count(),
                filter:{
                    requestFrom:"02",
                    state:0
                }
            };
            return pictureSetUpService.queryAllList(shelvesParam).then(function (response){
                console.log("轮播图排序查询返回数据："+angular.toJson(response));
                if(response.data.status){
                    params.total(response.data.data.totalCount);
                    $scope.pictureSetUpSortList = response.data.data.recordList;
                    return $scope.pictureSetUpSortList;
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }
    });

    $scope.pictureSetUpSortTable.reload();

    $scope.modSort = function(){
        var requestModSort = angular.toJson($scope.pictureSetUpSortList);
        console.log("轮播图修改排序请求数据:"+requestModSort);
        pictureSetUpService.modSort(requestModSort).then(function (response){
            console.log("轮播图修改排序返回数据"+angular.toJson(response));
            if(response.data.status){
                alertWarnService.alert("修改成功！");
                $state.go("index.pictureSetUp.list");
            }else{
                alertWarnService.alert(response.data.msg);
            }
        })
    }

    $scope.cancel=function(){
        $state.go("index.pictureSetUp.list");
    }
}]);
