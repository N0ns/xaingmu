
var chat = {
    url: {
        login: 'https://login.yiguo.com/',
        //yw: 'http://test.yw.yiguo.com/'
        yw: ' http://yunwang.yiguo.com/'
    }
};

var urlroute = function () {

    if (yw_data.data == undefined) {
        yw_data.data = window.location;
    }
    var url = chat.url.yw + '?pagetype=' + yw_data.pagetype + '&data=' + yw_data.data;

    return url;
};

$(function () {

    $("a[id^='calltool']").on("click", function () {
        if ($("#J_lightDemoWrap").html() != null) {
            $("#J_lightDemoWrap").show();
            $(".service-entry").show();
        } else {
            $.post("/handler/IsLoginAndRefer?t=" + new Date().getTime(), null, function (data) {
                if (!data || data == "" || data.islogin != 1) {
                    window.location.href = data.returnUrl;
                } else {
                    var ele = $("a.calltool-min");
                    loadchat(data.data);
                    if ($("iframe[id^='callos_']").css("width") === "0px") {
                        ele.parent("div").show();
                        $("iframe[id^='callos_']").css({ "width": "700px", "height": "600px" });
                    }

                }
            })
        }
    });

});


var getImGroup = function (data, type) {
    var groupId = '';
    var groups = data.split('$');
    $.each(groups, function (index, item) {
        if (item.split('*')[0] == type) {
            groupId = item.split('*')[1];
        }
    })
    return groupId;
}

var loadchat = function (data) {

     if ($("#J_lightDemoWrap").html() === null) {
        $("body").append('<div id="J_lightDemoWrap" style="width: 700px;height: 600px;position:fixed;right:0;bottom:0;z-index:99999;"></div>');
     }

    if (yw_data.data == undefined) {
        yw_data.data = window.location;
    }
    var _type = yw_data.pagetype;
    var _data = encodeURI(yw_data.data);
    if (data && data.Message == null) {
        var options = {
            container: document.getElementById('J_lightDemoWrap'),
            //logo: 'http://img.alicdn.com/tps/i3/TB12LD9IFXXXXb3XpXXSyFWJXXX-82-82.png',
            uid: data.IMAccount.IMUserName,
            appkey: data.AppKey,
            credential: data.IMAccount.IMPassword,
            touid: '易果电子',
            theme: 'lightgreen',
            sendMsgToCustomService: true,
            customUrl: chat.url.yw + 'client/index?pagetype=' + _type + '&data=' + _data,
            msgBgColor: '#47c39a',
            themeBgColor: '#47c39a',
            msgColor: 'rgb(34,34,34)',
            sendBtn: true,
            groupId: getImGroup(data.IMGroupInfos,"1"),
            welcomeMsg: data.WelcomeTips,
            customData: {
                item: {
                    id: ['' + _type + '', '' + _data + '']
                }
            },
            onLoginSuccess: function (rsp) {
                //if (!data.NonWorkingTime)
                //{
                //    var html = '<div class="wkit-clear"><div class="wkit-msg-wrap wkit-r"><div class="wkit-avatar-wrap"><img class="wkit-avatar" src="images/TB10C4vKXXXXXa_aXXXXXXXXXXX-420-420.jpg_200x200.jpg"></div><div class="wkit-msg"><div class="wkit-msg-time"><span></span>今天 16:49:55</div><div class="wkit-msg-inner"><i class="wkit-arr"></i><div class="wkit-msg-item">'+ +'</div></div></div> </div></div>';
                //    $("#J_wkitMsgContent").append(html);
                //}
                $("#J_lightDemoWrap .wkit-powered-by").remove();
                $("#J_wkitMsgSendBtn").css({ "bottom": "36px" });
                $("#J_wkitMsgSendBtn").hover(function () {
                    $(this).css({ "color": "white" });
                }, function () {
                    $(this).css({ "color": "black" });
                })

            },
            onMsgReceived: function (rsp, k, l) {
                if (rsp && rsp.touid) {
                    $(".service-entry span").html(rsp.touid.replace('cntaobao', ''));
                }
            }
        };
        WKIT.init(options);

        $("body").append('<div class="service-entry" style="display: block;position:fixed;right:0px;height:36px;bottom:600px;background-color:#47c39a;width:700px;"><span style="line-height: 36px;margin-left: 10px;color: white; font-weight: bold;"></span><a class="calltool-close" href="javascript:void(0);">X</a><a class="calltool-min" href="javascript:void(0);">一</a></div>');

        $("a.calltool-min").on("click", function () {

            $("#J_lightDemoWrap").hide();

            $(".service-entry").hide();
        });

        $("a.calltool-close").on("click", function () {
            if (window.confirm("如离开将无法接收客服回复的消息，确认离开？")) {
                WKIT.Conn.sdk.Base.logout({
                    success: function (rsp) {
                      
                    }
                })
                WKIT.destroy();
                $("#J_lightDemoWrap").remove();

                $(".service-entry").remove();
            }

        });
    }
}


! function (e, t) {
    var s = $("#sidebar");
    if (s.length > 0) {
        var sa = s.children("a:first");
        sa.addClass("s-btn service").attr("id", "calltool_" + (new Date).getTime());

    }
}(window, void 0);




