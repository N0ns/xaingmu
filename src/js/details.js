$(function(){
    headerCart();
    let content = document.querySelector('.content');
    
    var params = location.search;

    params = params.substring(1);




    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4){
            let data = JSON.parse(xhr.responseText);


            let div = document.createElement('div');
            div.classList.add('product-intro','clearfix','j_product')
            div.innerHTML = data.map(goods=>{
                return `
            <div class="pic-preview">
                <div class="pic-big">

                    <img class="j_product_img goods-img" width="500" height="500" src="../img/list/${goods.imgurl}" style="display:  block;">

                    <img class="j_product_img" width="500" height="500" src="../img/details/goods2.jpg" style="display: none;">

                    <img class="j_product_img" width="500" height="500" src="../img/details/goods3.jpg" style="display: none;">

            

                </div>
                <div class="fdj">
                    
                </div>
                <div class="pic-thumb">

                    <div class="picList">

                        <ul>

                            <li><img class="goods-img" width="85" height="85" src="../img/list/${goods.imgurl}"></li>

                            <li><img width="85" height="85" src="../img/details/goods2.jpg"></li>

                            <li><img width="85" height="85" src="../img/details/goods3.jpg"></li>

                        </ul>

                    </div>

                </div>
                <div class="icon"><img src="../img/details/ICON06.png" width="46" height="46"></div>

            </div>

            <div class="product-info">

                <div class="summary-name">

                    <h1>${goods.title}</h1>

                    <p>${goods.details}</p>

                    <input type="hidden" name="CommodityId" id="CommodityId" value="e47d2ffb-70ac-4208-bfc8-a9688dc6111b" />

                </div>



                <div class="summary-price clearfix">

                    <div class="pro-price">

                        <div>

                            <span class="tt">价格：</span>

                            <span><em>¥</em><strong>${goods.price}</strong></span>

                        </div>

                        <div class="pro-m2">

                            更多商品优惠，尽在易果生鲜APP

                        </div>





                    </div>

                    <div class="pro-tel">

                        <p><i></i>手机下单购买<strong>立即扫码</strong></p><div class="code">

                            <img id="qrcodeUrl" width="114" height="114" display:="" block="" src="../img/details/qrcode_app.jpg">

                        </div>

                    </div>

                    <div class="pro-review">

                        <p>总体满意度</p>

                        <p><b>${goods.star}</b> 分</p>

                        <p><a href="#comment"><span>(评论数${goods.comment})</span></a></p>

                    </div>

                </div>



            </div>

            <div class="summary-other clearfix">

                <div class="left">

                    



                            <div class="pro-service"><b>16:00</b> 后完成订单 预计后天<b>(9月17日)</b>送达</div>

                        <div class="pro-service"><i class="mr5"><img src="../img/details/icon1.png"></i>不支持7天无理由退货</div>

                    <div class="pro-amount clearfix">

                        <div class="dt">数量：</div>

                        <div class="dd">

                            <div class="spinner">

                                <button class="decrease" disabled="disabled">-</button>

                                <input type="text" class="spinner value" id="p_number" maxlength="2" value="1">

                                <button class="increase">+</button>

                            </div>

                            <div class="addcart"><a class="btn-gn" href="javascript:;" ><i></i>加入购物车</a></div>

                        </div>

                    </div>

                </div>

                <div class="right">

                    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="zx">

                        <tbody>

                            <tr><th>原产地：</th><td>${goods.product}</td></tr>

                            <tr><th>商品编号：</th><td>${goods.id}</td></tr>

                            <tr><th>品牌：</th><td>易果</td></tr>

                            <tr><th>发货地：</th><td>广州</td></tr>

                            

                        </tbody>

                    </table>

                </div>

            </div>`
            }).join('');

            // 写入页面
            content.innerHTML = '';
            content.appendChild(div);
            $('.picList ul li').mouseenter(function(){
                $idx=$(this).index()
                $('.pic-big img').eq($idx).css('display','block').siblings().css('display','none');
            })

            // 放大镜
            let pic_big = $('.pic-big')[0];
            let fdj = $('.fdj')[0];
            pic_big.onmouseover = function(e){
                
                let target = e.target;
                if(target.tagName.toLowerCase() === 'img'){
                    
                    var bigImg = document.createElement('img');
                    bigImg.src = target.src;
                   
                    console.log(78787)
                    fdj.innerHTML = '';
                    fdj.appendChild(bigImg);
                    fdj.style.left = e.clientX  + 'px';
                    fdj.style.top = e.clientY+50  + 'px';

                    fdj.style.display = 'block';
                }
            } 
            pic_big.onmouseout = function(e){
                    var target = e.target ;

                    // 判断是否移入img标签
                    if(target.tagName.toLowerCase() === 'img'){
                       

                        // 隐藏大图
                        fdj.style.display = 'none';
                    }
                }
            pic_big.onmousemove = function(e){
                    e = e || window.event;

                    var left = e.clientX + 10;
                    var top = e.clientY - 50;

                    // 当右侧的空间无法容纳当前大图时，显示在左侧
                     if(window.innerHeight - e.clientY <= fdj.offsetHeight + 10){
                        top = e.clientY - fdj.offsetHeight - 10;
                    }



                    fdj.style.left = left + 'px';
                    fdj.style.top = top + 'px';
                }   
















            //加入购物车
            let btn_gn = document.querySelector('.btn-gn');
            
                // var goods = document.getElementsByClassName('goods')[0];

                // 用于保存所有商品
                var goodslist = Cookie.get('goodslist');//[{},{}], ''

                if(goodslist === ''){
                    goodslist = [];
                }else{
                    goodslist = JSON.parse(goodslist);
                }
                




                let goods_qty ;
                $('.increase').click(function(){
                        goods_qty = $('#p_number').val();
                        goods_qty++;
                        $('#p_number').val(goods_qty);
                    })
                    $('.decrease').click(function(){
                        goods_qty = $('#p_number').val();
                        goods_qty--;
                        if(goods_qty<1){
                            goods_qty=1;
                        }
                        $('#p_number').val(goods_qty);
                    })
                    
                // 绑定点击事件
                btn_gn.onclick = function(e){
                    var id = data[0].id;
                    cartMagic($('.pic-big'),id);

                    
                    
            
                        
                        

                        // 判断商品是否为第一次添加
                        for(var i=0;i<goodslist.length;i++){
                            if(goodslist[i].id === id){
                                // 如果goodslist中有一个商品跟当前guid一样，说明为多次添加
                                let res = (goodslist[i].qty*1+$('#p_number').val()*1).toString();
                                goodslist[i].qty= res;
                                break;
                            }
                        }

                        // 循环跑完，无法找到相同id，说明为第一次添加
                        // 如何判断循环跑完
                        if(i===goodslist.length){

                            // 获取商品信息，并写入对象
                            var mygoods = {
                                id:data[0].id,//guid商品唯一标识
                                imgurl:data[0].imgurl,
                                name:data[0].title,
                                price:data[0].price,

                                // 商品数量：第一次天添加（为1），多次添加（在原来基础上+1）
                                qty:$('#p_number').val()
                            }

                            // 把当前商品写入数组
                            goodslist.push(mygoods);
                        }




                        Cookie.set('goodslist',JSON.stringify(goodslist),{path:'/src'});
                        headerCart();



                    
                }
            
            
        }
    }

    // 2）配置参数，建立与服务器的连接
    xhr.open('get','../api/guestbook/details.php?'+params ,true);

    // 3）发送请求
    xhr.send();


    let btn_gn = document.querySelector('.btn-gn');
 









    function cartMagic(ele){
        // console.log(ele);
        var cart = $('.shopping-cart');
        init(ele);
        function init(img) {



            if (img != null && img.length > 0 && cart != null && cart.length > 0) {

                var flyElm = img.clone().css('opacity', 1);
                let elm = $(flyElm).find('.j_product_img');
                console.log(elm[0].src)
                $('body').append(flyElm);

                flyElm.css({

                    'z-index': 9000,

                    'display': 'block',

                    'position': 'absolute',

                    'top': img.offset().top + 'px',

                    'left': img.offset().left + 'px',

                    'width': img.width() + 'px',

                    'height': img.height() + 'px',

                    
                    'border': '3px solid #fff',

                    'background': 'url('+elm[0].src+') no-repeat center center',



                });

                // return flyElm;

                 // var elm=$(flyElm).find('.j_product_img');
                 // console.log(img);
                fly(flyElm);

            }

            
        }
        function fly(flyElm){
            var elm=$(flyElm).find('.j_product_img');
            flyElm.animate({

                width: '40px',

                height: '40px'

            }, 800)
                flyElm.animate({

                top: cart.offset().top,

                left: cart.offset().left,

                width: 40,

                height: 40

            }, 800,function(){
                flyElm.remove();
            })
             
        }   
    }
    function headerCart(){
        goodslist = Cookie.get('goodslist');
        console.log(goodslist);
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
                console.log(priceNum)
                priceNum=priceNum.toFixed(2)
            }
            totalNum.innerText = num;
            totalPrice.innerText = '￥'+priceNum;
        }
    }

});








            