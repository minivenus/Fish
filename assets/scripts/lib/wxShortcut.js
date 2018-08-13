var r = require("./Common_CommonUtil"),
    o = function() {
        function d() {}
        return d.showToast = function(a, l, t, p, c) {
            void 0 === t && (t = "none"), void 0 === p && (p = ""), void 0 === c && (c = 0),
                r.default.isWeChat() && (s.hideToast(), clearTimeout(d.clearId), s.showToast({
                    title: a,
                    icon: t,
                    image: p,
                    duration: c || 0
                }), d.clearId = setTimeout(function() {
                    return s.hideToast();
                }, l));
        }, d.showModal = function(a, n, r) {
            void 0 === r && (r = "确定"), wx.showModal({
                title: a,
                content: n,
                showCancel: !1,
                confirmText: r
            });
        }, d.showModalRet = function(a, r, s, d, l) {
            void 0 === s && (s = "确认"), void 0 === d && (d = "取消"), wx.showModal({
                title: a,
                content: r,
                showCancel: !0,
                confirmText: s,
                cancelText: d,
                success: function(t) {
                    t.confirm && (console.log("用户点击确定"), l());
                }
            });
        }, d.clearId = 0, d;
    }();
exports.default = o;

var s = function() {
    function t() {}
    return t.showToast = function(t) {
        return wx.showToast(t);
    }, t.hideToast = function() {
        return wx.hideToast();
    }, t.showModal = function(t) {
        return wx.showModal(t);
    }, t.getSystemInfo = function(t) {
        return wx.getSystemInfo(t);
    }, t.onShow = function(t) {
        return wx.onShow(t);
    }, t.onHide = function(t) {
        return wx.onHide(t);
    }, t.showLoading = function(t) {
        return wx.showLoading(t);
    }, t.hideLoading = function() {
        return wx.hideLoading();
    }, t.getSystemInfoSync = function() {
        return wx.getSystemInfoSync();
    }, t.onShareAppMessage = function(t) {
        return wx.onShareAppMessage(t);
    }, t.showShareMenu = function(t) {
        return wx.showShareMenu(t);
    }, t;
}();
exports.Wx = s;