var nodeUtil = require("./NodeUtil"),
    commonData = require("./Common_Data"),
    comPage = require("./ComPage"),
    fishCfgMgr = require("./FishCfgMgr"),
    util = require("./Util"),
    eChannelPrefix = require("./EChannelPrefix"),
    soundUtil = require("./SoundUtil"),
    fishUserData = require("./Fish_UserData"),
    define = require("./Define"),
    r = cc._decorator,
    c = r.ccclass,
    p = r.property,
    AchievementPop = function(__super) {
        function AchievementPop() {
            var AchievementPop = null !== __super && __super.apply(this, arguments) || this;
            return AchievementPop.ndReward = null, AchievementPop.content = null, AchievementPop.fbRewardItem = null, AchievementPop.fbTargetItem = null,
            AchievementPop.labDec = null, AchievementPop.isShare = !1, AchievementPop.shareCount = 10, AchievementPop.upTime = 0, AchievementPop.rewardName = ["金币x", "护盾x"],
            AchievementPop.shareMax = 1, AchievementPop.completeList = [], AchievementPop.rewardNums = [], AchievementPop.redata = [], AchievementPop.isLookVicoe = !1,
            AchievementPop;
        }
        return __extends(AchievementPop, __super), AchievementPop.prototype.start = function() {
                console.log("成就"), this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                    this.completeList && 0 < this.completeList.length && this.GetNodeByName("content/scrollview").getComponent("ComListView").init(this.completeList);
            }, AchievementPop.prototype.init = function(d) {
                if (d) {
                    this.completeList = d, this.isShare = !0, fishUserData.Fish_UserData.getShareOpen() ? (this.labDec.string = "分享得更多(" + this.shareCount + "s)",
                        this.GetNodeByName("content/btnShare1/labshare").active = !0) : (this.labDec.string = "双倍领取(" + this.shareCount + "s)",
                        this.GetNodeByName("content/btnShare1/spIcon").active = !0, this.GetNodeByName("content/btnShare1/labshare").active = !1,
                        this.GetNodeByName("content/btnShare1/Label").setPositionX(50));
                    for (var e = {}, t = 0; t < this.completeList.length; t++)
                        for (var o, n = 0; n < this.completeList[t].rewardType.length; n++) o = e[n],
                            o = null == o ? 0 : o, e[n] = o + this.completeList[t].rewardNum[n];
                    this.rewardNums = util.Util.objToArray(e);
                    for (var p = 0; p < this.rewardNums.length; p++) {
                        var m = cc.instantiate(this.fbRewardItem),
                            s = this.rewardName[p] + this.rewardNums[p];
                        m.getComponent(m.name).init(s, fishCfgMgr.FishCfgMgr.getRewardFrameByKey(p)), this.ndReward.addChild(m);
                        var c = {
                            type: p,
                            num: this.rewardNums[p]
                        };
                        this.redata.push(c);
                    }
                }
            }, AchievementPop.prototype.onGet = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1);
                var t = comPage.ComPage.getRewardStr(this.redata);
                comPage.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), fishUserData.Fish_UserData.addReward(this.redata), this.onClose();
            }, AchievementPop.prototype.onShare1 = function() {
                var r = this;
                if (fishUserData.Fish_UserData.getShareOpen()) {
                    var t = "shareType=3&time=" + new Date().getTime() + "&openId=" + commonData.default.getOpenId() + "&appId=" + commonData.default.getAppId();
                    commonData.default.share(eChannelPrefix.default.reward, t, function(t) {
                        return console.log("网络错误 :", t);
                    }, function(a) {
                        console.log("分享成功 :", a);
                        for (var e = 0; e < r.redata.length; e++) r.redata[e].num = r.redata[e].num;
                        fishUserData.Fish_UserData.addReward(r.redata);
                        var t = comPage.ComPage.getRewardStr(r.redata);
                        comPage.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), r.onClose();
                    }, function(t) {
                        console.log("失败：", t), comPage.ComPage.ShowTip("分享失败");
                    }, function(t) {
                        return console.log("complete:", t);
                    }, "", "", "", "", "");
                } else this.isLookVicoe = !0, define.Define.wxShowVideo("adunit-9f746fb5dc80bc8f", function(a) {
                    if (a) {
                        console.log("成就看视屏完成，获取双倍奖励");
                        for (var e = 0; e < r.redata.length; e++) r.redata[e].num = 2 * r.redata[e].num;
                        console.log(r.redata), fishUserData.Fish_UserData.addReward(r.redata);
                        var t = comPage.ComPage.getRewardStr(r.redata);
                        comPage.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), r.onClose();
                    } else console.log("成就看视屏未完成，继续倒计时"), r.isLookVicoe = !1;
                });
            }, AchievementPop.prototype.onShare = function() {
                var r = this;
                soundUtil.SoundUtil.PlayEffectByKey(1), commonData.default.share(eChannelPrefix.default.reward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(a) {
                    console.log("成功 :", a);
                    for (var e = 0; e < r.redata.length; e++) r.redata[e].num = 2 * r.redata[e].num;
                    fishUserData.Fish_UserData.addReward(r.redata);
                    var t = comPage.ComPage.getRewardStr(r.redata);
                    comPage.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), r.onClose();
                }, function(t) {
                    console.log("失败：", t), comPage.ComPage.ShowTip("分享失败"), r.onClose();
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, AchievementPop.prototype.onClose = function() {
                this.node.destroy();
            }, AchievementPop.prototype.update = function(dt) {
                this.upTime += dt, 1 < this.upTime && (this.isShare && !this.isLookVicoe && (this.shareCount--,
                        0 > this.shareCount ? (this.isShare = !1, this.labDec.string = fishUserData.Fish_UserData.getShareOpen() ? "分享得更多" : "双倍领取",
                            this.GetNodeByName("content/btnShare1").active = !1, this.GetNodeByName("content/btnGet").setPositionX(0),
                            this.GetNodeByName("content/btnGet").width = 500) : fishUserData.Fish_UserData.getShareOpen() ? this.labDec.string = "分享得更多(" + this.shareCount + "s)" : this.labDec.string = "双倍领取(" + this.shareCount + "s)"),
                    this.upTime = 0);
            }, __decorate([p(cc.Node)], AchievementPop.prototype, "ndReward", void 0), __decorate([p(cc.Node)], AchievementPop.prototype, "content", void 0),
            __decorate([p(cc.Prefab)], AchievementPop.prototype, "fbRewardItem", void 0), __decorate([p(cc.Prefab)], AchievementPop.prototype, "fbTargetItem", void 0),
            __decorate([p(cc.Label)], AchievementPop.prototype, "labDec", void 0), AchievementPop = __decorate([c], AchievementPop);
    }(nodeUtil.NodeUtil);
exports.default = AchievementPop;