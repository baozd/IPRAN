$(document).ready(function() {
    
    createBannerPics();
    
    $('.menu li').hover(
            function () {
			
		        $(this).children('ul').show();
		
		        $(this).focus().addClass('focusa')
		
		    },
            function () {
		
		        $(this).children('ul').hide();

		        $(this).focus().removeClass('focusa')
            }
         );
		DD_belatedPNG.fix('ul,.more');
	
});

function createBannerPics() {
	var dataList = ['http://hub.pactera.com/sites/default/files/ming31.jpg','http://hub.pactera.com/sites/default/files/HUB%20Banner%20-Pactera%E8%B0%83%E7%A0%94.jpg'],
		banner = $("#bannerPics ul");

	for(var i = 0; i < dataList.length; i++) {
		banner.append($("<li/>").append("<img src='" + dataList[i] + "'/>"));
	}

	$("#bannerPics").slideBox();
}