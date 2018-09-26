var Form = {
    VC: "",

    Validate: function (str) {
        var par = /<\w+/;
        return par.test(str);
    }
};