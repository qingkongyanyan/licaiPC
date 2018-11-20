//公共懒加载模块的配置
"use strict"
app.constant('common_config',[
    {
        name: "ngTable",
        module: true,
        files: [
        	'../bower_components/ng-table/dist/ng-table.min.css',
            '../bower_components/ng-table/dist/ng-table.min.js'
        ]
    },
    {
        name: "oindexControl",
        module: true,
        files: [
            'common/scripts/oindex.controller.js'
        ]
    }
]);