var nodeUtil = require("./NodeUtil"),
    commonData = require("./Common_Data"),
    eChannelPrefix = require("./EChannelPrefix"),
    fishUserData = require("./Fish_UserData"),
    comPage = require("./ComPage"),
    soundUtil = require("./SoundUtil"),
    define = require("./Define"),
    l = cc._decorator,
    h = l.ccclass,
    d = l.property,
    BoxPop = function(__super) {
        function BoxPop() {
            var BoxPop = null !== __super && __super.apply(this, arguments) || this;
            return BoxPop.tgShare = null, BoxPop.labDec = null, BoxPop.boxState = 2, BoxPop.callback = null, BoxPop.isShare = !1,
            BoxPop.shareCount = 10, BoxPop.upTime = 0, BoxPop.isLookVicoe = !1, BoxPop.rewards = [
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
                ], BoxPop;
        }
        return __extends(BoxPop, __super), BoxPop.prototype.start = function() {
                this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnClose"), this.onClose);
            }, BoxPop.prototype.init = function(t) {
                (this.callback = t, this.boxState = fishUserData.Fish_UserData.getBoxState(), 1 == this.boxState || 0 == this.boxState) ? (this.isShare = !0,
                    this.labDec.string = "开   启(" + this.shareCount + "s)", this.GetNodeByName("content/tgShare").active = !1) : 2 == this.boxState ? (this.labDec.string = "开   启",
                    this.GetNodeByName("content/tgShare").active = !1) : (this.GetNodeByName("content/btnGet").active = !1,
                    this.GetNodeByName("content/tgShare").active = !1, this.GetNodeByName("content/btnVioce").active = !0,
                    this.schedule(function() {
                        this.shareCount--, 0 > this.shareCount && !this.isLookVicoe ? (this.callback && this.callback(!0),
                            this.node.destroy()) : this.labDec.string = "开   启(" + this.shareCount + "s)";
                    }, 1));
            }, BoxPop.prototype.onGet = function() {
                var self = this;
                if (soundUtil.SoundUtil.PlayEffectByKey(1), this.isShare) {
                    var o = "shareType=2&time=" + new Date().getTime() + "&openId=" + commonData.default.getOpenId() + "&appId=" + commonData.default.getAppId();
                    commonData.default.share(eChannelPrefix.default.reward, o, function(t) {
                        return console.log("网络错误 :", t);
                    }, function(o) {
                        console.log("分享成功 :", o);
                        var e = comPage.ComPage.getRewardStr(self.rewards[self.boxState]);
                        comPage.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), fishUserData.Fish_UserData.addReward(self.rewards[self.boxState]),
                        self.callback && self.callback(!0), self.node.destroy();
                    }, function(t) {
                        console.log("失败：", t), comPage.ComPage.ShowTip("分享失败");
                    }, function(t) {
                        return console.log("complete:", t);
                    }, "", "", "", "", "");
                } else {
                    var e = comPage.ComPage.getRewardStr(this.rewards[this.boxState]);
                    comPage.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), fishUserData.Fish_UserData.addReward(this.rewards[this.boxState]),
                        this.callback && this.callback(!0), this.node.destroy();
                }
            }, BoxPop.prototype.onTgCheck = function() {}, BoxPop.prototype.onVioce = function() {
                var self = this;
                this.isLookVicoe = !0, define.Define.wxShowVideo("adunit-05d81b28867116ed", function(o) {
                    if (o) {
                        console.log("boxstate:" + self.boxState);
                        var e = comPage.ComPage.getRewardStr(self.rewards[self.boxState]);
                        comPage.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), fishUserData.Fish_UserData.addReward(self.rewards[self.boxState]),
                        self.callback && self.callback(!0), self.node.destroy();
                    } else self.isLookVicoe = !1;
                });
            }, BoxPop.prototype.onGet2 = function() {
                var self = this;
                soundUtil.SoundUtil.PlayEffectByKey(1), commonData.default.share(eChannelPrefix.default.reward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(o) {
                    if (console.log("成功 :", o), 0 == self.boxState) {
                        var e = comPage.ComPage.getRewardStr(self.rewards[self.boxState]);
                        comPage.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), fishUserData.Fish_UserData.addReward(self.rewards[self.boxState]);
                    } else self.rewards[self.boxState][0].num = 2 * self.rewards[self.boxState][0].num, e = comPage.ComPage.getRewardStr(self.rewards[self.boxState]),
                    comPage.ComPage.ShowTip("成功打开宝箱，恭喜获得" + e), fishUserData.Fish_UserData.addReward(self.rewards[self.boxState]);
                    self.callback && self.callback(!0), self.node.destroy();
                }, function(t) {
                    console.log("失败：", t), comPage.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, BoxPop.prototype.onClose = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), this.callback && this.callback(!1), this.node.destroy();
            }, BoxPop.prototype.update = function(t) {
                this.upTime += t, 1 < this.upTime && (this.isShare ? (this.shareCount--, 0 > this.shareCount ? (this.isShare = !1,
                        this.labDec.string = "分享开启", this.callback && this.callback(!0), this.node.destroy()) : this.labDec.string = "分享开启(" + this.shareCount + "s)") : this.labDec.string = "分享开启",
                    this.upTime = 0);
            }, __decorate([d(cc.Toggle)], BoxPop.prototype, "tgShare", void 0), __decorate([d(cc.Label)], BoxPop.prototype, "labDec", void 0),
            BoxPop = __decorate([h], BoxPop);
    }(nodeUtil.NodeUtil);
exports.default = BoxPop;