var common = common || {};

//倒计时
common.countDown = function () {
    var list = [],
        interval;

    return function (id, time) {
        if (!time || time <= 0) return "";
        if (!interval)
            interval = setInterval(run, 1000);
        list.push({ ele: document.getElementById(id), time: time });
    };

    function run() {
        for (var i = 0; i < list.length; i++) {
            list[i].ele.innerHTML = getTimerString(list[i].time ? list[i].time -= 1 : 0);
            if (!list[i].time)
                list.splice(i--, 1);
        }
    };

    function getTimerString(time) {
        var not0 = !!time,
            d = Math.floor(time / 86400),
            h = numStr(Math.floor((time %= 86400) / 3600)),
            m = numStr(Math.floor((time %= 3600) / 60)),
            s = numStr(time % 60);

        if (not0)
        {
            if (h <= 0)
            {
               // console.log("m:" + m + "s:" + s);
                if (m == "00" && s == "01")
                {
                    setInterval(function () { window.location.reload();}, 2000);
                }
                return "<span>00</span>：<span>"+m+"</span>：<span>"+s+"</span>";
            }
            return h + ":" + m + ":" + s;
        }
        else return "";
    };

    function numStr(n) {
        if (isNaN(n)) return n;
        if (n < 10) n = "0" + n;
        return n;
    };

}();

common.stringFormat = function (result, args) {
    if (args.length > 0) {
        for (var i = 0; i < args.length; i++) {
            if (args[i] != undefined) {
                var reg = new RegExp("({)" + i + "(})", "g");
                result = result.replace(reg, args[i]);
            }
        }
    }
    return result;
};

//全选
common.checkall = function (obj, eleclass) {
    var $obj = $(obj),
        container = $("." + eleclass).find("input[type=checkbox]");
    if ($obj.length > 0 && $obj.hasClass("j_checkall") && container.length > 0) {
        if ($obj.prop("checked")) {
            container.each(function () {
                $(this).prop("checked", true);
            });
        } else {
            container.each(function () {
                $(this).prop("checked", false);
            });
        }
    }
};


//分页
common.pagePlugins = function() {
    var pagenumSize = 5, //<< 1,2,3,4,5... >>
        pageData = {
            Index: 0,
            PageSize: 5,
            Count: 0,
            PagesCount: 0
        },
        template = "<div class='paging-num'>&nbsp;<a href='javascript:void(0);' class='j_pageopt' data-index='previous' >上一页</a>&nbsp;{2}" +
            "<a href='javascript:void(0);' class='j_pageopt' data-index='nextpage'>下一页</a></div><div class='paging-total'>共 {0}页</div>" +
            "<div class='paging-form'><span>到第</span><input class='j_pageval' type='text' value='{1}'><span>页</span><button class='j_pagebtn'>确定</button></div>";

    return {
        setCurrentPage: function(param) {
            pageData = param;
        },
        init: function(id, param, fn) {
                pageData = param;
                var ele = $("#" + id);
            if (ele.length > 0 && pageData.Index >= 0 && pageData.Index < pageData.PagesCount) {
                var result = getHtml(pageData.Index, pageData.PageSize, pageData.Count, pageData.PagesCount);
                if (result !== null && result !== "") {
                    ele.html(result);
                    bindEvent(ele, fn);
                }
                ele.show();
            } else {
                ele.hide();
            }
        }
    };

    function getHtml(index, pageSize, count, pagesCount) {
        var html = "",
            a = "<a href='javascript:void(0);' class='j_pageopt' data-index='{0}'>{1}</a>&nbsp;",
            current = "<a class='this j_pageopt' href='javascript:void(0);' data-index='{0}'>{1}</a>&nbsp;",
            halfSize = Math.floor(pagenumSize / 2),
            pageindex = index + 1;
        if (pageindex <= 0 || pagesCount < pageindex || count === 0) return "";
        if (pagesCount <= pagenumSize) {
            for (var i = 1; i <= pagesCount; i++) {
                if (i == pageindex) html += common.stringFormat(current, [i - 1, i]);
                else html += common.stringFormat(a, [i - 1, i]);
            }
        } else if (pagesCount - pageindex < halfSize) {
            for (i = pagesCount - (pagenumSize - 1) ; i <= pagesCount; i++) {
                if (i == pageindex) html += common.stringFormat(current, [i - 1, i]);
                else html += common.stringFormat(a, [i - 1, i]);
            }
        } else {
            if (pageindex <= halfSize) {
                for (i = 1; i <= pagenumSize; i++) {
                    if (i == pageindex) html += common.stringFormat(current, [i - 1, i]);
                    else html += common.stringFormat(a, [i - 1, i]);
                }
            } else {
                for (i = pageindex - halfSize; i <= pageindex + halfSize; i++) {
                    if (i == pageindex) html += common.stringFormat(current, [i - 1, i]);
                    else html += common.stringFormat(a, [i - 1, i]);
                }
            }
        }
        html = common.stringFormat(template, [pagesCount, pageindex, html]);
        return html;
    }

    function bindEvent(ele, applyDate) {
        if (ele.hasClass("j_bind")) return;
        else ele.addClass("j_bind");
        ele.on("click", ".j_pageopt", function () {
            var index = $(this).data("index");
            if (index === "previous")
                pageData.Index -= 1;
            else if (index === "nextpage")
                pageData.Index += 1;
            else pageData.Index = index;

            if (pageData.Index < 0) {
                pageData.Index = 0;
                return;
            } else if (pageData.Index >= pageData.PagesCount) {
                pageData.Index = pageData.PagesCount - 1;
                return;
            } else {
                applyDate(pageData);
            }
        });

        ele.on("click", ".j_pagebtn", function () {
            var obj = ele.find(".j_pageval");
            var index = obj.val() - 1;
            if (obj.length > 0 && !isNaN(obj.val())) {
                index = index < 0 ? 0 : index >= pageData.PagesCount ? pageData.PagesCount - 1 : index;
                pageData.Index = index;
                applyDate(pageData);
            }
        });
    }
}();



//兼容ie的现实placeholder属性
common.placeholder = function (container) {
    //判断浏览器是否支持placeholder属性
    var supportPlaceholder = 'placeholder' in document.createElement('input'),
        placeholder = function (input) {
        var text = input.attr('placeholder'),
        defaultValue = input.defaultValue;
        if (!defaultValue) {
            input.val(text).addClass("gray");
        }
        input.focus(function () {
            if (input.val() == text) {
                $(this).val("");
            }
        });

        input.blur(function () {
            if (input.val() == "") {
                $(this).val(text).addClass("gray");
            }
        });
        //输入的字符不为灰色
        input.keydown(function () {
            $(this).removeClass("gray");
        });
    };

    //当浏览器不支持placeholder属性时，调用placeholder函数
    if (!supportPlaceholder) {
        $(container).find('input').each(function() {
            if ($(this).attr("type") == "text" && $(this).attr("placeholder")) {
                placeholder($(this));
            }
        });
        if ($(container).is("textarea") && $(container).attr("placeholder")) {
            placeholder($(container));
        }

    }
};



//验证手机号,规则1开头的11位数字
common.check_mobile = function (m) {
    if (m === "" || m === undefined) return false;
    //if (isNaN(m)) return false;
    //var re = /^1\d{10}$/;
    if (/^((1[0-9]{1})+\d{9})$/.test(m) || /^\d{3}\*\*\*\*\d{4}$/.test(m)) return true;
    else return false;

};

/**
 * 验证电话号码，带"(,),-"字符和数字其他不通过
 * 
 * @param str
 * @returns {Boolean}
 */
common.check_tel = function (str) {
    if (str.length > 20) {
        return false;
    }
    var patternStr = "(0123456789-*)";
    var strlength = str.length;
    for (var i = 0; i < strlength; i++) {
        var tempchar = str.substring(i, i + 1);
        if (patternStr.indexOf(tempchar) < 0) {
            return false;
        }
    }
    if (strlength >= 4 && str.indexOf("*") > -1) {
        if (!((new RegExp(/.*\*\*\*\*$/).test(str) && (strlength - str.indexOf("*")) < 5) || (new RegExp(/^\d{11}$/).test(str) || new RegExp(/^\d{3}\*\*\*\*\d{4}$/).test(str)))) {
            return false;
        }
    }
    return true;
};

/**
 * 检查邮箱格式
 * @param email
 * @returns {Boolean}
 */
common.check_email = function(email) {
    if (email) {
        var myReg = /(^\s*)\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s*$)/;
        if (!myReg.test(email)) {
            return false;
        }
        return true;
    }
    return false;
};


/**
 * 检查身份证格式
 * @param email
 * @returns {Boolean}
 */
common.check_idcard = function (id) {
    if (id) {
        var myReg = /^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
        if (!myReg.test(id)) {
            return false;
        }
        return true;
    }
    return false;
};

/**
 * 检查是否含有非法字符
 * @param temp_str
 * @returns {Boolean}
 */
common.is_forbid = function(tempStr) {
    tempStr = trimTxt(tempStr);
    tempStr = tempStr.replace('*', "@");
    tempStr = tempStr.replace('--', "@");
    tempStr = tempStr.replace('/', "@");
    tempStr = tempStr.replace('+', "@");
    tempStr = tempStr.replace('\'', "@");
    tempStr = tempStr.replace('\\', "@");
    tempStr = tempStr.replace('$', "@");
    tempStr = tempStr.replace('^', "@");
    tempStr = tempStr.replace('.', "@");
    tempStr = tempStr.replace(';', "@");
    tempStr = tempStr.replace('<', "@");
    tempStr = tempStr.replace('>', "@");
    tempStr = tempStr.replace('"', "@");
    tempStr = tempStr.replace('=', "@");
    tempStr = tempStr.replace('{', "@");
    tempStr = tempStr.replace('}', "@");
    var forbidStr = new String('@,%,~,&');
    var forbidArray = new Array();
    forbidArray = forbidStr.split(',');
    for (i = 0; i < forbidArray.length; i++) {
        if (tempStr.search(new RegExp(forbidArray[i])) != -1)
            return false;
    }
    return true;

    //正则
    function trimTxt(txt) {
        return txt.replace(/(^\s*)|(\s*$)/g, "");
    }
};



/** 
* 判断包含汉字的字符传的长度到底是多少来着;按照一个汉字 
* 是两个字节来计算;
* @param String str 所要进行判断的字符传;
* @return int 字符长度
*/
common.getBytesLength = function (str) {
    var length = 0,
        result = $.trim(str);
    if (result == null || result == "") return length;
    for (var i = 0; i < result.length; i++) {
        var iCode = result.charCodeAt(i);
        if ((iCode >= 0 && iCode <= 255) || (iCode >= 0xff61 && iCode <= 0xff9f)) {
            length += 1;
        } else {
            length += 2;
        }
    }
    return length;
};


/** 
* 是否是数字
*/
common.isNaN = function (str) {
    if (str == null || str === '') {
        return true;
    }
    return isNaN(str);
};


common.getCookie = function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};

common.setCookie = function(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};


//商品飞一会
common.cartMagic = function ($) {
    //a标签  .btn-buy
    var cart = $(".shopping-cart");


    function init(img) {

        if (img != null && img.length > 0 && cart != null && cart.length > 0) {
            var flyElm = img.clone().css('opacity', 1);
            $('body').append(flyElm);
            flyElm.css({
                'z-index': 9000,
                'display': 'block',
                'position': 'absolute',
                'top': img.offset().top + 'px',
                'left': img.offset().left + 'px',
                'width': img.width() + 'px',
                'height': img.height() + 'px',
                '': '',
                'border': '3px solid #fff',
                'background': '#fff'
            });
            return flyElm;
        }
    }

    return {
        fly: function (o) {
            var btn = $(o),
                img = btn.closest(".j_product").find('img.j_product_img:visible:first');
            if (img == undefined || img.length <= 0) {
                return;
            }
            var flyElm = init(img);
            flyElm.animate({
                width: '40px',
                height: '40px'
            }, 800);
            flyElm.animate({
                top: cart.offset().top,
                left: cart.offset().left,
                width: 40,
                height: 40
            }, 800, function() {
                flyElm.remove();
                //$(".s-c-list-w").fadeIn("0")//.delay(2000).fadeOut("1000");
                ////console.log($(".s-c-list-w").hasClass("ishover"));
                //if (!$(".s-c-list-w").is(":hidden")) {
                //    setTimeout("is_hover()", 2000);
                //}
            });
        },
        fadeIn: function() {
            var shopinglist = $('.shopping-list');
            if (shopinglist && shopinglist.length > 0) {
                shopinglist.fadeIn("0").delay(2000).fadeOut("1000");
            }
        }
    };
}(jQuery);