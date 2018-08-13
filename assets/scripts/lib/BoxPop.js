var o = require("./NodeUtil"),
    g = require("./Common_Data"),
    n = require("./EChannelPrefix"),
    a = require("./Fish_UserData"),
    s = require("./ComPage"),
    c = require("./SoundUtil"),
    r = require("./Define"),
    l = cc._decorator,
    h = l.ccclass,
    d = l.property,
    u = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.tgShare = null, t.labDec = null, t.boxState = 2, t.callback = null, t.isShare = !1,
                t.shareCount = 10, t.upTime = 0, t.isLookVicoe = !1, t.rewards = [
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
                    }],
                    [{
                        type: 0,
                        num: 20
                    }, {
                        type: 1,
                        num: 1
                    }]
                ], t;
        }
        return __extends(t, o), t.prototype.start = function() {
                this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnClose"), this.onClose);
            }, t.prototype.init = function(t) {
                (this.callback = t, this.boxState = a.Fish_UserData.getBoxState(), 1 == this.boxState || 0 == this.boxState) ? (this.isShare = !0,
                    this.labDec.string = "开   启(" + this.shareCount + "s)", this.GetNodeByName("content/tgShare").active = !1) : 2 == this.boxState ? (this.labDec.string = "开   启",
                    this.GetNodeByName("content/tgShare").active = !1) : (this.GetNodeByName("content/btnGet").active = !1,
                    this.GetNodeByName("content/tgShare").active = !1, this.GetNodeByName("content/btnVioce").active = !0,
                    this.schedule(function() {
                        this.shareCount--, 0 > this.shareCount && !this.isLookVicoe ? (this.callback && this.callback(!0),
                            this.node.destroy()) : this.labDec.string = "开   启(" + this.shareCount + "s)";
                    }, 1));
            }, t.prototype.onGet = function() {
                var r = this;
                if (c.SoundUtil.PlayEffectByKey(1), this.isShare) {
                    var o = "shareType=2&time=" + new Date().getTime() + "&openId=" + g.default.getOpenId() + "&appId=" + g.default.getAppId();
                    g.default.share(n.default.reward, o, function(t) {
                        return console.log("网络错误 :", t);
                    }, function(o) {
                        console.log("分享成功 :", o);
                        var e = s.ComPage.getRewardStr(r.rewards[r.boxState]);
                        s.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), a.Fish_UserData.addReward(r.rewards[r.boxState]),
                            r.callback && r.callback(!0), r.node.destroy();
                    }, function(t) {
                        console.log("失败：", t), s.ComPage.ShowTip("分享失败");
                    }, function(t) {
                        return console.log("complete:", t);
                    }, "", "", "", "", "");
                } else {
                    var e = s.ComPage.getRewardStr(this.rewards[this.boxState]);
                    s.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), a.Fish_UserData.addReward(this.rewards[this.boxState]),
                        this.callback && this.callback(!0), this.node.destroy();
                }
            }, t.prototype.onTgCheck = function() {}, t.prototype.onVioce = function() {
                var n = this;
                this.isLookVicoe = !0, r.Define.wxShowVideo("adunit-05d81b28867116ed", function(o) {
                    if (o) {
                        console.log("boxstate:" + n.boxState);
                        var e = s.ComPage.getRewardStr(n.rewards[n.boxState]);
                        s.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), a.Fish_UserData.addReward(n.rewards[n.boxState]),
                            n.callback && n.callback(!0), n.node.destroy();
                    } else n.isLookVicoe = !1;
                });
            }, t.prototype.onGet2 = function() {
                var r = this;
                c.SoundUtil.PlayEffectByKey(1), g.default.share(n.default.reward, "", function(t) {
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
            }, t.prototype.update = function(t) {
                this.upTime += t, 1 < this.upTime && (this.isShare ? (this.shareCount--, 0 > this.shareCount ? (this.isShare = !1,
                        this.labDec.string = "分享开启", this.callback && this.callback(!0), this.node.destroy()) : this.labDec.string = "分享开启(" + this.shareCount + "s)") : this.labDec.string = "分享开启",
                    this.upTime = 0);
            }, __decorate([d(cc.Toggle)], t.prototype, "tgShare", void 0), __decorate([d(cc.Label)], t.prototype, "labDec", void 0),
            t = __decorate([h], t);
    }(o.NodeUtil);
exports.default = u;