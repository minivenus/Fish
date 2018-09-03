var Common_RankList = require("./Common_RankList"),
Common_SubdomineRender = require("./Common_SubdomineRender"),
    o = function() {
        function t() {}
        return t.showFriendList = function(a, e, t) {
            void 0 === a && (a = null), void 0 === e && (e = null), void 0 === t && (t = !0),
                this.display(e), Common_RankList.default.showFriendList(a, t);
        }, t.showGroupList = function(a, e, t) {
            void 0 === e && (e = null), void 0 === t && (t = null), this.display(t), Common_RankList.default.showGroupList(a, e);
        }, t.showResultList = function(o, e) {
            void 0 === o && (o = null), void 0 === e && (e = !0), this.display(o), Common_RankList.default.showGameResultList(e);
        }, t.checkSurpassFriend = function(a, e, t, o) {
            void 0 === e && (e = null), void 0 === t && (t = 0), void 0 === o && (o = 0), this.display(e),
                Common_RankList.default.checkSurpassFriend(a, t, o);
        }, t.checkWillSurpass = function(a, e, t, o) {
            void 0 === e && (e = null), void 0 === t && (t = 1), void 0 === o && (o = 0), this.display(e, t),
                Common_RankList.default.checkWillSurpass(a, o);
        }, t.display = function(a, r) {
            if (void 0 === a && (a = null), void 0 === r && (r = 30), a || (a = cc.director.getScene().getComponentInChildren(cc.Canvas).node), !a) throw "无法找到正确的父节点放置显示区域！";
            var t = "SubdomineDisplayNode",
                o = a.getChildByName(t);
            o ? o.getComponent(Common_SubdomineRender.default).renderFps = r : ((o = new cc.Node(t)).parent = a,
                o.addComponent(Common_SubdomineRender.default).renderFps = r);
        }, t;
    }();
exports.default = o;