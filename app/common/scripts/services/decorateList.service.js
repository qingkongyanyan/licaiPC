//不改变原来的数组,返回修饰后的新数组
app.service('decorateListService',function(){
	this.headAll=function(list,key,value){
		key=key||"key";
		value=value||"value";
		var head={};
		head[key]="";
		head[value]="全部";
		var array=[];
		array.push(head);
		return array.concat(list);
	};
	this.headSelective=function(list,key,value){
		key=key||"key";
		value=value||"value";
		var head={};
		head[key]="";
		head[value]="请选择";
		var array=[];
		array.push(head);
		return array.concat(list);
	}
});