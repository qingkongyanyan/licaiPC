app.controller('funHandleController',['$scope','$log','appConstant',
function($scope,$log,appConstant){

}]);

app.controller('funHandleListController',['$scope','$log','funHandleService','alertWarnService','NgTableParams','$uibModal',
function($scope,$log,funHandleService,alertWarnService,NgTableParams,$uibModal){
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
    document.getElementById("dus07").value = $scope.initTime;
    document.getElementById("dus08").value = $scope.initTime;
    //第几页
    $scope.pageNum=1;
    //每页显示数目
    $scope.numPerPage=10;
    //分页
    $scope.funHandleTable=new NgTableParams({
        page:$scope.pageNum,
        count:$scope.numPerPage
    },{
        getData:function(params){
            var query={
                startTime: Date.parse(new Date(angular.element('#dus07').val().replace(/-/g,'/'))),
                endTime: Date.parse(new Date(angular.element('#dus08').val().replace(/-/g,'/'))) + 86400000
            };
            console.log("功能操作日志统计查询请求数据："+angular.toJson(query));
            return funHandleService.queryList(query).then(function (response){
                console.log("功能操作日志统计查询返回数据："+angular.toJson(response));
                if(response.data.status){
                    var result = response.data.data;
                    var itemList = result.itemList;
                    var totalNumMap = result.totalNumMap;
                    $scope.funHandleList = [];
                    if(itemList != null && itemList.length > 0){
                        for(var i=0;i<itemList.length;i++){
                            var funHandleDetail = {
                                loginDate : itemList[i].loginDate,
                                a : itemList[i].numMap['1'] == undefined ? 0 : itemList[i].numMap['1'],
                                b : itemList[i].numMap['2'] == undefined ? 0 : itemList[i].numMap['2'],
                                c : itemList[i].numMap['3'] == undefined ? 0 : itemList[i].numMap['3'],
                                d : itemList[i].numMap['4'] == undefined ? 0 : itemList[i].numMap['4'],
                                e : itemList[i].numMap['5'] == undefined ? 0 : itemList[i].numMap['5'],
                                f : itemList[i].numMap['6'] == undefined ? 0 : itemList[i].numMap['6'],
                                g : itemList[i].numMap['7'] == undefined ? 0 : itemList[i].numMap['7'],
                                h : itemList[i].numMap['8'] == undefined ? 0 : itemList[i].numMap['8'],
                                i : itemList[i].numMap['9'] == undefined ? 0 : itemList[i].numMap['9'],
                                j : itemList[i].numMap['10'] == undefined ? 0 : itemList[i].numMap['10'],
                                l : itemList[i].numMap['11'] == undefined ? 0 : itemList[i].numMap['11'],
                                m : itemList[i].numMap['12'] == undefined ? 0 : itemList[i].numMap['12'],
                                k : itemList[i].numMap['99'] == undefined ? 0 : itemList[i].numMap['99']
                            }
                            $scope.funHandleList.push(funHandleDetail);
                        }
                    }
                    if(totalNumMap == null){
                        $scope.funHandleTotel = {
                            at : 0,
                            bt : 0,
                            ct : 0,
                            dt : 0,
                            et : 0,
                            ft : 0,
                            gt : 0,
                            lt : 0,
                            ht : 0,
                            it : 0,
                            jt : 0,
                            mt : 0,
                            kt : 0
                        }
                    }else{
                        $scope.funHandleTotel = {
                            at : totalNumMap['1'] == undefined ? 0 : totalNumMap['1'],
                            bt : totalNumMap['2'] == undefined ? 0 : totalNumMap['2'],
                            ct : totalNumMap['3'] == undefined ? 0 : totalNumMap['3'],
                            dt : totalNumMap['4'] == undefined ? 0 : totalNumMap['4'],
                            et : totalNumMap['5'] == undefined ? 0 : totalNumMap['5'],
                            ft : totalNumMap['6'] == undefined ? 0 : totalNumMap['6'],
                            gt : totalNumMap['7'] == undefined ? 0 : totalNumMap['7'],
                            ht : totalNumMap['8'] == undefined ? 0 : totalNumMap['8'],
                            it : totalNumMap['9'] == undefined ? 0 : totalNumMap['9'],
                            jt : totalNumMap['10'] == undefined ? 0 : totalNumMap['10'],
                            lt : totalNumMap['11'] == undefined ? 0 : totalNumMap['11'],
                            mt : totalNumMap['12'] == undefined ? 0 : totalNumMap['12'],
                            kt : totalNumMap['99'] == undefined ? 0 : totalNumMap['99']
                        }
                    }
                }else{
//                    alertWarnService.alert(response.data.msg);
                    $scope.funHandleList = [];
                    $scope.funHandleTotel = {
                        at : 0,
                        bt : 0,
                        ct : 0,
                        dt : 0,
                        et : 0,
                        ft : 0,
                        gt : 0,
                        lt : 0,
                        ht : 0,
                        it : 0,
                        jt : 0,
                        mt : 0,
                        kt : 0
                    }
                }
            });
        }
    });

    $scope.list=function(){
        $scope.funHandleTable.page(1);
        $scope.funHandleTable.reload();
    };

    $scope.reset=function(){
        document.getElementById("dus07").value = $scope.initTime;
        document.getElementById("dus08").value = $scope.initTime;
        $scope.list();
    }
}]);