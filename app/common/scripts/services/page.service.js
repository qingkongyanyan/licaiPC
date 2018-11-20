"use strict"
app.service('pageService',function(){
	this.createPageBean=function() {
		return new PageBean();
	}
	function PageBean(){
			this.beginPageIndex;
			this.currentPage=1;
			this.endPageIndex;
			this.numPerPage=10;
			this.pageCount;
			this.totalCount;
			this.reset=function(pageBean){
				this.beginPageIndex=pageBean.beginPageIndex;
				this.currentPage=pageBean.currentPage;
				this.endPageIndex=pageBean.endPageIndex;
				this.numPerPage=pageBean.numPerPage;
				this.pageCount=pageBean.pageCount;
				this.totalCount=pageBean.totalCount;
			}	
			this.getPageParam=function(){
				return {
					pageNum:this.currentPage||1,
					numPerPage:this.numPerPage||10
				};
			};
			this.previousPage=function(){
				if(this.currentPage>1){
					this.currentPage--;
					return true;
				}else{
					return false;
				}
			};
			this.nextPage=function(){
				if(this.currentPage<this.pageCount){
					this.currentPage++;
					return true;
				}else{
					return false;
				}
			};
			this.setCurrentPage=function(currentPage){
				if(currentPage>=1&&currentPage<=this.pageCount){
					this.currentPage=currentPage;
					return true;
				}else{
					return false;
				}
			};
			this.setPageNum=function(pageNum){
				if(pageNum>=1&&pageNum<this.totalCount){
					this.pageNum=pageNum;
					return true;
				}else{
					return false;
				}
			};
		};
});