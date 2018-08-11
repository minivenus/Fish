var o = require("./Common_RankList"),
    i = require("./utils/NodeUtil"),
    n = require("./Common_Data"),
    a = require("./ComPage"),
    s = require("./FishCfgMgr"),
    c = require("./Fish_UserData"),
    r = require("./EChannelPrefix"),
    l = require("./wxDisplayCheck"),
    d = require("./Common_GlobalEventUtil"),
    h = require("./SoundUtil"),
    u = require("./ReadyGo"),
    p = require("./Common_CommonUtil"),
    m = cc._decorator,
    f = m.ccclass,
    g = (m.property,
        function(i) {
            function t() {
                var t = null !== i && i.apply(this, arguments) || this;
                return t.isFrist = !1, t.isLoad = !0, t.gameClub = null, t;
            }
            return __extends(t, i), t.prototype.ontest = function() {
                c.Fish_UserData.setGold(0), c.Fish_UserData.setCurSkin(0), c.Fish_UserData.setHaveSkins([0]),
                    c.Fish_UserData.setProtect(0), c.Fish_UserData.setHeightScore(0), c.Fish_UserData.setServerNewGift(!0),
                    c.Fish_UserData.setFristGame(!0), c.Fish_UserData.setSign(""), c.Fish_UserData.setCompleteList([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            }, t.prototype.start = function() {
                c.Fish_UserData.Init ? this.init() : (c.Fish_UserData.Init = !0, c.Fish_UserData.initUserDataByServer(function(t) {
                    t || c.Fish_UserData.initUserDataByLocal(), this.init();
                }.bind(this)));
            }, t.prototype.init = function() {
                u.default.setVisible(2), p.default.isWeChat() && (this.gameClub = wx.createGameClubButton({
                        icon: "white",
                        style: {
                            left: 10,
                            top: 40,
                            width: 40,
                            height: 40
                        }
                    })), d.GlobalEventUtil.on("UpdateGold", function() {
                        this.GetNodeByName("content/labGold").getComponent(cc.Label).string = c.Fish_UserData.getGold().toString();
                    }.bind(this)), d.GlobalEventUtil.on("UpdateSkin", function() {
                        this.GetNodeByName("content/btnStart/spIcon").getComponent(cc.Sprite).spriteFrame = s.FishCfgMgr.getSkinSpriteFrameByKey(c.Fish_UserData.getCurSkin().toString() + "_1");
                    }.bind(this)), d.GlobalEventUtil.on("showGroupList", function(t) {
                        t && l.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                            this.onGroupRank(t), l.default.onShowRes.query.group = null);
                    }.bind(this)), c.Fish_UserData.checkSignValid(), c.Fish_UserData.getFristGame() ? (this.node.getChildByName("rankBg").active = !1,
                        this.GetNodeByName("content/btnRank").active = !1, this.GetNodeByName("content/labGold").setPositionY(this.GetNodeByName("content/labGold").y + 300),
                        this.GetNodeByName("content/btnStart").setPositionY(this.GetNodeByName("content/btnStart").y + 100),
                        this.GetNodeByName("content/btnShop").setPositionY(this.GetNodeByName("content/btnShop").y + 100),
                        this.GetNodeByName("content/btnMore").setPositionY(this.GetNodeByName("content/btnMore").y + 100),
                        this.GetNodeByName("content/label").setPositionY(this.GetNodeByName("content/label").y + 100)) : (o.default.showGameResultList(),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnRank"), this.onRank)),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/labGold/spGold"), this.onOpenShop),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnShop"), this.onOpenShop),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnMore"), this.onMoreGame),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnStart"), this.onStartGame),
                    this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnHome"), this.goHome),
                    this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnGroupRank"), this.onGroupRankShare),
                    this.GetNodeByName("content/labGold").getComponent(cc.Label).string = c.Fish_UserData.getGold().toString(),
                    this.GetNodeByName("content/btnStart/spIcon").getComponent(cc.Sprite).spriteFrame = s.FishCfgMgr.getSkinSpriteFrameByKey(c.Fish_UserData.getCurSkin().toString() + "_1"),
                    this.isFrist = c.Fish_UserData.getFristGame(), l.default.onShowRes && l.default.onShowRes.shareTicket && l.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                        this.onGroupRank(l.default.onShowRes.shareTicket), l.default.onShowRes.query.group = null);
            }, t.prototype.update = function() {
                this.isLoad && (this.isLoad = !1);
            }, t.prototype.onStartGame = function() {
                h.SoundUtil.PlayEffectByKey(1), 0 == this.isLoad && (this.isFrist ? console.log("进入新手引导") : console.log("进入游戏界面"),
                    cc.director.loadScene("Fish_Main"));
            }, t.prototype.onOpenShop = function() {
                h.SoundUtil.PlayEffectByKey(1), a.ComPage.openShop();
            }, t.prototype.onMoreGame = function() {
                h.SoundUtil.PlayEffectByKey(1), n.default.showMoreGame();
            }, t.prototype.onRank = function() {
                h.SoundUtil.PlayEffectByKey(1), u.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0,
                    o.default.showFriendList(null);
            }, t.prototype.onGroupRank = function(t) {
                u.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0, o.default.showGroupList(t);
            }, t.prototype.hideRank = function() {
                u.default.setVisible(0), this.GetNodeByName("btnRankBg").active = !1, c.Fish_UserData.getFristGame() || o.default.showGameResultList();
            }, t.prototype.onGroupRankShare = function() {
                h.SoundUtil.PlayEffectByKey(1), n.default.share(r.default.grouprank, "group=1", function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    console.log("成功 :", t), a.ComPage.ShowTip("分享成功，请点击群链接查看群排行");
                }, function(t) {
                    console.log("失败：", t), a.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.goHome = function() {
                h.SoundUtil.PlayEffectByKey(1), c.Fish_UserData.getFristGame() && (u.default.setVisible(0),
                    this.node.getChildByName("rankShow").active = !1), this.hideRank();
            }, t.prototype.onDestroy = function() {
                this.gameClub.destroy(), d.GlobalEventUtil.offType("UpdateGold"), d.GlobalEventUtil.offType("UpdateSkin"),
                    d.GlobalEventUtil.offType("showGroupList");
            }, t = __decorate([f], t);
        }(i.NodeUtil));
exports.default = g;