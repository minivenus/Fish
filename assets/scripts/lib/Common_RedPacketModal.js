var o = require("./Common_CommonUtil"),
    i = require("./Common_ShareUtils"),
    n = require("./EChannelPrefix"),
    a = require("./gamesdk"),
    s = require("./utils/wxShortcut"),
    c = cc._decorator,
    r = c.ccclass,
    l = (c.property, function(d) {
        function t() {
            var t = null !== d && d.apply(this, arguments) || this;
            return t._shareCode = "", t.callbackOnClose = null, t;
        }
        return __extends(t, d), Object.defineProperty(t.prototype, "shareCode", {
            set: function(t) {
                this._shareCode = t;
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.setParams = function(o, e) {
            void 0 === e && (e = null), this.shareCode = o, this.callbackOnClose = e;
        }, t.prototype.start = function() {
            this.node.setLocalZOrder(1024), o.default.resetScale(this.node);
        }, t.prototype.onClose = function() {
            this.node.destroy(), this.callbackOnClose && this.callbackOnClose();
        }, t.prototype.onInvite = function() {
            this.onClose();
            var t = "shareCode=" + (this._shareCode || " ") + "&shareId=" + (a.game.getOpenId() || " ");
            i.default.share(n.default.getred66, t, function() {
                console.log("分享成功"), s.default.showModal("邀请发送成功", "记得提醒好友帮你点哦", "返回游戏");
            });
        }, t = __decorate([r], t);
    }(cc.Component));
exports.default = l;