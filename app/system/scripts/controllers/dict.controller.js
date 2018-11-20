app.controller('dictController',['$scope','appConstant',function($scope,appConstant){
	$scope.TagTypeEnum=[{name:'下拉框',value:'SELECT'}
		,{name:'表单',value:'FORM'}
		,{name:'复选框',value:'CHECKBOX'}];
	$scope.checkCodeUrl=appConstant.base_url+'/dict/check_code.html';
	$scope.checkNameUrl=appConstant.base_url+'/dict/check_name.html';
}]);

app.controller('dictListController',['$scope','$log','dictService','alertService','NgTableParams',
function($scope,$log,dictService,alertService,NgTableParams){
	var query={
		code:'',
		name:''
	};
	$scope.query=query;
	$scope.dictTable=new NgTableParams({ 
		page:1,
		count:10
		//sorting
	},{
		getData:function(params){
			var pageParam={
				pageNum:params.page(),
				numPerPage:params.count()
			};
	  		$log.debug({pageParam:pageParam,query:query});
			return dictService.list(pageParam,query).then(
				function successCallBack(response){
	      			$log.debug(response.data);
					if(response.data.status){
						params.total(response.data.data.totalCount);
						var list=response.data.data.recordList;
						decorateList(list);
						return list;
					}else{
						alertService.add('warn',response.data.msg);
					}
				},function errorCallBack(response){
					alertService.add('warn','ajax error');
				}
			);
		}
	});
	$scope.list=function(){
		$scope.dictTable.reload();
	}
 	function decorateList(list){
 		for(var i=0;i<list.length;i++){
 			var pairNames='';
 			for(var j=0;j<list[i].dictPairList.length;j++){
 				pairNames+=list[i].dictPairList[j].name;
 				pairNames+="；";
 			}
 			pairNames=pairNames.substring(0,pairNames.length-1);
 			list[i].pairNames=pairNames;
 		}
 		$log.debug(list);
 	}
}]);

app.controller('dictCreateController',['$scope','$state','$log','dictService','alertService',
function($scope,$state,$log,dictService,alertService){
	var dict={};
	$scope.dict=dict;
	$scope.createDict=function(){
		if($scope.createForm.$valid){
			dictService.create(dict).then(function successCallBack(response){
				if(response.data.status){
					alert("新增字典成功");
					$state.go('index.dict.list');
				}else{
					alert('新增字典失败:'+response.data.msg);
				}
			},function errorCallBack(response){
				alertService.add('warn','ajax error');
			});
		}else{
			alert('请填写合法的数据！');
        	$scope.createForm.submitted=true;
		}
	}
	$scope.cancel=function(){
      $state.go('index.dict.list');
    }
}]);

app.controller('dictEditController',['$scope','$state','$stateParams','$log','dictService','alertService',
function($scope,$state,$stateParams,$log,dictService,alertService){
	$log.debug($stateParams);
    var id=$scope.id=$stateParams.id;
    dictService.view(id).then(function successCallBack(response){
    	$log.debug(response);
      	if(response.data.status){
      		$scope.dict=response.data.data;
      	}else{
      		alertService.add('warn',response.data.msg);
      	}
    },function errorCallBack(response){
    	alertService.add('warn','ajax error');
    });
	$scope.editDict=function(){
		if($scope.editForm.$valid){
			dictService.edit($scope.dict).then(function successCallBack(response){
				if(response.data.status){
					alert("修改字典成功");
					$state.go('index.dict.list');
				}else{
					alert('修改字典失败:'+response.data.msg);
				}
			},function errorCallBack(response){
				alertService.add('warn','ajax error');
			});
		}else{
			alert('请填写合法的数据！');
        	$scope.editForm.submitted=true;
		}
	}
	$scope.cancel=function(){
      $state.go('index.dict.list');
    }
}]);

app.controller('dictViewController',['$scope','$state','$stateParams','$log','dictService','alertService',
function($scope,$state,$stateParams,$log,dictService,alertService){
	$log.debug($stateParams);
    var id=$stateParams.id;
    dictService.view(id).then(function successCallBack(response){
    	$log.debug(response);
      	if(response.data.status){
      		$scope.dict=response.data.data;
      	}else{
      		alertService.add('warn',response.data.msg);
      	}
    },function errorCallBack(response){
    	alertService.add('warn','ajax error');
    });
	
	$scope.cancel=function(){
      $state.go('index.dict.list');
    }
}]);

app.controller('pairListController',['$scope','$stateParams','$log','dictService','alertService','NgTableParams','$uibModal','appConstant',
function($scope,$stateParams,$log,dictService,alertService,NgTableParams,$uibModal,appConstant){
	$scope.checkPairCodeUrl=appConstant.base_url+'/dict/pair/check_code.html';
	$scope.checkPairNameUrl=appConstant.base_url+'/dict/pair/check_name.html';

	$log.debug($stateParams);
	var dictId=$stateParams.dictId;
	$scope.pairTable=new NgTableParams({ 
		page:1,
		count:10
		//sorting
	},{
		getData:function(params){
			var pageParam={
				pageNum:params.page(),
				numPerPage:params.count()
			};
	  		$log.debug({pageParam:pageParam,dictId:dictId});
			return dictService.pairList(pageParam,dictId).then(
				function successCallBack(response){
	      			$log.debug(response.data);
					if(response.data.status){
						params.total(response.data.data.totalCount);
						return response.data.data.recordList;
					}else{
						alertService.add('warn',response.data.msg);
					}
				},function errorCallBack(response){
					alertService.add('warn','ajax error');
				}
			);
		}
	});

	$scope.pairDelete=function(id){
		if(confirm('确定删除该键值吗')){
			dictService.pairDelete(id).then(function(response){
				$log.debug(response.data);
				if(response.data.status){
					alert('删除键值成功');
					$scope.pairTable.reload();
				}else{
					alertService.add('warn',response.data.msg);
				}
			},function(response){
				alertService.add('warn','ajax error');
			});	
		}
	};

	$scope.pairCreate=function(){
		var modal = $uibModal.open({
			templateUrl: 'system/views/dict/pairCreate.html',
			controller: 'pairCreateController',
			// size:'lg',
			scope:$scope,
			resolve: {
				dictId: function(){
					return dictId;
				},
				pairTable:function(){
					return $scope.pairTable;
				}
			}
		});
	};
	$scope.pairEdit=function(id){
		var modal = $uibModal.open({
			templateUrl: 'system/views/dict/pairEdit.html',
			controller: 'pairEditController',
			// size:'lg',
			scope:$scope,
			resolve: {
				dictId:function(){
					return dictId;
				},
				id:function(){
					return id;
				},
				pairTable:function(){
					return $scope.pairTable;
				}
			}
		});
	};
}]);

app.controller('pairCreateController',['$scope','$state','dictId','pairTable','$log','dictService','alertService','$uibModalInstance',
function($scope,$state,dictId,pairTable,$log,dictService,alertService,$uibModalInstance){
	$scope.pair={
		dictId:dictId
	};
	$scope.createPair=function(){
		if($scope.createForm.$valid){
			dictService.pairCreate($scope.pair).then(function successCallBack(response){
				if(response.data.status){
					alert("新增键值成功");
					$uibModalInstance.close();
					pairTable.reload();
				}else{
					alert('新增键值失败:'+response.data.msg);
				}
			},function errorCallBack(response){
				alertService.add('warn','ajax error');
			});				
		}else{
			alert('请填写合法的数据！');
    		$scope.createForm.submitted=true;
		}
	}
	$scope.cancel=function(){
		$uibModalInstance.close();
	};
}]);

app.controller('pairEditController',['$scope','$state','dictId','id','pairTable','$log','dictService','alertService','$uibModalInstance',
function($scope,$state,dictId,id,pairTable,$log,dictService,alertService,$uibModalInstance){
	$log.debug(id);
	$scope.id=id;
	dictService.pairView(id).then(function(response){
		$log.debug(response.data);
		if(response.data.status){
			$scope.pair=response.data.data;
		}else{
			alert('查询键值失败:'+response.data.msg);
		}
	},function(response){
		alertService.add('warn','ajax error');
	});
	$scope.editPair=function(){
		if($scope.editForm.$valid){
			dictService.pairEdit($scope.pair).then(function successCallBack(response){
				if(response.data.status){
					alert("编辑键值成功");
					$uibModalInstance.close();
					//$state.go('index.dict.pairList',{dictId,dictId});
					pairTable.reload();
				}else{
					alert('编辑键值失败:'+response.data.msg);
				}
			},function errorCallBack(response){
				alertService.add('warn','ajax error');
			});				
		}else{
			alert('请填写合法的数据！');
    		$scope.editForm.submitted=true;
		}
	}
	$scope.cancel=function(){
		$uibModalInstance.close();
	};
}]);