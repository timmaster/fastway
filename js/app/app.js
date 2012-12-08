window.app = {};

app = {

    init: function (options) {
        // TODO
    },

    canLog: null,

    log: function (message) {
        if (app.canLog == null)
            app.canLog = !!window.console && !!window.console.log;

        if (app.canLog && app.Settings.log)
            console.log(message);
    },

    debugData: {},
    debug: function (name, val) {
        if (!!app.Settings.debugging)
            app.debugData[name] = val;
    },

    setData: function ($o, key, val) {
        $o.data(key, val);

        if (!!app.Settings.debugging)
            $o.attr("data-" + key, val);
    },

    isMobile: function () {
        return navigator.userAgent.match(/Android/i)
					|| navigator.userAgent.match(/webOS/i)
					|| navigator.userAgent.match(/iPhone/i)
					|| navigator.userAgent.match(/iPod/i)
					|| navigator.userAgent.match(/iPad/i)
					|| navigator.userAgent.match(/Windows Phone OS 7/i)
					|| navigator.userAgent.match(/BlackBerry/i)
					|| navigator.userAgent.match(/SymbianOS/i);
    },

    updateOrientation: function () {      
        var landscape = !(window.orientation == 0 || window.orientation == 180);
      
        if (landscape)
            $("body").addClass("landscape").removeClass("portrait");
        else
            $("body").addClass("portrait").removeClass("landscape");
    },

    __: null
};



(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

Date.prototype.getLongMonth = function () {
    switch (this.getMonth()) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
};