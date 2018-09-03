var NodeUtil = require("./NodeUtil"),
    Fish_UserData = require("./Fish_UserData"),
    FishCfgMgr = require("./FishCfgMgr"),
    Common_GlobalEventUtil = require("./Common_GlobalEventUtil"),
    SoundUtil = require("./SoundUtil"),
    s = cc._decorator,
    r = s.ccclass,
    l = s.property,
    c = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.labName = null, t.callBack = null, t;
        }
        return __extends(t, o), t.prototype.start = function() {
            this.AddButtonEventStart(this, this.GetNodeByName("content/btnTrue"), this.onTrue);
        }, t.prototype.init = function(a, e) {
            this.callBack = e;
            try {
                if (a)
                    if (2 == a.length) {
                        this.GetNodeByName("content/spEffect0").active = !1;
                        var t = this.GetNodeByName("content/spEffect1"),
                            o = this.GetNodeByName("content/spEffect2");
                        this.upReward(a[0], t), this.upReward(a[1], o), Fish_UserData.Fish_UserData.addReward(a), Common_GlobalEventUtil.GlobalEventUtil.emit("UpdateGold");
                    } else {
                        this.GetNodeByName("content/spEffect1").active = !1, this.GetNodeByName("content/spEffect2").active = !1,
                            this.GetNodeByName("content/spEffect0").active = !0;
                        var r = this.GetNodeByName("content/spEffect0");
                        this.upReward(a[0], r), Fish_UserData.Fish_UserData.addReward(a), Common_GlobalEventUtil.GlobalEventUtil.emit("UpdateGold");
                    }
            } catch (t) {
                console.error("加载错误"), console.error(t);
            }
        }, t.prototype.upReward = function(o, e) {
            e.getChildByName("spIcon").getComponent(cc.Sprite).spriteFrame = FishCfgMgr.FishCfgMgr.getRewardFrameByKey(o.type),
                e.getChildByName("labDec").getComponent(cc.Label).string = 0 == o.type ? "金币x" + o.num : "护盾x" + o.num;
        }, t.prototype.onTrue = function() {
            SoundUtil.SoundUtil.PlayEffectByKey(1), this.callBack && (console.log("打开报偶像回调"), this.callBack(!0)),
                console.log("打开回调"), this.node.destroy();
        }, __decorate([l(cc.Label)], t.prototype, "labName", void 0), t = __decorate([r], t);
    }(NodeUtil.NodeUtil);
exports.default = c;