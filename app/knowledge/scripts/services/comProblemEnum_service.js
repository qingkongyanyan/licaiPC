/**
 * Created by user on 2016/12/05.
 */
app.factory("comProblemEnum", function(){
    return {
        /**
         * 状态枚举
         */
        getStateEnum: function () {
            return [
                {key: 0, value: "启用"},
                {key: 1, value: "停用"}
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

