/**
 * Created by longbaobao on 2016/7/4.
 * 返回首页
 */
app.controller('oindexController', ['$scope', '$location', '$log', '$uibModal', 'AUTH_EVENTS', '$state',
    function($scope, $location, $log, $uibModal, AUTH_EVENTS, $state) {
        $scope.userInfo = JSON.parse(localStorage.getItem('finance-h5-web-boss.userInfo'));
        $scope.toindex = function() {
            $location.path('/index');
        };

//        var includes = $scope.includes = function(items) {
//            for (var i = 0, len = items.length; i < len; i++) {
//                if (!items[i].items || items[i].items.length === 0) {
//                    if ($state.includes(items[i].sref)) {
//                        return true;
//                    }
//                } else if (includes(items[i].items)) {
//                    return true;
//                }
//            }
//            return false;
//        };

//        $scope.curr = { headingIndex: -1 };

//        $scope.menuDatas = [{
//            title: '基础信息管理',
//            icon: 'ico01-01',
//            items: [
//                { sref: 'index.basebank.list', title: '银行管理' },
//                { sref: 'index.baseRealBank.list', title: '联行号管理' },
//                { sref: 'index.baseArea.list', title: '地区编码管理' },
//                { sref: 'index.baseCardBin.list', title: '卡BIN管理' },
//                { sref: 'index.baseBlackList.list', title: '黑名单管理' },
//                { sref: 'index.whiteList.list', title: '白名单管理' },
//                { sref: 'index.responseCode.list', title: '响应码管理' },
//                { sref: 'index.busiTunnel.list', title: '业务渠道管理' }
//            ]
//        }, {
//            title: '通道管理',
//            icon: 'ico01-02',
//            items: [
//                { sref: 'index.channelBase.list', title: '通道信息管理' },
//                { sref: 'index.channelConfig.list', title: '通道配置管理' },
//                { sref: 'index.channelBank.list', title: '银行参数管理' },
//                { sref: 'index.channelMerchant.list', title: '商户参数管理' },
//                { sref: 'index.channelBankMapping.list', title: '银行映射管理' },
//                { sref: 'index.mappingCode.list', title: '响应码映射管理' },
//                { sref: 'index.channelAreaMapping.list', title: '地区映射管理' }, {
//                    sref: 'index.channelStatus',
//                    title: '通道状态管理',
//                    items: [
//                        { sref: 'index.channelStatus.payTypeStatusList', title: '支付类型状态维护' },
//                        { sref: 'index.channelStatus.channelBankStatusList', title: '银行状态维护' }
//                    ]
//                },
//                { sref: 'index.apiManager.list', title: '接口管理' }
//            ]
//        }, {
//            title: '路由管理',
//            icon: 'ico01-03',
//            items: [
//                { sref: 'index.route.routeRuleManage', title: '路由规则管理' },
//                { sref: 'index.route.routeApplyManage', title: '路由规则应用管理' },
//                { sref: 'index.route.routeStatusManage', title: '路由状态管理' }
//            ]
//        }, {
//            title: '系统管理',
//            icon: 'ico01-04',
//            items: []
//        }, {
//            title: '交易管理',
//            icon: 'ico01-04',
//            items: [{
//                sref: 'index.businessBatch',
//                title: '业务批次查询',
//                items: [
//                    { sref: 'index.businessBatch.businessReceiveBatchList', title: '收款查询' },
//                    { sref: 'index.businessBatch.businessPayBatchList', title: '付款查询' }
//                ]
//            }, {
//                sref: 'index.businessOrder',
//                title: '业务单查询',
//                items: [
//                    { sref: 'index.businessOrder.businessPayOrderList', title: '付款查询' },
//                    { sref: 'index.businessOrder.businessReceiveOrderList', title: '收款查询' }
//                ]
//            }, {
//                sref: 'index.tradeBatchOrderQuery',
//                title: '交易批次查询',
//                items: [
//                    { sref: 'index.tradeBatchOrderQuery.tbReceiveQuery', title: '收款查询' },
//                    { sref: 'index.tradeBatchOrderQuery.tbPayQuery', title: '付款查询' }
//                ]
//            }, {
//                sref: 'index.trade_order_query',
//                title: '交易单查询',
//                items: [
//                    { sref: 'index.trade_order_query.receive', title: '收款查询' },
//                    { sref: 'index.trade_order_query.pay', title: '付款查询' }
//                ]
//            }, {
//                sref: 'index.tradeBatchManager',
//                title: '批量交易管理',
//                items: [
//                    { sref: 'index.tradeBatchManager.businessReceiveBatchTrade', title: '收款批次交易' },
//                    { sref: 'index.tradeBatchManager.businessPayBatchTrade', title: '付款批次交易' },
//                    { sref: 'index.tradeBatchManager.tradeBatchReceiveQuery', title: '收款批次查询' },
//                    { sref: 'index.tradeBatchManager.tradeReceive', title: '收款交易' },
//                    { sref: 'index.tradeBatchManager.tradeReceiveQuery', title: '收款查询' },
//                    { sref: 'index.tradeBatchManager.tradeBatchPayQuery', title: '付款批次查询' },
//                    { sref: 'index.tradeBatchManager.tradePay', title: '付款交易' },
//                    { sref: 'index.tradeBatchManager.tradePayQuery', title: '付款查询' }
//                ]
//            }, {
//                sref: 'index.tradeBatchOrderManager',
//                title: '交易批次管理',
//                items: [
//                    { sref: 'index.tradeBatchOrderManager.receiveManager', title: '收款管理' },
//                    { sref: 'index.tradeBatchOrderManager.receiveQuery', title: '收款查询' },
//                    { sref: 'index.tradeBatchOrderManager.payManager', title: '付款管理' },
//                    { sref: 'index.tradeBatchOrderManager.payQuery', title: '付款查询' }
//                ]
//            }, {
//                sref: 'index.tradeOfflineManager',
//                title: '线下交易管理',
//                items: [
//                    { sref: 'index.tradeOfflineManager.tradeReceiveProcessing', title: '收款处理' },
//                    { sref: 'index.tradeOfflineManager.tradeReceiveCharge', title: '收款记账' },
//                    { sref: 'index.tradeOfflineManager.tradeReceiveQuery', title: '收款查询' },
//                    { sref: 'index.tradeOfflineManager.tradePayProcessing', title: '付款处理' },
//                    { sref: 'index.tradeOfflineManager.tradePayCharge', title: '付款记账' },
//                    { sref: 'index.tradeOfflineManager.tradePayQuery', title: '付款查询' },
//                ]
//            }]
//        }, {
//            title: '异常管理',
//            icon: 'ico01-04',
//            items: [{
//                sref: 'index.ip_error',
//                title: '鉴权失败管理'
//            }, {
//                sref: 'index.checkFail',
//                title: '校验失败管理',
//                items: [
//                    { sref: 'index.checkFail.receiveBatch', title: '收款批次查询' },
//                    { sref: 'index.checkFail.payBatch', title: '付款批次查询' },
//                    { sref: 'index.checkFail.businessReceiveOrderFail', title: '收款业务单查询' },
//                    { sref: 'index.checkFail.businessPayOrderFail', title: '付款业务单查询' }
//                ]
//            }, {
//                sref: 'index.routeFail',
//                title: '路由失败管理',
//                items: [
//                    { sref: 'index.routeFail.receiveRouteFail', title: '收款路由修复' },
//                    // { sref: 'index.routeFail.receiveRouteRepairLog', title: '收款路由修复日志' },
//                    { sref: 'index.routeFail.payRouteFail', title: '付款路由修复' }
//                    // { sref: 'index.routeFail.payRouteRepairLog', title: '付款路由修复日志' }
//                ]
//            }, {
//                sref: 'index.trade_order_lost_manage',
//                title: '掉单处理管理',
//                items: [
//                    { sref: 'index.trade_order_lost_manage.receive', title: '收款处理' },
//                    { sref: 'index.trade_order_lost_manage.pay', title: '付款处理' }
//                ]
//            }]
//        }];



        $scope.tologin = function() {
            $uibModal.open({
                backdrop:'static',
                animation: $scope.animationsEnabled,
                templateUrl: 'common/views/showMsg.html',
                controller: 'oindexConController',
                resolve:{
                    scope : function() { return $scope},
                    AUTH_EVENTS : function() { return AUTH_EVENTS},
                    location : function() { return $location}
                }
            });
        }

    }
]);
app.controller('oindexConController', ['$scope', '$log', 'AUTH_EVENTS', 'location', '$uibModalInstance', 'scope',
    function($scope, $log, AUTH_EVENTS, location, $uibModalInstance, scope) {
        $scope.confirm = function() {
            scope.$emit(AUTH_EVENTS.logoutSuccess, {});
            location.path('login/views/login');
            $uibModalInstance.dismiss('cancel');
        };
        $scope.cancel=function(){
        	$uibModalInstance.dismiss('cancel');
        };
    }
]);