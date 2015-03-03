$(document).ready(function(){
	
	$("body").spin();
	
	var date1 = new Date();
    var time1 = date1.getTime();
    
    setTimeout(function(){
		createChart();
		
		var date2 = new Date();
    	var time2 = date2.getTime() - time1;
    	$('#jsTimeCount').text(time2.toString()/1000);
    	
		$("body").spin(false);
	}, 10);

	
});


//generate some random data, quite different range
function generateChartData() {

	var chartDataJsonText = $("#hidChartData").val();
	var chartDataJson = JSON.parse(chartDataJsonText);
	$("#hidChartData").val("");
	return chartDataJson.chartData;

}

function createChart() {
	
	var chartData = generateChartData();
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
   
}

