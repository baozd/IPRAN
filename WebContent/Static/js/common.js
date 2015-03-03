$(document).ready(function() {

	$.ajaxSetup({
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",
	    complete: function(XMLHttpRequest, textStatus) {
	    	
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown){

	    	var sessionstatus = XMLHttpRequest.getResponseHeader("isLogin");
	    	if(sessionstatus == "false") {
	    		alert("页面过期， 请重新登陆");
	    		location.href = "login.do";
	    	} else {
	    		alert("操作失败，请联系管理员");
	    	}
			
		}
	});	
	
});
