/**
 * Created by gh on 2016/11/23.
 */
(function(app) {
    "use strict"
    /**
     产品类型枚举
     */
    app.factory("preSaleProEnum", function(){
        return {
            /**
             产品类型枚举
             */
            getProTypeEnum: function () {
                return [
                    {key:"00",value:"P2P"},
                    {key:"01",value:"P2C"},
                    {key:"02",value:"基金"},
                    {key:"03",value:"信托"},
                    {key:"04",value:"票据"},
                    {key:"05",value:"定增"},
                    {key:"06",value:"债盈宝"},
                    {key:"07",value:"交易所"}
                ];
            },
        }
    });

})(app)