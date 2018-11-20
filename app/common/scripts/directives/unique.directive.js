app.directive('unique',['$http','$log',function($http,$log){
	return {
		restrict:'A',
		require:'ngModel',
		link:function(scope,element,attrs,controller){
			// element.blur(handleUnique);
			// element.bind('input propertychange',handleUnique);
			// element.keyup(handleUnique);
			// element.change(handleUnique);
			controller.$viewChangeListeners.push(handleUnique);
			function handleUnique(){
				var value=attrs['unique'];
				$log.debug(value);
				var obj=angular.fromJson(value);
				var data=obj.data;
				var param={};
				if(typeof data.id !=='undefined'){
					// param.id=scope.id;
					param.id=data.id;
				}
				param[data.attr]=controller.$viewValue;//data.attr为需要验证的属性 为name或者code,value
				if(param[data.attr]){
					//输入框不为空才开始校验
					$http.post(obj.url,param).then(function(response){
						$log.debug(response.data);
						controller.$setValidity('unique', !response.data.data);
					});				
				}
			}
		}
	};
}]);