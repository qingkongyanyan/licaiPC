app.controller('preSaleProController',['$scope','appConstant',
function($scope,appConstant){

}]);

app.controller('preSaleProListController',['$scope','$log','preSaleProService','alertWarnService','NgTableParams','preSaleProEnum',
function($scope,$log,preSaleProService,alertWarnService,NgTableParams,preSaleProEnum){
    var param = {
        proCode : '',
        proType : '',
        proName : '',
        projCode : '',
        pageSize:1 ,
        pageCount:5 ,
        sortName:'',
        order: ''
    }
    $scope.proType = {
        selected:'',
        data : preSaleProEnum.getProTypeEnum()
    }
    $scope.proName = {
        data : [],
        selected:'',
    }

    $scope.projName = {
        data : [],
        selected:''
    }

    $scope.proTypeChange = function(selected) {
        if(selected == '' || selected == null) {
            return;
        }
        $scope.proName.data='';
        $scope.proName.selected='';
        var data = {
            proType:selected
        }
        preSaleProService.getProject(data).then(
            function (response) {
                $log.log("查询项目信息返回数据：");
                $log.debug(response)
                if (response.data.status) {
                    $scope.projName.data = response.data.data;
                } else {
                    alertWarnService.alert(response.data.msg);
                }
            },
            function (response) {
                $log.debug(response);
            }
        );
    };
    $scope.projNameChange = function(selected) {
        if(selected == '' || selected == null) {
            return;
        }
        var data = {
            proType: $scope.proType.selected,
            projCode : selected
        }
        preSaleProService.getProduct(data).then(
            function (response) {
                $log.log("查询产品信息返回数据：");
                $log.debug(response)
                if (response.data.status) {
                    $scope.proName.data = response.data.data;
                } else {
                    alertWarnService.alert(response.data.msg);
                }
            },
            function (response) {
                $log.debug(response);
            }
        );
    };

    //分页
    $scope.preSaleProTable=new NgTableParams({
        page:1,
        count:10
    },{
        getData:function(params){
            var page = {
                pageNum:params.page(),
                numPerPage:params.count()
            };
            var data = {
                proCode:$scope.proCode,
                proType:$scope.proType.selected,
                projCode:$scope.projName.selected,
                proName:$scope.proName.selected == null ? '' : $scope.proName.selected,
                pageCount:page.numPerPage,
                pageSize:page.pageNum
            }
            console.log("预售反馈统计查询请求数据："+angular.toJson(data));
            return preSaleProService.queryFeedBackList(data).then(function (response){
                console.log("预售反馈统计查询返回数据："+angular.toJson(response));
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
        $scope.preSaleProTable.page(1);
        $scope.preSaleProTable.reload();
    };

    $scope.reset = function() {
        $scope.proCode='';
        $scope.proType.selected='';
        $scope.proName.selected='';
        $scope.projName.selected='';
        $scope.proName.data='';
        $scope.projName.data='';
        $scope.list();
    }

}]);

app.controller('preSaleProViewController',['$scope','$state','$stateParams','$log','preSaleProService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,preSaleProService,alertWarnService,NgTableParams){
    $log.debug($stateParams);
    var proCode=$stateParams.proCode;
    $scope.orgType04 = {
        data : [],
        selected:'',
    }
    $scope.orgType03 = {
        data : [],
        selected:'',
    }
    $scope.orgType08 = {
        data : [],
        selected:'',
    }
    $scope.orgType05 = {
        data : [],
        selected:'',
    }
    $scope.orgType06 = {
        data : [],
        selected:'',
    }
    var getProCodeInfo04 = function() {
        $scope.orgType03.data = '';
        $scope.orgType03.selected = '';
        $scope.orgType08.data = '';
        $scope.orgType08.selected = '';
        $scope.orgType05.data = '';
        $scope.orgType05.selected = '';
        $scope.orgType06.data = '';
        $scope.orgType06.selected = '';
        var data = {
            orgLevel : '04',//查询事业部
            parentOrgCode : ''//上级机构编号
        }
        preSaleProService.getOrgInfo(data).then(
            function (response) {
                $log.log("映射事业部机构查询返回数据：");
                $log.debug(response)
                if (response.data.status) {
                    $scope.orgType04.data = response.data.data;
                } else {
                    alertWarnService.alert(response.data.msg);
                }
            },
            function (response) {
                $log.debug(response);
            }
        );
    }

    $scope.getProCodeInfo03 = function(selected) {
        $scope.orgType08.data = '';
        $scope.orgType08.selected = '';
        $scope.orgType05.data = '';
        $scope.orgType05.selected = '';
        $scope.orgType06.data = '';
        $scope.orgType06.selected = '';
        var data = {
            orgLevel : '03',//查询大区
            parentOrgCode : selected//上级机构编号
        }
        preSaleProService.getOrgInfo(data).then(
            function (response) {
                $log.log("映射大区机构查询返回数据：");
                $log.debug(response)
                if (response.data.status) {
                    $scope.orgType03.data = response.data.data;
                } else {
                    alertWarnService.alert(response.data.msg);
                }
            },
            function (response) {
                $log.debug(response);
            }
        );
    }

    $scope.getProCodeInfo08 = function(selected) {
        $scope.orgType05.data = '';
        $scope.orgType05.selected = '';
        $scope.orgType06.data = '';
        $scope.orgType06.selected = '';
        var data = {
            orgLevel : '08',//查询省市
            parentOrgCode : selected//上级机构编号
        }
        preSaleProService.getOrgInfo(data).then(
            function (response) {
                $log.log("映射省市机构查询返回数据：");
                $log.debug(response)
                if (response.data.status) {
                    $scope.orgType08.data = response.data.data;
                } else {
                    alertWarnService.alert(response.data.msg);
                }
            },
            function (response) {
                $log.debug(response);
            }
        );
    }

    $scope.getProCodeInfo05 = function(selected) {
        $scope.orgType06.data = '';
        $scope.orgType06.selected = '';
        var data = {
            orgLevel : '05',//查询城市
            parentOrgCode : selected//上级机构编号
        }
        preSaleProService.getOrgInfo(data).then(
            function (response) {
                $log.log("映射城市机构查询返回数据：");
                $log.debug(response)
                if (response.data.status) {
                    $scope.orgType05.data = response.data.data;
                } else {
                    alertWarnService.alert(response.data.msg);
                }
            },
            function (response) {
                $log.debug(response);
            }
        );
    }

    $scope.getProCodeInfo06 = function(selected) {
        var data = {
            orgLevel : '06',//查询城市
            parentOrgCode : selected//上级机构编号
        }
        preSaleProService.getOrgInfo(data).then(
            function (response) {
                $log.log("映射城市机构查询返回数据：");
                $log.debug(response)
                if (response.data.status) {
                    $scope.orgType06.data = response.data.data;
                } else {
                    alertWarnService.alert(response.data.msg);
                }
            },
            function (response) {
                $log.debug(response);
            }
        );
    }

    var getFeedBackDetlSum = function(){
        var param = {
            proCode:proCode,
            orgCode:$scope.orgType06.selected != '' ? $scope.orgType06.selected :
                    $scope.orgType05.selected != '' ? $scope.orgType05.selected :
                    $scope.orgType08.selected != '' ? $scope.orgType08.selected :
                    $scope.orgType03.selected != '' ? $scope.orgType03.selected :
                    $scope.orgType04.selected != '' ? $scope.orgType04.selected : ''
        }
        console.log("预售反馈统计详情总金额查询请求数据："+angular.toJson(param));
        preSaleProService.qryProFeedBackDetlSum(param).then(function (response){
            console.log("预售反馈统计详情总金额查询请求数据："+angular.toJson(response));
            if(response.data.status){
                $scope.qryProFeedBackDetl=response.data.data;
            }else{
                alertWarnService.alert(response.data.msg);
            }
        });
    }
    getProCodeInfo04();
    getFeedBackDetlSum();

//    var data1 = [];
//
//      for (var i = 0; i < 7; i++) {
//        var obj = {
//          id: i,
//          name: 'Node ' + i,
//          children: []
//        };
//
//        for (var j = 0; j < 3; j++) {
//          var obj2 = {
//            id: j,
//            name: 'Node ' + i + '.' + j,
//            children: []
//          };
//          obj.children.push(obj2);
//        }
//
//        data1.push(obj);
//      }
//
//      var data2 = [];
//
//        for (var i = 0; i < 7; i++) {
//          var obj = {
//            id: i,
//            name: 'haha ' + i,
//            children: []
//          };
//
//          for (var j = 0; j < 3; j++) {
//            var obj2 = {
//              id: j,
//              name: 'haha ' + i + '.' + j,
//              children: []
//            };
//            obj.children.push(obj2);
//          }
//
//          data2.push(obj);
//        }
//
//      $scope.data = angular.copy(data1);
//      setTimeout(function () {
//        $scope.data = angular.copy(data2);
//      }, 5000);

    //分页
    $scope.preSaleProDetailTable=new NgTableParams({
        page:1,
        count:10
    },{

        getData:function(params){
            var page = {
                pageNum:params.page(),
                numPerPage:params.count()
            };
            var data = {
                proCode:proCode,
                orgCode:$scope.orgType06.selected != '' ? $scope.orgType06.selected :
                        $scope.orgType05.selected != '' ? $scope.orgType05.selected :
                        $scope.orgType08.selected != '' ? $scope.orgType08.selected :
                        $scope.orgType03.selected != '' ? $scope.orgType03.selected :
                        $scope.orgType04.selected != '' ? $scope.orgType04.selected : '',
                pageCount:page.numPerPage,
                pageSize:page.pageNum
            }
            console.log("预售反馈统计详情查询请求数据："+angular.toJson(data));
            return preSaleProService.queryFeedBackDetlList(data).then(function (response){
                console.log("预售反馈统计详情查询返回数据："+angular.toJson(response));
                if(response.data.status){
                    params.total(response.data.data.totalCount);
                    return response.data.data.recordList;
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }
    });

    $scope.close=function(){
        $state.go("index.preSalePro.list");
    }

    $scope.list=function(){
        $scope.preSaleProDetailTable.page(1);
        $scope.preSaleProDetailTable.reload();
        getFeedBackDetlSum();
    };

    $scope.reset = function() {
        $scope.orgType04.data = '';
        $scope.orgType04.selected = '';
        getProCodeInfo04(); 
        $scope.orgType03.data = '';
        $scope.orgType03.selected = '';
        $scope.orgType08.data = '';
        $scope.orgType08.selected = '';
        $scope.orgType05.data = '';
        $scope.orgType05.selected = '';
        $scope.orgType06.data = '';
        $scope.orgType06.selected = '';
        $scope.list();
    }
}]);