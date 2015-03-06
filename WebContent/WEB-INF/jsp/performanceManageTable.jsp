<%@ page language="java" contentType="text/html; charset=utf-8"%>


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
		<link rel="stylesheet" type="text/css" media="screen" id='theme' href="Static/css/jquery-ui-1.11.3.custom/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="Static/css/ui.jqgrid.css" />
		
		
		<script src="Static/jqueryui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
		<script src="Static/js/i18n/grid.locale-cn.js" type="text/javascript"></script>		
		<script src="Static/js/jquery.jqGrid.min.js" type="text/javascript"></script>
		
		<script src="Static/js/common.js" type="text/javascript"></script>		
		<script src="Static/js/performanceManageTable.js" type="text/javascript"></script>
		
		<script src="Static/js/amcharts/amcharts.js" type="text/javascript"></script>
		<script src="Static/js/amcharts/serial.js" type="text/javascript"></script>
		
		<script src="Static/js/modernizr.custom.29473.js" type="text/javascript"></script>
		<script src="Static/js/jquery.blockUI.js" type="text/javascript"></script>
		
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
	                            <span class="title">区局：</span>
	                            <select id='region'>
	                                <option>二区</option>
	                                <option>三区</option>
	                                <option>四区</option>
	                            </select>
	                        </div>
	                        <div class="name">
	                            <span class="title">基站名称：</span>
	                            <input type="text" id="searchName" value="" />
	                        </div>
	                        <div class="num">
	                            <span class="title">基站编号：</span>
	                            <input type="text" id="searchNum" value=""/>
	                        </div>
	                    </div>
	                    <div class="second">
	                        <div class="starTime">
	                            <span class="title">起始时间：</span>
	                            <input type="text" id="starTime" value="<s:property value="startDate"/>" readonly="readonly" />
	                        </div>
	
	                        <div class="endTime">
	                            <span class="title">终止时间：</span>
	                            <input type="text" id="endTime" value="<s:property value="endDate"/>" readonly="readonly" />
	                        </div>
	                        <div class="address">
	                            <span class="title">IP地址：</span>
	                            <input type="text" id="searchAddress" value="" />
	                        </div>
	                    </div>
	                </div>
	                <div class="searchContent" >
	                    <div class="title blue">
	                         <!-- <h2 id="search" class='blue' >查询</h2> -->
	                         <input type="button" id="search" class='blue' value="查询" />
	                        <div id="generated_graphs">
	                    	 	<%-- <span class='gray' id="createChart1">生成图表</span> --%>	                    	 	
	                            <input  class='gray' type="button" id="drawChart" value="生成图表" />
	                            
	                            <%-- <span class="gray"  id="export">报表导出</span> --%>
	                              	 	
	                            <input class='gray' id="export" type="button" id="export" value="报表导出" />
						    </div>
	                        <div class='condition'>
	                   			<%-- <span class='gray add'></span>  --%>	                   			
	                            <input class='gray add' id="gradMoreCondition" value="" type="button"  />	                   			
	                            
	                            <%-- <span class='blue add' id='moreCondition'></span>    --%>
	                            	                   			
	                            <input class='blue add' id="moreCondition" type="button" value="" />
	                            
	                   			<%-- <span class='blue less' id='lessCondition'></span>  	    --%>                			
	                            <input class='blue less' id="lessCondition" type="button"  value=""  />                   			
	                   			<%-- <span class="queryCondition">更多筛选条件</span> --%>
                   			</div>
	                    </div>                   		
	                    <div class='datelist'>
			                 <div id='searchConditions' class="content blue">
			                 		<span class="queryCondition blue">更多筛选条件</span>
			                 	    <div class="one">
								        <div class='packet_loss'>
								            <span class='title'>丢包率：</span>
								            <input type="text" id='packet_loss_s' />~<input type="text" id='packet_loss_e' />
								        </div>
								        <div class='median_delay'>
								            <span class='title'>中值时延（us)：</span>
								            <input type="text" id='median_delay_s' />~<input type="text" id='median_delay_e' />
								        </div>
								    </div>
								    <div class="two">
								        <div class='time_delay_min'>
								            <span class='title'>时延75%：</span>
								            <input type="text" id='time_delay_min_s' />~<input type="text" id='time_delay_min_e' />
								        </div>
								        <div class='time_delay_max'>
								            <span class='title'>时延95%：</span>
								            <input type="text" id='time_delay_max_s' />~<input type="text" id='time_delay_max_e' />
								        </div>
								    </div>
								    <div class="three">
								        <div class='median_shake'>
								            <span class='title'>中值抖动（us)：</span>
								            <input type="text" id='median_shake_s' />~<input type="text" id='median_shake_e' />
								        </div>
								        <div class='shake_min'>
								            <span class='title'>抖动75%：</span>
								            <input type="text" id='shake_min_s' />~<input type="text" id='shake_min_e' />
								        </div>
								    </div>
								    <div class="four">
								        <div class='shake_max'>
								            <span class='title'>抖动95%：</span>
								            <input type="text" id='shake_max_s' />~<input type="text" id='shake_max_e' />
								        </div>
								        <div class='screen'>								                   			
	                           				<input class='blue' id="filter" type="button"  value="筛选"  />  
								            <%-- <span id="screen" class="blue">筛选</span> --%>
								        </div>
								
								    </div>
			                  </div>
						  	 <div id="tabs">
								<ul>
    								<li><a href="#tabs-1">数据</a></li>
								</ul>
								<div id="tabs-1">
									<table id="dataList"></table>
									<div id="pagging"></div>
								</div>
								
							</div>
	                    </div>
	                </div>
	            </div>
	    	</div>
	    </div>
    </form>
</body>
</html>