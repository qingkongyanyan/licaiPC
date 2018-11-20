app.service('loginService',['$log','$http','$state','appConstant',
    function($log,$http,$state,appConstant) {
    var api = {
        user_login_url: appConstant.base_url + "/person/account/getUserLogin"
    };
    this.login = function(loginCode,password) {
        return $http.post(api.user_login_url,{
                loginCode: loginCode,
                password: password,
                requestFrom: "02"//登录来源（02代表理财H5后台前端）
        });
    };
}]);