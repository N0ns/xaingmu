// JavaScript Document

$(function () {
	
	//我的易果
	$('.myyiguo').hover(function(){
		$(this).addClass('current');
	},function(){
		$(this).removeClass('current');
	});
	
	//手机易果
	$('.mobile').hover(function(){
		$(this).addClass('current');
	},function(){
		$(this).removeClass('current');
	});
	
	//购物车
	$('.shopping-cart').hover(function(){
	    $('.shopping-list').fadeIn("0");
	},function(){
	    $('.shopping-list').delay(1000).fadeOut("1000");
	});
	$('.shopping-list ul li').hover(function(){
		$(this).find('.del').css('visibility','visible');
	},function(){
		$(this).find('.del').css('visibility','hidden');
	});
	
	//商品分类
	$('.catalogs').hover(function(){
		$('.catalogs .catalogs-list').show();
	},function(){
		$('.catalogs .catalogs-list').hide();
	});
	$('.catalogs-list .item').hover(function(){
		$(this).addClass('current');
		$(this).find('.sub-item').show();
	},function(){
		$(this).removeClass('current');
		$(this).find('.sub-item').hide();
	});
	
	//弹框
	$('.soldOut .p-soldOut a span').click(function(){
		$('.soldOut-poput').css('display','block');
	});
	$('.popout a').click(function(){
		$(this).parents('.popout').css('display','none');
	});
	
	//优惠活动tab
	var t_li = $('.promotion-tab li')
	var c_li = $('.promotion-content .promotion-item')
	t_li.hover(function(){
	var i = t_li.index($(this));
	function way(){
	t_li.removeClass('active').eq(i).addClass('active');
	c_li.hide().eq(i).show();
	}
	timer=setTimeout(way,100);
	},function(){
	clearTimeout(timer);
	});
	
	//消除边线
	$('.promotion-tab li').last().css('border-right','0px').css('width','298px');
	$('.flash_sale-con .product').last().css('border-right','0px');
	$('.mod-order tr').last().find('td').css('border-bottom','0px');
	$('.mod-buy tr').last().find('td').css('border-bottom', '0px');

	
});