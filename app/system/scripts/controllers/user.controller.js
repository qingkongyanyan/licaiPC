
app.controller('userController',['$scope','$log','productService','appConstant',function($scope,$log,productService,appConstant){
  $scope.UserStatusEnum=[{name:'正常',value:'NORMAL'}
    ,{name:'注销',value:'CANCEL'}
    ,{name:'休息',value:'REST'}];
  $scope.SexEnum=[{name:'男',value:'MALE'}
    ,{name:'女',value:'FEMALE'}];
  $scope.CertTypeEnum=[{name:'身份证',value:'IDCARD'}
    ,{name:'其它',value:'OTHER'}];
  $scope.EducationEnum=[{name:'博士后',value:'POSTDOCTOR'}
    ,{name:'博士',value:'DOCTOR'}
    ,{name:'硕士',value:'MASTER'}
    ,{name:'本科',value:'COLLAGE'}
    ,{name:'专科',value:'JUNIORCOLLAGE'}
    ,{name:'高中',value:'SENIOR'}
    ,{name:'初中及以下',value:'JUNIOR'}];

  //初始化所有Product和BusiTunnel
  $scope.productList=null;
  $scope.busiTunnelList=null;
  productService.productList().then(function successCallBack(response){
    $log.debug(response.data);
    if(response.data.status){
      $scope.productList= response.data.data;
      for(var i=0;i<$scope.productList.length;i++){
        $scope.productList[i].checked=false;
      }
      $log.debug('productList inited');
    }else{
      alertService.add('warn',response.data.msg);
    }
  },function errorCallBack(){
    alertService.add('warn','ajax error');
  });

  productService.busiTunnelList().then(function successCallBack(response){
    $log.debug(response.data);
    if(response.data.status){
      $scope.busiTunnelList= response.data.data;
      $log.debug('busiTunnelList inited');
    }else{
      alertService.add('warn',response.data.msg);
    }
  },function errorCallBack(){
    alertService.add('warn','ajax error');
  });

  $scope.checkCodeUrl=appConstant.base_url+'/user/check_code.html';

  $log.debug('userController inited');
}]);

app.controller('userListController',['$scope','$log','userService','alertService','NgTableParams',
  function ($scope,$log,userService,alertService,NgTableParams) {
  var query={
  	code:'',
  	name:'',
  	status:''
  };
  var choose={};
  $scope.query=query;
  $scope.choose=choose;
  $scope.userTable=new NgTableParams({ 
  	page:1,
  	count:10
  	//sorting
  },{
    //ng-table.js Line1237 有详细设置table属性
  	getData:function(params){
  		var pageParam={
  			pageNum:params.page(),
  			numPerPage:params.count()
  		};
      if(query.code===''){
        query.code=undefined;
      }
      if(query.name===''){
        query.name=undefined;
      }
      if(query.status===''){
        query.status=undefined;
      }
      $log.debug({pageParam:pageParam,query:query});
  		return userService.list(pageParam,query).then(
  			function successCallBack(response){
          $log.debug(response.data);
  				if(response.data.status){
  					params.total(response.data.data.totalCount);
  					var list= response.data.data.recordList;
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
  function decorateList(list){
    for(var i=0;i<list.length;i++){
      var roleNames='';
      for(var j=0;j<list[i].roleList.length;j++){
        roleNames+=list[i].roleList[j].roleName;
        roleNames+="；";
      }
      roleNames=roleNames.substring(0,roleNames.length-1);
      list[i].roleNames=roleNames;
    }
    $log.debug(list);
  }
  $scope.list=function(){
    $scope.userTable.reload();
  };

  $scope.reset=function(){
    if(checkChoose()){
      userService.reset($scope.choose.id).then(function successCallback(response){
        $log.debug(response.data);
        if(response.data.status){
          alert("操作成功");
          $scope.userTable.reload();
        }else{
          alertService.add('warn',response.data.msg);
        }
      },function errorCallback(response){
        alertService.add('warn','ajax error');
      });
    }else{
      alert("请选择一项用户再进行相应操作");
    }
  };

  $scope.rest=function(){
    if(checkChoose()){
      userService.rest($scope.choose.id).then(function successCallback(response){
        $log.debug(response.data);
        if(response.data.status){
          alert("操作成功");
          $scope.userTable.reload();
        }else{
          alertService.add('warn',response.data.msg);
        }
      },function errorCallback(response){
        alertService.add('warn','ajax error');
      });
    }else{
      alert("请选择一项用户再进行相应操作");
    }
  };

  $scope.active=function(){
    if(checkChoose()){
      userService.active($scope.choose.id).then(function successCallback(response){
        $log.debug(response.data);
        if(response.data.status){
          alert("操作成功");
          $scope.userTable.reload();
        }else{
          alertService.add('warn',response.data.msg);
        }
      },function errorCallback(response){
        alertService.add('warn','ajax error');
      });
    }else{
      alert("请选择一项用户再进行相应操作");
    }
  };

  $scope.cancel=function(){
    if(checkChoose()){
      userService.cancel($scope.choose.id).then(function successCallback(response){
        $log.debug(response.data);
        if(response.data.status){
          alert("操作成功");
          $scope.userTable.reload();
        }else{
          alertService.add('warn',response.data.msg);
        }
      },function errorCallback(response){
        alertService.add('warn','ajax error');
      });
    }else{
      alert("请选择一项用户再进行相应操作");
    }
  };


  function checkChoose(){
    $log.debug($scope.choose.id);
    if(typeof $scope.choose.id ==='undefined'){
      return false;
    }else{
      return true;
    }
  }
}]);

app.controller('userCreateController',['$scope','$state','$log','userService','alertService','productService',
  function($scope,$state,$log,userService,alertService,productService){
    var user={};//当前用户信息 枚举若为空值需改为undefined
    $scope.user=user;

    //--------------init begin--------------
    if($scope.busiTunnelList!=null && $scope.productList!=null){
      //已经加载完成
      if($scope.busiTunnelList.length===0){
        alert('没有业务渠道信息，请先配置业务渠道信息。');
      }else if($scope.productList.length===0){
        alert('没有产品信息，请先配置产品信息。');
      }else{
        $scope.busiTunnel=$scope.busiTunnelList[0];
        $log.debug('busiTunnel inited');
        $scope.productPage=[];
        for(var i=0;i<$scope.productList.length;i++){
          $scope.productList[i].checked=false;//清除原先的选择
          if($scope.productList[i].tunnelId===$scope.busiTunnel.id){
            $scope.productPage.push($scope.productList[i]);
          }
        }
        $log.debug('productPage inited');
      }
    }else{
      //事实表明这个listen会被调用三次，分别是[null,null],[Array[3], null],[Array[3], Array[6]]
      var watch=$scope.$watchGroup(['busiTunnelList','productList'],function(newValues,oldValues,scope){
        for(var i=0;i<newValues.length;i++){
          if(newValues[i]==null){
            return;
          }
        }
        //加载完成
        if($scope.busiTunnelList.length===0){
          alert('没有业务渠道信息，请先配置业务渠道信息。');
        }else if($scope.productList.length===0){
          alert('没有产品信息，请先配置产品信息。');
        }else{
          $scope.busiTunnel=$scope.busiTunnelList[0];
          $log.debug('busiTunnel inited');
          $scope.productPage=[];
          for(var i=0;i<$scope.productList.length;i++){
            $scope.productList[i].checked=false;//清除原先的选择
            if($scope.productList[i].tunnelId===$scope.busiTunnel.id){
              $scope.productPage.push($scope.productList[i]);
            }
          }
          $log.debug('productPage inited');
        }
        watch();//un-register the watch
      });
    }

    user.certType=$scope.CertTypeEnum[0].value;
    user.sex=$scope.SexEnum[0].value;
    $scope.pageChecked=false;
    //-------------init end-----------------

    $scope.createUser=function(){
      if($scope.createForm.$valid){
        if(user.education===''){
          user.education=undefined;//学历为非必填项
        }
        var productIds=[];
        for(var i=0;i<$scope.productList.length;i++){
          if($scope.productList[i].checked){
            productIds.push($scope.productList[i].id);
          }
        }
        userService.create(user,productIds).then(
          function successCallback(response){
            $log.debug(response);
            if(response.data.status){
              alert('新增用户成功:'+response.data.data);
              $state.go('index.user.list');//TODO 跳回管理页面 也许需要带参数
            }else{
              alert('新增用户失败:'+response.data.msg);
            }
          },function errorCallback(response){
            alertService.add('warn','ajax error');
          });
      }else{
        alert('请填写合法的数据！');
        $scope.createForm.submitted=true;
      }
      
    };
    $scope.changeBusiTunnel=function(){
      $scope.productPage=[];
      for(var i=0;i<$scope.productList.length;i++){
        if($scope.productList[i].tunnelId===$scope.busiTunnel.id){
          $scope.productPage.push($scope.productList[i]);
        }
      }      
    };

    $scope.changePageChecked=function(){
      for(var i=0;i<$scope.productPage.length;i++){
        $scope.productPage[i].checked=$scope.pageChecked;
      }
    };

    $scope.cancel=function(){
      $state.go('index.user.list');
    }
}]);


app.controller('userViewController',['$scope','$state','$stateParams','$log','userService','alertService','productService',
  function($scope,$state,$stateParams,$log,userService,alertService,productService){
    $log.debug($stateParams);
    var id=$stateParams.id;

    //--------------init begin--------------
    userService.view(id).then(function successCallback(response){
      $log.debug(response);
      if(response.data.status){
        $scope.user=response.data.data;
        var productIds=[];
        for(var i=0;i<$scope.user.userProductList.length;i++){
          productIds.push($scope.user.userProductList[i].productId);
        }
        if(productIds.length>0){
          $scope.busiTunnelProductList=[];
          if($scope.busiTunnelList!=null && $scope.productList!=null){
            //已经加载完成
            init(productIds,$scope.productList,$scope.busiTunnelList,$scope.busiTunnelProductList);
          }else{
            var watch=$scope.$watchGroup(['busiTunnelList','productList'],function(newValues,oldValues,scope){
              for(var i=0;i<newValues.length;i++){
                if(newValues[i]==null){
                  return;
                }
              }
              //加载完成
              init(productIds,$scope.productList,$scope.busiTunnelList,$scope.busiTunnelProductList);
              watch();//un-register the watch
            });
          }
        }else{
          $scope.busiTunnelProductList=[{name:'没有产品信息'}];
        }
      }else{
        alertService.add('warn',response.data.msg);
      }
    },function errorCallback(response){
      alertService.add('warn','ajax error');
    });
    //-------------init end-----------------
   
    $scope.cancel=function(){
      $state.go('index.user.list');
    }

    function init(productIds,productList,busiTunnelList,busiTunnelProductList){
      for(var i=0;i<productIds.length;i++){
        //找出product
        var product;
        for(var j=0;j<productList.length;j++){
          if(productList[j].id==productIds[i]){
            product=productList[j];
            break;
          }
        }
        //找出busiTunnel
        var busiTunnel;
        for(var k=0;k<busiTunnelList.length;k++){
          if(busiTunnelList[k].id==product.tunnelId){
            busiTunnel=busiTunnelList[k];
            break;
          }
        }
        //检查业务通道是否已经存在
        var exist=-1;
        for(var x=0;x<busiTunnelProductList.length;x++){
          if(busiTunnelProductList[x].id==busiTunnel.id){
            exist=x;
            break;
          }
        }
        //添加业务渠道和产品信息
        if(exist!=-1){
         busiTunnelProductList[exist].productList.push({name:product.name});
        }else{
          busiTunnelProductList.push({id:busiTunnel.id,name:busiTunnel.name,productList:[{name:product.name}]});
        }
      }      
    }
}]);


app.controller('userEditController',['$scope','$state','$stateParams','$log','userService','alertService','productService',
  function($scope,$state,$stateParams,$log,userService,alertService,productService){
    $log.debug($stateParams);
    var id=$stateParams.id;
    
    userService.view(id).then(function successCallback(response){
      $log.debug(response);
      if(response.data.status){
        $scope.user=response.data.data;
        var productIds=[];
        for(var i=0;i<$scope.user.userProductList.length;i++){
          productIds.push($scope.user.userProductList[i].productId);
        }

        //------------
        if($scope.busiTunnelList!=null && $scope.productList!=null){
          //已经加载完成
          if($scope.busiTunnelList.length===0){
            alert('没有业务渠道信息，请先配置业务渠道信息。');
          }else if($scope.productList.length===0){
            alert('没有产品信息，请先配置产品信息。');
          }else{
            $scope.busiTunnel=$scope.busiTunnelList[0];
            $log.debug('busiTunnel inited');
            $scope.productPage=[];
            for(var i=0;i<$scope.productList.length;i++){
              //添加用户产品信息
              var checked=false;
              for(var j=0;j<productIds.length;j++){
                if(productIds[j]==$scope.productList[i].id){
                  checked=true;
                  break;
                }
              }
              $scope.productList[i].checked=checked;

              if($scope.productList[i].tunnelId===$scope.busiTunnel.id){
                $scope.productPage.push($scope.productList[i]);
              }
            }
            $log.debug('productPage inited');
          }
        }else{
          //事实表明这个listen会被调用三次，分别是[null,null],[Array[3], null],[Array[3], Array[6]]
          var watch=$scope.$watchGroup(['busiTunnelList','productList'],function(newValues,oldValues,scope){
            for(var i=0;i<newValues.length;i++){
              if(newValues[i]==null){
                return;
              }
            }
            //加载完成
            if($scope.busiTunnelList.length===0){
              alert('没有业务渠道信息，请先配置业务渠道信息。');
            }else if($scope.productList.length===0){
              alert('没有产品信息，请先配置产品信息。');
            }else{
              $scope.busiTunnel=$scope.busiTunnelList[0];
              $log.debug('busiTunnel inited');
              $scope.productPage=[];
              for(var i=0;i<$scope.productList.length;i++){
                //添加用户产品信息
                var checked=false;
                for(var j=0;j<productIds.length;j++){
                  if(productIds[j]==$scope.productList[i].id){
                    checked=true;
                    break;
                  }
                }
                $scope.productList[i].checked=checked;
                if($scope.productList[i].tunnelId===$scope.busiTunnel.id){
                  $scope.productPage.push($scope.productList[i]);
                }
              }
              $log.debug('productPage inited');
            }
            watch();//un-register the watch
          });
        }
        //---------------------------

      }else{
        alertService.add('warn',response.data.msg);
      }
    },function errorCallback(response){
      alertService.add('warn','ajax error');
    });

    $scope.pageChecked=false;

    $scope.editUser=function(){
      if($scope.editForm.$valid){
        if($scope.user.education===''){
          $scope.user.education=undefined;//学历为非必填项
        }
        var productIds=[];
        for(var i=0;i<$scope.productList.length;i++){
          if($scope.productList[i].checked){
            productIds.push($scope.productList[i].id);
          }
        }
        userService.edit($scope.user,productIds).then(
          function successCallback(response){
            $log.debug(response);
            if(response.data.status){
              alert('修改用户成功:'+response.data.data);
              $state.go('index.user.list');//TODO 跳回管理页面 也许需要带参数
            }else{
              alert('修改用户失败:'+response.data.msg);
            }
          },function errorCallback(response){
            alertService.add('warn','ajax error');
          });
      }else{
        alert('请填写合法的数据！');
        $scope.editForm.submitted=true;
      }
      
    };
    $scope.changeBusiTunnel=function(){
      $scope.productPage=[];
      for(var i=0;i<$scope.productList.length;i++){
        if($scope.productList[i].tunnelId===$scope.busiTunnel.id){
          $scope.productPage.push($scope.productList[i]);
        }
      }      
    };

    $scope.changePageChecked=function(){
      for(var i=0;i<$scope.productPage.length;i++){
        $scope.productPage[i].checked=$scope.pageChecked;
      }
    };

    $scope.cancel=function(){
      $state.go('index.user.list');
    }
}]);

