// JavaScript Document

//筛选
$(document).ready(function () {
    $(".select a").live("click", function () {
        $(this).parent("li").addClass("selected").siblings().removeClass("selected");
    });
    //展开更多
    if ($(".select_list").length <= 3) {
        $(".select_more").hide();
    } else {
        $(".select_more").show();
    };
    $(".select_list").slice(0, 3).show();
    $(".select_more .btn").toggle(function () {
        $('.select_list').slice(3).show()
        $(this).html("精选选项&#9650;");
        $(this).find("i").addClass("show")
    }, function () {
        $('.select_list').slice(3).hide()
        $(this).html("全部选项&#9660;");
        $(this).find("i").removeClass("show")
    });
});

//头部浮动
$(window).scroll(function () {
    var totop = $(this).scrollTop();
    if (totop >= 300) {
        $('.header').addClass('header_fixed');
        //$('#shelper').css("position", "relative");
    }
    else {
        $(".header").removeClass('header_fixed');
        //$('#shelper').css("position", "absolute");
    };
});

//商品列表
$(function () {
    $('.goods_list .product_item').hover(function () {
        $(this).addClass('current');
        var productType = $(this).attr("_type");
        $("#productType").val(productType);
    }, function () {
        $(this).removeClass('current');
    });



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
        var productType = $("#productType").val();
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
});