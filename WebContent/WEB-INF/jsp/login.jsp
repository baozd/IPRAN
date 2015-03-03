<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@taglib uri="/struts-tags" prefix="s" %>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="Static/js/jquery-1.9.1.min.js"></script>
		<title>Login</title>
		
		<script type="text/javascript">
		$(document).ready(function(){
			$("#userName").val("abc");
			$("#password").val("123");

		});
		</script>
	</head>
	
	<body>
	
		<form action="login_check.do" method="post"> 
			username:<input type="text" name="userName" id="userName" value="<s:property value="userName"/>"><br> 
			password:<input type="password" name="password" id="password"/><br> 
			<input type="submit" value="login"> 
		</form>
	
	</body>
</html>