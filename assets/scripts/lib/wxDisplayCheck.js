var wxShortcut = require("./wxShortcut"),
    fishUserData = require("./Fish_UserData"),
    globalEventUtil = require("./Common_GlobalEventUtil"),
    commonData = require("./Common_Data");
"undefined" != typeof wx && (wxShortcut.Wx.onShow(function(o) {
    wxDisplayCheck.onShowRes = o, wxDisplayCheck.onShowRes.shareTicket && (console.log("on show: res=", o), o.query.group && globalEventUtil.GlobalEventUtil.emit("showGroupList", wxDisplayCheck.onShowRes.shareTicket)),
        o && o.query && o.query.chall && (console.log("chall onshow 有房间id " + fishUserData.Fish_UserData.challRoomID),
        fishUserData.Fish_UserData.challRoomID = o.query.chall, fishUserData.Fish_UserData.Init ? (console.log("chall 跳转到擂台场景"),
                cc.director.loadScene("ChallengeScene")) : console.log("chall 未初始化人物数据，不做跳转挑战场景")),
                globalEventUtil.GlobalEventUtil.emit("UpdataChall"), globalEventUtil.GlobalEventUtil.emit("PostShare"), wxDisplayCheck.onShowCallbacks.forEach(function(t) {
            t && t(o);
        }), window.gameCrtl && window.gameCrtl.openMusiceBG(), commonData.default.onShow(o, null, null);
}), wxShortcut.Wx.onHide(function() {
    console.log("wx.onhide"), fishUserData.Fish_UserData.Init ? (console.log("上传更新数据"), fishUserData.Fish_UserData.saveUserDataToServer(),
    fishUserData.Fish_UserData.saveUserDataToLocal()) : console.log("未初始化人物数据，不做上传更新数据"), wxDisplayCheck.onHideCallbacks.forEach(function(t) {
        t && t();
    }), commonData.default.onHide();
}));
var wxDisplayCheck = function() {
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
exports.default = wxDisplayCheck;