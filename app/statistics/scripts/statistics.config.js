/**
 * Created by user on 2016/7/18.
 */
"use strict"
app.constant("statistics_config",[
    //预售产品反馈统计
    {
        name: "statistics.preSaleProController",
        module: true,
        files: [
            "statistics/scripts/controllers/preSalePro.controller.js",
            "statistics/scripts/services/preSaleProService.js",
            "statistics/scripts/filter/preSaleProFilter.js",
            "statistics/scripts/services/proTypeEnum.service.js"
        ]
    },
    //用户意见反馈统计
    {
        name: "statistics.userOpinionController",
        module: true,
        files: [
            "statistics/scripts/controllers/userOpinion.controller.js",
            "statistics/scripts/services/userOpinionService.js",
            "statistics/scripts/filter/userOpinionFilter.js",
            "statistics/scripts/services/userOpinionEnum_service.js"
        ]
    },
    //用户登录统计
    {
        name: "statistics.userLoginController",
        module: true,
        files: [
            "statistics/scripts/controllers/userLogin.controller.js",
            "statistics/scripts/services/userLoginService.js",
//            "statistics/scripts/filter/userLoginFilter.js",
            "statistics/scripts/services/userOpinionEnum_service.js"
        ]
    },
    //功能操作日志统计
    {
        name: "statistics.funHandleController",
        module: true,
        files: [
            "statistics/scripts/controllers/funHandle.controller.js",
            "statistics/scripts/services/funHandleService.js"
        ]
    },
    //客户注册统计
    {
        name: "statistics.custRegisterController",
        module: true,
        files: [
            "statistics/scripts/controllers/custRegister.controller.js",
            "statistics/scripts/services/custRegisterService.js",
            "statistics/scripts/filter/custRegisterFilter.js"
        ]
    }
]);