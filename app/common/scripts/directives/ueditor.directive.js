/**
 * Created by longbaobao on 2016/11/23.
 */
app.directive('ueditor', function () {
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        template: '<div id="editor" ng-transclude></div>',
        require: '?ngModel',
        scope: {
            config: '='
        },
        link: function (scope, element, attrs, ngModel) {
            //var editor = new UE.ui.Editor(scope.config || {});
            //editor.render(element[0]);
            UE.delEditor('editor');
            var editor = UE.getEditor('editor');

            if (ngModel) {
                //Model数据更新时，更新百度UEditor
                ngModel.$render = function () {
                    try {
                        if(ngModel.$viewValue != undefined){
                            setTimeout(function () {
                                    editor.setContent(ngModel.$viewValue);
                            }, 1000);
                        }
                    } catch (e) {

                    }
                };

                //百度UEditor数据更新时，更新Model
                editor.addListener('contentChange', function () {
                    setTimeout(function () {
                        scope.$apply(function () {
                            ngModel.$setViewValue(editor.getContent());
                        })
                    }, 0);
                })
            }
        }
    }
});