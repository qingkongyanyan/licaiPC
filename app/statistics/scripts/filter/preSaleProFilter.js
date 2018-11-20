/**
 * Created by user on 2016/7/21.
 */
 //preSalePro
app.filter('proType', function() {
     return function (code){
         switch (code){
             case "00":
                 return "P2P";
             case "01":
                 return "P2C";
             case "02":
                 return "基金";
             case "03":
                 return "信托";
             case "04":
                 return "票据";
             case "05":
                 return "定增";
             case "06":
                 return "债盈宝";
             case "07":
                 return "交易所";
         }
     }
});
app.filter('proEltnFdBk', function() {
     return function (code){
         switch (code){
             case "00":
                 return "一般";
             case "01":
                 return "良好";
             case "02":
                 return "很好";
         }
     }
});