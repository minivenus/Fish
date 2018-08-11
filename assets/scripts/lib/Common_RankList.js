var o = function() {
    function t() {}
    return t.setScore = function(a, e, t, o) {
        void 0 === e && (e = null), void 0 === t && (t = null), void 0 === o && (o = null),
            this.isWeChat() && wx.setUserCloudStorage({
                KVDataList: [{
                    key: "score",
                    value: (a || 0) + ""
                }],
                success: e || null,
                fail: t || null,
                complete: o || null
            });
    }, t.checkAndSetScore = function(t) {
        this.isWeChat() && wx.postMessage({
            rankType: -1,
            score: t
        });
    }, t.showFriendList = function(o, a) {
        void 0 === o && (o = []), void 0 === a && (a = !0), this.isWeChat() && wx.postMessage({
            rankType: 1,
            titleList: o,
            needRefresh: a
        });
    }, t.showGroupList = function(o, a) {
        void 0 === a && (a = null), this.isWeChat() && wx.postMessage({
            shareTicket: o,
            rankType: 0,
            titleList: a
        });
    }, t.showGameResultList = function(t) {
        void 0 === t && (t = !0), this.isWeChat() && wx.postMessage({
            rankType: 2,
            needRefresh: t
        });
    }, t.checkSurpassFriend = function(a, n, i) {
        void 0 === n && (n = 0), void 0 === i && (i = 0), this.isWeChat() && wx.postMessage({
            rankType: 3,
            score: a,
            x: n,
            y: i
        });
    }, t.checkWillSurpass = function(o, a) {
        void 0 === a && (a = 400), this.isWeChat() && wx.postMessage({
            rankType: 4,
            score: o,
            y: a
        });
    }, t.isWeChat = function() {
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    }, t;
}();
exports.default = o;