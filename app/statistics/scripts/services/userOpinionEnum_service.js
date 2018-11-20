/**
 * Created by user on 2016/11/16.
 */
app.factory("userOpinionEnum", function(){
    return {
        /**
         * 角色枚举
         */
        getRoleCodeEnum: function () {
            return [
                {key: "FX02", value: "理财经理" },
                {key: "FX03", value: "理财团队经理" },
                {key: "FX05", value: "理财营业部经理" },
                {key: "FX26", value: "分公司经理" },
                {key: "FX06", value: "理财城市经理" },
                {key: "FX07", value: "理财大区经理" },
                {key: "FX25", value: "事业部总监" },
                {key: "FX27", value: "董事长" }
            ];
        },
        /**
         * 功能项枚举
         */
        getFunctionTypeEnum: function () {
            return [
                {key:1,value:"工作管理"},
                {key:2,value:"工作提醒"},
                {key:3,value:"客户管理"},
                {key:4,value:"产品在线"},
                {key:5,value:"业绩分析"},
                {key:6,value:"公司动态"},
                {key:7,value:"投资预约"},
                {key:8,value:"客户评级"},
                {key:9,value:"客户归属"},
                {key:10,value:"我的账户"},
                {key:99,value:"其他问题"}
            ];
        },
        /**
         * 状态枚举
         */
        getStateEnum: function () {
            return [
                {key: 0, value: "未确认"},
                {key: 1, value: "已确认"}
            ];
        },
        /**
         * 链接
         * @param enumArray
         * @returns {Array.<*>}
         */
        concat:function(enumArray){
            var all=[{ key: "" , value: "全部" }];
            return all.concat(enumArray);
        },
        /**
         * 连接请选择
         * @param enumArray
         * @returns {Array.<*>}
         */
        concalNull:function(enumArray){
            var all=[{ key: "" , value: "请选择" }];
            return all.concat(enumArray);
        }
    }
});

