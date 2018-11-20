"use strict"
app.constant('login_config',[
	{
        name: "user.login",
        module: true,
        files: [
            "login/styles/login.css",
            "login/scripts/controllers/signup.controller.js",
            "login/scripts/services/login.service.js",
        ]
    },
]);