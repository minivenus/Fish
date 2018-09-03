var Common_ShareUtils = require("./Common_ShareUtils"),
    Common_RedPacketPage = require("./Common_RedPacketPage"),
    Common_CommonUtil = require("./Common_CommonUtil"),
    Common_GlobalEventUtil = require("./Common_GlobalEventUtil"),
    s = cc._decorator,
    c = s.ccclass,
    r = s.property,
    Common_OpenRedPacket = function(__super) {
        function Common_OpenRedPacket() {
            var Common_OpenRedPacket = null !== __super && __super.apply(this, arguments) || this;
            return Common_OpenRedPacket.tip = null, Common_OpenRedPacket.btnDec = null, Common_OpenRedPacket.money = null, Common_OpenRedPacket.playCallback = null, Common_OpenRedPacket.ruleText = "",
            Common_OpenRedPacket.activityRuleText = "", Common_OpenRedPacket.isGetRed = !1, Common_OpenRedPacket;
        }
        return __extends(Common_OpenRedPacket, __super), Common_OpenRedPacket.prototype.start = function() {
                Common_CommonUtil.default.resetScale(this.node);
            }, Common_OpenRedPacket.prototype.refresh = function(a, e, t, o, r) {
                this.money.string = a + "元", this.playCallback = e, this.ruleText = t, this.activityRuleText = o,
                    r ? (this.btnDec.string = "继续开红包", this.tip.node.active = !1) : (this.btnDec.string = "玩游戏拿红包",
                        this.tip.node.active = !0), this.isGetRed = r;
            }, Common_OpenRedPacket.prototype.onLook = function() {
                this.onClose();
            }, Common_OpenRedPacket.prototype.onClose = function() {
                console.log("回到红包页面"), Common_RedPacketPage.default.instance ? Common_RedPacketPage.default.instance.refresh(!0) : Common_ShareUtils.default.showRedPacketPage(this.ruleText, this.playCallback, this.activityRuleText),
                Common_GlobalEventUtil.GlobalEventUtil.emit("event_sendred", !0), this.node.destroy();
            }, __decorate([r(cc.Label)], Common_OpenRedPacket.prototype, "tip", void 0), __decorate([r(cc.Label)], Common_OpenRedPacket.prototype, "btnDec", void 0),
            __decorate([r(cc.Label)], Common_OpenRedPacket.prototype, "money", void 0), Common_OpenRedPacket = __decorate([c], Common_OpenRedPacket);
    }(cc.Component);
exports.default = Common_OpenRedPacket;