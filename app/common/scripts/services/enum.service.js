/**
 * Created by longbaobao on 2016/7/15.
 */
"use strict"
/**
 * 枚举类型服务
 */
app.factory('enumService',['$rootScope',function($rootScope) {
    var enumService = {
    }
    //支付类型 枚举
    enumService.payTypeEnum = [
        {key:'00',value:'B2C网关支付'},
        {key:'01',value:'快捷支付'},
        {key:'02',value:'单笔代扣'},
        {key:'03',value:'单笔代付'},
        {key:'04',value:'批量代付'},
        {key:'05',value:'批量代扣'}];
    //终端类型 枚举
    enumService.terminalTypeEnum = [
        {key:'00',value:'pc端'},
        {key:'01',value:'移动端'}
    ];
    return enumService;

}]);