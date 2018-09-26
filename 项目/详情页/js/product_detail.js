// JavaScript Document
$(function () {
    $(".pic-big img:gt(0)").hide();
    $(".pic-thumb  .picList li").hover(function () {
        var i = $(".pic-thumb .picList li").index(this);
        $(this).addClass('on').siblings().removeClass('on');
        $(".pic-big img").eq(i).stop(true, true).fadeIn(600).siblings("img").fadeOut(300);
    })
    //$('.recently .p').hover(function(){
    //	$(this).find('.del').show();
    //},function(){
    //	$(this).find('.del').hide();
    //});
    //$('.pro-promo .mz a').click(function () {
    //    $('.pro-promo .mzbox').show();
    //});
    //$('.pro-promo .df a').click(function () {
    //    $('.pro-promo .dfbox').show();
    //});
    //$('.pro-promo .zh a').click(function () {
    //    $('.pro-promo .zhbox').show();
    //});
    $('.pro-promo .promobox .close').click(function () {
        $('.pro-promo .promobox').hide();
    });

    $(".pro-promo li a").click(function () {
        //var index = $(this).closest(".pro-promo").find("li a").index();

        var remark = $(this).closest("li").find("span").text();

        var promobox = $(this).closest(".pro-promo").find(".promobox");
        $.each(promobox, function (index, item) {
            if ($(item).find("p").text().replace("点击收起", "") == remark) {
                $(".promobox").hide();
                $(this).closest(".pro-promo").find(".promobox").eq(index).show();

            }
        })

    });


    $('.detail-tab li').click(function () {
        var i = $('.detail-tab li').index(this);
        $(this).addClass('active').siblings().removeClass('active');
        $('.detail-content .detail-item').eq(i).show().siblings('.detail-item').hide();
        if (i == 1) {

            var hascontent = $("#commenthascontent").attr("checked") == "checked" ? 2 : 0;
            var sort = $("#commontsort").val();
            ReferCommodityVote(0, $("#ProductCommentVote").find("div[_votetype='0']"), hascontent, sort);

        }
    });

    $("#pllabel").click(function () {
        $(".detail-tab li").eq(1).addClass("active").siblings().removeClass('active');
        $("#comment").show().siblings().hide();
        var hascontent = $("#commenthascontent").val();
        var sort = $("#commontsort").val();
        ReferCommodityVote(0, $("#ProductCommentVote").find("div[_votetype='0']"), hascontent, sort);

        $("html,body").animate({ scrollTop: $("#comment").offset().top }, 1000);
    })

    $("#commontsort,#commenthascontent").change(function () {

        var votetype = $(".comment-tab span[class='on']").attr("_votetype");
        var container = $("#ProductCommentVote").find("div[_votetype='" + votetype + "']");
        var hascontent = $("#commenthascontent").attr("checked") == "checked" ? 2 : 0;
        var sort = $("#commontsort").val();
        GetVoteCount(false);
        ReferCommodityVote(votetype, container, hascontent, sort);
    })

    $('.reply-images a').live("click", function () {
        var classItem = $(this).hasClass('select');
        if (classItem == true) {
            $('.reply-image-big').hide();
            $(this).removeClass('select');
        }
        else {
            $(this).addClass('select').siblings('a').removeClass('select');
            $(this).parents('.reply-images').nextAll('.reply-image-big').find("img").attr("src", $(this).find("img").attr("src").replace("thumbnails/100", "thumbnails/470"));
            $(this).parents('.reply-images').nextAll('.reply-image-big').show('fast');
        }
    });
    $('.reply-image-big').click(function () {
        $(this).hide();
        $('.reply-images a').removeClass('select');
    });
    $('.comment-tab span').click(function () {
        $(this).addClass('on').siblings('span').removeClass('on');
        $('.comment-con:eq(' + $(this).index() + ')').show().siblings('.comment-con').hide();
    });
    $('.comment-score .stars b').hover(function () {
        var item = $(this).index();
        $(this).addClass('hover').prevAll('b').addClass('hover');
        $(this).nextAll('b').removeClass('hover')
    }, function () {
        $(this).removeClass('hover').prevAll('b').removeClass('hover');
    });
    $('.comment-score .stars b').click(function () {
        var item = $(this).index();
        $(this).addClass('cur').prevAll('b').addClass('cur');
        $(this).nextAll('b').removeClass('cur')
    });
    $('.recommend .p').hover(function () {
        $(this).find('.add').show();
    }, function () {
        $(this).find('.add').hide();
    });


    GetVoteCount(true);

    $(".comment-tab").find("span").live("click", function () {
        var votetype = $(this).attr("_votetype");
        $(this).addClass("on").siblings().removeClass("on");
        var container = $("#ProductCommentVote").find("div[_votetype='" + votetype + "']");
        var hascontent = $("#commenthascontent").attr("checked") == "checked" ? 2 : 0;
        var sort = $("#commontsort").val();
        ReferCommodityVote(votetype, container, hascontent, sort);
    });




    $("#commentBtn").click(function () {
        app.isLogIn(function (data) {
            if (data == "1") {
                window.location = app.domain.utaste + "/Trade/CommodityVote";
            } else {
                alert("请登录！");
            }
        });
    })

    //蛋糕配件弹框切换
    $('.cakemodal-tab li').click(function () {
        var i = $('.cakemodal-tab li').index(this);
        $(this).addClass('active').siblings().removeClass('active');
        $('.cakemodal-content .cakemodal-item').eq(i).show().siblings('.cakemodal-item').hide();
    });



    $(".btn-cancel").click(function () {
        $(this).closest(".modal").hide();
    })
    $(".btn-confirm").click(function () {
        var commoditys = "";
        var inputs = $(".number-input");

        $.each(inputs, function (index, item) {
            var commodityId = $(item).attr("_data");
            var number = $(item).val();
            if (number > 0) {
                commoditys += commodityId + "|" + number + "|1" + ",";
            }
        })
        commoditys = commoditys.substring(0, commoditys.length - 1);

        var result = G.app.cart.module.addToCartMultiComplex(commoditys, app.referCart);

        $.each(inputs, function (index, item) {
            $(item).val(0);
        });
        $("#tips").html("");
        planteCount = 0; candlesCount = 0; bagsCount = 0; kinfiesCount = 0; tableWaresCount = 0;
        $(this).closest(".modal").hide();
    })


    var planteCount = 0;
    var candlesCount = 0;
    var bagsCount = 0;
    var kinfiesCount = 0;
    var tableWaresCount = 0;
    var productType = $("#productType").val();


    $(".number-add").click(function () {

        var txtinput = $(this).closest(".number").find("input[type='text']");
        var type = $(txtinput).attr("_type");

        var number = Number($(txtinput).val());

        if (type == "G00") {
            if (checkplates(planteCount)) {
                txtinput.val(number += 1);
                planteCount += 1;
            }
        } else if (type == "G01") {
            if (checkNumber(number + 1)) {
                txtinput.val(number += 1);
                candlesCount += 1;
            }
        }
        else if (type == "G03") {
            if (checkNumber(number + 1)) {
                txtinput.val(number += 1);
                tableWaresCount += 1;
            }
        }
        else if (type == "G04") {
            if (checkNumber(number + 1)) {
                txtinput.val(number += 1);
                kinfiesCount += 1;
            }
        }
        else if (type == "G02") {
            if (checkNumber(number + 1)) {
                txtinput.val(number += 1);
                bagsCount += 1;
            }
        }
        buildertips();
    })
    $(".number-reduce").click(function () {
        var txtinput = $(this).closest(".number").find("input[type='text']");
        var type = $(txtinput).attr("_type");

        var number = Number($(txtinput).val());

        if (type == "G00") {
            if (checkplates(number - 1)) {
                txtinput.val(number -= 1);
                planteCount -= 1;
                buildertips();
            }
        } else if (type == "G01") {
            if (checkNumber(number - 1)) {
                txtinput.val(number -= 1);
                candlesCount -= 1;
                buildertips();
            }
        } else if (type == "G03") {
            if (checkNumber(number - 1)) {
                txtinput.val(number -= 1);
                tableWaresCount -= 1;
            }
        } else if (type == "G04") {
            if (checkNumber(number - 1)) {
                txtinput.val(number -= 1);
                kinfiesCount -= 1;
            }
        }
        else if (type == "G02") {
            if (checkNumber(number - 1)) {
                txtinput.val(number -= 1);
                bagsCount -= 1;
            }
        }
        buildertips();
    })

    function checkplates(number) {
        var max = 1;
        if (productType == 1) {
            max = 2;
        }
        if (number < 0 || number < 0)
            return false;
        if (number >= max || number >= max) {
            alert("每份蛋糕免费赠送一枚巧克力牌，不可另买");
            return false;
        }
        return true;
    }

    function checkNumber(number) {
        if (number < 0)
            return false;
        if (number > 99) {
            alert("超出最大购买数");
            return false;
        }
        return true;
    }

    function buildertips() {
        var tips = "";
        if (planteCount > 0)
            tips += planteCount + "枚巧克力牌 ";
        if (candlesCount > 0) {
            tips += candlesCount + "支蜡烛 ";
        }
        if (tableWaresCount > 0) {
            tips += tableWaresCount + "套餐具 ";
        }
        if (kinfiesCount > 0) {
            tips += kinfiesCount + "套刀具 ";
        }

        if (bagsCount > 0) {
            tips += bagsCount + "个保温袋 ";
        }
        $("#tips").html(tips != "" ? "您已选择:" + tips : "");
    }
})

function GetVoteCount(refershPercent) {
    $.get("/product/GetVoteCount", { commodityId: $("#CommodityId").val(), hasContent: $("#commenthascontent").attr("checked") == "checked" ? 2 : 0 }, function (data) {
        if (data) {
            $("#vote_all").html(data.VoteZs);
            $("#vote_hp").html(data.VoteHp);
            $("#vote_zp").html(data.VoteZp);
            $("#vote_cp").html(data.VoteCp);
            $("#vote_st").html(data.VoteSt);
            var hpPercent = data.VoteZs == 0 ? 0 : (data.VoteHp / data.VoteZs) * 100;
            var zpPercent = data.VoteZs == 0 ? 0 : (data.VoteZp / data.VoteZs) * 100;
            var cpPercent = data.VoteZs == 0 ? 0 : (data.VoteCp / data.VoteZs) * 100;
            if (refershPercent) {//是否刷新好评率
                var list = $("#comment .slip").find("li");
                $(list).eq(0).find("span").attr("w", hpPercent.toFixed(0) + "%").css({ "width": hpPercent.toFixed(0) + "%" });
                $(list).eq(0).find("i").html(hpPercent.toFixed(0) + "%");
                $(list).eq(1).find("span").attr("w", zpPercent.toFixed(0) + "%").css({ "width": zpPercent.toFixed(0) + "%" });
                $(list).eq(1).find("i").html(zpPercent.toFixed(0) + "%");
                $(list).eq(2).find("span").attr("w", cpPercent.toFixed(0) + "%").css({ "width": cpPercent.toFixed(0) + "%" });
                $(list).eq(2).find("i").html(cpPercent.toFixed(0) + "%");

                $(".slip li span").each(function () {
                    var o = $(this);
                    var w = o.attr('w');
                    o.next('i').html(w);
                    o.animate({ 'width': w }, 600);
                });
            }
        }
    })
}


function ReferCommodityVote(votetype, container, hascontent, sort) {
    $(container).show().siblings().hide();
    //if (container.html().length > 0) {
    //    return;
    //}
    $.get("/product/CommodityVote", { CommodityId: $("#CommodityId").val(), VoteType: votetype, CurrentIndex: 0, PageSize: 10, HasContent: hascontent, Sort: sort }, function (data) {
        if (data) {
            $(container).html(data);
            var votes = $(container).find("li").find(".comment-item");
            $.each(votes, function (index, item) {
                var _this = item;
                var _voteId = $(item).attr("_voteId");
                var _userId = $(item).attr("_userId");
                $.get("/product/GetVotePicture", { voteId: $(this).attr("_voteid") }, function (pictures) {
                    if (pictures.length > 0) {
                        $.each(pictures, function (index, vote) {
                            $(_this).find(".reply-images").append("<a><img src=\"" + vote.PictrueUrl + "\" width=\"60\" height=\"60\"></a>")
                        })
                    }
                });
                $.get("/product/GetUserInfo", { userId: $(this).attr("_userid") }, function (data) {
                    if (data) {
                        $(_this).find(".name").html(data.UserName);
                        $(_this).find(".level").html(data.UserType);

                        ////用户图片
                        var imgName = data.ImageHost + "www/images/member/";
                        switch (data.UserLevel) {
                            case "1":
                                imgName += "star1.jpg";
                                break;
                            case "2":
                                imgName += "star2.jpg";
                                break;
                            case "3":
                                imgName += "star3.jpg";
                                break;
                            case "4":
                                imgName += "v1.jpg";
                                break;
                            case "5":
                                imgName += "v2.jpg";
                                break;
                            case "6":
                                imgName += "v3.jpg";
                                break;
                            default:
                                imgName += "star1.jpg";
                                break;
                        }
                        $(_this).find(".user").find("img").attr("src", imgName);
                    }
                });
            })
        }
    })
}

function AddViewedCommodity(_commodityname, _CommodityId, _CommodityPicture) {
    var commodityname = _commodityname;
    var CommodityId = _CommodityId;
    var CommodityPicture = _CommodityPicture;
    var allcookies = $.cookie('Viewed');
    var newcookies = "";
    if ($.cookie('Viewed') == null) {
        newcookies += CommodityId + "|" + commodityname + "|" + CommodityPicture;
        $.cookie('Viewed', encodeURIComponent(newcookies), { expires: 7, path: '/', domain: 'yiguo.com' });
    }
    else {
        var product = new Array();
        product = allcookies.split("&");
        var flag = -1;
        for (i = 0; i < product.length; i++) {
            var productInfo = new Array();
            productInfo = product[i].split("|");
            if (productInfo[0] == CommodityId) {

            }
            else {
                newcookies += product[i] + "&";
            }
        }
        if (product.length > 11) {
            newcookies = newcookies.substring(newcookies.indexOf('&') + 1, newcookies.length);
        }

        if (flag == -1) {
            newcookies += CommodityId + "|" + commodityname + "|" + CommodityPicture + "&";
        }
        newcookies = newcookies.substring(0, newcookies.length - 1);
        $.cookie('Viewed', encodeURIComponent(newcookies), { expires: 0, path: '/', domain: 'yiguo.com' });

    }
}

function DeleteViewedCommodity(_this, _CommodityId) {
    var newcookies = "";
    var product = new Array();
    var allcookies = $.cookie('Viewed');
    product = allcookies.split("&");
    //var flag = -1;
    for (i = 0; i < product.length; i++) {
        var productInfo = new Array();
        productInfo = product[i].split("|");
        if (productInfo[0] == _CommodityId) {

        }
        else {
            newcookies += product[i] + "&";
        }
    }
    if (product.length > 3) {
        newcookies = newcookies.substring(newcookies.indexOf('&') + 1, newcookies.length);
    }

    newcookies = newcookies.substring(0, newcookies.length - 1);
    $.cookie('Viewed', encodeURIComponent(newcookies), { expires: 0, path: '/', domain: 'yiguo.com' });
    $(_this).closest(".p").remove();
    if ($("#RecentViewCommodity .p").length == 0) {
        $("#RecentViewCommodity").remove();
    }
}

function ClearViewedCommodity() {
    $.cookie('Viewed', "", { expires: 0, path: '/', domain: 'yiguo.com' });
    $("#RecentViewCommodity").remove();
}

var product = {};
product.GetCommodityPromotion = function (commodity) {
    $.get("/product/GetCommodityPromotion", commodity, function (data) {
        if ($.trim(data).length > 0) {
            $("#commoditypromotions").html(data);
        }
    })
}

product.ProductAttribute = function (commodityId) {
    $.get("/product/ProductAttribute", { commodityId: commodityId }, function (data) {
        if ($.trim(data).length > 0) {
            $("#ProductAttribute").html(data);
        }
    })
}

product.CakeParts = function () {
    $.get("/Product/CakeParts", null, function (data) {
        if ($.trim(data).length > 0) {
            $("#CakeParts").html(data);
        }
    })
}

product.GetHotCommodity = function (commodityId) {
    $.get("/Product/GetHotCommodity", { commodityId: commodityId }, function (data) {
        if ($.trim(data).length > 0) {
            $("#GetHotCommodity").html(data);
        }
    })
}

product.GetArtical = function (commodityId) {
    $.get("/Product/GetArtical", { commodityId: commodityId }, function (data) {
        if ($.trim(data).length > 0) {
            $("#GetArtical").html(data);
        }
    })
}

product.LikeMoreCommodity = function (commodityId) {
    $.get("/Product/LikeMoreCommodity", { commodityId: commodityId }, function (data) {
        if ($.trim(data).length > 0) {
            $("#LikeMoreCommodity").html(data);
        }
    })
}