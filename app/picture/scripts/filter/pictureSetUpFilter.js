/**
 * Created by user on 2016/7/21.
 */
 //pictureSetUp
app.filter('picState', function() {
    return function (code){
        switch (code){
            case 0:
                return "已上架";
            case 1:
                return "未上架";
        }
    }
});
