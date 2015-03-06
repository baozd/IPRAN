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

    $('.setcolor').click(function () {
        $("#setcolor").show();
        setTimeout(function () {
            $("#setcolor").hide();
        }, 2000);
    });
    
    $('.setFontFamily').click(function () {
        $("#setFontFamily").show();
        setTimeout(function () {
            $("#setFontFamily").hide();
        }, 2000);
    });
    
    $("#color_orange").click(function () {
    	$("#setcolor").hide();
    	$(this).addClass("selected_color");
    	 $("#color_blue").removeClass("selected_color");
        $(".page").find(".blue").removeClass("blue").addClass("orange");
    });
    
    $("#color_blue").click(function () {
    	$("#setcolor").hide();
     	$("#color_orange").removeClass("selected_color");
    	$('#setcolor').addClass('orange');
        $(".page").find(".orange").removeClass("orange").addClass("blue");
    });
    
    $("#songTi").click(function () {
        $(".YaHei_ui").removeClass("YaHei_ui").addClass("songTi");
    });
    $("#YaHei").click(function () {
        $(".songTi").removeClass("songTi").addClass("YaHei_ui");
    });
    
    $("#color_blue").click(function () {
    	$("#setcolor").hide();
     	$("#color_orange").removeClass("selected_color");
    	$('#setcolor').addClass('orange');
        $(".page").find(".orange").removeClass("orange").addClass("blue");
    });
    
	
});


function createBannerPics() {

	var dataList = ['http://hub.pactera.com/sites/default/files/ming31.jpg','http://hub.pactera.com/sites/default/files/HUB%20Banner%20-Pactera%E8%B0%83%E7%A0%94.jpg'],
		banner = $("#bannerPics ul");

	for(var i = 0; i < dataList.length; i++) {
		banner.append($("<li/>").append("<img src='" + dataList[i] + "'/>"));
	}

	$("#bannerPics").slideBox();
}