var o = require("./NodeUtil"),
    _ = require("./Common_Data"),
    n = require("./ComPage"),
    i = require("./FishCfgMgr"),
    l = require("./Util"),
    a = require("./EChannelPrefix"),
    s = require("./SoundUtil"),
    d = require("./Fish_UserData"),
    c = cc._decorator,
    r = c.ccclass,
    u = c.property,
    p = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.ndReward = null, t.content = null, t.fbRewardItem = null, t.fbTargetItem = null,
                t.rewardName = ["金币x", "护盾x"], t.shareMax = 1, t.completeList = [], t.rewardNums = [],
                t.redata = [], t;
        }
        return __extends(t, o), t.prototype.start = function() {
                console.log("成就"), this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare"), this.onShare),
                    this.completeList && 0 < this.completeList.length && this.GetNodeByName("content/scrollview").getComponent("ComListView").init(this.completeList);
            }, t.prototype.init = function(p) {
                if (p) {
                    this.completeList = p, (this.completeList.length < this.shareMax || !d.Fish_UserData.getShareOpen()) && (this.GetNodeByName("content/btnShare").active = !1,
                        this.GetNodeByName("content/btnGet").setPositionX(0), this.GetNodeByName("content/btnGet").width = 500);
                    for (var e = {}, t = 0; t < this.completeList.length; t++)
                        for (var o, n = 0; n < this.completeList[t].rewardType.length; n++) o = e[n],
                            o = null == o ? 0 : o, e[n] = o + this.completeList[t].rewardNum[n];
                    this.rewardNums = l.Util.objToArray(e);
                    for (var m = 0; m < this.rewardNums.length; m++) {
                        var g = cc.instantiate(this.fbRewardItem),
                            s = this.rewardName[m] + this.rewardNums[m];
                        g.getComponent(g.name).init(s, i.FishCfgMgr.getRewardFrameByKey(m)), this.ndReward.addChild(g);
                        var c = {
                            type: m,
                            num: this.rewardNums[m]
                        };
                        this.redata.push(c);
                    }
                }
            }, t.prototype.onGet = function() {
                s.SoundUtil.PlayEffectByKey(1);
                var t = n.ComPage.getRewardStr(this.redata);
                n.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), d.Fish_UserData.addReward(this.redata), this.onClose();
            }, t.prototype.onShare = function() {
                var r = this;
                s.SoundUtil.PlayEffectByKey(1), _.default.share(a.default.reward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(a) {
                    console.log("成功 :", a);
                    for (var e = 0; e < r.redata.length; e++) r.redata[e].num = 2 * r.redata[e].num;
                    d.Fish_UserData.addReward(r.redata);
                    var t = n.ComPage.getRewardStr(r.redata);
                    n.ComPage.ShowTip("顺利达成目标，恭喜获得" + t), r.onClose();
                }, function(t) {
                    console.log("失败：", t), n.ComPage.ShowTip("分享失败"), r.onClose();
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.onClose = function() {
                this.node.destroy();
            }, __decorate([u(cc.Node)], t.prototype, "ndReward", void 0), __decorate([u(cc.Node)], t.prototype, "content", void 0),
            __decorate([u(cc.Prefab)], t.prototype, "fbRewardItem", void 0), __decorate([u(cc.Prefab)], t.prototype, "fbTargetItem", void 0),
            t = __decorate([r], t);
    }(o.NodeUtil);
exports.default = p;