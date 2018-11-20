/**
 * Created by user on 2016/12/05.
 */
app.factory("examPaperEnum", function(){
    return {
        /**
         * 投资类型枚举
         */
        getInvestmentTypeEnum: function () {
            return [
                {key: "0", value: "保守型"},
                {key: "1", value: "稳健型"},
                {key: "2", value: "平衡型"},
                {key: "3", value: "成长型"},
                {key: "4", value: "积极型"}
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

