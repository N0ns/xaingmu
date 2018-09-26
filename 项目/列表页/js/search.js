var SearchUrl = "http://search.yiguo.com";
function loaditem(content) {
    $("#shelper").html("");
    $.each(content, function (i, item) {
        $("#shelper").append("<li id='searchitem" + i + "' title='" + item + "'><div class='search-item'><strong>" + item + "</strong></div><div class='search-count'></div></li>");
    });

    $("#shelper").append("<li class='searchitemclose'>关闭</li>");

    $("#shelper").show();
}

$(function () {

    var url = window.location.href;
    var queryString = url.substring(url.indexOf("?") + 1, url.length);
    if (queryString.length > 0) {
        var parm = queryString.split("&");
        $.each(parm, function (index, item) {
            var parmkey = item.split("=")[0];
            var parmvalue = item.split("=")[1];

            if (parmkey == "keyword")
                $("#keyword").val(decodeURI(parmvalue));
        });
    }

    //var keyword = "";
    var cache = {};

    $("#keyword").keyup(function (event) {

        var code = event.keyCode || event.which;

        if (code == "13") {

            $(".search-btn").click();
        }
        else {
            var _keyword = $("#keyword").val();

            $("#shelper").html("");

            if (_keyword == '') {
                //keyword = "";
                $("#shelper").hide();
                $("#shelper").html("");
                return;
            }

            if (cache[_keyword] != null) {
                loaditem(cache[_keyword]);
            }
            else {
                //if (_keyword != keyword) {
                //    keyword = _keyword;
                if (cache[_keyword] == null) {
                    $.getJSON(SearchUrl + "/ajax/fullsearch.ashx" + "?datestamp=" + new Date().getTime() + "&term=" + _keyword + "&jsoncallback=?", function (msg, status, xhr) {

                        if (msg.length > 0) {
                            cache[_keyword] = msg;
                            loaditem(cache[_keyword]);
                        }
                        else {
                            $("#shelper").hide();
                            $("#shelper").html("");
                            return;
                        }
                    });
                    //}
                    //else {
                    //    loaditem(cache[keyword]);
                    //}
                }
            }
        }
    });

    $(document).on("click", ".searchitemclose", function () {
        $("#shelper").hide();
        $("#shelper").html("");
    });

    $(document).on('click', '#shelper li', function (event) {
        $("#keyword").val($(this).children(".search-item").children("strong").html());

        var k = $.trim($("#keyword").val());
        if (k.length == 0) return;
        k = encodeURIComponent(k);
        window.location = SearchUrl + "?keyword=" + k;
    });


    //$(".search-bar").mouseout(function () {
    //    $("#shelper").hide();
    //    $("#shelper").html("");
    //});

    $(document).on('mouseover mouseleave', '#shelper li', function (event) {
        if (event.type == 'mouseover') {
            $("#shelper").show();
            $(this).css("background", "rgb(255,223,198) none repeat scroll 0% 0%");
        }
        else if (event.type == 'mouseleave')
            $(this).css("background", "rgb(255,255,255) none repeat scroll 0% 0%");
    });

    $(document).on('mouseleave', '#shelper', function (event) {
        
        if (event.target.id != 'shelper' && event.target.id != 'searchitem0')
            $("#shelper").hide();
    });


    $(".search-btn").click(function () {

        var k = $.trim($("#keyword").val());

        k = k.replace(/<|>/g, "");

        k = k.substr(0, 20);

        if (k == "输入商品名／编号／拼音") {
            alert('请输入有效的关键词！');
            return;
        }
        if (k.length == 0) return;
        if (checkRedirect(k)) return;
        k = encodeURIComponent(k);
        window.location = SearchUrl + "?keyword=" + k;
    });

    function checkRedirect(voucher) {
        //储值卡，
        var reg1 = /a20\d{8}/gi;
        var reg1Result = reg1.exec(voucher);
        if (reg1Result) {
            //alert(reg1Result);
            window.location = httpUrlYouYueHui2012 + "/ChuZhiKa.aspx?flag=yes&cardid=" + reg1Result;
            return true;
        }
        var reg2 = /13\d{8}/gi;
        var reg2Result = reg2.exec(voucher);
        if (reg2Result) {
            //alert(reg2Result);
            window.location = httpUrlYouYueHui2012 + "/ChuZhiKa.aspx?flag=yes&cardid=" + reg2Result;
            return true;
        }
        //抵用卡[礼品卡]
        var reg3 = /DYK\d{8}/gi;
        var reg3Result = reg3.exec(voucher);
        if (reg3Result) {
            //alert(reg3Result);
            window.location = httpUrlYouYueHui2012 + "/UseGiftCard.aspx?CardCode=" + reg3Result;
            return true;
        }
        //提货券
        var reg4 = /thq\d{8}/gi;
        var reg4Result = reg4.exec(voucher);
        if (reg4Result) {
            //alert(reg4Result);
            window.location = httpUrlYouYueHui2012 + "/OnlineDelivery.aspx?VoucherCode=" + reg4Result;
            return true;
        }
        var reg5 = /DBS\d{8}/gi;
        var reg5Result = reg5.exec(voucher);
        if (reg5Result) {
            //alert(reg5Result);
            window.location = httpUrlYouYueHui2012 + "/OnlineDelivery.aspx?VoucherCode=" + reg5Result;
            return true;
        }
        return false;
    }
})