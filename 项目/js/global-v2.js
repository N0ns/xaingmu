//v2.0 2015-4-29 Lee 
//通用js存放处，修改请添加备注
$.extend($, {
    strlen: function (a) {
        if (typeof a != "string") {
            return 0
        }
        return a.replace(/[^-ÿ]/gi, "xx").length
    }
});

var G = {};
G.app = {};
G.ui = {};
G.util = {};
G.logic = {};
G.domain = ".yiguo.com";
G.test = false;
G.test.domain = ".yiguo.com";
G.DOMAIN = {
    www: "http://www" + G.domain,
    onecart: "http://onecart01" + G.domain,
    cart: "http://cart" + G.domain,
    trade: "http://trade" + G.domain,
    utaste: "http://utaste" + G.domain,
    search: "http://search" + G.domain,
    sso: "http://utaste" + G.domain,
    static: "http://static" + G.domain,
    static01: "http://static01" + G.domain,
    img01: "http://img01" + G.domain,
    img02: "http://img02" + G.domain,
    img03: "http://img03" + G.domain,
	home: "http://home" + G.domain,
    login: "https://login" + G.domain
};
G.DOMAIN.test = {
    www: "http://localhost:56667",
    onecart: "http://localhost:52035/",
    cart: "http://testdev.yiguo.com:8803/",
    trade: "http://trade" + G.domain,
    utaste: "utaste" + G.domain,
    sso: "http://localhost:64231",
    search: "search" + G.domain,
    static: "static" + G.domain,
    static01: "http://static01" + G.domain,
    img01: "img01" + G.domain,
    img02: "img02" + G.domain,
    img03: "img03" + G.domain,
	home: "http://testdev.yiguo.com:8801",
    login: "http://testdev.yiguo.com:8807/"
};


G.logic.constants = {
    urlAjaxHandle: (G.test ? G.DOMAIN.test.onecart : G.DOMAIN.onecart) + "/Scripts/AjaxHandle.aspx",//暂时只处理收藏外.登录之类的，从OneCart移除.
    urlJsonpcallback: (G.test ? G.DOMAIN.test.onecart : G.DOMAIN.onecart) + "/Scripts/JsonpCallback.aspx",
    urlAddShopCartHandler: (G.test ? G.DOMAIN.test.onecart : G.DOMAIN.onecart) + "/Ajax/AddShopCartHandler.ashx",

    urlShoppingCart: (G.test ? G.DOMAIN.test.cart : G.DOMAIN.cart) + "/ShopCart",
    urlCheckout: (G.test ? G.DOMAIN.test.cart : G.DOMAIN.cart) + "/Orderinfo.aspx",
    urlCheckout1: (G.test ? G.DOMAIN.test.trade : G.DOMAIN.trade) + "/OrderInfo/index",

    urlMyBooks: (G.test ? G.DOMAIN.test.utaste : G.DOMAIN.utaste) + "/MyBooks.aspx",
    urlCommodityDetail: (G.test ? G.DOMAIN.test.www : G.DOMAIN.www) + "/CommodityDetail.aspx",
    login: (G.test ? G.DOMAIN.test.sso : G.DOMAIN.sso) + "/ub/login.aspx",
	home: (G.test ? G.DOMAIN.test.home : G.DOMAIN.home)
};

G.util.cookie = {
    get: function (b) {
        var c = new RegExp("(^|;|\\s+)" + b + "=([^;]*)(;|$)");
        var a = document.cookie.match(c);
        return (!a ? "" : decodeURIComponent(a[2]))
    },
    add: function (c, b, h, a, g) {
        var f = c + "=" + encodeURIComponent(b) + "; path=" + (h || "/") + (g ? ("; domain=" + g) : "");
        if (a > 0) {
            var i = new Date();
            i.setTime(i.getTime() + a * 1000);
            f += ";expires=" + i.toGMTString()
        }
        document.cookie = f
    },
    del: function (a, b) {
        document.cookie = a + "=;path=/;" + (b ? ("domain=" + b + ";") : "") + "expires=" + (new Date(0)).toGMTString()
    }
};
G.util.token = {
    addToken: function (b, f) {
        var d = this.getToken();
        if (b == "" || (b.indexOf("://") < 0 ? location.href : b).indexOf("http") != 0) {
            return b
        }
        if (b.indexOf("#") != -1) {
            var a = b.match(/\?.+\#/);
            if (a) {
                var c = a[0].split("#"),
					g = [c[0], "&g_tk=", d, "&g_ty=", f, "#", c[1]].join("");
                return b.replace(a[0], g)
            } else {
                var c = b.split("#");
                return [c[0], "?g_tk=", d, "&g_ty=", f, "#", c[1]].join("")
            }
        }
        return d == "" ? (b + (b.indexOf("?") != -1 ? "&" : "?") + "g_ty=" + f) : (b + (b.indexOf("?") != -1 ? "&" : "?") + "g_tk=" + d + "&g_ty=" + f)
    },
    getToken: function () {
        var a = new Date().getTime(),
			b = a == null ? "" : this.time33(a);
        return b
    },
    time33: function (d) {
        for (var b = 0, a = d.length, c = 5381; b < a; ++b) {
            c += (c << 5) + d.charAt(b).charCodeAt()
        }
        return c & 2147483647
    }
};
G.util.ajax = {
    post: function (url, data, func) {
        this.innerAjax(url, "post", data, func, false);//默认同步
    },
    postSF: function (url, data, func) {//服务框架返回json调用方式
        this.innerAjaxSF(url, "post", data, func, false);//默认同步
    },
    asyncPost: function (url, data, func) {
        this.innerAjax(url, "post", data, func, true);
    },
    syncPost: function (url, data, func) {
        this.innerAjax(url, "post", data, func, false);
    },
    innerAjax: function (url, type, data, func, async) {
        $.ajax({
            url: url,
            type: type,
            async: async && true,
            data: data,
            dataType: "json",//统一json
            success: function (d) {
                func(d);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                G.ui.popup.showMsg("请求超时，请稍后重试！" , "2", $.noop);
                return;
            }
        });
    },
    innerAjaxSF: function (url, type, data, func, async) {//服务框架返回json调用方式
        $.ajax({
            url: url + "?datestamp=" + new Date().getTime(),
            type: type,
            async: async && true,
            data: data,
            dataType: "json",//统一json
            success: function (d) {
                if (d.ReturnState == 3) {
                    func(d);
                } else {
                    G.ui.popup.showMsg(d.ReturnMsg, 2, $.noop);
                    return;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                G.ui.popup.showMsg("请求超时，请稍后重试！", "2", $.noop);
                return;
            }
        });
    }
}

G.ui.popup = {
    showMsg: function (msg) {
        var success = msg.Success;
        var code = msg.MsgCode;
        var Name = msg.MsgName;
        var value = msg.MsgValue;
        var title = msg.MsgTitle;
        var body = msg.MsgBody;
        if (success) {
            G.alert.right(body);
        } else {
            G.alert.warn(body);
        }

    }
};

//cart相关
G.app.cart = {};

//cart相关的所有回调函数
G.app.cart.callbackEvent = {
    //默认回调事件处理
    defaultCallback: function (o) {
        G.alert.warn(o.MsgBody);
    },
    AddGanBing_Callback: function (d) {
        if (d.MsgSuccess == "1") {
            //商品详细页操作成功后处理直接跳转至购物车
            window.location = G.logic.constants.urlShoppingCart;
        } else {
            G.ui.popup.showMsg(d.MsgBody);
        }
    },
    ManEHuanGou_Callback: function (d) {
        if (d.MsgSuccess == "0") {
            G.alert.error(d.MsgBody);
        } else {
            window.location = G.logic.constants.urlShoppingCart;
        }
    },
    ShopCartData_Home: function (data) {//data=List<ShopCartModel> json Serialize string

    },
    ShopCartCount: function (d) {//d=Count
        //todo:页面处理
        //return d;
    },
    //首页回调事件处理
    add_home: function (d,o) {
        if (d.MsgSuccess != 0) {
            if (o != undefined) {
                if (o.tagName == "AREA") {
                    common.cartMagic.fadeIn();
                } else if (o == "") {
                    G.modal.right(d.MsgBody);
                } else {
                    common.cartMagic.fly(o);
                }
            } else {
                G.modal.right(d.MsgBody);
            }
        } else {
            G.modal.right(d.MsgBody);
        }

        app.referCart();
    },
    //列表页回调事件处理
    list: function (o) { },
    //详情页回调事件处理
    item: function (o) { },
    //todo:其它页面需要的回调事件处理
    deleteOne_CallBack: function (o) {
            app.referCart();
    }
};


//兼容旧活动
G.app.itemDetail = {
    doPurchaseListJ3: function (o, commodityCode, num) {
        G.app.cart.Facade.addToCart_Home(o, commodityCode, num);
    },
    doPurchaseInDetailPageJ2: function (o, promotionsId, num) {
        G.app.cart.module.addToCartCombination(o, promotionsId, num, app.referCart);
    }
};




//购物车外部调用
G.app.cart.Facade = {
    //首页扩展
    addToCart1_Home: function (o, commodityId) {//o=this,

        G.app.cart.Facade.addToCart_Home(o, commodityId, 1, G.app.cart.callbackEvent.add_home);
    },
    addToCart_Home: function (o, commodityCode, num) {
        G.app.cart.module.addToCart(o, commodityCode, num, G.app.cart.callbackEvent.add_home);
    },

    addToCart_Ids: function (o, commodityIds) {
        if (commodityIds == null || commodityIds == "") {
            util.Dialog.alert("商品已下架!");
            return false;
        }
        G.app.cart.module.addToCartMulti(o, commodityIds, G.app.cart.callbackEvent.add_home);
    },
    //添加干冰
    addToCart1_GanBing: function (o, commodityId) {
        G.app.cart.module.addToCart2(o, commodityId, 1, G.app.cart.callbackEvent.AddGanBing_Callback);
    },
    addToCartManEHuanGou: function (o, PromotionId, num) {
        G.app.cart.module.addToCartManEHuanGou(o, PromotionId, num, G.app.cart.callbackEvent.ManEHuanGou_Callback);
    },
    //首页异步获取ShopCartData,其它页面按此扩展
    getShopCartData_Home: function () {
        G.app.cart.Facade.getShopCartData(G.app.cart.callbackEvent.ShopCartData_Home);
    },
    getShopCartData: function (func) {//自定义func请放入：G.app.cart.callbackEvent
        G.app.cart.module.getShopCartData(func);
    },
    getShopCartCount: function (func) {
        G.app.cart.module.getShopCartCount(func);//eg:func=G.app.cart.callbackEvent.ShopCartCount
    },
    //todo:其它页面需要的回调事件处理
    delOne_Callback: function (d) {
        if (d.MsgSuccess == "1") {
            //todo:删除后回调处理事件.
        } else {
            G.ui.popup.showMsg(d);
        }
    },
    deleteShopCartData: function (o, commodityId) {
        G.app.cart.module.delOne(o, commodityId, G.app.cart.callbackEvent.deleteOne_CallBack);
    }

}

G.app.cart.module = (function () {
    //加购物车回调函数
    var _private = {
        callback: function (d, func, o) {
            if (func != null && $.isFunction(func)) {
                func(d, o);
            } else {
                G.app.cart.callbackEvent.defaultCallback(d);
            }
        },
        clearAll: function (o, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "ClearAll" }, function (d) {
                _private.callback(d, func, o);
            });
        },
        delOne: function (o, commodityId, func) {//删除易果小购物车商品
            $.getJSON(G.logic.constants.urlAddShopCartHandler + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { CommodityId: commodityId, Type: '2' }, function (d) {
                _private.callback(d, func, o);
            });
        },
        //加购物车commodityCode,可用于普通,特惠，买即送
        addToCart: function (o, commodityCode, num, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddToCartList", "commodityCode": commodityCode, "num": num }, function (d) {
                _private.callback(d, func, o);
            });
        },
        //加购物车commodityId,可用于普通,特惠，买即送
        addToCart2: function (o, commodityId, num, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddToCartList", "commodityId": commodityId, "num": num }, function (d) {
                _private.callback(d, func, o);
            });
        },
        //加多个商品入购物车commodityIds=commodityId,commodityId,commodityId,一次加多个商品,可用于普通,特惠，买即送. 
        addToCartMulti: function (o, commodityIds, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddMultiToCartList", "commodityId": commodityIds }, function (d) {
                _private.callback(d, func, o);
            });
        },
        //加多个商品入购物车ids=F336FCC0-EF69-4785-8560-2EB55FC90A92|1|1,3A2F4102-7B68-4CCD-80D3-43FBDCCCAD42|1|1.（addToCartMulti不能满足的需求才使用）
        addToCartMultiComplex: function (ids, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddMultipleToCart1", "commodityIds": ids }, function (d) {
                _private.callback(d, func);
            });
        },
        //积分兑换|换购
        addToCartExchanged: function (o, pointExchangeId, num, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddExchangedToCart", PointExchangeId: pointExchangeId, Num: num }, function (d) {
                _private.callback(d, func, o);
            });
        },
        //组合特惠
        addToCartCombination: function (o, promotionsId, num, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddZHTHToCart", PromotionsId: promotionsId, Num: num }, function (d) {
                _private.callback(d, func, o);
            });
        },
        //秒杀(MS)
        addToCartMS: function (o, groupbuyid, num, func) {//GroupBuyId=SecKillId_ActivityPeriodId
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddGroupBuy", "GroupBuyId": groupbuyid, "num": num }, function (d) {
                _private.callback(d, func, o);
            });
        },
        //团购砍价
        addToCartTg: function (o, groupbuyid, num, func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddTuangou", "GroupBuyId": groupbuyid, "num": num }, function (d) {
                _private.callback(d, func,o);
            });
        },
        //额满
        addToCartManEHuanGou: function (o, PromotionId, num, func) {//InShopCart 加额满。[成功跳转到购物车]
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddToCart", "commodityId": PromotionId, "num": num, "type": 4 }, function (d) {
                _private.callback(d, func, o);
            });
        },

        //GetShopCartData  只能作为js跨域调用
        getShopCartData: function (func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "GetShopCartData" }, function (d) {
                _private.callback(d, func);//d=List<ShopCartModel> json Serialize string ，func处理界面UI回调
            });
        },
        //购物车商品数量 只能作为js跨域调用
        getShopCartCount: function (func) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "getShopCartCount" }, function (d) {
                _private.callback(d.Count, func); //d.Count=购物车数量，func处理界面UI回调
            });
        },

        //预订商品【单件】
        addToCartBook: function (o, commodityId, num) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddToBookCart", "commodityId": commodityId, "num": num }, function (d) {
                if (d.MsgSuccess == "1") {
                    //商品详细页操作成功后处理直接跳转至后台预订页面
                    window.location = G.logic.constants.urlMyBooks;
                } else {
                    G.ui.popup.showMsg(d);
                }
            });
        },
        //预订商品【多件】commodityIds=F336FCC0-EF69-4785-8560-2EB55FC90A92|1|1,3A2F4102-7B68-4CCD-80D3-43FBDCCCAD42|1|1
        addToCartMultiBook: function (commodityIds) {
            $.getJSON(G.logic.constants.urlJsonpcallback + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { operate: "AddMultipleToBookCart", "commodityIds": commodityIds }, function (d) {
                if (d.MsgSuccess == "1") {
                    //商品详细页操作成功后处理直接跳转至购物车
                    window.location = G.logic.constants.urlMyBooks;
                } else {
                    G.ui.popup.showMsg(d);
                }
            });
        },
        //收藏
        addToFavor: function (a, type) {//收藏类别1.商品收藏2.视频收藏4.菜谱8.养生文章,默认=1
            $.getJSON(G.logic.constants.urlAjaxHandle + "?datestamp=" + new Date().getTime() + "&callback=?", {
                operate: "AddCollection",
                CommodityId: a,
                type: type
            }, function (c) {
                if (c.result == "1") {
                    G.alert.right("收藏成功！");
                } else if (c.result == "2") {
                    G.alert.warn("您还尚未登录，请先登录！");
                } else if (c.result == "3") {
                    G.alert.warn("您之前已经收藏过该商品！");
                } else {
                    G.alert.error("收藏失败！");
                }
            });
        }
    };
    return {
        callback: function (d, func,o) {
            _private.callback(d, func,o);
        },
        clearAll: function (o, func) {
            _private.clearAll(o, func);
        },
        //根据commodityId删除，在func里面处理回调后的显示.
        delOne: function (o, commodityId, func) {
            _private.delOne(o, commodityId, func);
        },
        //加购物车commodityCode,可用于普通,特惠，买即送
        addToCart: function (o, commodityCode, num, func) {
            _private.addToCart(o, commodityCode, num, func);
        },
        //加购物车commodityId,可用于普通,特惠，买即送
        addToCart2: function (o, commodityId, num, func) {
            _private.addToCart2(o, commodityId, num, func);
        },
        //加多个商品入购物车commodityIds=commodityId,commodityId,commodityId,一次加多个商品,可用于普通,特惠，买即送. 
        addToCartMulti: function (o, commodityIds, func) {
            _private.addToCartMulti(o, commodityIds, func);
        },
        //加多个商品入购物车ids=F336FCC0-EF69-4785-8560-2EB55FC90A92|1|1,3A2F4102-7B68-4CCD-80D3-43FBDCCCAD42|1|1.（addToCartMulti不能满足的需求才使用）
        addToCartMultiComplex: function (ids, func) {
            _private.addToCartMultiComplex(ids, func);
        },
        //积分兑换|换购
        addToCartExchanged: function (o, pointExchangeId, num, func) {
            _private.addToCartExchanged(o, pointExchangeId, num, func);
        },
        //组合特惠
        addToCartCombination: function (o, promotionsId, num, func) {
            _private.addToCartCombination(o, promotionsId, num, func);
        },
        //秒杀(MS)
        addToCartMS: function (o, groupbuyid, num, func) {////GroupBuyId=SecKillId_ActivityPeriodId
            _private.addToCartMS(o,groupbuyid, num, func);
        },
        //团购砍价
        addToCartTg: function (o, groupbuyid, num, func) {
            _private.addToCartTg(groupbuyid, num, func);
        },
        //额满
        addToCartManEHuanGou: function (o, PromotionId, num, func) {
            _private.addToCartManEHuanGou(o, PromotionId, num, func);
        },
        //GetShopCartData  只能作为js跨域调用
        getShopCartData: function (func) {
            _private.getShopCartData(func);
        },
        //购物车商品数量 只能作为js跨域调用
        getShopCartCount: function (func) {
            _private.getShopCartCount(func);
        },
        //预订商品【单件】
        addToCartBook: function (o, commodityId, num) {
            _private.addToCartBook(o, commodityId, num);
        },
        //预订商品【多件】commodityIds=F336FCC0-EF69-4785-8560-2EB55FC90A92|1|1,3A2F4102-7B68-4CCD-80D3-43FBDCCCAD42|1|1
        addToCartMultiBook: function (commodityIds) {
            _private.addToCartMultiBook(commodityIds);
        },
        //收藏
        addToFavor: function (a, type) {
            _private.addToFavor(a, type);
        }

    }
}());

G.util.validation = {
    checknumber2: function (s) {
        if (G.util.validation.trimTxt(s) == "") {
            return false;
        }
        var Letters = "1234567890";
        var i;
        var c;
        for (i = 0; i < s.length; i++) {
            c = s.charAt(i);
            if (Letters.indexOf(c) == -1) {
                return false;
            }
        }
        return true;
    },
    checknumber: function (n) {
        if (n == null || n == undefined || n == "") return false;

        var Letters = "1234567890";
        var i;
        var c;
        for (i = 0; i < n.length; i++) {
            c = n.charAt(i);
            if (Letters.indexOf(c) == -1) {
                return false;
            }
        }
        return true;
    },
    trimTxt: function (txt) {
        return txt.replace(/(^\s*)|(\s*$)/g, "");
    },
    isInArray: function (ary, o) {
        if (o) {
            var ii = ary.length;
            while (ii--) {
                if (ary[ii] == o) {
                    return true;
                }
            }
            return false;
        }
        return false;
    },
    checkAmount: function (c, d) {
        if (c.size() > 0) {
            var a = c.val();
            var b = /^[1-9]\d{0,2}$/g;
            if (!a || !a.match(b)) {
                c.val(1);
                alert("输入的数量有误,应为[1-999]");
                return false
            }
            if (d && a < d) {
                c.val(d);
                alert("购买的数量不能低于:" + d);
                return false
            }
        }
        return true
    },

    inputOnlyNum: function (c, b, a) {
        c.value = c.value.replace(/\D+/g, "");
        if (c.value > a) {
            c.value = a
        }
        if (c.value < b) {
            c.value = b
        }
    },

    checkURL: function (b) {
        var a = /^(https?:\/\/|ftp:\/\/)?(([a-z0-9\-]*\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;\/]*)?)?(#[a-z][a-z0-9+_\-\.%=&amp;\/]*)?$/i;
        return a.test(b)
    },
    checkMobilePhone: function (b) {
        var a = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/;
        return a.test(b)
    },
    checkEmail: function (a) {
        return /^[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)$/i.test(a)
    },
    checkTelephone: function (d, a) {
        var c = /^([0-9]{3}|0[0-9]{3})-[1-9][0-9]{6,7}(-[0-9]{1,6})?$/,
            b = /^[0-9]{4}-([0-9]{3}|0[0-9]{3})-[0-9]{7,8}$/,
            a = a || (1 | 2);
        if (((a & 1) == 1) && c.test(d)) {
            return true
        }
        if (((a & 2) == 2) && b.test(d)) {
            return true
        }
        return false
    },
    checkPhone: function (a) {
        return this.checkTelephone(a) || this.checkMobilePhone(a)
    },
    checkNumber: function (a) {
        return /^[1-9]\d*$/.test(a)
    },
    checkChars: function (c, a) {
        var b = "^[";
        a = a || (1 | 2 | 4);
        if ((a & 1) == 1) {
            b += "一-龥"
        }
        if ((a & 2) == 2) {
            b += "a-zA-Z"
        }
        if ((a & 4) == 4) {
            b += "0-9"
        }
        b += "]*$";
        return (new RegExp(b, "")).test(c)
    },

    //是否手机号
    isMobile: function (value) {
        return /^((1[0-9]{1})+\d{9})$/.test(value) || /^\d{3}\*\*\*\*\d{4}$/.test(value);
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
G.util.html = {
    /*1.用浏览器内部转换器实现html转码*/
    encode: function (html) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    /*2.用浏览器内部转换器实现html解码*/
    decode: function (text) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
};
G.util.math = (function () {
    Number.prototype.add = function (arg) {

        return dcmAdd(this, arg);

    }

    Number.prototype.sub = function (arg) {

        return dcmSub(this, arg);

    }

    Number.prototype.mul = function (arg) {

        return dcmMul(this, arg);

    }

    Number.prototype.div = function (arg) {

        return dcmDiv(this, arg);

    }

    //浮点数相加
    var dcmAdd = function (arg1, arg2) {

        var r1, r2, m;

        try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }

        try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }

        m = Math.pow(10, Math.max(r1, r2));

        return (dcmMul(arg1, m) + dcmMul(arg2, m)) / m;

    }

    //浮点数相减
    var dcmSub = function (arg1, arg2) {

        return dcmAdd(arg1, -arg2);

    }

    //浮点数相乘
    var dcmMul = function (arg1, arg2) {

        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();

        try { m += s1.split(".")[1].length; } catch (e) { }

        try { m += s2.split(".")[1].length; } catch (e) { }

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);

    }

    //浮点数除
    var dcmDiv = function (arg1, arg2) {

        return dcmMul(arg1, 1 / arg2);

    }

    return {
        add: function (arg1, arg2) {
            return dcmAdd(arg1, arg2);
        },
        sub: function (arg1, arg2) {
            return dcmSub(arg1, arg2);
        },
        mul: function (arg1, arg2) {
            return dcmMul(arg1, arg2);
        },
        div: function (arg1, arg2) {
            return dcmDiv(arg1, arg2);
        },

        //功能：保留2位小数:将浮点数四舍五入，取小数点后2位，如果不足2位则补0,这个函数返回的是字符串的格式 
        //用法：changeTwoDecimal(3.1415926) 返回 3.14 
        //changeTwoDecimal(3.1) 返回 3.10 
        changeTwoDecimal_f: function (x) {
            var f_x = parseFloat(x);
            if (isNaN(f_x)) {
                alert('function:changeTwoDecimal->parameter error');
                return false;
            }
            var f_x = Math.round(x * 100) / 100;
            var s_x = f_x.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        }
    }

}());

G.ui.drag = (function () {
    var l = null;
    var j = null;
    var h = 0;
    var g = 0;
    var m = false;
    var k = false;
    var c = {};

    function f(q) {
        q.stopPropagation();
        q.preventDefault();
        if (!l || !j) {
            return
        }
        var o = $(window).scrollLeft();
        var p = $(window).scrollTop();
        var n = h + q.clientX + o;
        var r = g + q.clientY + p;
        n = Math.min(Math.max(n, o), $(window).width() - $(l).outerWidth() + o);
        r = Math.min(Math.max(r, p), $(window).height() - $(l).outerHeight() + p);
        if (n < 0) {
            n = 0
        }
        if (r < 0) {
            r = 0
        }
        if ($(l).css("position") == "fixed") {
            $(l).offset({
                left: n,
                top: r
            })
        } else {
            $(l).offset({
                left: n,
                top: r
            })
        }
        m = n;
        k = r
    }
    function b(p) {
        p.stopPropagation();
        p.preventDefault();
        if (!l || !j) {
            return
        }
        var n = $(window).scrollLeft();
        var o = $(window).scrollTop();
        h = l.offsetLeft - p.clientX - n;
        g = l.offsetTop - p.clientY - o;
        if ($(l).css("position") == "fixed") {
            h += n;
            g += o
        }
        m = false;
        k = false;
        var q = j && j.setCapture ? j : document;
        $(q).bind("mousemove.moving", f).bind("mouseup.stop", d);
        a(q)
    }
    function d(p) {
        if (!j) {
            return
        }
        var q = j && j.setCapture ? j : document;
        $(q).unbind("mousemove.moving");
        $(q).unbind("mouseup.stop");
        if (typeof c.onstop == "function") {
            c.onstop.apply(j)
        }
        if (c.fixed && m !== false && k !== false) {
            var n = $(window).scrollLeft();
            var o = $(window).scrollTop();
            $(l).fixedPosition({
                fixedTo: "top",
                fixedTop: k < o ? 0 : (k - o),
                fixedLeft: m < n ? 0 : (m - n)
            })
        }
        l = null;
        j = null;
        h = 0;
        g = 0;
        i(q)
    }
    function a(n) {
        if (n.setCapture) {
            n.setCapture()
        } else {
            if (window.captureEvents || document.captureEvents) {
                (window.captureEvents || document.captureEvents)(Event.MouseMove | Event.MouseUp)
            }
        }
    }
    function i(n) {
        if (n.releaseCapture) {
            n.releaseCapture()
        } else {
            if (window.releaseEvents || document.releaseEvents) {
                (window.releaseEvents || document.releaseEvents)(Event.MouseMove | Event.MouseUp)
            }
        }
    }
    return {
        enable: function (p, o, n) {
            if (typeof o == "string") {
                o = $("#" + o).get(0)
            }
            if (typeof p == "string") {
                if (!o) {
                    o = $("#" + p + "_head").get(0)
                }
                p = $("#" + p).get(0)
            }
            if (!p || !o) {
                return
            }
            c = n || {};
            $(o).mousedown(function (q) {
                l = p;
                j = o;
                b(q)
            })
        }
    }
})();

G.ui.droplist = {
    attach: function () { }
};

G.ui.modal = (function () {
    var a = null;
    return {
        create: function (c, b) {
            var d = null;
            if (!c) {
                d = a && a.length > 0 ? a : $('<iframe src="javascript:void(0)"></iframe>').css({
                    opacity: 0,
                    background: "#000",
                    left: "0",
                    display: "none",
                    zIndex: 1100,
                    top: "0",
                    position: "absolute"
                });
                d.css({
                    width: $(window).width() + "px",
                    height: $(window).height() + "px"
                });
                d.appendTo($("body")).show();
                if (b) {
                    d.fixedPosition({
                        fixedTo: "top",
                        fixedTop: 0,
                        fixedLeft: 0
                    })
                } else {
                    d.css({
                        left: $(window).scrollLeft(),
                        top: $(window).scrollTop()
                    })
                }
            } else {
                d = $('<iframe style="z-index:-1;width:' + $(c).innerWidth() + "px;height:" + $(c).innerHeight() + 'px" src="javascript:void(0)" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>').css({
                    opacity: 0,
                    background: "#FFF",
                    left: "0",
                    top: "0",
                    position: "absolute"
                });
                d.appendTo(c)
            }
            return d
        }
    }
})();

G.ui.popup = {
    _cssLoaded: false,
    _loadCss: function () {
        if (this._cssLoaded) {
            return
        }
        this._cssLoaded = true;
        var a = G.DOMAIN.static01 + "/common/popup/package_v1.css";
        var b = false;
        $("link").each(function () {
            if ($(this).attr("href") == a) {
                b = true;
                return false
            }
        });
        if (!b) {
            $('<link href="' + a + '" rel="stylesheet" type="text/css" charset="utf-8" />').appendTo($("head"))
        }
    },
    _zIndex: 1101,
    create: function (b) {
        this._loadCss();
        var j = null,
			h = null,
			f = b || {},
			g = f.height > 50;
        f.width = f.width || 500;
        f.fixed = f.fixed === false ? false : true;
        var c = $('<div style="box-shadow:2px 2px 4px rgba(0, 0, 0, 0.5);z-index:' + (++this._zIndex) + ";" /*+ (g ? ("height:" + f.height + "px") : "")*/ + ";width:" + f.width + 'px;" class="layer_global"><div class="layer_global_main"><div class="layer_global_title"><h3><span class="jian">&gt;</span>' + (f.title || "温馨提示") + '<span></span></h3><button title="关闭" ytag="84777"><span class="none">?</span></button></div><div class="layer_global_cont layer_cont_15"></div></div></div>');
        c.appendTo($("body"));
        if (f.fixed) {
            c.fixedPosition({
                fixedTo: "top"
            })
        }
        j = c.find(".layer_global_main .layer_global_title")[0];
        h = c.find(".layer_global_main .layer_global_cont")[0];
        if (b.contWidth == "30") {
            $(h).removeClass("layer_cont_15").addClass("layer_cont_30")
        }
        function i(k) {
            c.mIframe = G.ui.modal.create(k, c.ifFixedPosition())
        }
        function d(l, n) {
            if (null == l) {
                l = c.width()
            }
            if (null == n) {
                n = c.height()
            }
            var o = $(window).width(),
				k = $(window).height();
            var q = (f.fullscreen && o < l ? 0 : (o / 2 - l / 2)),
				m = (f.fullscreen && k < n ? 0 : (k / 2 - n / 2));
            if (c.ifFixedPosition()) {
                c.fixedPosition({
                    fixedTo: "top",
                    fixedLeft: q,
                    fixedTop: m
                })
            } else {
                c.css("left", $(window).scrollLeft() + q + "px");
                c.css("top", $(window).scrollTop() + m + "px")
            }
            if (f.fullscreen && !c.mDiv) {
                var p = $("<div></div>").css({
                    opacity: 0.05,
                    background: "#000",
                    display: "none",
                    zIndex: 1101,
                    //width: $(window).width() + "px",
                    //height: $(window).height() + "px"
                    width: "100%",
                    height: "100%"
                }).appendTo("body");
                if (c.ifFixedPosition()) {
                    p.fixedPosition({
                        fixedTo: "top",
                        fixedLeft: 0,
                        fixedTop: 0
                    })
                } else {
                    p.css({
                        left: $(window).scrollLeft(),
                        top: $(window).scrollTop(),
                        position: "absolute"
                    })
                }
                p.show();
                if (!c.ifFixedPosition()) {
                    if ($.browser.msie) {
                        $("html").css({
                            overflow: "hidden"
                        })
                    } else {
                        $("body").css({
                            overflow: "hidden"
                        })
                    }
                }
                c.mDiv = p
            }
            if ($.browser.msie && $.browser.version >= 6 && !c.mIframe) {
                i(f.fullscreen ? null : c)
            }
        }
        function a(k) {
            if (f.fullscreen && c.mDiv) {
                c.mDiv.remove();
                c.mDiv = null;
                if (c.mIframe) {
                    c.mIframe.remove();
                    c.mIframe = null
                }
                if (!c.ifFixedPosition()) {
                    if ($.browser.msie) {
                        $("html").css({
                            overflow: "scroll",
                            "overflow-x": "hidden"
                        })
                    } else {
                        $("body").css({
                            overflow: "scroll",
                            "overflow-x": "hidden"
                        })
                    }
                }
            }
            if (k !== false && $.isFunction(f.closeFn)) {
                f.closeFn.apply(null)
            }
            c.hide()
        }
        $(j).children("button").click(a);
        !f.disableDrag && G.ui.drag.enable(c.get(0), j, {
            fixed: c.ifFixedPosition()
        });
        if (g) {
            d(f.width, g ? f.height : 300)
        } else {
            a()
        }
        return {
            onclose: function (k) {
                f.closeFn = k
            },
            close: a,
            hide: a,
            show: function () {
                c.show();
                d()
            },
            paint: function (k) {
                if (!$.isFunction(k)) {
                    return
                }
                var l = {
                    header: j,
                    content: h
                };
                return k.apply(c, [l])
            },
            setAtCenter: d,
            resize: function (k) {
                if (!$.isPlainObject(k)) {
                    return
                }
                if (k.width) {
                    c.css("width", k.width + "px")
                }
                if (k.height > 50) {
                    c.css("height", k.height + "px");
                    $(h).height(k.height - 50)
                }
                d()
            },
            resizeNoCenter: function (k) {
                if (!$.isPlainObject(k)) {
                    return
                }
                if (k.width) {
                    c.css("width", k.width + "px")
                }
                if (k.height > 50) {
                    c.css("height", k.height + "px");
                    $(h).height(k.height - 50)
                }
            }
        }
    },
    _msgPopup: null,
    showMsg: function (d) {
        var a = arguments,
			b = a[1] || {};
        if ($.type(b) != "object") {
            b = {};
            $.each({
                1: "type",
                2: "okFn",
                3: "closeFn",
                4: "cancelFn",
                5: "okText",
                6: "cancelText"
            }, function (g, f) {
                if (a[g] != null) {
                    b[f] = a[g]
                }
            });
            if (b.okText && b.cancelText) {
                b.btns = 3
            }
        }
        if (!this._msgPopup) {
            this._msgPopup = G.ui.popup.create({
                title: "提示",
                width: 500,
                height: 170,
                fullscreen: 1
            })
        }
        var c = {
            1: "warn",
            2: "error",
            3: "right"
        };
        if (!(b.type in c)) {
            b.type = 1
        }
        if (!$.isArray(d)) {
            d = [d]
        }
        b.btns = b.btns || 1;
        this._msgPopup.paint((function (f) {
            return function (g) {
                $(g.content).empty().html(' <div class="layer_global_mod">	<b class="icon icon_msg4 icon_msg4_' + c[b.type] + '"></b>' + (d.length >= 1 ? ('<h4 class="layer_global_tit">' + d[0] + "</h4>") : "") + "	" + (d.length >= 2 ? ("<p>" + d[1] + "</p>") : "") + (d.slice(2, d.length).join("")) + '	<div class="wrap_btn"><a class="btn_strong" href="#" onclick="return false">' + (b.okText || "确定") + '</a> <a class="btn_common" href="#" onclick="return false">' + (b.cancelText || "取消") + "</a></div>	</div>");
                $(".wrap_btn .btn_strong", g.content).click(function () {
                    var h = true;
                    if ($.isFunction(b.okFn)) {
                        h = b.okFn() !== false
                    }
                    if (h) {
                        f.hide(false)
                    }
                })[(b.btns & 1) ? "show" : "hide"]();
                $(".wrap_btn .btn_common", g.content).click(function () {
                    var h = true;
                    if ($.isFunction(b.cancelFn)) {
                        h = b.cancelFn() !== false
                    }
                    if (h) {
                        f.hide(false)
                    }
                })[(b.btns & 2) ? "show" : "hide"]();
                f.show()
            }
        })(this._msgPopup));
        this._msgPopup.onclose($.isFunction(b.closeFn) ? b.closeFn : $.noop);
        return this._msgPopup
    }
};

(function (h) {
    var f = {},
		c = 0,
		b = null,
		a = function () {
		    if (b === null) {
		        var i = h('<div style="position: absolute; top: 200px;" class="outer"><div style="position: fixed; top: 100px;" class="inner"></div></div>').appendTo(h("body"));
		        if (h(".inner").get(0).getBoundingClientRect && h(".inner").get(0).getBoundingClientRect().top == h(".outer").get(0).getBoundingClientRect().top) {
		            b = false
		        } else {
		            b = true
		        }
		    }
		    return Boolean(b)
		},
		g = false,
		d = function () {
		    if (g !== false) {
		        return
		    }
		    var j = h("body");
		    var i = G.DOMAIN.static01 + "/common/popup/popup_img/blank.gif";
		    //if (G.prefix.ssl) {
		    //    i = G.prefix.st_ssl + "/static_v1/img/blank.gif"
		    //}
		    if ((j.css("background-image")) == "none") {
		        j.css({
		            "background-image": "url(" + i + ")",
		            "background-attachment": "fixed"
		        })
		    } else {
		        j.css("background-attachment", "fixed")
		    }
		    g = true
		};
    h.fn.ifFixedPosition = function () {
        if (!this.attr("id") || this.attr("id").length == 0) {
            return false
        }
        return !!f[this.attr("id")]
    }, h.fn.fixedPosition = function (i) {
        var j = {
            fixedTo: "bottom",
            fixedTop: 0,
            fixedBottom: 0,
            fixedLeft: false,
            effect: false,
            effectSpeed: 1000
        };
        var i = h.extend(j, i);
        return this.each(function () {
            var k = h(this);
            if (!k.attr("id") || k.attr("id").length == 0) {
                k.attr("id", "positionFixedID" + (c++))
            }
            if (!a()) {
                d();
                var l = "";
                if (i.fixedTo == "top") {
                    l = "$(document).scrollTop()";
                    if (i.fixedTop > 0) {
                        l += "+" + i.fixedTop
                    }
                } else {
                    l = '$(document).scrollTop() - $("#' + k.attr("id") + '").outerHeight() + (document.documentElement.clientHeight || document.body.clientHeight)';
                    if (i.fixedBottom > 0) {
                        l += "-" + i.fixedBottom
                    }
                }
                k.css("position", "absolute");
                if (k.length > 0 && k[0].style && k[0].style.setExpression) {
                    k[0].style.setExpression("top", "eval(" + l + ")")
                } else {
                    k.css("top", (i.fixedTop || 0) + "px")
                }
                if (i.fixedLeft !== false) {
                    k.css("left", h(document).scrollLeft() + (i.fixedLeft - 0) + "px")
                }
            } else {
                k.css("position", "fixed");
                if (i.fixedTo == "top") {
                    k.css("top", (i.fixedTop || 0) + "px")
                } else {
                    k.css("bottom", (i.fixedBottom || 0) + "px")
                }
                if (i.fixedLeft !== false) {
                    k.css("left", i.fixedLeft + "px")
                }
            }
            f[h(this).attr("id")] = 1;
            if (i.effect) {
                switch (i.effect) {
                    case "fadeIn":
                        k.hide().fadeIn(i.effectSpeed);
                        break;
                    case "slideDown":
                        k.hide().slideDown(i.effectSpeed);
                        break
                }
            }
        })
    }
})(jQuery);
G.app.Loading = function () {
    function d() {
        e || (e = G.ui.popup.create({
            title: "正在提交中...",
            width: 500
        }), e.paint(function (c) {
            $(c.content).empty().html('<span class="loading_58_58">正在加载中</span>')
        }));
        return e
    }
    var e = null;
    return {
        open: function () {
            d().show()
        },
        close: function () {
            d().close()
        }
    }
}();
G.alert = (function () {
    var alertWarn = function (warn, func) {
        if (!func) {
            G.ui.popup.showMsg(warn, 1, $.noop);
        }
        else if ($.isFunction(func)) {
            G.ui.popup.showMsg(warn, 1, func);
        } else {
            G.ui.popup.showMsg(warn, 1, $.noop);
        }
    };
    var alertError = function (error, func) {
        if (!func) {
            G.ui.popup.showMsg(error, 2, $.noop);
        }
        else if ($.isFunction(func)) {
            G.ui.popup.showMsg(error, 2, func);
        } else {
            G.ui.popup.showMsg(error, 2, $.noop);
        }
    };
    var alertRight = function (right, func) {
        if (!func) {
            G.ui.popup.showMsg(right, 3, $.noop);
        }
        else if ($.isFunction(func)) {
            G.ui.popup.showMsg(right, 3, func);
        } else {
            G.ui.popup.showMsg(right, 3, $.noop);
        }

    };
    return {
        warn: function (warn, func) {
            alertWarn(warn, func);
        },
        error: function (error, func) {
            alertError(error, func);
        },
        right: function (right, func) {
            alertRight(right, func);
        }
    };
})();


//用户中心弹窗
G.modal = (function () {
    //var alertWarn = function (warn, func) {
    //    if (!func) {
    //        util.Dialog.alert(warn);
    //    }
    //    else if ($.isFunction(func)) {
    //        util.Dialog.alert(warn);
    //    } else {
    //        util.Dialog.alert(warn);
    //    }
    //};
    //var alertError = function (error, func) {
    //    if (!func) {
    //        G.ui.popup.showMsg(error, 2, $.noop);
    //    }
    //    else if ($.isFunction(func)) {
    //        G.ui.popup.showMsg(error, 2, func);
    //    } else {
    //        G.ui.popup.showMsg(error, 2, $.noop);
    //    }
    //};
    var alertRight = function (right, func) {
        if (!func) {
            util.Dialog.alert(right);
        }
        else if ($.isFunction(func)) {
            util.Dialog.alert(right);
        } else {
            util.Dialog.alert(right);
        }

    };
    return {
        //warn: function (warn, func) {
        //    alertWarn(warn, func);
        //}
        //,
        //error: function (error, func) {
        //    alertError(error, func);
        //},
        right: function (right, func) {
            alertRight(right, func);
        }
    };
})();






