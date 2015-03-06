var dataJson,
	filteredDataList = [],
tabTitle = $( "#tab_title" ),
tabContent = $( "#tab_content" ),
tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
tabCounter = 2;

$(document).ready(function() {
	
	prepareGrid();
	
	var tabs = $("#tabs").tabs({event: "mouseover"});
	tabs.delegate( "span.ui-icon-close", "click", function() {
		var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		$( "#" + panelId ).remove();
		tabs.tabs( "refresh" );
    });
	
	$("#search").click(function() {	
		
		$("#content").find(".error").removeClass("error");
		if (!checkSearchItem()) {
    		return;
    	}
		
	    search();
	});


	$("#drawChart").click(function() {
		if ($(this).hasClass("gray")) {
			return;
		}

		var addTabCount = 0;
		$("#tabs .ui-tabs-panel").each(function () {
		    if ($(".page").find(".ui-tabs-panel")) {
		        addTabCount++;
		    }		   
		});
		if (addTabCount >= 13) {
		    message('您生成的图标个数已经超过最大个数，请删除不需要的图标，然后再生成图标。');
		    return false;
		} else {
		    addChart();
		}
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

    $('#moreCondition').click(function () {
 	   $('#searchConditions').slideDown("slow");
 	   $('#moreCondition').hide();
 	   $('#lessCondition').show().css('display','inline-block');
 	});
    
    $('#lessCondition').click(function () {
  	   $('#searchConditions').slideUp("slow");
  	   $('#lessCondition').hide();
  	   $('#moreCondition').show().css('display','inline-block');
  	});
    
    $("#filter").click(function() {
    	$("#searchConditions").find(".error").removeClass("error");
    	
    	if (!checkFilterItem()) {
    		return;
    	}
    	
    	filter();
    });
    
    
});

function search() {
	$.blockUI();
	$("#searchConditions input:text").val("");
	$.ajax({
		type:"post",
		url:"performanceManageChartSearch.do",
		data:{count: 500},
		dataType:"text",
		success:function(data){
		    dataJson = JSON.parse(data);
			filterData();
	    	drawGrid(filteredDataList);
	    	$('#lessCondition').hide();
	    	$('#searchConditions').slideUp("slow");
	    	
	    	if (filteredDataList.length > 0) {
	    		$("#generated_graphs input").removeClass("gray").addClass("blue");
			    $("#moreCondition").css('display', 'inline-block').show();
			    $("#gradMoreCondition").hide();
	    	} else {
	    		$("#generated_graphs input").removeClass("blue").addClass("gray");
			    $('#moreCondition').hide();
			    $("#gradMoreCondition").show();
			    $('#searchConditions').slideUp("slow");
	    	}
	    	
			$.unblockUI();
		}
	});	
}

function filter() {
	$("#tabs").block();
	filterData();
	drawGrid(filteredDataList);
	var tabs = $( "#tabs" ).tabs();
	tabs.tabs({ active: 0 });
	
	if (filteredDataList.length > 0) {
		$("#generated_graphs input").removeClass("gray").addClass("blue");	
	} else {
		$("#generated_graphs input").removeClass("blue").addClass("gray");
	}
	
	$("#tabs").unblock();
}

function addChart() {
	$("#tabs").block();
	var tabsUl = $("#tabs").find("ul:first"),
		k = 1,
		labelName = "图表 ";
	
	if (tabsUl.find("li").length > 1) {
		for (var i = 1; i < tabsUl.find("li").length; i++) {
			var temp = parseInt(tabsUl.find("li :eq(" + i + ")").find("a :first").text().replace(labelName, ""));
			k = Math.max(k, temp);
		}		
		k++;	
	}
	
	var label = labelName + k,
		chartdiv = "chartdiv_" + (tabCounter - 1),
		id = "tabs-" + tabCounter,
		li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
	
	var tabs = $( "#tabs" ).tabs();
	setTimeout(function(){
		tabs.find( ".ui-tabs-nav" ).append( li );
		tabs.append( "<div id='" + id + "'><p>" + "<div id='" + chartdiv + "' style='width: 95%; height: 350px;'></div>" + "</p></div>" );
		drawChart(filteredDataList, chartdiv);
		tabs.tabs( "refresh" );
		tabs.tabs({ active: tabsUl.find("li").length - 1 });
		tabCounter++;
		$("#tabs").unblock();
	}, 10);
}

function prepareGrid() {
	
	$("#dataList").jqGrid({
        datatype: "local",
        data: [],
		height: 350,
	    colNames:['时间', '区局', '基站编号', '基站名称', 'IP地址', '丢包率', 
	              '中值时延（us)', '时延75%（us)', '时延95%（us)', 
	              '中值抖动（us)', '抖动75%（us)', '抖动95%（us)'],
	    colModel:[
		    { name: 'date', index: 'date', width: 140, sorttype: "text", formatter:'text'},
		    { name: 'rc', index: 'rc', width: 60, sorttype: "text" },
		    { name: 'bsNo', index: 'bsNo', width: 90, sorttype: "float" },
		    { name: 'bsName', index: 'bsName', width: 85, align: "center", sorttype: "float" },
		    { name: 'ipAddress', index: 'ipAddress', width: 80, align: "right", sorttype: "float" }, // IP地址
		    { name: 'packetLossRate', index: 'packetLossRate', width: 55, align: "right", sorttype: "float" }, // 丢包率

            //中值时延
		    { name: 'medianDelayTime', index: 'medianDelayTime', width: 80, sorttype: "float" },
		    { name: 'delayTime75', index: 'delayTime75', width: 80, align: "right", sorttype: "float" },
		    { name: 'delayTime95', index: 'delayTime95', width: 80, align: "right", sorttype: "float" },

            //中值抖动
		    { name: 'medianJitter', index: 'medianJitter', width: 80, align: "right", sorttype: "float" },
		    { name: 'jitter75', index: 'jitter75', width: 60, align: "right", sorttype: "float" },
		    { name: 'jitter95', index: 'jitter95', width: 60, align: "right", sorttype: "float" }

	    ],
	    rowNum:15, //每页数据显示条数 
        //rowList:[5,10,15], //每页数据显示条数 
	   	pager: '#pagging',//分页
	   	sortname: 'date',//默认表格加载时根据date列排序
	   	sortorder: "asc",
	   	sortable: true,
	   	loadonce:true,
	    viewrecords: true, //显示数据总记录数 
	    //multiselect: true,//定义是否可以多选
	    //caption: "查询列表"
    });
}

function drawGrid(dataList) {
	
	$("#dataList").clearGridData();
	if (dataList.length == 0) {
		message("没有符合条件的数据");
		return;
	}
	
	$("#dataList").jqGrid('setGridParam', {
        datatype: 'local',
        data: dataList
    }).trigger("reloadGrid");
}

function createAmGraph(valueAxis, title, valueField, bullet) {
	
	var graph = new AmCharts.AmGraph();
	graph.valueAxis = valueAxis;
	graph.title = title;
	graph.valueField = valueField;
	graph.bullet = bullet;
	graph.hideBulletsCount = 30;
	graph.bulletBorderThickness = 1;
	
	return graph;
}

function drawChart(chartData, chartDiv) {

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
   categoryAxis.parseDates = true;
   categoryAxis.minPeriod = "ss";
   categoryAxis.minorGridEnabled = true;
   categoryAxis.axisColor = "#DADADA";
   
   // first value axis (on the left)
   var valueAxis = new AmCharts.ValueAxis();
   valueAxis.axisColor = "#FF6600";
   valueAxis.axisThickness = 2;
   valueAxis.gridAlpha = 0;
   chart.addValueAxis(valueAxis);
	
   // GRAPHS
   chart.addGraph(createAmGraph(valueAxis, "丢包率", "packetLossRate", "diamond"));
   chart.addGraph(createAmGraph(valueAxis, "中值时延（us)", "medianDelayTime", "round"));
   chart.addGraph(createAmGraph(valueAxis, "时延75%（us)", "delayTime75", "triangleLeft"));
   chart.addGraph(createAmGraph(valueAxis, "时延95%（us)", "delayTime95", "triangleRight"));
   chart.addGraph(createAmGraph(valueAxis, "中值抖动（us)", "medianJitter", "square"));
   chart.addGraph(createAmGraph(valueAxis, "抖动75%（us)", "jitter75", "triangleUp"));
   chart.addGraph(createAmGraph(valueAxis, "抖动95%（us)", "jitter95", "triangleDown"));

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
   chart.write(chartDiv);
}

function filterData() {
	filteredDataList = [];
	
	var list = dataJson.chartData,
		packet_loss_s = $("#packet_loss_s").val(),
		packet_loss_e = $("#packet_loss_e").val(),
		median_delay_s = $("#median_delay_s").val(),
		median_delay_e = $("#median_delay_e").val(),
		time_delay_min_s = $("#time_delay_min_s").val(),
		time_delay_min_e = $("#time_delay_min_e").val(),
		time_delay_max_s = $("#time_delay_max_s").val(),
		time_delay_max_e = $("#time_delay_max_e").val(),
		median_shake_s = $("#median_shake_s").val(),
		median_shake_e = $("#median_shake_e").val(),
		shake_min_s = $("#shake_min_s").val(),
		shake_min_e = $("#shake_min_e").val(),
		shake_max_s = $("#shake_max_s").val(),
		shake_max_e = $("#shake_max_e").val();
	
	for (var i = 0; i < list.length; i++) {
		var o = list[i];
		
		// 丢包率
		if (packet_loss_s != "" && parseInt(packet_loss_s) > parseInt(o.packetLossRate)) {
			continue;
		}
		if (packet_loss_e != "" && parseInt(packet_loss_e) < parseInt(o.packetLossRate)) {
			continue;
		}
		
		// 中值时延（us)
		if (median_delay_s != "" && parseInt(median_delay_s) > parseInt(o.medianDelayTime)) {
			continue;
		}
		if (median_delay_e != "" && parseInt(median_delay_e) < parseInt(o.medianDelayTime)) {
			continue;
		}
		
		// 时延75%（us)
		if (time_delay_min_s != "" && parseInt(time_delay_min_s) > parseInt(o.delayTime75)) {
			continue;
		}
		if (time_delay_min_e != "" && parseInt(time_delay_min_e) < parseInt(o.delayTime75)) {
			continue;
		}
		
		// 时延95%（us)
		if (time_delay_max_s != "" && parseInt(time_delay_max_s) > parseInt(o.delayTime95)) {
			continue;
		}
		if (time_delay_max_e != "" && parseInt(time_delay_max_e) < parseInt(o.delayTime95)) {
			continue;
		}
		
		// 中值抖动（us)
		if (median_shake_s != "" && parseInt(median_shake_s) > parseInt(o.medianJitter)) {
			continue;
		}
		if (median_shake_e != "" && parseInt(median_shake_e) < parseInt(o.medianJitter)) {
			continue;
		}
		
		// 抖动75%（us)
		if (shake_min_s != "" && parseInt(shake_min_s) > parseInt(o.jitter75)) {
			continue;
		}
		if (shake_min_e != "" && parseInt(shake_min_e) < parseInt(o.jitter75)) {
			continue;
		}
		
		// 抖动95%（us)
		if (shake_max_s != "" && parseInt(shake_max_s) > parseInt(o.jitter95)) {
			continue;
		}
		if (shake_max_e != "" && parseInt(shake_max_e) < parseInt(o.jitter95)) {
			continue;
		}
			
		filteredDataList.push(o);
	}
}

function checkSearchItem() {
    //基站编号：
    var name = $("#searchNum").val().trim();
    if (!isNumberOrAlpha(name)) {
        $("#searchNum").addClass("error");
        message('您输入的基站编号格式不正，正确格式为{WBJ90978}');
        return false;
    }

    //IP地址：
    var ip = $("#searchAddress").val().trim();
    if (!isIP(ip)) {
        $("#searchAddress").addClass("error");
        message('您输入的IP地址格式不正，正确格式如{156.3.1.101}');
        return false;
    }
    
    return true;
}

function checkFilterItem() {
    //丢包率：
    var packet_loss_s = $("#packet_loss_s").val();
    if (!isNumber(packet_loss_s)) {
        $("#packet_loss_s").addClass("error");
        message('您输入的丢包率格式不正，正确格式为数字');
        return false;
    }
    //丢包率：
    var packet_loss_e = $("#packet_loss_e").val();
    if (!isNumber(packet_loss_e)) {
        $("#packet_loss_e").addClass("error");
        message('您输入的丢包率格式不正，正确格式为数字');
        return false;
    }
    //时延75%：：
    var time_delay_min_s = $("#time_delay_min_s").val();
    if (!isNumber(time_delay_min_s)) {
        $("#time_delay_min_s").addClass("error");
        message('您输入的时延75%格式不正，正确格式为数字');
        return false;
    }
    //时延75%：：
    var time_delay_min_e = $("#time_delay_min_e").val();
    if (!isNumber(time_delay_min_e)) {
        $("#time_delay_min_e").addClass("error");
        message('您输入的时延75%格式不正，正确格式为数字');
        return false;
    }
    //中值抖动（us)：
    var median_shake_s = $("#median_shake_s").val();
    if (!isNumber(median_shake_s)) {
        $("#median_shake_s").addClass("error");
        message('您输入的中值抖动（us)格式不正，正确格式为数字');
        return false;
    }
    //中值抖动（us)：
    var median_shake_e = $("#median_shake_e").val();
    if (!isNumber(median_shake_e)) {
        $("#median_shake_e").addClass("error");
        message('您输入的中值抖动（us)格式不正，正确格式为数字');
        return false;
    }
    //抖动95%：
    var shake_max_s = $("#shake_max_s").val();
    if (!isNumber(shake_max_s)) {
        $("#shake_max_s").addClass("error");
        message('您输入的抖动95%格式不正，正确格式为数字');
        return false;
    }
    //抖动95%：
    var shake_max_e = $("#shake_max_e").val();
    if (!isNumber(shake_max_e)) {
        $("#shake_max_e").addClass("error");
        message('您输入的抖动95%格式不正，正确格式为数字');
        return false;
    }
    //中值时延（us)：
    var median_delay_s = $("#median_delay_s").val();
    if (!isNumber(median_delay_s)) {
        $("#median_delay_s").addClass("error");
        message('您输入的中值时延（us)格式不正，正确格式为数字');
        return false;
    }
    //中值时延（us)：
    var median_delay_e = $("#median_delay_e").val();
    if (!isNumber(median_delay_e)) {
        $("#median_delay_e").addClass("error");
        message('您输入的中值时延（us)格式不正，正确格式为数字');
        return false;
    }
    //时延95%：
    var time_delay_max_s = $("#time_delay_max_s").val();
    if (!isNumber(time_delay_max_s)) {
        $("#time_delay_max_s").addClass("error");
        message('您输入的时延95%格式不正，正确格式为数字');
        return false;
    }
    //时延95%
    var time_delay_max_e = $("#time_delay_max_e").val();
    if (!isNumber(time_delay_max_e)) {
        $("#time_delay_max_e").addClass("error");
        message('您输入的时延95%格式不正，正确格式为数字');
        return false;
    }
    //抖动75%
    var shake_min_s = $("#shake_min_s").val();
    if (!isNumber(shake_min_s)) {
        $("#shake_min_s").addClass("error");
        message('您输入的抖动75%格式不正，正确格式为数字');
        return false;
    }
    //抖动75%
    var shake_min_e = $("#shake_min_e").val();
    if (!isNumber(shake_min_e)) {
        $("#shake_min_e").addClass("error");
        message('您输入的抖动75%格式不正，正确格式为数字');
        return false;
    }
    if(packet_loss_s == '' && packet_loss_e =='' && time_delay_min_s =='' && time_delay_min_e == '' && median_shake_s == '' 
    	&& median_shake_e == '' && shake_max_s == '' && shake_max_e == '' && median_delay_s == '' && median_delay_e == ''
    		&& time_delay_max_s == '' && time_delay_max_e == '' && shake_min_s == '' && shake_min_e == ''){
    	
    	  message('请输入筛选条件!');
          return false;
    	
    }
    
    return true;
}
