//lijun 2015-5-5
(function ($) {
    G.app.CartController = {
        callback: function (d, func, options) {
            if (func != null && $.isFunction(func)) {
                func(d, options);
            } else {
                G.app.cart.callbackEvent.defaultCallback(d);
            }
        },
        CallbackRefresh: function (o, commodityId) {
            if (o.MsgSuccess == "1") {
                var ary = G.app.CartController.selectedComIds(commodityId);
                $.get("/ShopCart/AjaxShopCartList", { datestamp: new Date().getTime() }, function (d) {
                    $(".cart .cart-list").html(d);
                    G.app.CartController.reSelected(ary);
                });
            } else {
                G.alert.warn(o.MsgBody);
                //windows.location = G.logic.constants.urlShoppingCart;
            }
        },
        callbackreload: function () {
            window.location = G.logic.constants.urlShoppingCart;
        },
        //购物车添加满额换购商品
        AddHg: function (PromotionsId) {
            $.ajax({
                url: "/AjaxCart/CheckHg",
                type: "POST",
                data: "PromotionsId=" + PromotionsId + "&date=" + new Date().toDateString(),
                success: function (msg) {
                    if (msg == "1") {
                        G.app.cart.Facade.addToCartManEHuanGou(this, PromotionsId, 1);
                    }
                    else {
                        G.alert.warn('条件不满足！');
                        return;
                    }
                },
                error: function (error) {
                    G.alert.warn(error);
                }
            });
        },
        deleteInShopCart: function (commodityId) {
            G.ui.popup.showMsg("确定删除此商品？", { okFn: function () { G.app.CartController.DeleteCommodity(this, commodityId, G.app.CartController.callbackreload); }, btns: 3, okText: "删除", cancelText: "取消" });
            //var s = "确定删除此商品？";
            //if (confirm(s)) {
            //    G.app.CartController.DeleteCommodity(this, commodityId, G.app.CartController.CallbackRefresh);
            //}
        },
        RemoveMultiCommodity: function () {
            var commodityIds = "";
            var isAll = true;
            $(".cart-list tr[class!='zp']").find("td.cart-t-check").find("input").each(function (i, o) {
                if ($(o).attr("checked")) {
                    var comid = $(o).attr("comid");
                    if (commodityIds == "") {
                        commodityIds = comid;
                    } else {
                        commodityIds += "," + comid;
                    }
                } else {
                    isAll = false;
                }
            });
            if (isAll) {
                G.app.CartController.ClearAll("确定删除选中的商品吗？");
                return;
            }
            if (commodityIds == "") {
                G.alert.warn("没有选中删除的商品！");
                return;
            }
            G.ui.popup.showMsg("确定删除选中的商品吗？", {
                okFn: function () { G.app.CartController.RemoveMulti(commodityIds) },
                btns: 3,
                okText: "删除",
                cancelText: "取消"
            });
        },
        RemoveMulti: function (commodityIds) {
            G.app.CartController.DeleteMultiInShopCart(this, commodityIds, G.app.CartController.callbackreload);
        },
        ClearAll: function (msg) {
            if (!msg) {
                msg = "确定清空购物车？";
            }
            G.ui.popup.showMsg(msg, { okFn: function () { G.app.cart.module.clearAll(this, G.app.CartController.callbackreload); }, btns: 3, okText: "确定", cancelText: "取消" });
            
        },
        AddInShopCart: function (commodityId, sOperate, sType, func) {//在购物车页面+-update商品
            $.getJSON(G.logic.constants.urlAddShopCartHandler + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { CommodityId: commodityId, Operate: sOperate, Type: sType }, function (d) {
                G.app.CartController.callback(d, func, commodityId);
            });
        },
        UpdateEManInShopCart: function (o, PromotionId, num, func) {//修改购物车页面的额满商品数量。ajax刷新页面
            $.getJSON(G.logic.constants.urlAddShopCartHandler + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { "CommodityId": PromotionId, "Operate": num, "Type": 3 }, function (d) {
                G.app.CartController.callback(d, func, PromotionId);
            });
        },
        DeleteCommodity: function (o, commodityId, func) {//购物车删除商品。ajax刷新页面
            $.getJSON(G.logic.constants.urlAddShopCartHandler + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { "CommodityId": commodityId, "Type": 2 }, function (d) {
                G.app.CartController.callback(d, func);
            });
        },
        DeleteMultiInShopCart: function (o, commodityIds, func) {//购物车删除选中的商品。ajax刷新页面
            $.getJSON(G.logic.constants.urlAddShopCartHandler + "?datestamp=" + new Date().getTime() + "&jsoncallback=?", { "CommodityId": commodityIds, "Type": 102 }, function (d) {
                G.app.CartController.callback(d, func);
            });
        },
        alterInShopCart: function (commodityId, type) {
            if (commodityId.split("|")[0] == "D9551614-C26F-4444-BCBA-C523452B46AC") {
                G.alert.warn("已超过商品数量上限！");
                return;
            }
            if (commodityId.split("|")[0] == "048777AD-8B0B-480C-8E78-522EDD095CBB") {
                G.alert.warn("特殊商品不能修改包装数量！");
                return;
            } //保温盒不能修改
            if (commodityId.split("|")[0] == "235E834E-A1E8-4A7B-88FD-D5BDB5D41D61" || commodityId.split("|")[0] == "C7E54572-FA21-45A3-8DD5-724BA010DDF5" || commodityId.split("|")[0] == "80304C99-7B6F-4665-A695-46B79D821386") {
                G.alert.warn("特殊商品不能修改数量！");
                var oldnum = $(document.getElementById(commodityId)).attr("oldnum");
                document.getElementById(commodityId).value = oldnum;
                return;
            }

            var ctype = commodityId.split("|")[1];
            if (ctype == "15") {
                G.alert.warn("试吃商品不能修改！");
                return;
            }

            if (type == "+") {
                var oldnum = $(document.getElementById(commodityId)).attr("oldnum");
                if (oldnum >= 99) {
                    G.alert.warn('商品数量过大！');
                    return;
                }

                var protype = commodityId.split("|")[1];
                if (protype == "3") {
                    G.alert.warn('赠送商品不能修改');
                    return;
                }

                if (protype == "11") {//ms
                    G.alert.warn('活动商品不能修改');
                    var oldnum = $(document.getElementById(commodityId)).attr("oldnum");
                    document.getElementById(commodityId).value = oldnum;
                    return;
                }

                if (protype == "9") {
                    G.alert.warn('抢先购商品不能修改');
                    return;
                }

                if (protype == "30") {
                    G.alert.warn('赠送商品不能修改！');
                    return;
                }
                if (protype == "31") {
                    G.alert.warn('充值送商品不能修改！');
                    return;
                }

                if (protype == "4") {

                    var oldnum = $(document.getElementById(commodityId)).attr("oldnum");
                    var num = document.getElementById(commodityId).value;

                    if (!G.util.validation.checknumber(num)) {
                        G.alert.warn('您输入的格式不正确!');
                        document.getElementById(commodityId).value = oldnum;
                        return;
                    }
                    if (num > 99) {
                        G.alert.warn('商品数量过大，请重新输入！');
                        document.getElementById(commodityId).value = oldnum;
                        return;
                    }

                    var amount = parseFloat(document.getElementById(commodityId).value);
                    var PromotionsID = commodityId.split("|")[0];
                    var amount = amount + 1;
                    var msg = G.app.CartController.CheckHg(PromotionsID, amount);
                    if (msg == "1") {
                        G.app.CartController.UpdateEManInShopCart(this, commodityId, amount, G.app.CartController.CallbackRefresh);
                    }
                    else if (msg == "3") {
                        G.alert.warn('赠送商品不能修改数量！');
                    } else if (msg == "4") {
                        G.alert.warn('已超过最大换购数量！');
                    }
                    else {
                        G.alert.warn('已超过换购条件！');
                        return;
                    }
                } else {
                    G.app.CartController.AddInShopCart(commodityId, "add", '3', G.app.CartController.CallbackRefresh);
                }
            }
            else if (type == "-") {

                var protype = commodityId.split("|")[1];
                if (protype == "3") {
                    G.alert.warn('赠送商品不能修改');
                    return;
                }
                if (protype == "30") {
                    G.alert.warn('赠送商品不能修改！');
                    return;
                }
                if (protype == "31") {
                    G.alert.warn('充值送商品不能修改！');
                    return;
                }
                var num = document.getElementById(commodityId).value;


                if (num == "1") {
                    G.app.CartController.deleteInShopCart(commodityId);
                }
                else {
                    G.app.CartController.AddInShopCart(commodityId, "cur", '3', G.app.CartController.CallbackRefresh);
                }
            }
            else {//this
                var protype = commodityId.split("|")[1];
                if (protype == "3") {
                    G.alert.warn('赠送商品不能修改');
                    return;
                }
                if (protype == "11") {
                    G.alert.warn('活动商品不能修改');
                    var oldnum = $(document.getElementById(commodityId)).attr("oldnum");
                    document.getElementById(commodityId).value = oldnum;
                    return;
                }
                if (protype == "9") {
                    G.alert.warn('抢先购商品不能修改');
                    return;
                }
                if (protype == "30") {
                    G.alert.warn('赠送商品不能修改！');
                    return;
                }
                if (protype == "31") {
                    G.alert.warn('充值送商品不能修改！');
                    return;
                }

                var oldnum = $(document.getElementById(commodityId)).attr("oldnum");
                var num = document.getElementById(commodityId).value;

                if (!G.util.validation.checknumber(num)) {
                    G.alert.warn('您输入的格式不正确!');
                    document.getElementById(commodityId).value = oldnum;
                    return;
                }
                if (num > 99) {
                       G.alert.warn('商品数量过大，请重新输入！');
                       document.getElementById(commodityId).value = oldnum;
                       return;
                }

                if (protype == "4") {
                    var amount = num;
                    var PromotionsID = commodityId.split("|")[0];
                    var msg = G.app.CartController.CheckHg(PromotionsID, (amount - oldnum));
                    if (msg == "1") {
                        G.app.CartController.UpdateEManInShopCart(this, commodityId, amount, G.app.CartController.CallbackRefresh);
                    }
                    else if (msg == "3") {
                        G.alert.warn('赠送商品不能修改数量！');
                    } else if (msg == "4") {
                        G.alert.warn('已超过最大换购数量！');
                    }
                    else {
                        G.alert.warn('已超过换购条件！');
                        return;
                }
                } else {
                    G.app.CartController.AddInShopCart(commodityId, num, '3', G.app.CartController.CallbackRefresh); //Operate=修改数
                }
            }
        },
        CheckHg: function (PromotionsID, num) {
            var msg = "99";
            $.ajax({
                url: "/AjaxCart/CheckHg",
                type: "POST",
                async: false,
                data: "promotionsId=" + PromotionsID + "&num=" + num + "&date=" + new Date().toDateString(),
                success: function (o) {
                    msg = o;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    G.alert.error(textStatus || errorThrown);
                }
            });
            return msg;
        },
        Init: function () {
            G.app.CartController.DelTmpProducts("tmpProducts");
            $(".chkAll").click(function () {
                var chk = $(this).attr("checked");
                if (chk) {
                    $(".chkAll").attr("checked", "checked");
                    $(".cart-list :checkbox").attr("checked", "checked");
                } else {
                    $(".chkAll").removeAttr("checked");
                    $(".cart-list :checkbox").removeAttr("checked");
                }
                G.app.CartController.UpdatePanel();
            });
            $(".cart-list :checkbox").live("click", function (event) {
                var o = event.target;
                var selected = $(o).attr("checked");
                if (selected) {
                    if (G.app.CartController.isSelectedAll()) {
                        $(".chkAll").attr("checked", "checked");
                    }
                } else {
                    $(".chkAll").removeAttr("checked");
                }

                G.app.CartController.UpdatePanel();
            });
            $("#btnSubmit").click(function () {
                return G.app.CartController.SubmitValidate();
            });
        },

        isSelectedAll: function () {
            var temp = true;
            if ($(".cart-list :checkbox").size() == 0) return false;
            $(".cart-list :checkbox").each(function (i, o) {
                if (!$(o).attr("checked")) {
                    temp = false;
                    return;
                }
            });
            return temp;
        },

        UpdatePanel: function () {
            if (G.app.CartController.isSelectedAll()) {
                $(".chkAll").attr("checked", "checked");
            }
            var total = 0.00;
            var ub = 0;
            //$(".cart-list .cart-table tr[class!='zp']").each(function (i, o) {
            //    var cb = $(o).find("td.cart-t-check").find("input").attr("checked");
            //    if (cb) {
            //        var u = $(o).find("td.cart-t-ub").html();
            //        var t = $(o).find("td.cart-t-total").find("span").html();
            //        if (u != "") {
            //            ub += parseInt(u);
            //        }
            //        total += parseFloat(t);
            //    }
            //});

            $(".cart-list .cart-table").each(function (i, o) {
                var cb = $(o).find("tr td.cart-t-check").find("input");
                if (cb && $(cb).attr("checked")) {
                    var u = $(o).find("td.cart-t-ub").html();
                    var t = $(o).find("td.cart-t-total").find("span").html();
                    if (u != "") {
                        ub += parseInt(u);
                    }
                    total += parseFloat(t);
                }
            });


            $(".cart-footer span.ub em").html(ub);
            $(".cart-footer span.fs14 em span").html(G.app.CartController.changeTwoDecimal_f(total));
        },

        selectedComIds: function (commodityId) {
            var aryCommodityId = [];

            //$(".cart-list .cart-table tr[class!='zp']").each(function (i, o) {
                //var cb = $(o).find("td.cart-t-check").find("input").attr("checked");
                //if (cb) {
                //    var commId = $(o).find("td.cart-t-check").find("input").attr("comid");
                //    aryCommodityId.push(commId);
                //}
            //});

            $(".cart-list .cart-table").each(function (i, o) {
                var cb = $(o).find("tr td.cart-t-check").find("input");
                if (cb && $(cb).attr("checked")) {
                    var commId = $(o).find("td.cart-t-check").find("input").attr("comid");
                    aryCommodityId.push(commId);
                }
            });


            if (commodityId) {
                if (!G.util.validation.isInArray(aryCommodityId, commodityId)) {
                    aryCommodityId.push(commodityId);
                }
            }
            //zp
            $(".cart-list .cart-table tr[class='zp']").each(function (i, o) {
                var main = $(o).siblings("tr[class!='zp']").first();
                var mainComId = main.find("td.cart-t-check").find("input").attr("comid");
                if (G.util.validation.isInArray(aryCommodityId, mainComId)) {
                    var commId = $(o).find("td.cart-t-check").find("span").html();
                    aryCommodityId.push(commId);
                }
            });
            return aryCommodityId;
        },
        hasNoselectedComIds: function () {
            var hasNo = false;
            $(".cart-list .cart-table tr[class!='zp']").each(function (i, o) {
                var cb = $(o).find("td.cart-t-check").find("input").attr("checked");
                if (!cb) {
                    hasNo = true;
                    return;
                }
            });
            return hasNo;
        },

        reSelected: function (aryCommodityId) {
            $(".cart-list .cart-table tr[class!='zp']").each(function (i, o) {
                var temp = $(o).find("td.cart-t-check").find("input")
                var commId = temp.attr("comid");
                if (G.util.validation.isInArray(aryCommodityId, commId)) {
                    temp.attr("checked", "checked");
                } else {
                    temp.removeAttr("checked");
                    $(".chkAll").removeAttr("checked");
                }
            });

            G.app.CartController.UpdatePanel();
        },

        SubmitValidate: function () {
            //if ($("#theInsulationCan label :radio").size() > 0) {
            //    G.alert.warn("您的购物车中含有冷冻商品，请选择您的保温箱。");
            //    return;
            //}

            var c = G.app.CartController;
            var cartString = "";
            //没有选中的商品
            var SelectedCommIds = c.selectedComIds(false);
            if (SelectedCommIds.length <= 0) {
                G.alert.warn("没有选中的商品，请选择要采购的商品！");
                return;
            } else {
                cartString = SelectedCommIds.join("&");
                //console.log(cartString);
            }
            G.app.Loading.open();
            //验证areaid
            var cookieCity = G.util.cookie.get('CityCSS');
            var aryCookie = cookieCity.split('&');//.["AreaId"];
            var areaId = '';
            for (var i = 0; i < aryCookie.length; i++) {
                if (aryCookie[i].split('=')[0].indexOf('AreaId') >= 0) {
                    areaId = aryCookie[i].split('=')[1];
                    break;
                }
            }
            if (areaId.length > 0 && areaId != "other")//全国其它城市在此暂时不做验证，放在结单验证
            {
                var areacode = "";
                $.ajax({
                    url: "/AjaxCart/EqualAreaCode",
                    type: "POST",
                    dataType: "text",
                    data: "areaid=" + areaId + "&cartString=" + encodeURIComponent(cartString) + "&date=" + new Date().toDateString(),
                    async: false,
                    success: function (msg) {
                        areacode = msg;
                    },
                    error: function () {
                        G.app.Loading.close();
                    }
                });
                if (areacode.indexOf("|") > 0) {
                    var areacodeId = areacode.split("|")[1];
                    var areacodeFlag = areacode.split("|")[0];
                    if (areacodeFlag == "2") {
                        G.alert.warn(areacodeId);
                        G.app.Loading.close();
                        return;
                    }
                }
            }
			
			var flag="";
			$.ajax({
                url: "/AjaxCart/CheckDZX",
                type: "POST",
                dataType: "text",
			    data: "cartString=" +encodeURIComponent(cartString) + "&date=" +new Date().toDateString(),
                async: false,
                success: function (d) {
                    if (d== "1")
                    {
						flag="1";
						G.app.Loading.close();
                        $(".dazhaxie").show();
						return ;
					}                    
				},
                error: function (XMLHttpRequest, textStatus, errorThrown) {


                }
			});
			if(flag=="1")
			{
				return;
				
			}
			
            //todo:login
            $.ajax({
                url: "/AjaxCart/HasLogin",
                type: "POST",
                dataType: "text",
                data: "cartString=" + encodeURIComponent(cartString) + "&date=" + new Date().getTime(),
                async: false,
                success: function (d) {
                    G.app.Loading.close();
                    if (d == "0") {
                        //$("#theLogin").show();
                        window.location.href = G.DOMAIN.login + "?Url=" + G.DOMAIN.cart;
                        return;
                    }
                    if (1 == 1 || c.hasNoselectedComIds()) {
                        $("#SelectedCommIds").val(SelectedCommIds.join("&"));
                        var tmpCookieVal = $("#SelectedCommIds").val();
                        c.AddTmpProducts(tmpCookieVal);
                    }
                    _smq.push(['custom', 'index', '结算']);
                    //if (d == "1") {
                        window.location.href = G.logic.constants.urlCheckout1;
                    //} else {
                    //    window.location.href = G.logic.constants.urlCheckout1;
                    //}
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    G.app.Loading.close();
                    G.ui.popup.showMsg(textStatus || errorThrown, "2", $.noop);
                    return;
                }
            });
			
        },
        changeTwoDecimal_f: function (x) {
            var f_x = parseFloat(x);
            if (isNaN(f_x)) {
                G.alert.warn('function:changeTwoDecimal->parameter error');
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
        },
        AddTmpProducts: function (val) {
            G.util.cookie.add("tmpProducts", val, null, 0, ".yiguo.com");
        },
        DelTmpProducts: function () {
            G.util.cookie.del("tmpProducts");
        }
    };
    G.app.CartController.Init();
})(jQuery);


