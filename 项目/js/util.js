/********************************************************************************
** auth： luojianguang
** date： 2015/5/18 15:09:12
** desc： 公共工具类
** Ver.:  V1.0.0
*********************************************************************************/

var util = {};
$(function () {
    //提示信息相关
    util.Dialog = (function ($) {
        var win = $(".Dailog-poput");
        if (win.length == 0) {
            $('body').eq(0).append('<div class="popout Dailog-poput" style="z-index:999999999;display:none;"></div>');
            win = $(".Dailog-poput");
        }
        var dailogHtml = '<div class="popout-wrap">\
                            <div class="popout-con">\
            	                <div class="title"><i></i>提 示</div>\
            	                <div class="con">\
            		                <p></p>\
                                    <div class="btnbox"><a class="confirm" href="javascript:">确定</a></div>\
            	                </div>\
                            </div>\
                        </div>\
                        <div class="popout-bg">&nbsp;</div>';
        win.html(dailogHtml);
        var dialog =
         {
             alert: function (msg) {
                 win.find('.con p').html(msg);
                 win.find('.btnbox').html('<a class="confirm" href="javascript:">确定</a>');
                 win.find('.confirm').click(function () {
                     $(this).closest('.Dailog-poput').hide();
                 });
                 win.show();
             },
             alertfun: function (msg,fun) {
                 win.find('.con p').html(msg);
                 win.find('.btnbox').html('<a class="confirm" href="javascript:">确定</a>');
                 win.find('.confirm').click(function () {
                     fun();
                     $(this).closest('.Dailog-poput').hide();
                 });
                 win.show();
             },
             alertGoto: function (msg, url) {
                 win.find('.con p').html(msg);
                 win.find('.btnbox').html('<a class="confirm" href="javascript:">确定</a>');
                 win.find('.confirm').click(function () {
                     $(this).closest('.Dailog-poput').hide();
                     window.location.href = url;
                 });
                 win.show();
             },
             alertReload: function (msg) {
                 win.find('.con p').html(msg);
                 win.find('.btnbox').html('<a class="confirm" href="javascript:">确定</a>');
                 win.find('.confirm').click(function () {
                     $(this).closest('.Dailog-poput').hide();
                     window.location.reload();
                 });
                 win.show();
             },
             confirm: function (msg, fun) {
                 win.find('.con p').html(msg);
                 win.find('.btnbox').html('<a class="confirm" href="javascript:">确定</a><a class="cancel" href="javascript:">取  消</a>');
                 win.find('.confirm').click(function () {
                     fun();
                     $(this).closest('.Dailog-poput').hide();
                 });
                 win.find('.cancel').click(function () {
                     $(this).closest('.Dailog-poput').hide();
                 });
                 win.show();
             }
         };

        win.find('p').css({
            'text-align': 'center',
            'font-size': '14px',
            'padding-top': '15px'
        });
        win.find('.btnbox').css('margin-top', '45px');
        return dialog;
    })(jQuery);

    //Ajax相关
    util.Ajax = (function ($) {
        var divtemplate = "<div class='loading'><i></i><span>正在加载中...</span></div>";

        var doAajx = function (url, type, data, success, btn) {
            if (!btn || !btn.hasClass('Loading')) {
                $.ajax({
                    url: url,
                    type: type,
                    cache: false,
                    dataType: 'json',
                    data: data,
                    success: success,
                    beforeSend: function () {
                        if (btn) {
                            btn.addClass('Loading');
                        }
                    },
                    complete: function (xhr, status) {
                        var sessionStatus = xhr.getResponseHeader('ygsessionstatus');
                        if (sessionStatus == 'timeout') {
                            console.log("session过期");
                        }
                        if (btn) {
                            btn.removeClass('Loading');
                        }
                    }
                });
            }
        };

        var doAajxList = function (url, type, data, success, ele, tmp) {
            $.ajax({
                url: url,
                type: type,
                cache: false,
                dataType: 'json',
                data: data,
                success: success,
                beforeSend: function () {
                    if (ele.length > 0 && ele.hasClass("j_Loading")) {
                        ele.after(tmp);
                    }
                },
                complete: function () {
                    if (ele.length > 0) {
                        ele.next("div .loading").remove();
                        ele.removeClass("j_Loading");
                    }
                }
            });
        };
        var ajax = {
            get: function (url, data, success, btn) {
                doAajx(url, "GET", data, success, btn);
            },
            post: function (url, data, success, btn) {
                doAajx(url, "POST", data, success, btn);
            },
            get_load: function (url, data, success, ele) {
                doAajxList(url, "GET", data, success, ele, divtemplate);
            }
        };
        return ajax;
    })(jQuery);

    //分页数据
    util.Pager = (function ($) {
        var defaults = {
            Index: 0,//页码
            PageSize: 5,//每页显示数量
            PagesCount: 0,//总页数
            Pager: '',//分页控件ID
            Url: '',//Ajax请求地址
            Container: '',//数据加载容器
            HandlebarID: '',//数据模板ID
            LoadComplete: null//数据加载完成后回调
        };
        var loadComplete = null;
        var options = {};
        var loadData = function (data) {
            options = $.extend(true, {}, options, data);
            if (options.LoadComplete && options.LoadComplete != null) {
                loadComplete = options.LoadComplete;
                options.LoadComplete = null;
            }
            util.Ajax.get(options.Url, options, function (result) {
                if (result) {
                    $(options.Container).utastebars({
                        tpl: $(options.HandlebarID),
                        context: result
                    });
                    common.pagePlugins.init(options.Pager, result.page, loadData);
                    $("#" + options.Pager).addClass("j_active");
                    options.PagesCount = result.page.PagesCount;
                    if (loadComplete && loadComplete != null) {
                        loadComplete(result);
                    }
                }
            });
        };
        var pager = {
            init: function (data) {
                options = $.extend(true, {}, defaults, data);
                loadData(data);
            }
        };
        return pager;
    })(jQuery);

    //上传控件
    util.Upload = (function ($) {
        var options;
        var ygUpload;
        var upload = {
            //初始化上传控件
            init: function (data) {
                options = $.extend(true, {}, {
                    instanceName: "ygUpload",
                    userId: '',
                    sessionId: "3tax1gpkiq5455gsy4ebti0a",
                    uploadMaxNum: 1,
                    usage: YGUpload.UPLOAD_USAGE.DEFAULT,
                    catId: 3000
                }, data);
                ygUpload = new YGUpload(options);
                if (data) {
                    //上传成功回调方法
                    if (data.fileUploadSuccess) {
                        ygUploadFileSuccess = data.fileUploadSuccess;
                    }
                    //上传发生错误回调方法
                    if (data.fileUploadError) {
                        ygUploadFileError = data.fileUploadError;
                    }
                    //其它回调方法依据上传控件，在此处添加
                }
            },
            //点击选择文件上传
            upload: function (e, tagName, thumbs) {
                if (typeof (thumbs) == "undefined") {
                    thumbs = "470x470,100x100";
                }
                if (ygUpload) {
                    ygUpload.settings.tag = tagName;
                    ygUpload.settings.thumbs = thumbs;
                    ygUpload.showDialog();
                }
            }
        };
        return upload;
    })(jQuery);

    //输入验证
    util.Validator = (function ($) {
        var validator = {
            //是否手机号
            isMobile: function (value) {
                return /^((1[0-9]{1})+\d{9})$/.test(value)||/^\d{3}\*\*\*\*\d{4}$/.test(value);
            },
            //是否邮箱
            isEmail: function (value) {
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
            },
            //是否整数
            isInteger: function (value) {
                return /^[-]{0,1}[0-9]{1,}$/.test(value);
            },
            //是否正整数
            isNumber: function (value) {
                return /^[0-9]+$/.test(value);
            },
            //是否是金额
            isMoney: function (value) {
                return /^[-]{0,1}[0-9]+[\.][0-9]{0,3}$/.test(value);
            }
        };
        return validator;
    })(jQuery);

    //面包屑
    (util.Navigator = (function ($) {
        var nav = $(".crumbs .j_thirdnav"),
            ygnav = $(".crumbs .j_ygnav"),
            navcontainer = $(".crumbs .j_thridcrumbs"),
            menu = $(".j_menu"),
            url = window.location.href,
            current,
            navData = [
                { url: "/Trade/Index", name: "我的易果" },
                { url: "/Trade/MyCoupons", name: "我的优惠券" },
                { url: "/Trade/UMoney", name: "我的悠币" },
                { url: "/Trade/UseGiftCard", name: "我的礼品卡" },
                { url: "/Trade/OnlineDelivery", name: "我的礼品兑换券" },
                { url: "/Trade/OrderList", name: "我的订单" },
                { url: "/Trade/MyBuy", name: "购买过的商品" },
                { url: "/Trade/MyCollection", name: "我的收藏" },
                { url: "/Trade/CommodityVote", name: "评论商品" },
                { url: "/Account/Balance", name: "账户余额" },
                { url: "/Account/PersonalProfile", name: "个人资料" },
                { url: "/Account/AccountSecurity", name: "账号安全" },
                { url: "/Account/Consignee", name: "收货地址管理" },
                { url: "/Account/Shared", name: "推荐有礼" },
                { url: "/Account/Enterprise", name: "升级为企业账号" },
                { url: "/Account/MyRecipes", name: "我的菜谱" },
                { url: "/Account/CreateRecipes", name: "我的菜谱" },
                { url: "/Trade/BackOrder", name: "在线退换货" },
                { url: "/Trade/Advice", name: "商品投诉" },
                { url: "/Trade/UBExchangeCoupon", name: "悠币换券" },
                { url: "/OrderLottery", name: "订单兑奖码" },
                { url: "/B2BWelfare/CorporationAccount", name: "升级为企业帐号" }
            ];
        if (nav.length > 0 && ygnav.length > 0 && navcontainer.length > 0) {
            if (url.toLowerCase().indexOf(navData[0].url.toLowerCase()) > 0) {
                ygnav.addClass("on");
            } else {
                $.each(navData, function (idx, val) {
                    if (url.toLowerCase().indexOf(val.url.toLowerCase()) > 0) {
                        nav.text(val.name);
                        navcontainer.show();
                        current = val;
                        return false;
                    }
                });
            }
        }
        if (menu.length > 0 && current !== undefined) {
            menu.find("li a").each(function () {
                var ele = $(this);
                if (ele.text() == current.name) {
                    ele.parent("li").addClass("on");
                    return false;
                }
            });
        }

    })(jQuery));

    //滚动加载
    util.Waterfull = (function ($) {
        var options = {};
        var waterfull = {
            init: function (container, data, callBack) {
                options = $.extend(true, {}, {
                    pageIndex: 1,
                    pageSize: 10,
                    pageCount: 1000000
                }, data);
                var getData = function () {
                    $(container).data('Loading', "1");
                    $(container).addClass('j_Loading');
                    util.Ajax.get_load(options.url, options, function (result) {
                        if (callBack != null) {
                            callBack(result);
                        }
                        options.pageIndex += 1;
                        options.pageCount = result.page.PagesCount;
                        $(container).data('Loading', "0");
                    }, $(container));
                };
                getData();
                $(window).scroll(function () {
                    //正在加载中
                    if ($(container).data('Loading') == "1") {
                        return;
                    }
                    //全部加载完
                    if (options.pageCount < options.pageIndex) {
                        return;
                    }
                    //容器底部距文档最顶端的距离
                    var offsetTop = $(container).offset().top + $(container).height();
                    //滚动条滚动高度
                    var scrollheight = $(window).scrollTop();
                    //当前屏幕可是区域高度
                    var screenheight = $(window).height();
                    if (offsetTop - (scrollheight + screenheight) <= 0) {
                        getData();
                    }
                });
            }
        };
        return waterfull;
    })(jQuery);

});

util.DateFormat = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$.fn.Numeral = function () {
    $(this).css("ime-mode", "disabled");
    this.bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE      
        if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下不能使用退格键     
        {
            return;
        }
        return code >= 48 && code <= 57;
    });
    this.bind("blur", function () {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = "";
        }
    });
    this.bind("paste", function () {
        //var s = clipboardData.getData('text');
        //if (!/\D/.test(s));
        //value = s.replace(/^0*/, '');
        this.value = "";
        return false;
    });
    this.bind("dragenter", function () {
        return false;
    });
    this.bind("keyup", function () {
        if (/(^0+)/.test(this.value)) {
            //this.value = this.value.replace(/^0*/, '');
        }
    });
};