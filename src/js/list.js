$(function(){
    let goods_list = document.querySelector('.goods_list');
    let page = document.querySelector('.page');
    let xhr = new XMLHttpRequest();

            // 4)在js中处理数据
            xhr.onreadystatechange = ()=>{
                // 事件会执行4次，但只有在最后一次才确认获取到数据
                if(xhr.readyState === 4){
                    // console.log(xhr.responseText);
                    let data = JSON.parse(xhr.responseText);
                    let goodslist = data.data;
                    let len = Math.ceil(data.total/data.qty);
                    page.innerText = '';
                    let ul = document.createElement('ul');
                    for(let i=0;i<len;i++){
                        let span = document.createElement('span');
                        span.innerText = i + 1;
                        if(i === data.pageNo-1){
                            span.className = 'active';
                        }

                        page.appendChild(span);
                    }





                    ul.innerHTML = goodslist.map(goods=>{
                        return `<li class="product_item j_product"  _productid="${goods.id}">
                        <div class="p_img clearfix">
                            <a href="javascript:void(0)">
                                    <img src="../img/list/${goods.imgurl}" width="290" height="290" class="j_product_img">
                            </a>
                        </div>
                        <div class="p_info clearfix">
                            <div class="p_name"><a href="javascript:void(0)">${goods.title}</a></div>
                            <div class="p_price">
                                <span class="price">
                                    <strong>¥${goods.price}</strong>
                                </span>
                                
                            </div>
                        </div>
                        <div class="p-buy">
                            <span>${goods.details}</span>
                                    <a class="btn-buy" href="#">加入购物车</a>
                        </div>
                    </li>`
                    }).join('');

                    // 写入页面
                    goods_list.innerHTML = '';
                    goods_list.appendChild(ul);
                    //显示按钮
                    $('.j_product').hover(function(){
                        
                        $(this).children().eq(2).show();
                    },function(){
                        $(this).children().eq(2).hide();
                    });
                    
                   
                }
            }

            // 2）配置参数，建立与服务器的连接
            xhr.open('get','../api/guestbook/goodslist.php?page=1&qty=8');

            // 3）发送请求
            xhr.send();


            let pageNo = 1;
            page.onclick= e=>{
                if(e.target.tagName.toLowerCase() === 'span'){
                    let pageNo = e.target.innerText;;
                    xhr.open('get','../api/guestbook/goodslist.php?page='+pageNo+'&qty=8',true);
                    xhr.send();
                }
            }



            // 排序
            let desc = false;
            let filter = document.querySelector('.filter');
            let sell = document.querySelector('.sell');
            let price = document.querySelector('.price');
            let nor = document.querySelector('.nor');
            filter.onclick = e=>{
                // 价格排序
                if(e.target.innerText === '销量'){
                    nor.classList.remove('on');
                    price.classList.remove('on');
                    e.target.classList.add('on');
                    console.log('销量');
                    desc = !desc;

                    xhr.open('get','../api//guestbook/goodslist.php?sort=comment' + (desc?'&desc':''),true);
                    xhr.send();
                }else if(e.target.innerText === '价格'){
                    nor.classList.remove('on');
                    sell.classList.remove('on');

                    e.target.className = 'on';
                    // console.log('价格');
                    desc = !desc;

                    xhr.open('get','../api//guestbook/goodslist.php?sort=price' + (desc?'&desc':''),true);
                    xhr.send();
                }
            }


    // 跳转到详情页

    
    // 把商品信息转成特定格式的字符串
    var params = '';
    
    let ul = document.querySelector('.goods_list ul');

    goods_list.onclick = function(e){
        let tar = e.target;
        if(tar.tagName.toLowerCase() === 'li'){
            params+='idx'+'='+tar.getAttribute('_productid');
        }else if(tar.parentNode.tagName.toLowerCase() === 'li'){
            params='idx'+'='+tar.parentNode.getAttribute('_productid');
        }else if(tar.parentNode.parentNode.tagName.toLowerCase() === 'li'){
             params='idx'+'='+tar.parentNode.parentNode.getAttribute('_productid');
        }else if(tar.parentNode.parentNode.parentNode.tagName.toLowerCase() === 'li'){
            params='idx'+'='+tar.parentNode.parentNode.parentNode.getAttribute('_productid');
        }
        
        location.href = 'details.html?' + params;
    }
   


    // 吸顶
     let header = $('.header')[0];

    

      window.onscroll = function(){
                      // 获取滚动条滚动过的距离
              if(window.scrollY>=90){
                  header.classList.add('header_fixed');

              }else{
                  header.classList.remove( 'header_fixed');

              }
          }







    
        // var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
        // if(scrollTop>=300){
        //     //当滚动到300px的时候，盒子显示，否则隐藏
        //     $('.sidebar')[0].style.display='block';
        // }
        // else{
        //     $('.sidebar')[0].style.display='none';
        // }
        
        // $('.sidebar')[0].onclick=function(){
        //     //点击缓慢回到顶部
        //     var scrollTop=window.setInterval(function(){
        //         //pageYOffset获取窗口离上面的距离

        //         var pop=window.pageYOffset;
        //         if(pop>0){
        //             window.scrollTo(0,pop-100);
        //         }
        //         else{
        //             window.clearInterval(scrollTop);
        //         }
        //     },20);
        // }
        

    headerCart();
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

    window.onscroll=function(){
   
                //滚动距离:滚动事件里面使用，并且在滚动中才能获取
       
    }




});




