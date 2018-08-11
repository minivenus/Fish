var o = require("./wxShortcut"),
    i = require("./Fish_UserData"),
    n = require("./Common_GlobalEventUtil"),
    a = require("./Common_Data");
"undefined" != typeof wx && (o.Wx.onShow(function(o) {
    s.onShowRes = o, s.onShowRes.shareTicket && (console.log("on show: res=", o), o.query.group && n.GlobalEventUtil.emit("showGroupList", s.onShowRes.shareTicket)),
        s.onShowCallbacks.forEach(function(t) {
            t && t(o);
        }), window.gameCrtl && window.gameCrtl.openMusiceBG(), a.default.onShow(o, null, null);
}), o.Wx.onHide(function() {
    console.log("wx.onhide"), i.Fish_UserData.Init ? (console.log("上传更新数据"), i.Fish_UserData.saveUserDataToServer(),
        i.Fish_UserData.saveUserDataToLocal()) : console.log("未初始化人物数据，不做上传更新数据"), s.onHideCallbacks.forEach(function(t) {
        t && t();
    }), a.default.onHide();
}));
var s = function() {
    function t() {}
    return t.addOnShowCallback = function(o) {
            var e = ++this.currentId;
            return this.onShowCallbacks[e] = o, e;
        }, t.addOnHideCallback = function(o) {
            var e = ++this.currentId;
            return this.onHideCallbacks[e] = o, e;
        }, t.clearCallback = function(t) {
            this.onShowCallbacks[t] ? this.onShowCallbacks[t] = null : this.onHideCallbacks[t] && (this.onHideCallbacks[t] = null);
        }, t.onShowRes = null, t.onShowCallbacks = [], t.onHideCallbacks = [], t.currentId = 0,
        t;
}();
exports.default = s;