$(function(){
        /*
    验证用户名
    get
        guestbook/index.php
            m : index
            a : verifyUserName
            username : 要验证的用户名
        返回
            {
                code : 返回的信息代码 0 = 没有错误，1 = 有错误
                message : 返回的信息 具体返回信息
            }
    */
    $('.input-zh').keyup(function(){
        var un = $('.input-zh').val();
        $.ajax({
            type: 'get',
            url: '../api/guestbook/index.php',
            async: true,
            data: {
                'm': 'index',
                'a': 'verifyUserName',
                'username': un
            },
            success:function(str){
                var data = JSON.parse(str);
                console.log(data);
                if(data.code===1){
                    $('#verifyUserNameMsg').html('用户名长度不能小于3个或大于20个字符！').css('color','red');
                }else if(data.code===2){
                    $('#verifyUserNameMsg').html('对不起，该用户名已经被注册了！').css('color','red');
                }else{
                    $('#verifyUserNameMsg').html('恭喜你，该用户名可以注册！').css('color','green');
                }
            }
        });
    });
    // 邮箱
    $('.input-mail').keyup(function(){
        var mail = $('.input-mail').val();
        var reg = /^[a-z0-9][\w\-\.]{2,15}@[0-9a-z][0-9a-z\-]{1,66}(\.[a-z\u2E80-\u9FFF]{2,6}){1,2}$/;
        if(!reg.test(mail)){
            $('#verifyMail').html('请输入正确邮箱').css('color','red');
            
        }else{
            $('#verifyMail').html('恭喜你，该邮箱可以注册！').css('color','green');
        }
        
    });
    // 手机号
    $('.input-phone').keyup(function(){
        var phone = $('.input-phone').val();
        var reg = /^1[3-9]\d{9}$/;
        if(!reg.test(phone)){
            $('#verifyPhone').html('手机号码不合法').css('color','red');
            return false;
        }else{
            $('#verifyPhone').html('恭喜你，该手机可以注册！').css('color','green');
        }
        
    });
    // 密码
    $('.input-key').keyup(function(){
        var key = $('.input-key').val();
        var reg = /^[\w\-]{6,20}$/;
        if(!reg.test(key)){
            $('#verifyKey').html('密码不合法').css('color','red');
        }else{
            $('#verifyKey').html('恭喜你，该密码可以注册！').css('color','green');
        }
        
    });






    /*
    用户注册
    get/post
        guestbook/index.php
            m : index
            a : reg
            username : 要注册的用户名
            password : 注册的密码
        返回
            {
                code : 返回的信息代码 0 = 没有错误，1 = 有错误
                message : 返回的信息 具体返回信息
            }
    */    
    $('.btn-green-l').click(function(){

        var chk = document.querySelector('#tab2chk');
        var un = $('.input-zh').val();
        var pw = $('.input-key').val();
        if(chk.checked){
            $.ajax({
                url: '../api/guestbook/index.php',
                type: 'post',
                async: true,
                data:{
                    'm' : 'index',
                    'a' : 'reg',
                    'username' : un,
                    'password' : pw
                },
                
                success:function(str){
                    var data = JSON.parse(str);
                    if(data.code){
                        alert('注册失败');
                    }else{
                        alert('注册成功');
                        $('.input-zh').val('');
                        $('.input-key').val('');
                        $('#verifyUserNameMsg').html('');
                        location.href = 'login.html';
                    }
                    
                    }
            });
        }else{
            alert('注册失败');
        }

        
    });
    


    
})