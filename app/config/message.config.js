app.run(['$rootScope',function($rootScope){
	var M={};
	$rootScope.M=M;

	//M.小模块.功能.具体描述

	M['10000000']="系统繁忙";
	M['10000001']="数据冲突，请重新修改";
	M['10000010']="数据冲突，请重新修改";
	M['10020010']="该通道配置信息已经存在";
	M['10020011']="该响应码已经做映射处理";
	M['10020012']="该响应码名称已做映射处理";

	//轮播图模块
	M['pictureSetUp.picName.required']='请输入图片名称';
    M['pictureSetUp.picUrl.required']='请输入链接地址';
    M['pictureSetUp.fileName.required']='请选择要上传的图片';

    //常见问题模块
    M['comProblem.question.required']='请输入问题的标题';
    M['comProblem.answer.required']='请输入问题的内容';

    //协议模块
	M['agreement.title.required']='请输入协议的标题';
	M['agreement.content.required']='请输入协议的内容';

	//考卷模块
	M['examPaperSetting.paperName.required']='请输入考卷的考题名称';
	M['settingForm.totalScore.required']='请输入考卷的总分';

}]);