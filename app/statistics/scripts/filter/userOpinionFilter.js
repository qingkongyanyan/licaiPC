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
app.filter('stateO', function() {
    return function (code){
        switch (code){
            case 0:
                return "未确认";
            case 1:
                return "已确认";
        }
    }
});
app.filter('functionType', function() {
    return function (code){
        switch (code){
            case 1:
                return "工作管理";
            case 2:
                return "工作提醒";
            case 3:
                return "客户管理";
            case 4:
                return "产品在线";
            case 5:
                return "业绩分析";
            case 6:
                return "公司动态";
            case 7:
                return "投资预约";
            case 8:
                return "客户评级";
            case 9:
                return "客户归属";
            case 10:
                return "我的账户";
            case 11:
                return "创新预约";
            case 99:
                return "其他问题";
        }
    }
});
