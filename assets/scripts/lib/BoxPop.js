var o = require("./NodeUtil"),
    i = require("./Common_Data"),
    n = require("./EChannelPrefix"),
    a = require("./Fish_UserData"),
    s = require("./ComPage"),
    c = require("./SoundUtil"),
    r = cc._decorator,
    l = r.ccclass,
    d = (r.property, function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.boxState = 2, t.callback = null, t.rewards = [
                [{
                    type: 0,
                    num: 20
                }, {
                    type: 1,
                    num: 1
                }],
                [{
                    type: 0,
                    num: 20
                }],
                [{
                    type: 0,
                    num: 20
                }]
            ], t;
        }
        return __extends(t, o), t.prototype.start = function() {
            this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet2"), this.onGet2),
                this.AddButtonEventStart(this, this.GetNodeByName("content/btnClose"), this.onClose);
        }, t.prototype.init = function(t) {
            this.callback = t, this.boxState = a.Fish_UserData.getBoxState(), 0 == this.boxState ? (this.GetNodeByName("content/btnGet2/Label").getComponent(cc.Label).string = "分享开启",
                this.GetNodeByName("content/btnGet").active = !1, this.GetNodeByName("content/btnGet2").setPositionX(0)) : 1 == this.boxState ? this.GetNodeByName("content/btnGet2/Label").getComponent(cc.Label).string = "分享双倍开启" : 2 == this.boxState && (this.GetNodeByName("content/btnGet2").active = !1,
                this.GetNodeByName("content/btnGet").setPositionX(0), this.GetNodeByName("content/btnGet").width = 500);
        }, t.prototype.onGet = function() {
            c.SoundUtil.PlayEffectByKey(1);
            var t = s.ComPage.getRewardStr(this.rewards[this.boxState]);
            s.ComPage.ShowTip("成功打开宝箱，恭喜获得" + t), a.Fish_UserData.addReward(this.rewards[this.boxState]),
                this.callback && this.callback(!0), this.node.destroy();
        }, t.prototype.onGet2 = function() {
            var r = this;
            c.SoundUtil.PlayEffectByKey(1), i.default.share(n.default.reward, "", function(t) {
                return console.log("网络错误 :", t);
            }, function(o) {
                if (console.log("成功 :", o), 0 == r.boxState) {
                    var e = s.ComPage.getRewardStr(r.rewards[r.boxState]);
                    s.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), a.Fish_UserData.addReward(r.rewards[r.boxState]);
                } else r.rewards[r.boxState][0].num = 2 * r.rewards[r.boxState][0].num, e = s.ComPage.getRewardStr(r.rewards[r.boxState]),
                    s.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), a.Fish_UserData.addReward(r.rewards[r.boxState]);
                r.callback && r.callback(!0), r.node.destroy();
            }, function(t) {
                console.log("失败：", t), s.ComPage.ShowTip("分享失败");
            }, function(t) {
                return console.log("complete:", t);
            }, "", "", "", "", "");
        }, t.prototype.onClose = function() {
            c.SoundUtil.PlayEffectByKey(1), this.callback && this.callback(!1), this.node.destroy();
        }, t = __decorate([l], t);
    }(o.NodeUtil));
exports.default = d;