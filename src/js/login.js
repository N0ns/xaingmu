$(function(){
    $('.yzm').html(randomCode(4));
    $('.gray').click(function(){
        $('.yzm').html(randomCode(4));
    })
     /*
    用户登陆
    get/post
        guestbook/index.php
            m : index
            a : login
            username : 要登陆的用户名
            password : 登陆的密码
        返回
            {
                code : 返回的信息代码 0 = 没有错误，1 = 有错误
                message : 返回的信息 具体返回信息
            }
    */
   $('#btnLogin').click(function(){
        var un = $('#UserName').val();
        var pw = $('#Pwd').val();
        if(true){
            $.ajax({
                url: '../api/guestbook/index.php',
                type: 'post',
                async: true,
                data:{
                    'm' : 'index',
                    'a' : 'login',
                    'username' : un,
                    'password' : pw
                },
                success:function(str){
                    var data = JSON.parse(str);
                    console.log(data);
                    alert(data.message);
                    if(!data.code){
                        $('#username2').val('');
                        $('#password2').val('');
                        
                    }
                    
                     
                }
            });
        }
        
    });
});