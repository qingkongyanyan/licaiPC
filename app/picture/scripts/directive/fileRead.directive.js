/**
 * Created by longbaobao on 2016/11/15.
 */
(function(app){
    "use strict"
        app.directive("fileRead", [function () {
            return {
                require:'ngModel',
                link: function (scope, element, attributes, ngModel) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(loadEvent.target.result);
                                ngModel.$render();
                               // scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }]);
    //app.directive('validFile',function(){
    //    return {
    //        require:'ngModel',
    //        link:function(scope,el,attrs,ngModel){
    //            //change event is fired when file is selected
    //            el.bind('change',function(){
    //                scope.$apply(function(){
    //                    ngModel.$setViewValue(el.val());
    //                    ngModel.$render();
    //                });
    //            });
    //        }
    //    }
    //});
    //
    //app.directive('validFile',function(){
    //    return {
    //        require:'ngModel',
    //        link:function(scope,el,attrs,ctrl){
    //            ctrl.$setValidity('validFile', el.val() != '');
    //            //change event is fired when file is selected
    //            el.bind('change',function(){
    //                ctrl.$setValidity('validFile', el.val() != '');
    //                scope.$apply(function(){
    //                    ctrl.$setViewValue(el.val());
    //                    ctrl.$render();
    //                });
    //            });
    //        }
    //    }
    //})
})(app)