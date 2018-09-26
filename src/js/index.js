$(function(){
  headerCart();
   var iw = $( '.banner .banner-img li').width()
   $( '.banner li').css('left',iw);
   $( '.banner li').eq(0).css('left',0);
   var timer;
   clearInterval(timer);
   timer=setInterval(next,3000);
   $('.banner').hover(function(){
       clearInterval(timer);
       $('.next').css('display','inline-block');
       $('.prev').css('display','inline-block');
   },function(){
       timer=setInterval(next,3000);
       $('.next').css('display','none');
       $('.prev').css('display','none');
   })
   $('.next').click(function(){
        next();
   });
   $('.prev').click(prev);
   let idx=0;
   // 点击焦点
   $('.b-dot li').click(function(){
    
    if($(this).index()>idx){
      //右侧切入
      $('banner-img li').eq(idx).animate({
      'left': -iw
    }, 1000);
      $('.banner-img li').eq($(this).index()).css('left', iw + 'px');
      $('.banner-img li').eq($(this).index()).animate({
      'left': 0
    }, 1000);
      idx=$(this).index();
      light();
    }else if($(this).index()<idx){
      //从左侧进入
      $('.banner-img li').eq(idx).animate({
      'left': iw
    }, 1000);
      $('.banner-img li').eq($(this).index()).css('left', iw + 'px');
      $('.banner-img li').eq($(this).index()).animate({
      'left': 0
    }, 1000);
      idx=$(this).index();
      light();
    }
  });
   function next(){
    // console.log(666);
       $( '.banner li').eq(idx).animate({'left':-iw});
       
       idx = (++idx<=$( '.banner .banner-img li').size()-1) ? idx : 0;
       $( '.banner li').eq(idx).css('left',iw+'px');
       $( '.banner li').eq(idx).animate({'left':0});
       light();
   }
   function prev(){
       $( '.banner .banner-img li').eq(idx).animate({'left':iw});
       
       idx = (--idx<0) ? $( '.banner .banner-img li').size()-1 : idx;
       $( '.banner .banner-img li').eq(idx).css('left',-iw+'px');
       $( '.banner .banner-img li').eq(idx).animate({'left':0});
       light();
   }
   function light() {
    $('.b-dot li').eq(idx).addClass('on').siblings().removeClass('on');
  }
    function headerCart(){
        goodslist = Cookie.get('goodslist');

        if(goodslist === ''){
            goodslist = [];
        }else{
            goodslist = JSON.parse(goodslist);
            
            let totalNum = $('.totalNum b')[0];
            let totalPrice = $('.totalPrice')[0];

            let num = 0;
            let priceNum = 0;
             for(var i=0;i<goodslist.length;i++){
                num+=goodslist[i].qty*1;
                priceNum=(goodslist[i].qty*goodslist[i].price)+priceNum*1;

                priceNum=priceNum.toFixed(2)
            }
            totalNum.innerText = num;
            totalPrice.innerText = '￥'+priceNum;
        }
    }



    // 吸顶
    let header = $('.header')[0];
    (function(){

      window.onscroll = function(){
                      // 获取滚动条滚动过的距离
              if(window.scrollY>=90){
                  header.classList.add('header_fixed');

              }else{
                  header.classList.remove( 'header_fixed');

              }
          }







    })()

    

})