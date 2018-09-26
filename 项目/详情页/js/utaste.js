(function ($) {
    $.fn.utastebars = function (options) {
        var defaults = {
            tpl: $("#tpl"),
            context: "",
            emptytext: ""
        };

        $this = $(this);
        var opts = $.extend(defaults, options);
        var tpl = opts.tpl.html();
        if (tpl == undefined) {
            return;
        }
        var template = Handlebars.compile(tpl);
        var html = template(opts.context);
        if ($.trim(html) === "" && opts.emptytext !== "") {
            $this.html("").append(opts.emptytext);
        } else {
            $this.html("").append(html);
        }
    };

    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("inequal", function (v1, v2, options) {
        if (v1 == v2) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });
    Handlebars.registerHelper("less", function (v1, v2, options) {
        if (v1 < v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("more", function (v1, v2, options) {
        if (v1 > v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("first", function (items, options) {
        return options.fn(items[0]);
    });
    

    Handlebars.registerHelper("add", function (v1) {
        if (isNaN(v1)) return 0;
        return v1 + 1;
    });

    Handlebars.registerHelper("mul", function (v1, v2) {
        if (isNaN(v1) || isNaN(v2)) return 0;
        return v1 * v2;
    });

    Handlebars.registerHelper("ygimgurl", function (v1) {
        return "http://172.17.1.27:8889/img/" + v1;
    });
    //Handlebars.registerHelper("ygcategoryurl", function (v1) {
    //    return "/products/" + v1+".html";
    //});
    Handlebars.registerHelper("length", function (items, num) {
        if (isNaN(num))
            return items.length;
        return items.length + num;
    });
})(jQuery);

