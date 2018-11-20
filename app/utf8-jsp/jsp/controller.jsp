<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
	if(request.getHeader("Origin") != null) {
    		response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE");
			response.setHeader("Access-Control-Max-Age", "3600");
			response.setHeader("Access-Control-Allow-Headers","X-Requested-With,X_Requested_With");
			response.setHeader("Access-Control-Allow-Credentials", "true");
    }
    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );
	String redirectUrl = request.getParameter("redirectUrl");
	String redirectParam = request.getParameter("redirectParam");
	if(redirectUrl != null) {
		response.sendRedirect(redirectUrl+"?json="+new ActionEnter( request, rootPath ).exec()+"&redirectParam="+redirectParam);

	} else {
		out.write( new ActionEnter( request, rootPath ).exec() );
	}




	
%>