var commonUtil = require("./Common_CommonUtil"),
    wxShortcut = function() {
        function wxShortcut() {}
        return wxShortcut.showToast = function(a, l, t, p, c) {
            void 0 === t && (t = "none"), void 0 === p && (p = ""), void 0 === c && (c = 0),
                commonUtil.default.isWeChat() && (Wx.hideToast(), clearTimeout(wxShortcut.clearId), Wx.showToast({
                    title: a,
                    icon: t,
                    image: p,
                    duration: c || 0
                }), wxShortcut.clearId = setTimeout(function() {
                    return Wx.hideToast();
                }, l));
        }, wxShortcut.showModal = function(a, n, r) {
            void 0 === r && (r = "确定"), wx.showModal({
                title: a,
                content: n,
                showCancel: !1,
                confirmText: r
            });
        }, wxShortcut.showModalRet = function(a, r, s, d, l) {
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
        }, wxShortcut.clearId = 0, wxShortcut;
    }();
exports.default = wxShortcut;

var Wx = function() {
    function Wx() {}
    return Wx.showToast = function(t) {
        return wx.showToast(t);
    }, Wx.hideToast = function() {
        return wx.hideToast();
    }, Wx.showModal = function(t) {
        return wx.showModal(t);
    }, Wx.getSystemInfo = function(t) {
        return wx.getSystemInfo(t);
    }, Wx.onShow = function(t) {
        return wx.onShow(t);
    }, Wx.onHide = function(t) {
        return wx.onHide(t);
    }, Wx.showLoading = function(t) {
        return wx.showLoading(t);
    }, Wx.hideLoading = function() {
        return wx.hideLoading();
    }, Wx.getSystemInfoSync = function() {
        return wx.getSystemInfoSync();
    }, Wx.onShareAppMessage = function(t) {
        return wx.onShareAppMessage(t);
    }, Wx.showShareMenu = function(t) {
        return wx.showShareMenu(t);
    }, Wx;
}();
exports.Wx = Wx;