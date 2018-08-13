var o = require("./NodeUtil"),
    f = require("./Common_Data"),
    n = require("./ComPage"),
    y = require("./FishCfgMgr"),
    l = require("./Util"),
    a = require("./EChannelPrefix"),
    s = require("./SoundUtil"),
    h = require("./Fish_UserData"),
    d = require("./Define"),
    r = cc._decorator,
    c = r.ccclass,
    p = r.property,
    m = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.ndReward = null, t.content = null, t.fbRewardItem = null, t.fbTargetItem = null,
                t.labDec = null, t.isShare = !1, t.shareCount = 10, t.upTime = 0, t.rewardName = ["金币x", "护盾x"],
                t.shareMax = 1, t.completeList = [], t.rewardNums = [], t.redata = [], t.isLookVicoe = !1,
                t;
        }
        return __extends(t, o), t.prototype.start = function() {
                console.log("成就"), this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                    this.completeList && 0 < this.completeList.length && this.GetNodeByName("content/scrollview").getComponent("ComListView").init(this.completeList);
            }, t.prototype.init = function(d) {
                if (d) {
                    this.completeList = d, this.isShare = !0, h.Fish_UserData.getShareOpen() ? (this.labDec.string = "分享得更多(" + this.shareCount + "s)",
                        this.GetNodeByName("content/btnShare1/labshare").active = !0) : (this.labDec.string = "双倍领取(" + this.shareCount + "s)",
                        this.GetNodeByName("content/btnShare1/spIcon").active = !0, this.GetNodeByName("content/btnShare1/labshare").active = !1,
                        this.GetNodeByName("content/btnShare1/Label").setPositionX(50));
                    for (var e = {}, t = 0; t < this.completeList.length; t++)
                        for (var o, n = 0; n < this.completeList[t].rewardType.length; n++) o = e[n],
                            o = null == o ? 0 : o, e[n] = o + this.completeList[t].rewardNum[n];
                    this.rewardNums = l.Util.objToArray(e);
                    for (var p = 0; p < this.rewardNums.length; p++) {
                        var m = cc.instantiate(this.fbRewardItem),
                            s = this.rewardName[p] + this.rewardNums[p];
                        m.getComponent(m.name).init(s, y.FishCfgMgr.getRewardFrameByKey(p)), this.ndReward.addChild(m);
                        var c = {
                            type: p,
                            num: this.rewardNums[p]
                        };
                        this.redata.push(c);
                    }
                }
            }, t.prototype.onGet = function() {
                s.SoundUtil.PlayEffectByKey(1);
                var t = n.ComPage.getRewardStr(this.redata);
                n.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), h.Fish_UserData.addReward(this.redata), this.onClose();
            }, t.prototype.onShare1 = function() {
                var r = this;
                if (h.Fish_UserData.getShareOpen()) {
                    var t = "shareType=3&time=" + new Date().getTime() + "&openId=" + f.default.getOpenId() + "&appId=" + f.default.getAppId();
                    f.default.share(a.default.reward, t, function(t) {
                        return console.log("网络错误 :", t);
                    }, function(a) {
                        console.log("分享成功 :", a);
                        for (var e = 0; e < r.redata.length; e++) r.redata[e].num = r.redata[e].num;
                        h.Fish_UserData.addReward(r.redata);
                        var t = n.ComPage.getRewardStr(r.redata);
                        n.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), r.onClose();
                    }, function(t) {
                        console.log("失败：", t), n.ComPage.ShowTip("分享失败");
                    }, function(t) {
                        return console.log("complete:", t);
                    }, "", "", "", "", "");
                } else this.isLookVicoe = !0, d.Define.wxShowVideo("adunit-9f746fb5dc80bc8f", function(a) {
                    if (a) {
                        console.log("成就看视屏完成，获取双倍奖励");
                        for (var e = 0; e < r.redata.length; e++) r.redata[e].num = 2 * r.redata[e].num;
                        console.log(r.redata), h.Fish_UserData.addReward(r.redata);
                        var t = n.ComPage.getRewardStr(r.redata);
                        n.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), r.onClose();
                    } else console.log("成就看视屏未完成，继续倒计时"), r.isLookVicoe = !1;
                });
            }, t.prototype.onShare = function() {
                var r = this;
                s.SoundUtil.PlayEffectByKey(1), f.default.share(a.default.reward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(a) {
                    console.log("成功 :", a);
                    for (var e = 0; e < r.redata.length; e++) r.redata[e].num = 2 * r.redata[e].num;
                    h.Fish_UserData.addReward(r.redata);
                    var t = n.ComPage.getRewardStr(r.redata);
                    n.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), r.onClose();
                }, function(t) {
                    console.log("失败：", t), n.ComPage.ShowTip("分享失败"), r.onClose();
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.onClose = function() {
                this.node.destroy();
            }, t.prototype.update = function(t) {
                this.upTime += t, 1 < this.upTime && (this.isShare && !this.isLookVicoe && (this.shareCount--,
                        0 > this.shareCount ? (this.isShare = !1, this.labDec.string = h.Fish_UserData.getShareOpen() ? "分享得更多" : "双倍领取",
                            this.GetNodeByName("content/btnShare1").active = !1, this.GetNodeByName("content/btnGet").setPositionX(0),
                            this.GetNodeByName("content/btnGet").width = 500) : h.Fish_UserData.getShareOpen() ? this.labDec.string = "分享得更多(" + this.shareCount + "s)" : this.labDec.string = "双倍领取(" + this.shareCount + "s)"),
                    this.upTime = 0);
            }, __decorate([p(cc.Node)], t.prototype, "ndReward", void 0), __decorate([p(cc.Node)], t.prototype, "content", void 0),
            __decorate([p(cc.Prefab)], t.prototype, "fbRewardItem", void 0), __decorate([p(cc.Prefab)], t.prototype, "fbTargetItem", void 0),
            __decorate([p(cc.Label)], t.prototype, "labDec", void 0), t = __decorate([c], t);
    }(o.NodeUtil);
exports.default = m;