
var Reg = {
    ValitedUrl: "/Register/",
    TipType: {
        Info: 1,
        Error: 2,
        Success: 3,
        Empty: 9999
    },
    RegType:
    {
        EmailReg: "EmailReg",
        PhoneReg: "PhoneReg"
    }
};

Reg.Valited = {
    ConfimPassword: function (confirmPasswordCtrl, passwordCtrl) {
        var password = $.trim($(passwordCtrl).val());
        var confimPassword = $.trim($(confirmPasswordCtrl).val());

        Reg.Valited.ControlTip(confirmPasswordCtrl, Reg.TipType.Empty, "");

        if (password == '' || confimPassword == '') {
            Reg.Valited.ControlTip(confirmPasswordCtrl, Reg.TipType.Info, Reg.ErrorString.NoPassword);
            return false;
        }

        // 验证非法字符
        if (Form.Validate(confimPassword)) {
            Reg.Valited.ControlTip(confirmPasswordCtrl, Reg.TipType.Error, Form.VC);
            return false;
        }

        if (password.length < 6) {
            Reg.Valited.ControlTip(confirmPasswordCtrl, Reg.TipType.Error, Reg.ErrorString.PasswordMinLength);
            return false;
        }

        if (password != confimPassword) {
            Reg.Valited.ControlTip(confirmPasswordCtrl, Reg.TipType.Error, Reg.ErrorString.InconPassword);
            return false;
        }
        else {
            Reg.Valited.ControlTip(confirmPasswordCtrl, Reg.TipType.Success, "");
            return true;
        }
    },

    Email: function (ctrl) {
        var par = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        var value = $(ctrl).val();

        Reg.Valited.ControlTip(ctrl, Reg.TipType.Empty, "");

        if (value == '') {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Info, Reg.ErrorString.NoEmail);
            return false;
        }
        else if (!par.test(value)) {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Reg.ErrorString.EmailPatternWrong);
            return false;
        }

        // 验证非法字符
        if (Form.Validate(value)) {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Form.VC);
            return false;
        }

        GetRemoteContent(Reg.ValitedUrl + "ValidatorIsEmail", { Email: value }, ctrl, Reg.Valited.CallBackEamil);
    },

    CallBackEamil: function (ctrl, returnCode) {

        if (returnCode == '' || returnCode == 'YES')
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Reg.ErrorString.EmailAlreadyExists);
        else
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Success, "");
    },

    Mobile: function (ctrl) {

        var par = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/

        var value = $.trim($(ctrl).val());

        Reg.Valited.ControlTip(ctrl, Reg.TipType.Empty, "");

        if (value == '') {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Info, Reg.ErrorString.NoMobile);
            return false;
        }

        if (value.length != 11) {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Reg.ErrorString.MobilePatternWrong);
            return false;
        }

        if (!par.test(value)) {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Reg.ErrorString.MobilePatternWrong);
            return false;
        }

        // 验证非法字符
        if (Form.Validate(value)) {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Form.VC);
            return false;
        }

        var verficodetab = "";

        if ($("#tab1li").is(".active"))
            verficodetab = $("#verficode_tab1").val();
        else
            verficodetab = $("#verficode_tab2").val();

        if (verficodetab == "") {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, "请输入图形验证码");
            return false;
        }

        GetRemoteContent(Reg.ValitedUrl + "ValidatorIsMobile", { Mobile: value, VerfiCodeTab: verficodetab }, ctrl, Reg.Valited.CallBackMobile);
    },

    CallBackMobile: function (ctrl, returnCode) {

        if (returnCode == "VerfiCodeWrong") {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, "图形验证码错误");

            return true;
        }

        if (returnCode == '' || returnCode == 'YES') {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Reg.ErrorString.MobileAlExists);
            $("#imgcode").attr("src", "/verifycode" + "?from=register&_t=" +new Date().getTime());

            return true;
        }
        else {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Success, "");

            return false;
        }
    },

    SendCodeClick: function (ctrl, mobileCtrl) {

        if ($(ctrl).attr("disabled") == "disabled") {
            return false;
        }

        Reg.Valited.ControlTip(ctrl, Reg.TipType.Empty, "");

        var UserID = $("#UserID").val();

        var mobile = $.trim($(mobileCtrl).val());

        //if (Reg.Valited.Mobile(mobileCtrl) == true) {

        //    return false;
        //}

        if ($("#tab1li").is(".active"))
            verficodetab = $("#verficode_tab1").val();
        else
            verficodetab = $("#verficode_tab2").val();

        if (verficodetab == "") {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, "请输入图形验证码");
            return false;
        }

        GetVerifyCodeContent(Reg.ValitedUrl + "SendVerifyCode", { UserID: UserID, Mobile: mobile, VerfiCodeTab: verficodetab }, ctrl, Reg.Valited.SendVerifyCodeCallBack);
    },

    SendVerifyCodeCallBack: function (ctrl, returnCode) {

        $("#imgcode").attr("src", "/verifycode" + "?from=register&_t=" +new Date().getTime());

        if (returnCode == "VerfiCodeWrong") {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, "图形验证码错误");

            return;
        }

        if (returnCode == 'No') {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, "手机号已经存在");

            return false;
        }
        else if (returnCode == 'SendNo') {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, "短信发送失败");

            return false;
        }
        else if (returnCode == 'Yes') {

            Reg.Valited.ControlTip(ctrl, Reg.TipType.Empty, "");


            VerifyCodeButtonText(ctrl, 120);
        }
        else {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Reg.ErrorString.SendSMSFail);
        }
    },

    VerifyCode: function (ctrl) {
        var Code = $.trim(($(ctrl).val()));

        Reg.Valited.ControlTip(ctrl, Reg.TipType.Empty, "");

        if (Code == '') {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Info, Reg.ErrorString.NoVerifyCode);
            return false;
        }

        if (Code.length != 6) {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Reg.ErrorString.VerifyCodePatternWrong);
            return false;
        }

        // 验证非法字符
        if (Form.Validate(Code)) {
            Reg.Valited.ControlTip(ctrl, Reg.TipType.Error, Form.VC);
            return false;
        }

        Reg.Valited.ControlTip(ctrl, Reg.TipType.Success, "");
        return true;
    },

    PhoneRegClick: function (ctrl) {

        Reg.Valited.ControlTip($("#tab1chk"), Reg.TipType.Empty, "");

        if ($(ctrl).attr("disabled") == "disabled") {
            Reg.Valited.ControlTip($("#tab1chk"), Reg.TipType.Error, Reg.ErrorString.AgreementWrong);
            return false;
        }

        if (Reg.Valited.Mobile($("#Phone_Mobile")) == false)
            return false;

        if (Reg.Valited.ConfimPassword($("#Phone_ConfimPassword"), $("#Phone_Password")) == false)
            return false;

        if (Reg.Valited.VerifyCode($("#Phone_VerifyCode")) == false)
            return false;

        $("#HdAction").val(Reg.RegType.PhoneReg);

        $("form").get(0).submit();

        return true;
    },

    EmailRegClick: function (ctrl) {

        Reg.Valited.ControlTip($("#tab2chk"), Reg.TipType.Empty, "");

        if ($(ctrl).attr("disabled") == "disabled") {
            Reg.Valited.ControlTip($("#tab2chk"), Reg.TipType.Error, Reg.ErrorString.AgreementWrong);
            return false;
        }

        if (Reg.Valited.Email($("#Email")) == false)
            return false;

        if (Reg.Valited.Mobile($("#Email_Mobile")) == false)
            return false;

        if (Reg.Valited.ConfimPassword($("#Email_ConfimPassword"), $("#Email_Password")) == false)
            return false;

        if (Reg.Valited.VerifyCode($("#Email_VerifyCode")) == false)
            return false;

        $("#HdAction").val(Reg.RegType.EmailReg);

        $("form").get(0).submit();

        return true;
    },

    ControlTip: function (ctrl, tiptype, msg) {
        $(ctrl).nextAll("span").removeClass();

        if (tiptype == Reg.TipType.Info) {
            $(ctrl).nextAll("span").html("<i></i>" + msg);
            $(ctrl).nextAll("span").addClass("pass-tip");
        }
        else if (tiptype == Reg.TipType.Error) {
            $(ctrl).nextAll("span").html("<i></i>" + msg);
            $(ctrl).nextAll("span").addClass("pass-error");
        }
        else if (tiptype == Reg.TipType.Success) {
            $(ctrl).nextAll("span").html("<i></i>" + msg);
            $(ctrl).nextAll("span").addClass("pass-succ");
        }
        else if (tiptype == Reg.TipType.Empty) {
            $(ctrl).nextAll("span").html("");
        }
    },

    ChangeTab: function (HdAction) {
        var tab1 = $("#tab1");
        var tab2 = $("#tab2");

        var tab1li = $("#tab1li");
        var tab2li = $("#tab2li");

        tab1.removeClass("active");
        tab1li.removeClass("active");

        tab2.removeClass("active");
        tab2li.removeClass("active");

        if (HdAction == '') {
            tab1.addClass("active");
            tab1li.addClass("active");
        }
        else if (HdAction == Reg.RegType.PhoneReg) {
            tab1.addClass("active");
            tab1li.addClass("active");
        }
        else if (HdAction == Reg.RegType.EmailReg) {
            tab2.addClass("active");
            tab2li.addClass("active");
        }
    },

    SubmitButonActive: function (submitctrl, checkbox) {
        if ($(checkbox).is(":checked")) {
            $(submitctrl).attr("disabled", false);
            $(submitctrl).attr("style", "");
        }
        else {
            $(submitctrl).attr("disabled", true);
            $(submitctrl).css("background-color", "grey");
        }
    }
};

function GetRemoteContent(url, postData, valitedCtrl, func) {

    $.ajax({
        type: "POST",
        url: url,
        data: postData,
        dataType: "json",
        success: function (data) {
            if (data != null)
                func(valitedCtrl, data["returncode"]);
        }
    });
}
function GetVerifyCodeContent(url, postData, valitedCtrl, func) {

    $.ajax({
        type: "POST",
        url: url,
        data: postData,
        dataType: "json",
        statusCode:{
            200: function (data) {
                if (data != null)
                    func(valitedCtrl, data["returncode"]);
            },
            201: function (data) {
                if (data != null)
                    func(valitedCtrl, data["returncode"]);
            }
        }
    });
}

function VerifyCodeButtonText(ctrl, time) {
    $(ctrl).html(Reg.ErrorString.VerifyCodeRemainTime + time + Reg.ErrorString.VerifyCodeSecond);
    $(ctrl).attr("disabled", true);
    $(ctrl).css("color", "gray");

    if (time > 0) {
        var temp = time - 1;
        window.setTimeout(function () { VerifyCodeButtonText(ctrl, temp) }, 1000);
    }
    else {
        $(ctrl).attr("disabled", false);
        $(ctrl).html(Reg.ErrorString.SendVerifyCode);
        $(ctrl).attr("style", "");
    }
}

$(function () {
    //$("#Phone_Mobile").blur(function () { return Reg.Valited.Mobile(this); })
    $("#Phone_ConfimPassword").blur(function () { return Reg.Valited.ConfimPassword(this, $("#Phone_Password")); })
    $("#Phone_VerifyCode").blur(function () { return Reg.Valited.VerifyCode(this); })
    $("#Phone_SendCode").click(function () { return Reg.Valited.SendCodeClick(this, $("#Phone_Mobile")); })

    $("#tab1chk").change(function () { return Reg.Valited.SubmitButonActive($("#PhoneReg"), this) })
    $("#PhoneReg").click(function () { return Reg.Valited.PhoneRegClick($("#PhoneReg")); })

    $("#Email").blur(function () { return Reg.Valited.Email(this); })
    //$("#Email_Mobile").blur(function () { return Reg.Valited.Mobile(this); })
    $("#Email_ConfimPassword").blur(function () { return Reg.Valited.ConfimPassword(this, $("#Email_Password")); })
    $("#Email_VerifyCode").blur(function () { return Reg.Valited.VerifyCode(this); })
    $("#Email_SendCode").click(function () { return Reg.Valited.SendCodeClick(this, $("#Email_Mobile")); })

    $("#tab2chk").change(function () { return Reg.Valited.SubmitButonActive($("#EmailReg"), this) })
    $("#EmailReg").click(function () { return Reg.Valited.EmailRegClick(this); })

    Reg.Valited.ChangeTab($("#HdAction").val());

    //弹出框
    $('.btn-protocol').toggle(function () {
        $('.protocol-poput').css('display', 'block');
    }, function () {
        $('.protocol-poput').css('display', 'none');
    })
    $('.protocol-poput .btn-gn').click(function () {
        $('.protocol-poput').css('display', 'none');
    })
    $('.protocol-poput .close').click(function () {
        $('.protocol-poput').css('display', 'none');
    })
})