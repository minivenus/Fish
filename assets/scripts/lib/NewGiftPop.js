var NodeUtil = require("./NodeUtil"),
    Common_Data = require("./Common_Data"),
    EChannelPrefix = require("./EChannelPrefix"),
    ComPage = require("./ComPage"),
    SoundUtil = require("./SoundUtil"),
    Fish_UserData = require("./Fish_UserData"),
    Common_GlobalEventUtil = require("./Common_GlobalEventUtil"),
    Define = require("./Define"),
    h = cc._decorator,
    d = h.ccclass,
    u = h.property,
    p = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.tgShare = null, t.labDec = null, t.reward = 100, t.isLookVicoe = !1, t.isShare = !1,
                t.shareCount = 10, t.upTime = 0, t;
        }
        return __extends(t, o), t.prototype.start = function() {
                (this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                Fish_UserData.Fish_UserData.getShareOpen()) ? (this.isShare = !0, this.labDec.string = "领 取(" + this.shareCount + "s)",
                    this.tgShare.node.active = !0) : (this.tgShare.node.active = !1, this.GetNodeByName("content/btnGet").active = !0,
                    this.GetNodeByName("content/btnVioce").active = !0, this.GetNodeByName("content/btnGet").setPositionX(-223),
                    this.GetNodeByName("content/btnVioce").setPositionX(157), this.GetNodeByName("content/btnGet").width = 312,
                    this.schedule(function() {
                        this.isLookVicoe || (this.shareCount--, 0 > this.shareCount ? (this.unscheduleAllCallbacks(),
                            this.GetNodeByName("content/btnGet").setPositionX(0), this.GetNodeByName("content/btnGet").width = 500,
                            this.GetNodeByName("content/btnVioce").active = !1) : this.GetNodeByName("content/btnVioce/Label").getComponent(cc.Label).string = "5倍领取(" + this.shareCount + "s)");
                    }, 1));
            }, t.prototype.onVioce = function() {
                var n = this;
                this.isLookVicoe = !0, Define.Define.wxShowVideo("adunit-5602359f49dbd917", function(r) {
                    if (r) {
                        n.unscheduleAllCallbacks();
                        var e = [{
                                type: 0,
                                num: 5 * n.reward
                            }],
                            t = ComPage.ComPage.getRewardStr(e);
                            ComPage.ComPage.ShowTip("领取新手奖励" + t + "成功\n继续游戏还有更多奖励"), Fish_UserData.Fish_UserData.addReward(e),
                            n.node.destroy();
                    } else n.isLookVicoe = !1;
                });
            }, t.prototype.onGet = function() {
                var d = this;
                SoundUtil.SoundUtil.PlayEffectByKey(1);
                var l = [{
                    type: 0,
                    num: this.reward
                }];
                if (this.isShare) {
                    var e = "shareType=4&time=" + new Date().getTime() + "&openId=" + Common_Data.default.getOpenId() + "&appId=" + Common_Data.default.getAppId();
                    Common_Data.default.share(EChannelPrefix.default.reward, e, function(t) {
                        return console.log("网络错误 :", t);
                    }, function(n) {
                        console.log("分享成功 :", n);
                        var e = [{
                                type: 0,
                                num: d.reward
                            }],
                            t = ComPage.ComPage.getRewardStr(e);
                            ComPage.ComPage.ShowTip("领取新手奖励" + t + "成功\n继续游戏还有更多奖励"), Fish_UserData.Fish_UserData.addReward(e),
                            d.node.destroy();
                    }, function(t) {
                        ComPage.ComPage.ShowTip("分享失败"), console.log("失败：", t);
                    }, function(t) {
                        return console.log("complete:", t);
                    }, "", "", "", "", "");
                } else {
                    var t = ComPage.ComPage.getRewardStr(l);
                    ComPage.ComPage.ShowTip("领取新手奖励" + t + "成功\n继续游戏还有更多奖励"), Fish_UserData.Fish_UserData.addReward(l),
                    Common_GlobalEventUtil.GlobalEventUtil.emit("OpenAchie"), this.node.destroy();
                }
            }, t.prototype.onGet5 = function() {
                var r = this;
                SoundUtil.SoundUtil.PlayEffectByKey(1), Common_Data.default.share(EChannelPrefix.default.reward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(n) {
                    console.log("成功 :", n);
                    var e = [{
                            type: 0,
                            num: 5 * r.reward
                        }],
                        t = ComPage.ComPage.getRewardStr(e);
                        ComPage.ComPage.ShowTip("领取新手奖励" + t + "成功\n继续游戏还有更多奖励"), Fish_UserData.Fish_UserData.addReward(e),
                        r.node.destroy();
                }, function(t) {
                    ComPage.ComPage.ShowTip("分享失败"), console.log("失败：", t);
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.onTgCheck = function() {
                this.tgShare.isChecked || (console.log("关闭分享"), this.isShare = !1, this.labDec.string = "领 取",
                    this.GetNodeByName("content/tgShare").active = !1);
            }, t.prototype.update = function(t) {
                this.upTime += t, 1 < this.upTime && (this.isShare ? (this.shareCount--, 0 > this.shareCount ? (this.isShare = !1,
                        this.labDec.string = "领 取", this.GetNodeByName("content/tgShare").active = !1) : this.labDec.string = "领 取(" + this.shareCount + "s)") : this.labDec.string = "领 取",
                    this.upTime = 0);
            }, __decorate([u(cc.Toggle)], t.prototype, "tgShare", void 0), __decorate([u(cc.Label)], t.prototype, "labDec", void 0),
            t = __decorate([d], t);
    }(NodeUtil.NodeUtil);
exports.default = p;