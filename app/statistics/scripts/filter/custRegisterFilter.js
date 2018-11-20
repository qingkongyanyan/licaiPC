/**
 * Created by user on 2016/7/21.
 */
 //userOpinion
app.filter('roleCode', function() {
     return function (code){
         switch (code){
             case "FX02":
                 return "理财经理";
             case "FX03":
                 return "理财团队经理";
             case "FX05":
                 return "理财营业部经理";
             case "FX26":
                 return "分公司经理";
             case "FX06":
                 return "理财城市经理";
             case "FX07":
                 return "理财大区经理";
             case "FX25":
                 return "事业部总监";
             case "FX27":
                 return "董事长";
         }
     }
});