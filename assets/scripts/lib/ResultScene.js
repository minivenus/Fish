var o = require("./NodeUtil"),
    i = require("./Common_Data"),
    n = require("./ComPage"),
    a = require("./Common_RankList"),
    s = require("./Fish_UserData"),
    c = require("./EChannelPrefix"),
    r = require("./wxDisplayCheck"),
    l = require("./SoundUtil"),
    d = require("./FishCfgMgr"),
    h = require("./Common_GlobalEventUtil"),
    u = require("./ReadyGo"),
    p = cc._decorator,
    m = p.ccclass,
    f = p.property,
    g = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.richScore = null, t.labScoreDec2 = null, t;
        }
        return __extends(t, o), t.prototype.start = function() {
                try {
                    u.default.setVisible(2), this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare"), this.onShare),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnRank"), this.onRank),
                        this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnGroupRank"), this.onGroupRankShare),
                        a.default.showGameResultList(!0), h.GlobalEventUtil.on("showGroupList", function(t) {
                            t && r.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                                this.onGroupRank(t), r.default.onShowRes.query.group = null);
                        }.bind(this));
                    var l = s.Fish_UserData.getCurScore(),
                        e = 0;
                    if (0 <= l && 400 >= l ? e = .0375 * l : 401 <= l && 1500 >= l ? e = .06 * l : 1501 <= l && 3e4 >= l ? e = .00317 * l : 30001 <= l && 2e5 >= l && (e = 495e-6 * l),
                        e = 99 < e ? 99 : e, this.labScoreDec2.string = "你已超过全球" + e.toFixed(2) + "%的玩家",
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnRestart"), this.onRetGame),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnMoreGame"), this.onMoreGame),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnHome"), this.gonHome),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnChallenge"), this.onChallenge),
                        this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnHome"), this.hideRank),
                        this.richScore.string = "<b>" + s.Fish_UserData.getCurScore() + "</b>", this.GetNodeByName("content/btnRestart/spIcon").getComponent(cc.Sprite).spriteFrame = d.FishCfgMgr.getSkinSpriteFrameByKey(s.Fish_UserData.getCurSkin().toString() + "_1"),
                        s.Fish_UserData.getServerNewGift()) h.GlobalEventUtil.on("OpenAchie", function() {
                        var e = s.Fish_UserData.getTempList(),
                            t = d.FishCfgMgr.getAllTargetValidByArryType(e);
                        t && 0 < t.length ? (console.log("有成就完成"), console.log(t), n.ComPage.openAchievementPop(t)) : console.log("无成就完成");
                    }.bind(this)), s.Fish_UserData.setServerNewGift(!1), n.ComPage.openNewPop();
                    else {
                        var t = s.Fish_UserData.getTempList(),
                            o = d.FishCfgMgr.getAllTargetValidByArryType(t);
                        o && 0 < o.length ? (console.log("有成就完成"), console.log(o), n.ComPage.openAchievementPop(o)) : console.log("无成就完成");
                    }
                } catch (t) {
                    console.log("resultscene"), console.log(t);
                }
            }, t.prototype.onShare = function() {
                l.SoundUtil.PlayEffectByKey(1), i.default.shareScore2(s.Fish_UserData.getCurScore(), "856404236", s.Fish_UserData.getNickName());
            }, t.prototype.onChallenge = function() {
                l.SoundUtil.PlayEffectByKey(1), i.default.shareScore(s.Fish_UserData.getCurScore());
            }, t.prototype.onRetGame = function() {
                l.SoundUtil.PlayEffectByKey(1), cc.director.loadScene("Fish_Main");
            }, t.prototype.onMoreGame = function() {
                l.SoundUtil.PlayEffectByKey(1), i.default.showMoreGame();
            }, t.prototype.onRank = function() {
                l.SoundUtil.PlayEffectByKey(1), u.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0,
                    a.default.showFriendList(null);
            }, t.prototype.hideRank = function() {
                u.default.setVisible(0), this.GetNodeByName("btnRankBg").active = !1, a.default.showGameResultList();
            }, t.prototype.onGroupRank = function(t) {
                u.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0, a.default.showGroupList(t);
            }, t.prototype.onGroupRankShare = function() {
                l.SoundUtil.PlayEffectByKey(1), i.default.share(c.default.grouprank, "group=1", function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    console.log("成功 :", t), n.ComPage.ShowTip("分享成功，请点击群链接查看群排行");
                }, function(t) {
                    console.log("失败：", t), n.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.gonHome = function() {
                l.SoundUtil.PlayEffectByKey(1), cc.director.loadScene("GameScene");
            }, t.prototype.onDestroy = function() {
                h.GlobalEventUtil.offType("OpenAchie"), h.GlobalEventUtil.offType("showGroupList");
            }, __decorate([f(cc.RichText)], t.prototype, "richScore", void 0), __decorate([f(cc.Label)], t.prototype, "labScoreDec2", void 0),
            t = __decorate([m], t);
    }(o.NodeUtil);
exports.default = g;