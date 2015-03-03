<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@taglib uri="/struts-tags" prefix="s" %>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="pragma" content="no-cache"> 
     	<meta http-equiv="cache-control" content="no-cache"> 
     	<meta http-equiv="expires" content="0">  
		<script type="text/javascript" src="Static/js/jquery-1.9.1.min.js"></script>
		<script src="Static/js/amcharts/amcharts.js" type="text/javascript"></script>
		<script src="Static/js/amcharts/serial.js" type="text/javascript"></script>
		<script src="Static/js/performanceManageChart.js" type="text/javascript"></script>
		<script src="Static/js/spin.js" type="text/javascript"></script>
		<script src="Static/js/jquery.spin.js" type="text/javascript"></script>

		<title>Chart</title>
	</head>
	
	<body>

		<div id="chartdiv" style="width: 95%; height: 400px;"></div>

		<br/>
		<div class="timeCount">
                            <span>时间：</span><span id="jsTimeCount"></span><span>秒</span>
                      		</div>
		
		<input type="hidden" id="hidChartData" value="<s:property value="chartData"/>">
	
	</body>
</html>