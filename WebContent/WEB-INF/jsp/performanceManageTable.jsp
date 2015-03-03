<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@taglib uri="/struts-tags" prefix="s" %>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="pragma" content="no-cache"> 
     	<meta http-equiv="cache-control" content="no-cache"> 
     	<meta http-equiv="expires" content="0">  
     	
		<title>Performance</title>
		<style type="text/css"> 		
			@import "Static/css/performanceManageTable.css";
		</style>
		
		<link rel="stylesheet" type="text/css" media="screen" href="Static/css/ui.jqgrid.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="Static/css/jquery-ui-1.11.3.custom/jquery-ui.css" />
		
		<script src="Static/jqueryui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
		<script src="Static/js/i18n/grid.locale-cn.js" type="text/javascript"></script>		
		<script src="Static/js/jquery.jqGrid.min.js" type="text/javascript"></script>
		
		<script src="Static/js/common.js" type="text/javascript"></script>		
		<script src="Static/js/performanceManageTable.js" type="text/javascript"></script>
		
		<script src="Static/js/amcharts/amcharts.js" type="text/javascript"></script>
		<script src="Static/js/amcharts/serial.js" type="text/javascript"></script>
		
		<script src="Static/js/spin.js" type="text/javascript"></script>
		<script src="Static/js/jquery.spin.js" type="text/javascript"></script>
		
		
	</head>
<body>
		
	<form action="performanceManageChart.do" method="post">
		<input type="hidden" id="chartData" name="chartData" value="">
	
	    <div class="content">
	        <div>
	            <div id="content">
	                <div class="statement">
	                    <div class="first">
	                        <div class="region">
	                            <span class="title">区局</span>
	                            <select>
	                                <option>二区</option>
	                                <option>三区</option>
	                                <option>四区</option>
	                            </select>
	                        </div>
	                        <div class="name">
	                            <span class="title">基站名称</span>
	                            <input type="text" id="searchName" value="" />
	                        </div>
	                        <div class="num">
	                            <span class="title">基站编号</span>
	                            <input type="text" id="searchNum" value="" />
	                        </div>
	                        <div class="address">
	                            <span class="title">IP地址：</span>
	                            <input type="text" id="searchAddress" value="" />
	                        </div>
	                        <div class="export"> <input type="text" id="export" value="报表导出" /></div>
	                    </div>
	                    <div class="second">
	                        <div class="starTime">
	                            <span class="title">统计起始时间：</span>
	                            <input type="text" id="starTime" value="" />
	                        </div>
	
	                        <div class="endTime">
	                            <span class="title">统计起始时间：</span>
	                            <input type="text" id="endTime" value="" />
	                        </div>
	                    </div>
	                </div>
	                <div class="searchContent" >
	                    <div class="title blue">
	                        <h2 id="search">查询</h2><input value="1000" id="count" />
	                        <div class="timeCount">
                            <span>时间：</span><span id="jsTimeCount"></span><span>秒</span>
                      		</div>
	                        <input type="text" value="更多筛选条件" class="queryCondition" />
	                    </div>
	                    <div class="content">
	                        <div class='packet_loss'>
	                            <input type="text" id='packet_loss_S' /><span></span><span>丢包率</span><span></span><input id = 'packet_loss_e' type="text" />
	                        </div>
	                        <div class='time_delay'>
	                            <input type="text"  id='time_delay_s' /><span></span><span>时延</span><span></span><input type="text"  id='time_delay_e' />
	                        </div>
	                        <div class='shake'>
	                            <input type="text" id='shake_s'/><span></span><span>抖动</span><span></span><input type="text" id='shake_e' />
	                        </div>
	                    	 <div id="generated_graphs">
						        <a href="performanceManageChart.do" id="createChart1" target="_blank" class='blue'>生成图表</a>
						    </div>
						    <ul id="tabs_list" class='blue'>
	                            <li id="tableList" class='selected'>数据List</li>
	                            <li id="createChart">统计图</li>
                        	</ul>
							<table id="dataList"></table>
							<div id='create_Chart'>
								<div id="chartdiv" style="width: 95%; height: 400px;"></div>
								
								<input type="hidden" id="hidChartData" value="<s:property value="chartData"/>">
							</div>
							<div id="pagging"></div>
	                    </div>
	                </div>
	            </div>
	    	</div>
	    </div>
    </form>
</body>
</html>