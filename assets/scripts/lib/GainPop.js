var o = require("./NodeUtil"),
    m = require("./Fish_UserData"),
    a = require("./FishCfgMgr"),
    g = require("./Common_GlobalEventUtil"),
    n = require("./SoundUtil"),
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
                        this.upReward(a[0], t), this.upReward(a[1], o), m.Fish_UserData.addReward(a), g.GlobalEventUtil.emit("UpdateGold");
                    } else {
                        this.GetNodeByName("content/spEffect1").active = !1, this.GetNodeByName("content/spEffect2").active = !1,
                            this.GetNodeByName("content/spEffect0").active = !0;
                        var r = this.GetNodeByName("content/spEffect0");
                        this.upReward(a[0], r), m.Fish_UserData.addReward(a), g.GlobalEventUtil.emit("UpdateGold");
                    }
            } catch (t) {
                console.error("加载错误"), console.error(t);
            }
        }, t.prototype.upReward = function(o, e) {
            e.getChildByName("spIcon").getComponent(cc.Sprite).spriteFrame = a.FishCfgMgr.getRewardFrameByKey(o.type),
                e.getChildByName("labDec").getComponent(cc.Label).string = 0 == o.type ? "金币x" + o.num : "护盾x" + o.num;
        }, t.prototype.onTrue = function() {
            n.SoundUtil.PlayEffectByKey(1), this.callBack && (console.log("打开报偶像回调"), this.callBack(!0)),
                console.log("打开回调"), this.node.destroy();
        }, __decorate([l(cc.Label)], t.prototype, "labName", void 0), t = __decorate([r], t);
    }(o.NodeUtil);
exports.default = c;