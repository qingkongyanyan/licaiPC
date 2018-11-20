app.controller('userLoginController',['$scope','$log','appConstant','userOpinionEnum',
function($scope,$log,appConstant,userOpinionEnum){
    //状态枚举
    $scope.roleCode ={
        data:userOpinionEnum.concat(userOpinionEnum.getRoleCodeEnum())
    };
}]);

app.controller('userLoginListController',['$scope','$log','userLoginService','alertWarnService','NgTableParams','$uibModal',
function($scope,$log,userLoginService,alertWarnService,NgTableParams,$uibModal){
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
    document.getElementById("dus03").value = $scope.initTime;
    document.getElementById("dus04").value = $scope.initTime;
    //第几页
    $scope.pageNum=1;
    //每页显示数目
    $scope.numPerPage=10;
    //分页
    $scope.userLoginTable=new NgTableParams({
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
                    tel: $scope.tel,
                    roleCode: $scope.roleCode.selected,
                    startTime: Date.parse(new Date(angular.element('#dus03').val().replace(/-/g,'/'))),
                    endTime: Date.parse(new Date(angular.element('#dus04').val().replace(/-/g,'/'))) + 86400000
                }
            };
            console.log("用户登录统计查询请求数据："+angular.toJson(query));
            return userLoginService.queryList(query).then(function (response){
                console.log("用户登录统计查询返回数据："+angular.toJson(response));
                if(response.data.status){
                    params.total(response.data.data.totalCount);
                    return response.data.data.recordList;
                }else{
                    alertWarnService.alert(response.data.msg);
                }
            });
        }
    });

    var getLoginListCount = function (){
        var query = {
            requestFrom: '02',
            userName: $scope.userName,
            tel: $scope.tel,
            roleCode: $scope.roleCode.selected,
            startTime: Date.parse(new Date(angular.element('#dus03').val().replace(/-/g,'/'))),
            endTime: Date.parse(new Date(angular.element('#dus04').val().replace(/-/g,'/'))) + 86400000
        }
        console.log("用户登录统计总人数查询请求数据："+angular.toJson(query));
        userLoginService.queryListCount(query).then(function (response){
            console.log("用户登录统计总人数查询返回数据："+angular.toJson(response));
            if(response.data.status){
                $scope.userLoginListCount = response.data.data;
            }else{
                alertWarnService.alert(response.data.msg);
            }
        });
    }

    getLoginListCount();

    $scope.list=function(){
        $scope.userLoginTable.page(1);
        $scope.userLoginTable.reload();
        getLoginListCount();
    };

    $scope.reset=function(){
        $scope.userName = '';
        $scope.tel = '';
        $scope.roleCode.selected = '';
        document.getElementById("dus03").value = $scope.initTime;
        document.getElementById("dus04").value = $scope.initTime;
        $scope.list();
    }
}]);

app.controller('userLoginViewController',['$scope','$state','$stateParams','$log','userLoginService','alertWarnService','NgTableParams',
function($scope,$state,$stateParams,$log,userLoginService,alertWarnService,NgTableParams){
    $scope.userLoginDetail = {
        userCode:$stateParams.userCode,
        userName:$stateParams.userName,
        roleName:$stateParams.roleName,
        loginDate:$stateParams.loginDate
    }
    $scope.userLoginDetailTable=new NgTableParams(
        angular.extend({
            page:1,
            count:10
        }),{
            getData:function(params){
                var param = {
                    userCode:$scope.userLoginDetail.userCode,
                    loginDate:$scope.userLoginDetail.loginDate
                }
                console.log("用户登录统计查看请求数据："+angular.toJson(param));
                return userLoginService.view(param).then(function (response){
                    console.log("用户登录统计查看返回数据："+angular.toJson(response));
                    if(response.data.status){
                        var result = response.data.data;
                        if(result.numMap == null){
                            $scope.userLoginDetailList = {
                                a : 0,
                                b : 0,
                                c : 0,
                                d : 0,
                                e : 0,
                                f : 0,
                                g : 0,
                                h : 0,
                                i : 0,
                                j : 0,
                                k : 0,
                                m : 0,
                                l : 0
                            }
                        }else{
                            $scope.userLoginDetailList = {
                                a : result.numMap['1'] == undefined ? 0 : result.numMap['1'],
                                b : result.numMap['2'] == undefined ? 0 : result.numMap['2'],
                                c : result.numMap['3'] == undefined ? 0 : result.numMap['3'],
                                d : result.numMap['4'] == undefined ? 0 : result.numMap['4'],
                                e : result.numMap['5'] == undefined ? 0 : result.numMap['5'],
                                f : result.numMap['6'] == undefined ? 0 : result.numMap['6'],
                                g : result.numMap['7'] == undefined ? 0 : result.numMap['7'],
                                h : result.numMap['8'] == undefined ? 0 : result.numMap['8'],
                                i : result.numMap['9'] == undefined ? 0 : result.numMap['9'],
                                j : result.numMap['10'] == undefined ? 0 : result.numMap['10'],
                                k : result.numMap['99'] == undefined ? 0 : result.numMap['99'],
                                l : result.numMap['11'] == undefined ? 0 : result.numMap['11'],
                                m : result.numMap['12'] == undefined ? 0 : result.numMap['12']
                            }
                        }
                    }else{
                        alertWarnService.alert(response.data.msg);
                    }
                });
            }
        }
    );
    $scope.close=function(){
         $state.go('index.userLogin.list');
    };
}]);