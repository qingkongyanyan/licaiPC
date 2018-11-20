"use strict"
//只做聚合作用，聚合所有其余模块的懒加载配置
//by lvzisun
app.config(["$ocLazyLoadProvider",'common_config','login_config','system_config','picture_config','knowledge_config','statistics_config',
    function($ocLazyLoadProvider,common_config,login_config,system_config,picture_config,knowledge_config,statistics_config){
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: common_config.concat(login_config).concat(system_config).concat(picture_config).concat(knowledge_config).concat(statistics_config)
        });
    }]);
