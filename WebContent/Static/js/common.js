$(document).ready(function() {

	var boardDiv = "<div id='message' style='display:none;'><span id='spanmessage'></span></div>";
	   $(document.body).append(boardDiv); 
	   
	$.ajaxSetup({
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",
	    complete: function(XMLHttpRequest, textStatus) {
	    	
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown){
	    	$.unblockUI();
	    	var sessionstatus = XMLHttpRequest.getResponseHeader("isLogin");
	    	if(sessionstatus == "false") {
	    		message("页面过期， 请重新登陆", forwardToLogin);
	    	} else {
	    		message("操作失败，请联系管理员");
	    	}
		}
	});
	
	$("#color_orange").click(function () {
		$('#theme').attr('href', 'Static/css/jquery-ui-1.11.3.custom.orange/jquery-ui.css');
	});
	
	$("#color_blue").click(function () {
		$('#theme').attr('href', 'Static/css/jquery-ui-1.11.3.custom/jquery-ui.css');
	});
	
});

function message(text, callbak) {
    $("#spanmessage").text(text);
    $("#message").dialog({
        title:"信息",
        modal: true,
        buttons: {
            "确认": function() {
                $(this).dialog("close");
                if (callbak != undefined) {
                	callbak();
                }
            }
        }
    });
} 

function forwardToLogin() {
	location.href = "login.do";
}

function isEmpty(str) {
	if (str == undefined || trim(str) == "") {
		return true;
	}
	
	return false;
}

function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isIP(ip) {
	if (isEmpty(ip)) {
		return true;
	}
	
    var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;   
    return re.test(ip);   
}

function isNumber(n) {
	if (isEmpty(n)) {
		return true;
	}
	
	var reg = new RegExp("^[0-9]*$");
	return reg.test(n);
}

function isNumberOrAlpha(n) {
	if (isEmpty(n)) {
		return true;
	}
	
	var reg = new RegExp("^[A-Za-z0-9]*$");
	return reg.test(n);
}
