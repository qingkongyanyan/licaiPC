"use strict"
app.constant("system_config",[
	{
	    name: "system.user",
	    module: true,
	    files: [
	        'system/scripts/services/user.service.js',
	        'system/scripts/services/product.service.js',
	        'system/scripts/controllers/user.controller.js',
	        'common/scripts/directives/unique.directive.js'
	    ]
	},
	{
	    name: "system.dict",
	    module: true,
	    files: [
	        'system/scripts/services/dict.service.js',
	        'system/scripts/controllers/dict.controller.js',
	        'common/scripts/directives/unique.directive.js'
	    ]
	}]);