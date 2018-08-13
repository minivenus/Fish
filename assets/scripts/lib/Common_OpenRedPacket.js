var o = require("./Common_ShareUtils"),
    p = require("./Common_RedPacketPage"),
    n = require("./Common_CommonUtil"),
    a = require("./Common_GlobalEventUtil"),
    s = cc._decorator,
    c = s.ccclass,
    r = s.property,
    l = function(s) {
        function t() {
            var t = null !== s && s.apply(this, arguments) || this;
            return t.tip = null, t.btnDec = null, t.money = null, t.playCallback = null, t.ruleText = "",
                t.activityRuleText = "", t.isGetRed = !1, t;
        }
        return __extends(t, s), t.prototype.start = function() {
                n.default.resetScale(this.node);
            }, t.prototype.refresh = function(a, e, t, o, r) {
                this.money.string = a + "元", this.playCallback = e, this.ruleText = t, this.activityRuleText = o,
                    r ? (this.btnDec.string = "继续开红包", this.tip.node.active = !1) : (this.btnDec.string = "玩游戏拿红包",
                        this.tip.node.active = !0), this.isGetRed = r;
            }, t.prototype.onLook = function() {
                this.onClose();
            }, t.prototype.onClose = function() {
                console.log("回到红包页面"), p.default.instance ? p.default.instance.refresh(!0) : o.default.showRedPacketPage(this.ruleText, this.playCallback, this.activityRuleText),
                    a.GlobalEventUtil.emit("event_sendred", !0), this.node.destroy();
            }, __decorate([r(cc.Label)], t.prototype, "tip", void 0), __decorate([r(cc.Label)], t.prototype, "btnDec", void 0),
            __decorate([r(cc.Label)], t.prototype, "money", void 0), t = __decorate([c], t);
    }(cc.Component);
exports.default = l;