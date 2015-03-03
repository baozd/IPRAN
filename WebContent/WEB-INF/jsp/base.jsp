<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type="text/javascript" src="Static/js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="Static/js/jquery.slideBox.js"></script>
		<script type="text/javascript" src="Static/js/DD_belatedPNG.js"></script>
		
		<script type="text/javascript" src="Static/js/base.js"></script>
		
		<link type="text/css" rel="stylesheet" href="Static/css/jquery.slideBox.css"/>
		<link type="text/css" rel="stylesheet" href="Static/css/base.css"/>
		<link type="text/css" rel="stylesheet" href="Static/css/theme.css"/>		
		
		
		<title>
			<decorator:title default="IPRAN" /> 
		</title>
		<decorator:head />
	</head>
	
	<body class="page"  class='blue'>
	   <div id='header' class='blue'>
            <a id="logo"><img src=""  class='blue'/></a>
            <div class="setTheme">
                <%-- <span>设定主题颜色</span> --%>
                <span>当前主题色:<span id='setcolor'></span></span>
                <div class='color'>
                	<span id='blue'></span>
                	<span id='orage'></span>
                </div>
            </div>

        </div>
		<div id="bannerPics" class="slideBox">
		  <ul class="items">		    
		  </ul>
		</div>
		<div class='nav blue'>
			<ul class="menu">
			    <li><a href="#">主页</a>
			    </li>
			    <li><a href="#">性能管理</a>
			      <ul class="one">
			        <li><a href="#" class="more">单站性能</a>
			          <ul class="two">
			            <li><a href="#">单站性能统计</a></li>
			            <li><a href="#">单站性能明细</a></li> 
			          </ul>
			        </li>
			        <li><a href="#" class="more">多站性能</a>
			            <ul class="two">
			                <li><a href="#">多站性能统计</a></li>
			                <li><a href="#">多站性能明细</a></li>
			            </ul></li>
			      </ul>
			    </li>
			    <li class="last"><a href="#">资源管理</a></li>
	  		</ul>
		</div>	 
		

	   <decorator:body />
	   		<div class="footer">
	   			<div id='footer_logo'>
           			<span class='copyright'>Copyright © 2002-2008 IPRAN. All Rights Reserved.</span>
	   			</div>
           	</div>
	</body>
</html>