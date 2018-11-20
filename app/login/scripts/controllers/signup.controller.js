/**
 * Created by longbaobao on 2016/7/4.
 * 页面登录控制器
 */
app.controller('signupController',['$scope','$log','$state','$timeout','authJwtService','AUTH_EVENTS','$stateParams','loginService',
    function ($scope, $log, $state, $timeout, authJwtService,AUTH_EVENTS,$stateParams,loginService) {
    $scope.signup = function () {
        // 正常提交
        if ($scope.signupForm.$valid) {
            loginService.login($scope.signup.userName, $scope.signup.password)
                .then(
                    function successCallback(response) {
                        $log.debug(response);
                        if (response.data.status) {
                            $log.debug(response.data);
                            var loginInfo = response.data.data;

                            authJwtService.loginSuccess({resp:response,redirectURL:$stateParams["redirectURL"],loginInfo:loginInfo});

                        } else {
                            alert(response.data.msg);
                        }
                    },
                    function errorCallback(response) {
                       $scope.$emit(AUTH_EVENTS.loginFailed,{resp:response,scope:$scope});
                        $log.debug(response);
                    })
                .finally(function () {
                    $log.debug("This finally block");
                 });

        } else {
            $scope.signupForm.submitted = true;
        }
    }
}]);


