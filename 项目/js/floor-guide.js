$(document).ready(function(){
    $(window).scroll(function(){
        var top = $(document).scrollTop();
        var menu = $(".floor-guide");
        var items = $(".floor");

        var curId = ""; 

        items.each(function(){
            var m = $(this);
            var itemsTop = m.offset().top;
            if(top > itemsTop-200){
                curId = "#" + m.attr("id");
            }else{
                return false;
            }
        });

        //给相应的楼层设置cur,取消其他楼层的cur
        var curLink = menu.find(".current");
        if( curId && curLink.attr("href") != curId ){
            curLink.removeClass("current");
            menu.find( "[href=" + curId + "]" ).addClass("current");
        }
        // console.log(top);
    });
});
$(document).ready(function(){
	$(".floor-guide a").anchorGoWhere({target:1});	
});
$(function () {
	var gao=($(window).height()/2);
	if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { 
		return true;
	}
	else{
		$(window).scroll(function () {
		    var totop = $(this).scrollTop();
			if (totop >= 700) {
				$('.floor-guide').show();
			}
			else{
				$('.floor-guide').hide();
			};
		})
	}	
});