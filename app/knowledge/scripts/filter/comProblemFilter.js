/**
 * Created by user on 2016/7/21.
 */
 //comProblem
app.filter('state', function() {
    return function (code){
        switch (code){
            case 0:
                return "启用";
            case 1:
                return "停用";
        }
    }
});
