/**
 * Created by longbaobao on 2016/8/8.
 */
app.service('tokenManagerJwtService', ['$log', '_','localStorageService','$http','$interval','appConstant', function ($log, _, localStorageService,$http,$interval,appConstant) {
    var api = {
        token_destroy_url: appConstant.base_url + "/tokenManager/destroyToken.html",
        jwt_token_replace_url: appConstant.base_url + "/tokenManager/jwtTokenReplace.html"
    };
    /**
     * 初始化本地缓存
     */
    this.initLocalStorage = function() {
        if(_.isNull(localStorageService.get('token'))) {
            localStorageService.set('token',null);
        }
        if(_.isNull(localStorageService.get('refreshToken'))) {
            localStorageService.set('refreshToken',null);
        }
        if(_.isNull(localStorageService.get('userInfo'))) {
            localStorageService.set('userInfo',null);
        }
        if(_.isNull(localStorageService.get('createTime'))) {
            localStorageService.set('createTime',null);
        }
        if(_.isNull(localStorageService.get('expireTime'))) {
            localStorageService.set('expireTime',null);
        }
        if(_.isNull(localStorageService.get('latelyActivityTime'))) {
            localStorageService.set('latelyActivityTime',null);
        }
        if(_.isNull(localStorageService.get('activeTime'))) {
            localStorageService.set('activeTime',null);
        }
    };
    this.initLocalStorage();
    /**
     *
     *使用Refresh token 置换新token
     * @todo Task
     */
    this.jwtReplaceToken= function(token) {

        if(isReplaceTokeningState()) {
            return;
        }

        setInReplaceTokeningState();

        if(!_.isNull(token)) {
            $http.post(api.jwt_token_replace_url, {
                token:token
            },{
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then(
                function successCallback(response) {
                    if (response.data.status) {
                        localStorageService.set('token',response.data.data);
                        $log.debug("online replace Token success:" + _.now());
                    } else {
                        $log.error("online replace Token error" + response.data.msg)
                    }
                    setOutReplaceTokeningState();
                },
                function errorCallback(response) {
                    $log.error(response);
                    setOutReplaceTokeningState();
                }
            )
        }
    }

    /**
     * 销毁token
     * 1.本地验证token失败后，在 sessionTimeout 事件 处理中 销毁
     * 2.用户点击退出
     * 3.访问服务端API,验证 token 失败
     */
    this.destroyToken = function() {
        localStorageService.remove('token','refreshToken','userInfo','createTime','expireTime','latelyActivityTime','activeTime');
    }

    /**
     * 登录成功后，
     * 设置token信息
     * @param token
     */
    this.assignToken = function (data) {
        localStorageService.set('token',data.token);
        localStorageService.set('refreshToken',data.refreshToken);
        //用户登录信息没有保存，不在同一级别data.userInfo
        var roleCode = '';
        var roleName = '';
        if(data.roleList != null && data.roleList.length > 0){
            for(var i=0;i<data.roleList.length;i++){
                roleCode = roleCode + data.roleList[i].roleCode + ',';
                roleName = roleName + data.roleList[i].roleName + ',';
            }
        }
        roleCode = roleCode.substring(0,roleCode.length-1);
        roleName = roleName.substring(0,roleName.length-1);
        var userInfo = {
            id:data.id,
            userCode:data.userCode,
            userName:data.userName,
            tel:data.tel,
            onJobMonths:data.onJobMonths,
            orgLevel:data.orgLevel,
            orgCode:data.orgCode,
            orgName:data.orgName,
            orgMappingCode:data.orgMappingCode,
            orgMappingName:data.orgMappingName,
            subOrgId:data.subOrgId,
            selectedRole:data.selectedRole,
            roleCode:roleCode,
            roleName:roleName
        };
        localStorageService.set('userInfo',userInfo);
        localStorageService.set('createTime',data.createTime);
        localStorageService.set('expireTime',data.expireTime);
        localStorageService.set('latelyActivityTime',data.latelyActivityTime);
        localStorageService.set('activeTime',data.activeTime);
    }

    var replaceToken = function(token) {
        localStorageService.set('token',token);
    }
    /**
     *替换tokening状态
     * 避免同一时刻发起两次api 请求，导致发送两次 替换token动作
     */
    var isReplaceTokeningState = function() {
        if(_.isNull(localStorageService.get('replaceTokeningState'))) {
            return false;
        } else {
            return true;
        }
    }

    var setInReplaceTokeningState = function() {
        localStorageService.set('replaceTokeningState','1')
    }
    var setOutReplaceTokeningState = function() {
        localStorageService.set('replaceTokeningState',null)
    }
}]);