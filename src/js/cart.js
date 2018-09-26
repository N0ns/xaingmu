$(function(){


    render();
    let oSubPrice = $('.oSubPrice')[0];
    let btnClear = $('.btnClear')[0];
    let cart_table = $('.cart-table')[0];
    let cart_list = $('.cart-list')[0];
    let chkAll = $('.chkAll')[0];
    let del = $('.del')[0];
    var goodslist;
    // 清空购物车

    btnClear.onclick = function(){

        var mes = confirm('你确定清空购物车？')
        if(mes) {

            Cookie.set('goodslist','',{path:'/src'});

            render();
            
        }
        
    }
   

    //改变数量


    cart_list.onclick = function(e){
        let val ;
        let id ;
        if(e.target.className === 'increment'){
            id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');
            val = e.target.parentNode.children[1].value*1;
            // console.log(val);
            val++;

            console.log( e.target.parentNode.children[1]);
            e.target.parentNode.children[1].value=val;
        //     // $('.itxt').val(val);
            if(val === 99){
                $('.itxt').val(99);
            }
            for(var i=0;i<goodslist.length;i++){
                    if(goodslist[i].id === id){
            //         // 从数组中删除
                        console.log(goodslist[i].id );
                        goodslist[i].qty = val.toString();
                        break;
                    }
                }

            //     // 重写cookie
                Cookie.set('goodslist',JSON.stringify(goodslist),{path:'/src'});
                render();
        }else if(e.target.className === 'decrement'){
            id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');
            val = e.target.parentNode.children[1].value*1;
            if(val <= 1){
                val=1;
                e.target.parentNode.children[1].value=1;
            }else{
                val--;
                e.target.parentNode.children[1].value=val;
            }
            for(var i=0;i<goodslist.length;i++){
                    if(goodslist[i].id === id){
            //         // 从数组中删除
                        console.log(goodslist[i].id );
                        goodslist[i].qty = val.toString();
                        break;
                    }
                }

            //     // 重写cookie
                Cookie.set('goodslist',JSON.stringify(goodslist),{path:'/src'});
                render();
        }
        
        

        if(e.target.className==='goods_del'){
            var currentTab = e.target.parentNode.parentNode.parentNode.parentNode;
            id = currentTab.getAttribute('data-id');
            console.log(id);
             var mes = confirm('你确定删除商品？')
            if(mes){
    //         // 找出与guid相同的商品
                for(var i=0;i<goodslist.length;i++){
                    if(goodslist[i].id === id){
                    // 从数组中删除
                        goodslist.splice(i,1);
                        break;
                    }
                }

                // 重写cookie
                Cookie.set('goodslist',JSON.stringify(goodslist),{path:'/src'});
                render();
            }
            
        }
        //全选
        if(e.target.type === 'checkbox'){
                var sum =  e.target.parentNode.parentNode.children[6].children[0].innerText*1;
                let allTotal = $('.oSubPrice').html()*1
            if(e.target.checked){
                
                let allPrice = (allTotal+sum).toFixed(2);
                $('.oSubPrice').html(allPrice);

                selectAll();
            }else{
                let allPrice = (allTotal-sum).toFixed(2);
                $('.oSubPrice').html(allPrice);

                $('.chkAll').prop('checked',false);

            } 

        }    
            
    }
    
    del.onclick = function(e){
        selectAll();
        if(e.target.className === 'chkAll'){
            if(e.target.checked){
                let sum = 0;
                $('.cart-t-total').find('span').each(function(){
                    sum+=$(this).html()*1;
                    
                });
                $('.oSubPrice').html(sum);
                $('.good_check').prop('checked','checked');

            }else{
                $('.good_check').prop('checked',false);
                $('.oSubPrice').html(0.00);
            }
            
        }
        if(e.target.className === 'clear_chked'){
            var mes = confirm('你确定删除商品？');
            $('.good_check').each(function(){
                
                if(mes){
                    if($(this).prop('checked')){
                        let id = $(this).parent().parent().parent().parent()[0].getAttribute('data-id');
              
                    
                    
          
                        for(var i=0;i<goodslist.length;i++){
                            if(goodslist[i].id === id){
                            // 从数组中删除
                                goodslist.splice(i,1);
                                break;
                            }
                        }

                        // 重写cookie
                        Cookie.set('goodslist',JSON.stringify(goodslist),{path:'/src'});
                        render();
                    }
                }

            });
        }








    }





    function render(){
            goodslist = Cookie.get('goodslist');//

            if(goodslist === ''){
                goodslist = [];
            }else{
                goodslist = JSON.parse(goodslist);
            }

            // console.log(goodslist);

            
            // 用于保存总价金额
            

            var allPrice = 0;
            // 把商品写入页面
            // 创建table
            let oSubPrice = document.querySelector('.oSubPrice');
            let cart_list = document.querySelector('.cart-list');
            cart_list.innerHTML = '';
            cart_list.innerHTML = goodslist.map(function(goods){
                

                // 计算单类商品总价
                let total = 0; 
                total += goods.price * goods.qty;
                total=total.toFixed(2)*1;
                allPrice += total;

                return `
                <table class="cart-table" data-id="${goods.id}">
                    <tbody>
                        <tr>
                            <td class="cart-t-check"><input class="good_check" type="checkbox"  ></td>
                            <td class="cart-t-img"><a href="details.html?idx=${goods.id}"><img src="../img/list/${goods.imgurl}"></a></td>
                            <td class="cart-t-info"><a href="#">${goods.name}</a></td>
                            <td class="cart-t-ub" style="width:75px;"></td>
                            <td class="cart-t-price">￥${goods.price}</td>
                                <td class="cart-t-num">
                                    <div class="quantity-form">
                                        <a href="javascript:void(0);" class="decrement" ></a>
                                        <input id="e47d2ffb-70ac-4208-bfc8-a9688dc6111b|1" type="text" class="itxt"  value="${goods.qty}" >
                                        <a href="javascript:void(0);" class="increment" ></a>
                                    </div>
                                </td>
                            <td class="cart-t-total">￥<span>${total}</span></td>
                          
                            <td class="cart-t-opera">
                                <a href="javascript:void(0);" >移入收藏</a>
                                <br>
                                <a class="goods_del" href="javascript:void(0);" >删除</a>
                            </td>
                        </tr>

                    </tbody>



                </table>
                    
                `
            }).join('');

            // 把table写入页面
            // cart_list.innerHTML = '';
            // cart_list.appendChild(table);


            // 写入总价
            oSubPrice.innerText = 0;
        }
// 修改cookie
function set(id,val){
    
            
            // console.log(goodslist[1].id);
            for(var i=0;i<goodslist.length;i++){
                    if(goodslist[i].id === id){
            //         // 从数组中删除
                        console.log(goodslist[i].id );
                        goodslist[i].qty = val;
                        break;
                    }
                }

            //     // 重写cookie
                Cookie.set('goodslist',JSON.stringify(goodslist),{path:'/src'});
                render();
}
//判断全选
function selectAll(){
    let arr = [];
    for(let i=$('.good_check').size();i>=0;i--){
        if($('.good_check').eq(i).prop('checked')){
            arr.push(i);
        }     
    }
    if(arr.length=== $('.good_check').size()){
        $('.chkAll').prop('checked','checked');
    }
}

// console.log('check');
//计算总价

})
