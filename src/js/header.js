$(function(){
    $('.myyiguo').hover(function(){
        $('.myyiguo .cont').css('display','block');
    },function(){
        $('.myyiguo .cont').css('display','none');
    });
    $('.mobile').hover(function(){
        $('.mobile .cont').css('display','block');
    },function(){
        $('.mobile .cont').css('display','none');
    });
    let sw = true;
    $('.catalogs-title').click(function(){
        if(sw){
            $('.catalogs-list').css('display','none');
        }else{
            $('.catalogs-list').css('display','block');
        }
        sw=!sw;
    });
    $('.catalogs-list .item').hover(function(){
        $(this).children().eq(1).css('display','block');
    },function(){
        $(this).children().eq(1).css('display','none');
    });
    $('.shopping-cart').hover(function(){
        $('.shopping-list').css('display','block');

        if(getCookies('goodslist')){
            $('.nogoods').hide();
            let goodslist = Cookie.get('goodslist');
            let goods = $('.goods')[0];
            goodslist = JSON.parse(goodslist);
            let arr = headerCart();
            let ul =document.createElement('ul');

            ul.innerHTML = goodslist.map(function(goods){
                let sum = 0;
                sum = (goods.price*goods.qty).toFixed(2);
                return `
                <li>
                    <div class="l"><a href="detail.html?idx=${goods.id}" target="_blank">
                    <img src="../img/list/${goods.imgurl}" width="42" height="42"></a>
                    </div>
                    <div class="c"><a href="details.html?idx=${goods.id}">${goods.name}</a></div><div class="r"><b>¥${goods.price}</b> *${goods.qty}
                    <a href="javascript:;" >删除</a></div>
                </li>
                
                
                `
            }).join('');
            goods.innerHTML = '';
            goods.appendChild(ul);
            let div = document.createElement('div');
            div.className = 'price-total';
            div.innerHTML = `
                <div class="">
                    <div><span class="totleNum">共<b>${arr[1]}</b>件商品</span><span>共计<b class="totlePrice">¥${arr[0]}</b></span>
                    </div>
                    <div>
                        <a href="cart.html" class="settleup">去购物车</a>
                    </div>
                </div>
            `
            goods.appendChild(div);

        }else{
            $('.nogoods').show();
        }

    },function(){
        $('.shopping-list').css('display','none');
    });
    update();
    function getCookies(key){
        var cookies = document.cookie;
        arr = cookies.split('; ');
        for(var i=0;i<arr.length;i++){
            var arr1=arr[i].split('=');
            if(arr1[0]===key){
                return arr1[1];
            }
        }

    }
    function update(){
        var uid = getCookies('uid');
        var name = getCookies('username');
        
        if(uid) {
            $('#user').show();
            $('._logout').show();
            $('._login').hide();
            $('._register').hide();
            $('#_loginname').html(name);
        } else {
            $('#user').hide();
            $('._logout').hide();
            $('._login').show();
            $('._register').show();
            $('#_loginname').html('');
        }
    }
    $('._logout').click(function(){
        $.ajax({
            url: '../api/guestbook/index.php',
            type: 'get',
            async: true,
            data:{
                'm' : 'index',
                'a' : 'logout'
            },
            success:function(str){
                var data = JSON.parse(str);
                if(!data.code) {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
                update();
            }
      });
    });
    
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

                priceNum=priceNum.toFixed(2);
            }
            totalNum.innerText = num;
            totalPrice.innerText = '￥'+priceNum;
            return [priceNum,num];
        }
    }
    
    // window.onscroll=function(){
   
    //             //滚动距离:滚动事件里面使用，并且在滚动中才能获取
    //     var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    //     if(scrollTop>=300){
    //         //当滚动到300px的时候，盒子显示，否则隐藏
    //         $('.sidebar')[0].style.display='block';
    //     }
    //     else{
    //         $('.sidebar')[0].style.display='none';
    //     }
        
    //     $('.sidebar')[0].onclick=function(){
    //         //点击缓慢回到顶部
    //         var scrollTop=window.setInterval(function(){
    //             //pageYOffset获取窗口离上面的距离

    //             var pop=window.pageYOffset;
    //             if(pop>0){
    //                 window.scrollTo(0,pop-100);
    //             }
    //             else{
    //                 window.clearInterval(scrollTop);
    //             }
    //         },20);
    //     }
    // }
        









    
});