

var _py = _py || [];
var _gaq = _gaq || [];
var _mvq = window._mvq || [];

$(function () {
    _gaq.push(['_setAccount', 'UA-20131478-1']);
    _gaq.push(['_setDomainName', 'yiguo.com']);
    _gaq.push(['_setSiteSpeedSampleRate', 50]);
    _gaq.push(['_addOrganic', 'baidu', 'word']);
    _gaq.push(['_addOrganic', 'soso', 'w']);
    _gaq.push(['_addOrganic', 'youdao', 'q']);
    _gaq.push(['_addOrganic', 'so.360.cn', 'q']);
    _gaq.push(['_addOrganic', 'sogou', 'query']);
    _gaq.push(['_setCampNameKey', 'n']);
    _gaq.push(['_setCampSourceKey', 's']);
    _gaq.push(['_setCampMediumKey', 'm']);
    _gaq.push(['_setCampTermKey', 'k']);
    _gaq.push(['_setCampContentKey', 'c']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();


    if (common.getCookie('cps') == "100001&mediav") {

        window._mvq = _mvq;
        _mvq.push(['$setAccount', 'm-20296-1']);
        _mvq.push(['$logConversion']);
        (function () {
            var mvl = document.createElement('script');
            mvl.type = 'text/javascript';
            mvl.async = true;
            mvl.src = ('https:' == document.location.protocol ? 'https://static-ssl.mediav.com/mvl.js' : 'http://static.mediav.com/mvl.js');
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(mvl, s);
        })();
    }

    if (common.getCookie('cps') == "100002&ipinyou") {
        _py.push(['a', '6y..SrO6vljE2uhkqi03vEbY8_']);
        _py.push(['pv', '1']); //1:未注册2：已注册未下单 3：已注册已下单
        _py.push(['domain', 'stats.ipinyou.com']);
        _py.push(['e', '']);

        var f = 'https:' == location.protocol;
        var sc2 = document.createElement('script');
        sc2.type = 'text/javascript';
        sc2.src = (f ? 'https' : 'http') + '://' + (f ? 'fm.ipinyou.com' : 'fm.p0y.cn') + '/j/adv.js';
        body.appendChild(sc2);

        //-function(d) {
        //    var s = d.createElement('script'),
        //        e = d.body.getElementsByTagName('script')[0];
        //    e.parentNode.insertBefore(s, e),
        //        var f = 'https:' == location.protocol;
        //    s.src = (f ? 'https' : 'http') + '://' + (f ? 'fm.ipinyou.com' : 'fm.p0y.cn') + '/j/adv.js';
        //}(document);
    }

    //var img = document.createElement('img');
    //img.src = "//stats.ipinyou.com/adv.gif?a=6y..SrO6vljE2uhkqi03vEbY8_&e=";
    //img.style.display = "none";
    //var noscript = document.createElement("noscript");
    //noscript.appendChild(img);
    //body.appendChild(noscript);

});

//(function (param) {
//    var c = { query: [], args: param || {} };
//    c.query.push(["_setAccount", "611"]);
//    (window.__zpSMConfig = window.__zpSMConfig || []).push(c);
//    var zp = document.createElement("script");
//    zp.type = "text/javascript";
//    zp.async = true;
//    zp.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//cdn.zampda.net/s.js";
//    var s = document.getElementsByTagName("script")[0];
//    s.parentNode.insertBefore(zp, s);
//})
//(window.__zp_tag_params);
