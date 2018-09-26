var app = {};
app.domain = {
    img01: "http://img03.yiguoimg.com",
    utaste: "http://home.yiguo.com",
    www: "http://www.yiguo.com",
    h5: "http://h5.yiguo.com"
};


///清除ie8 ajax缓存
$.ajaxSetup({
    cache: false //close AJAX cache 
});

app.ismobile = function ismobile() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息   
                trident: u.indexOf('Trident') > -1, //IE内核  
                presto: u.indexOf('Presto') > -1, //opera内核  
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
                iPad: u.indexOf('iPad') > -1, //是否iPad    
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.android ||
       browser.versions.iPhone) {
        window.location = app.domain.h5;
    }
}

//首页楼层滚动加载
app.floorscroll = function floorscroll(_floor, _offset) {
    if (_offset == undefined) _offset = 0;
    var floor = $(_floor);
    $(floor).each(function (index, item) {

        if (!$(item).hasClass("loaded")) {

            var screenheight = $(window).height();

            var offset = $(item).offset().top;

            var itemheight = $(item).outerHeight();

            var scrollheight = $(window).scrollTop();

            if (offset < $(window).height() ||
                (scrollheight < offset + itemheight + _offset &&
                 scrollheight > offset - screenheight - _offset)) {

                getdata($(item).attr("data-url"), item);

                $(item).addClass("loaded");
            }
        }
        // console.log("----------------");
    })
};

//列表页滚动加载
app.waterfull = function waterfull(_container, _offset) {
    $(window).scroll(function () {
        if ($(_container).attr("_end") == "true") {
            return;
        }
        if ($(_container).attr("_loaded") == "false") {
            return;
        }

        //容器底部距文档最顶端的距离
        var offsetTop = $(_container).offset().top + $(_container).height();
        //滚动条滚动高度
        var scrollheight = $(window).scrollTop();
        //当前屏幕可是区域高度
        var screenheight = $(window).height();

        if (offsetTop - (scrollheight + screenheight) <= 0) {
            if ($(_container).attr("_maxpage") <= parseInt($(_container).attr("_page"))) {
                return;
            }
            $(_container).append(" <div class=\"loding\"></div>");

            $(_container).attr("_loaded", "false");

            var _category = $(_container).attr("_category");

            var url = "/productsdata/" + _category + ".html";

            var queryString = "";

            if (window.location.href.indexOf("?") > 0) {
                queryString = window.location.href.substring(window.location.href.indexOf("?"), window.location.href.length);

                queryString += "&currentindex=" + $(_container).attr("_page");

            } else {
                queryString += "?currentindex=" + $(_container).attr("_page");
            }


            $.get(url + queryString, function (data) {

                if (data && data.length > 4) {

                    $(_container).find("ul").append(data);

                    $(_container).attr("_page", parseInt($(_container).attr("_page")) + 1);

                    $(_container).attr("_loaded", "true");

                    $(_container).find(".loding").remove();

                } else {
                    $(_container).attr("_end", "true");
                }
            })
        }
    });
};
app.waterfullSearch = function waterfullSearch(_container, _offset) {
    $(window).scroll(function () {
        if ($(_container).attr("_end") == "true") {
            return;
        }
        if ($(_container).attr("_loaded") == "false") {
            return;
        }

        //容器底部距文档最顶端的距离
        var offsetTop = $(_container).offset().top + $(_container).height();
        //滚动条滚动高度
        var scrollheight = $(window).scrollTop();
        //当前屏幕可是区域高度
        var screenheight = $(window).height();

        if (offsetTop - (scrollheight + screenheight) <= 0) {
            if ($(_container).attr("_maxpage") <= parseInt($(_container).attr("_page"))) {
                return;
            }
            $(_container).append(" <div class=\"loding\"></div>");

            $(_container).attr("_loaded", "false");

            var _category = $(_container).attr("_category");

            var url = "/search/SearchListData";

            var queryString = "";

            if (window.location.href.indexOf("?") > 0) {
                queryString = window.location.href.substring(window.location.href.indexOf("?"), window.location.href.length);

                queryString += "&page=" + $(_container).attr("_page");

            } else {
                queryString += "?page=" + $(_container).attr("_page");
            }


            $.get(url + queryString, function (data) {

                if (data && data.length > 4) {

                    $(_container).find("ul").append(data);

                    $(_container).attr("_page", parseInt($(_container).attr("_page")) + 1);

                    $(_container).attr("_loaded", "true");

                    $(_container).find(".loding").remove();

                } else {
                    $(_container).attr("_end", "true");
                }
            })
        }
    });
};

app.fixedheader = function fixedheader()
{
    $(window).scroll(function () {
        var totop = $(this).scrollTop();
        if (totop >= 100) {
            $('.header').addClass('header_fixed')
            //$('.site-nav').addClass('site-nav-fixed')
        }
        else {
            $(".header").removeClass('header_fixed');
            //$('.site-nav').removeClass('site-nav-fixed')
        };
    });
}

//初始化头部公共数据
app.initLayout = function initLayout(url) {
    $.get(url + "?r=" + Math.random(), function (result) {
        if (result) {
            $("#topads").utastebars({
                tpl: $("#topadstpl"),
                context: result
            });

            $("#keywords").utastebars({
                tpl: $("#keywordstpl"),
                context: result
            });
            $("#homenav").utastebars({
                tpl: $("#homenavtpl"),
                context: result
            });

            $("#citylist").utastebars({
                tpl: $("#_citytpl"),
                context: result
            });
            $("#_categry").utastebars({
                tpl: $("#_categorytpl"),
                context: result
            });
            // app.changecity();

            if (result.DeliveryType == 1) {
                $("#deliveryType").show();
            }
            //商品分类
            $('.catalogs').hover(function () {
                $('.catalogs .catalogs-list').show();
            }, function () {
                $('.catalogs .catalogs-list').hide();
            });

            $('.catalogs-list .item').hover(function () {
                $(this).addClass('current');
                $(this).find('.sub-item').show();
            }, function () {
                $(this).removeClass('current');
                $(this).find('.sub-item').hide();
            });

            $("#homenav li").each(function (index, item) {
                var href = window.location.href;
                if (href == $($(item).find("a").attr("href"))) {
                    $(item).addClass("highlight");
                }
            })

            cityFn.init();
            $("#citylist .headline a").on("click", function () {

                $("._selected").removeClass("_selected");

               $(this).addClass("_selected");
                
                app.changecity(this);
            })
            $(".citytab span").mouseover(function () {
                var index = $(this).index(".citytab span");
                $(this).addClass("active").siblings().removeClass("active");
                $($(".citylist")[index]).addClass("active").siblings().removeClass("active");
            });

        }
    })
}

//获取最近浏览商品
app.getrecentViewCommodity = function getrecentViewCommodity(url) {
    $.get(url + "&r=" + Math.random(), function (result) {
        if (result) {
            $("#recentcommodity").utastebars({
                tpl: $("#recentcommoditytpl"),
                context: result
            });
            if (result.data.length == 0) {
                $("#RecentViewCommodity").hide();
            } else {
                $("#RecentViewCommodity").show();
            }
            $('.recently .p').hover(function () {
                $(this).find('.del').show();
            }, function () {
                $(this).find('.del').hide();
            });
            $('.recently .p').last().css('border-bottom', '0px');

        }
    });
}

//城市切换
app.changecity = function changecity(obj) {

    //$(obj).click(function () {

    var v = $(obj).attr("v");

    var areaid = $(obj).attr("aid");

    var name = $("._selected").text();

        if (v != "" && v != undefined) {

            var url = "/Handler/ChangeCity?cityid=" + v + "&cityname=" + encodeURIComponent(name) + "&areaid=" + encodeURIComponent(areaid) + "&r=" + Math.random();

            $.get(url, function (data) {

                if (data.Msg == "1") {

                    //window.location.href = window.location.href.replace("#", '');
                    window.location.reload();
                }

            })

        }

    //    return false;

    //});

};

//获取用户名
app.getusername = function getusername() {

    var url = "/Handler/getusername" + "?datestamp=" + new Date().getTime();
    $.get(url, function (data) {
        if (data && data != "0") {
            $("#_login").hide();
            $("#_register").hide();
            $("#_loginname").show();
            $("#_logout").show();
            $("#_loginname").find("a").html(data);
        } else {
            $("#_login").show();
            $("#_register").show();
            $("#_loginname").hide();
            $("#_logout").hide();
        }
    })

};

//获取用户优惠券数量
app.getuserecoupon = function getuserecoupon() {

    var url = "/Handler/GetUserEcoupon" + "?datestamp=" + new Date().getTime();
    $.get(url, function (data) {
        if (data) {
            $("#coupon").html(data);
            $(".couponcount").html(data);
        }
    })

};

//退出登录
app.logout = function logout(tag) {
    $(tag).click(function () {
        var url = "/Handler/Logout" + "?date=" + new Date().getTime();
        $.get(url, function (data) {
            window.location = data;
        })
    });
};

//刷新购物车
app.referCart = function referCart(o, d) {
    if (o != undefined && o.MsgSuccess == 0) {
        G.modal.right(o.MsgBody == "" ? o.MsgValue : o.MsgBody);
        return;
    }
    if (d != undefined) {
        common.cartMagic.fly(d);
    }
    G.app.cart.Facade.getShopCartData(function (data) {
        var container = $(".shopping-cart");
        if (data != undefined) {
            var totleNum = 0;
            var totlePrice = 0;
            var innerhtml = "";
            $(container).find("ul").html("");
            $(data).each(function (i, item) {
                innerhtml += "<li><div class=\"l\">";
                innerhtml += "<a href=\"" + app.domain.www + "/product/" + item.CommodityCode + ".html\" target=\"_blank\">";
                //innerhtml += "<img src=\"" + app.domain.img01 + item.PictureName + "\" width=\"42\" height=\"42\"/>";
                innerhtml += "<img src=\"" + item.PictureUrl + "\" width=\"42\" height=\"42\"/>";
                innerhtml += "</a></div>";
                innerhtml += "<div class=\"c\">";
                innerhtml += "<a href=\"" + app.domain.www + "/product/" + item.CommodityCode + ".html\">" + item.CommodityName + "</a>";
                //innerhtml += "<b>" + item.Spec + "</b></div>";
                if (parseInt(item.UsedPoint) > 0) {
                    innerhtml += "<b>+ 悠币：" + item.UsedPoint + "</b>";
                }
                innerhtml += "</div>";
                innerhtml += "<div class=\"r\">";
                innerhtml += "<b>¥" + item.Price + "</b> * " + item.Num + "<a href=\"javascript:;\" onclick=\"G.app.cart.Facade.deleteShopCartData(this,'" + item.CommodityId + "')\">删除</a>";
                innerhtml += "</div></li>";

                totleNum += parseInt(item.Num);
                totlePrice += parseFloat(item.Price * item.Num);
            });
            $(container).find("ul").append(innerhtml);

            $(container).find(".totlePrice").html("¥" + totlePrice.toFixed(2));

            $(container).find(".totleNum").find("b").html(totleNum);
            $(container).find(".goods").show();
            $(container).find(".nogoods").hide();
        } else {
            $(container).find(".totleNum").find("b").html("0");
            $(container).find(".totlePrice").html("0.0");
            $(container).find(".goods").hide();
            $(container).find(".nogoods").show();
        }
    });
};

//商品列表页条件选择
app.productfilter = function productfilter() {

    $(".filter_sort a").click(function () {
        $(this).addClass("on").siblings().removeClass("on")
        var sorttype = $(this).attr("_sort");
        //if (sorttype == 1) {
        //    $(this).attr("_sort", 2);
        //}
        //if (sorttype == 2) {
        //    $(this).attr("_sort", 1);
        //}
        if (sorttype == 3) {
            $(this).attr("_sort", 4);
            $(this).find("i").removeClass("sort_down").addClass("sort_up");
        }
        if (sorttype == 4) {
            $(this).attr("_sort", 3);
            $(this).find("i").removeClass("sort_up").addClass("sort_down");
        }
        //if (sorttype == 5) {
        //    $(this).attr("_sort", 6);
        //}
        //if (sorttype == 6) {
        //    $(this).attr("_sort", 5);
        //}
        buildurl();
    });
    $(".select_list li").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        buildurl();
    })
    var url = window.location.href;
    var queryString = url.substring(url.indexOf("?") + 1, url.length);
    if (queryString.length > 0) {
        var parm = queryString.split("&");
        $.each(parm, function (index, item) {
            var parmkey = item.split("=")[0];
            var parmvalue = item.split("=")[1];
            if (parmkey == "sorttype") {
                var _this = $(".filter_sort a[_sort='" + parmvalue + "']");
                $(_this).addClass("on");
                if (parmvalue == 3 || parmvalue == 4) {
                    $(_this).addClass("price");
                }
            }
            if (parmkey == "filter") {
                var filtervalues = parmvalue.split(",");
                $.each(filtervalues, function (index, item) {
                    $.each($(".select_list li"), function (k, v) {
                        if ($(v).attr("_valueid") == item) {
                            $(v).addClass("selected").siblings().removeClass("selected");
                        }
                    })
                })
            }
        })
    }
};

//是否已登录
app.isLogIn = function isLogIn(callback) {
    $.get("/handler/islogin" + "?r=" + Math.random(), function (data) {
        callback(data);
    })
}

//切换分类
app.changeCategory = function changeCategory() {
    var showcategory = $.cookie('showcategory');
    if (showcategory == "true" || showcategory == null) {
        $(".catalogs-list").addClass("block");
    } else {
        $(".catalogs-list").removeClass("block");
    }
    $(".catalogs-title").click(function () {
        if ($(".catalogs-list").hasClass("block")) {
            $(".catalogs-list").removeClass("block");
            $(".catalogs-list").hide();
            $.cookie("showcategory", "false", { expires: 0, path: '/' });
        } else {
            $(".catalogs-list").addClass("block");
            $(".catalogs-list").show();
            $.cookie("showcategory", "true", { expires: 7, path: '/' });
        }
    })
}

function buildurl() {
    var linkurl = "";
    var sorttype = "sorttype=0";
    var filter = "";
    var keyword = GetQueryString('keyword');

    var filterlist = $(".select_list li:.selected");

    filterlist.each(function () {
        if ($(this).attr("_valueid")) {
            filter += $(this).attr("_valueid") + ",";
        }
    })

    if ($(".filter_sort a:.on").attr("_sort")) {
        sorttype = "sorttype=" + $(".filter_sort a:.on").attr("_sort");
        linkurl += sorttype;
    }

    if (filter.length > 0) {
        linkurl += "&filter=" + filter.substring(0, filter.lastIndexOf(","));
    }

    if (keyword != null && keyword != undefined)
        linkurl += "&keyword=" + keyword;

    window.location.href = "?" + linkurl;
};

function getdata(url, container) {

    $.get(url, function (data) {

        if (data) {

            $(container).html(data);

            var divfloorlength = $("div.floor.wrap.loadfloor").length;
            var divfloor = $("div.floor.wrap.loadfloor");

            $.each(divfloor, function (index, item) {
                var floor = $(item).children(".floor-title").children("h2").children("a").children("i").text();

                if (floor.length > 0)
                    $(item).children(".floor-title").children("h2").children("a").children("i").text("F" + (index + 1));
            });
        }
    })
};

// 获取url地址参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
};

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

app.init = function () {
    app.ismobile();
    app.floorscroll(".loadfloor", 0);
    $(window).scroll(function () {
        app.floorscroll(".loadfloor", 0);
    });
    app.initLayout("/Handler/InitLayOut");
    //app.changecity();
    app.getusername();
    app.getuserecoupon();
    app.referCart();
    app.logout(".logout");
}