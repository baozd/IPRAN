var dataJson;
var createChartClick = 0;;

$(document).ready(function() {
	
	$("#search").click(function() {		
	    $('#jsTimeCount').text('');

	    $('.packet_loss').show();
	    $('.time_delay').show();
	    $('.shake').show();
	    $('#generated_graphs').show();
	    $('#tabs_list').show();
	    createChartClick = 0;
	    var date = new Date();
	    var time = date.getTime();
		$.ajax({
			type:"post",
			url:"performanceManageChartSearch.do",
			data:{count: $("#count").val()},
			dataType:"text",
			success:function(data){
			    dataJson = JSON.parse(data);
			    $("#dataList").clearGridData();
				createGrid(dataJson.chartData ,time);
				//$("#chartData").val(data);
			}
		});	

	});

	$("#createChart").click(function () {
	    createChartClick++;
	    $("body").spin();
	    $('#tableList').removeClass("selected");
	    $(this).addClass("selected");
	    $("#gbox_dataList").hide();
	    
	    if (createChartClick <= 1) {
	    	$("#chartdiv").empty();	
	    }

	    $("#create_Chart").show(function () {
	        if (createChartClick <= 1) {	        	
	        	setTimeout(function(){
	        		createChart(dataJson.chartData);
					$("body").spin(false);
				}, 10);	            
	        }
	    });
	});

	$("#tableList").click(function () {
	    $('#createChart').removeClass("selected");
	    $(this).addClass("selected");
	    $("#create_Chart").hide();
	    $("#gbox_dataList").show();	    
	});
	
	$("#starTime").datepicker({
        dateFormat: "yy/mm/dd",
        changeMonth: true,
        changeYear: true,
        onSelect: function (dateText) {
            $("#endTime").datepicker("option", "minDate", dateText);
        }
    });
    $("#endTime").datepicker({
        dateFormat: "yy/mm/dd",
        changeMonth: true,
        changeYear: true
    });
    
});

function createGrid(dataList, time) {
    $("#dataList").jqGrid({
        datatype: "local",
        data: dataList,
		//mtype:"GET",
		height: 150,
	    colNames:['时间','区局', '基站编号', '基站名称','IP地址','丢包率','中值时延（us)','时延75%（us)','时延95%（us)','中值抖动（us)','抖动75%（us)','抖动95%（us)'],
	    colModel:[
		    { name: 'date', index: 'date', width: 120, sorttype: "text", formatter:'text'},

		    { name: 'rc', index: 'rc', width: 70, sorttype: "text" },
		    
		    { name: 'bsNo', index: 'bsNo', width: 100, sorttype: "float" },

		    { name: 'bsName', index: 'bsName', width: 100, align: "center", sorttype: "float" },

            //IP地址
		    { name: 'ipAddress', index: 'ipAddress', width: 90, align: "right", sorttype: "float" },

            //丢包率
		    { name: 'packetLossRate', index: 'packetLossRate', width: 80, align: "right", sorttype: "float" },

            //中值时延
		    { name: 'medianDelayTime', index: 'medianDelayTime', width: 80, sorttype: "float" },

		    { name: 'delayTime75', index: 'delayTime75', width: 80, align: "right", sorttype: "float" },

		    { name: 'delayTime95', index: 'delayTime95', width: 80, align: "right", sorttype: "float" },

            //中值抖动
		    { name: 'medianJitter', index: 'medianJitter', width: 80, align: "right", sorttype: "float" },

		    { name: 'jitter75', index: 'jitter75', width: 60, align: "right", sorttype: "float" },

		    { name: 'jitter95', index: 'jitter95', width: 60, align: "right", sorttype: "float" }

	    ],
	    rowNum:5, //每页数据显示条数 
        //rowList:[5,10,15], //每页数据显示条数 
	   	pager: '#pagging',//分页
	   	sortname: 'date',//默认表格加载时根据date列排序
	   	sortorder: "asc",
	   	sortable: true,
	   	loadonce:true,
	    viewrecords: true, //显示数据总记录数 
	    //multiselect: true,//定义是否可以多选
	    caption: "查询列表"
    });

    if (dataList.length) {
        $("#dataList").jqGrid('setGridParam', {
            datatype: 'local',
            data: dataList
        }).trigger("reloadGrid");
    } else {
        $("#dataList").jqGrid("addRowData", "1", dataList);
    }
    
	var date1 = new Date();
	var time2 = date1.getTime() - time;
	$('#jsTimeCount').text(time2.toString()/1000);
}

function createChart(chartData) {
	//var chartData = generateChartData();
	//alert(chartData.length);
	
   // SERIAL CHART
   var chart = new AmCharts.AmSerialChart();
   chart.pathToImages = "Static/js/amcharts/images/";
   chart.dataProvider = chartData;
   chart.categoryField = "date";

   // listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
   //chart.addListener("rendered", zoomChart);

   // AXES
   // category
   var categoryAxis = chart.categoryAxis;
   categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
   categoryAxis.minPeriod = "ss"; // our data is daily, so we set minPeriod to DD
   categoryAxis.minorGridEnabled = true;
   categoryAxis.axisColor = "#DADADA";
   

   // first value axis (on the left)
   var valueAxis = new AmCharts.ValueAxis();
   valueAxis.axisColor = "#FF6600";
   valueAxis.axisThickness = 2;
   valueAxis.gridAlpha = 0;
   chart.addValueAxis(valueAxis);

   // GRAPHS
   // first graph
   var graph1 = new AmCharts.AmGraph();
   graph1.valueAxis = valueAxis;
   graph1.title = "中值时延（us)";
   graph1.valueField = "medianDelayTime";
   graph1.bullet = "round";
   graph1.hideBulletsCount = 30;
   graph1.bulletBorderThickness = 1;
   //graph1.lineColor = "#000000";
   chart.addGraph(graph1);

   // second graph
   var graph2 = new AmCharts.AmGraph();
   graph2.valueAxis = valueAxis;
   graph2.title = "时延75%（us)";
   graph2.valueField = "delayTime75";
   graph2.bullet = "square";
   graph2.hideBulletsCount = 30;
   graph2.bulletBorderThickness = 1;
   chart.addGraph(graph2);
   
   var graph3 = new AmCharts.AmGraph();
   graph3.valueAxis = valueAxis;
   graph3.title = "时延95%（us)";
   graph3.valueField = "delayTime95";
   graph3.bullet = "square";
   graph3.hideBulletsCount = 30;
   graph3.bulletBorderThickness = 1;
   chart.addGraph(graph3);
   
   var graph4 = new AmCharts.AmGraph();
   graph4.valueAxis = valueAxis;
   graph4.title = "中值抖动（us)";
   graph4.valueField = "medianJitter";
   graph4.bullet = "square";
   graph4.hideBulletsCount = 30;
   graph4.bulletBorderThickness = 1;
   chart.addGraph(graph4);
   
   var graph5 = new AmCharts.AmGraph();
   graph5.valueAxis = valueAxis;
   graph5.title = "抖动75%（us)";
   graph5.valueField = "jitter75";
   graph5.bullet = "square";
   graph5.hideBulletsCount = 30;
   graph5.bulletBorderThickness = 1;
   chart.addGraph(graph5);
   
   var graph6 = new AmCharts.AmGraph();
   graph6.valueAxis = valueAxis;
   graph6.title = "抖动95%（us)";
   graph6.valueField = "jitter95";
   graph6.bullet = "square";
   graph6.hideBulletsCount = 30;
   graph6.bulletBorderThickness = 1;
   chart.addGraph(graph6);

   // CURSOR
   var chartCursor = new AmCharts.ChartCursor();
   chartCursor.cursorPosition = "mouse";
   chartCursor.cursorColor = "#CC0000";
   chartCursor.categoryBalloonDateFormat = "YYYY-MM-DD";
   chart.addChartCursor(chartCursor);

   // SCROLLBAR
   var chartScrollbar = new AmCharts.ChartScrollbar();
   chart.addChartScrollbar(chartScrollbar);

   // LEGEND
   var legend = new AmCharts.AmLegend();
   legend.marginLeft = 110;
   legend.useGraphSettings = true;
   chart.addLegend(legend);

   // WRITE
   chart.write("chartdiv");
   //$("body").spin(false);
   
}
