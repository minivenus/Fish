var o = require("./Common_RankList"),
    S = require("./utils/NodeUtil"),
    b = require("./Common_Data"),
    h = require("./ComPage"),
    n = require("./FishCfgMgr"),
    d = require("./Fish_UserData"),
    a = require("./EChannelPrefix"),
    s = require("./wxDisplayCheck"),
    c = require("./Common_GlobalEventUtil"),
    r = require("./SoundUtil"),
    l = require("./ReadyGo"),
    p = require("./Common_CommonUtil"),
    m = require("./Define"),
    g = cc._decorator,
    u = g.ccclass,
    _ = (g.property,
        function(g) {
            function t() {
                var t = null !== g && g.apply(this, arguments) || this;
                return t.isFrist = !1, t.isLoad = !0, t.gameClub = null, t;
            }
            return __extends(t, g), t.prototype.ontest = function() {}, t.prototype.start = function() {
                d.Fish_UserData.Init ? this.init() : (d.Fish_UserData.Init = !0, d.Fish_UserData.initUserDataByServer(function(t) {
                    t || d.Fish_UserData.initUserDataByLocal(), this.init();
                }.bind(this)));
            }, t.prototype.initGame = function() {
                var e = this;
                console.log("初始化主页场景"), l.default.setVisible(2), p.default.isWeChat() && (this.gameClub = wx.createGameClubButton({
                        icon: "white",
                        style: {
                            left: 10,
                            top: 40,
                            width: 40,
                            height: 40
                        }
                    })), c.GlobalEventUtil.on("UpdateGold", function() {
                        this.GetNodeByName("content/labGold").getComponent(cc.Label).string = d.Fish_UserData.getGold().toString();
                    }.bind(this)), c.GlobalEventUtil.on("UpdateSkin", function() {
                        this.GetNodeByName("content/btnStart/spIcon").getComponent(cc.Sprite).spriteFrame = n.FishCfgMgr.getSkinSpriteFrameByKey(d.Fish_UserData.getCurSkin().toString() + "_1");
                    }.bind(this)), c.GlobalEventUtil.on("PostShare", function() {
                        this.postShare();
                    }.bind(this)), c.GlobalEventUtil.on("showGroupList", function(t) {
                        t && s.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                            this.onGroupRank(t), s.default.onShowRes.query.group = null);
                    }.bind(this)), d.Fish_UserData.checkSignValid(), d.Fish_UserData.getFristGame() ? (console.log("首次进入游戏"),
                        this.node.getChildByName("rankBg").active = !1, this.GetNodeByName("content/btnRank").active = !1,
                        this.GetNodeByName("content/labGold").setPositionY(this.GetNodeByName("content/labGold").y + 300),
                        this.GetNodeByName("content/btnStart").setPositionY(this.GetNodeByName("content/btnStart").y + 100),
                        this.GetNodeByName("content/btnChall").setPositionY(this.GetNodeByName("content/btnChall").y + 100),
                        this.GetNodeByName("content/spBgStart").setPositionY(this.GetNodeByName("content/spBgStart").y + 100),
                        this.GetNodeByName("content/spBgChall").setPositionY(this.GetNodeByName("content/spBgChall").y + 100),
                        this.GetNodeByName("content/btnShop").setPositionY(this.GetNodeByName("content/btnShop").y + 100),
                        this.GetNodeByName("content/btnMore").setPositionY(this.GetNodeByName("content/btnMore").y + 100)) : (o.default.showGameResultList(),
                        console.log("排行榜事件"), this.AddButtonEventStart(this, this.GetNodeByName("content/btnRank"), this.onRank)),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/labGold/spGold"), this.onOpenShop),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnShop"), this.onOpenShop),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnMore"), this.onMoreGame),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnStart"), this.onStartGame),
                    this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnHome"), this.goHome),
                    this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnGroupRank"), this.onGroupRankShare),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnChall"), this.onChallenge),
                    this.GetNodeByName("content/labGold").getComponent(cc.Label).string = d.Fish_UserData.getGold().toString(),
                    this.GetNodeByName("content/btnStart/spIcon").getComponent(cc.Sprite).spriteFrame = n.FishCfgMgr.getSkinSpriteFrameByKey(d.Fish_UserData.getCurSkin().toString() + "_1"),
                    this.isFrist = d.Fish_UserData.getFristGame(), s.default.onShowRes && s.default.onShowRes.shareTicket && s.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                        this.onGroupRank(s.default.onShowRes.shareTicket), s.default.onShowRes.query.group = null),
                    m.Define.checkPlayerStatus(function() {
                        e.GetNodeByName("content/labGold").getComponent(cc.Label).string = d.Fish_UserData.getGold().toString();
                    });
            }, t.prototype.postShare = function() {
                if (s.default.onShowRes && s.default.onShowRes.query && s.default.onShowRes.query.shareType && s.default.onShowRes.query.time) {
                    if (console.log("分享奖励 存在"), console.log(s.default.onShowRes.query.openId), b.default.getOpenId() == s.default.onShowRes.query.openId) return void console.log("分享奖励，点击是本人，不上传");
                    m.Define.postShareReward(s.default.onShowRes.query.shareType, s.default.onShowRes.query.time, s.default.onShowRes.query.appId, s.default.onShowRes.query.openId);
                }
            }, t.prototype.init = function() {
                var p = this;
                if (console.log("进入主页 init"), this.postShare(), d.Fish_UserData.setAgainGame(!1),
                    m.Define.getShareRawardBySer(b.default.getAppId(), function(t) {
                        t && (console.log("分享奖励 存在配置"), m.Define.checkShareReward(b.default.getAppId(), b.default.getOpenId(), function(l) {
                            if ("{}" !== JSON.stringify(l)) {
                                for (var e, g = "", t = 0; t < m.Define.ShareTypes.length; t++)
                                    if (e = l[m.Define.ShareTypes[t]],
                                        console.log(e), null != e) {
                                        console.log("分享奖励 存在类型：" + m.Define.ShareTypes[t]), console.log(e);
                                        for (var o, a = 0; a < e.length; a++)
                                            if (o = m.Define.getShareRewardByID(e[a].share_type),
                                                console.log("查找奖励结果"), console.log(o), o) {
                                                var n = [o],
                                                    s = h.ComPage.getRewardStr(n),
                                                    c = m.Define.getShareStrByID(e[a].share_type);
                                                h.ComPage.ShowTip("恭喜获得分享" + c + "奖励：" + s), d.Fish_UserData.addReward(n), g = "" == g ? "" : ",",
                                                    g += e[a].id;
                                            } else console.log("分享奖励 没找到奖励类型：" + e[a].share_type);
                                    }
                                    "" == g ? console.log("分享奖励 没有奖励发放") : (p.GetNodeByName("content/labGold").getComponent(cc.Label).string = d.Fish_UserData.getGold().toString(),
                                    m.Define.updateShareReward(g, b.default.getOpenId()));
                            }
                        }, null));
                    }, null), "" != d.Fish_UserData.challRoomID) try {
                    console.log("chall 挑战 主页进入房间：" + d.Fish_UserData.challRoomID), m.Define.joinRoom(d.Fish_UserData.challRoomID, function(t) {
                        switch (console.log("chall 挑战 主页进入房间返回成功 "), console.log(t), t.rcode) {
                            case m.Define_Chall_Status.NORMAL:
                            case m.Define_Chall_Status.ALREADYINCURROOM:
                            case m.Define_Chall_Status.REWARDUNRECEIVE:
                            case m.Define_Chall_Status.ALREADYINOTHERROOM:
                            case m.Define_Chall_Status.ROOMEXPIRE:
                                return console.log("chall 挑战 主页切换进入房间 "), void cc.director.loadScene("ChallengeScene");

                            case m.Define_Chall_Status.OVERSIZE:
                            case m.Define_Chall_Status.ROOMNOEXIST:
                            case m.Define_Chall_Status.OVERSIZE:
                                console.log("chall 挑战 房间不存在 留在主页 "), p.initGame();
                                break;

                            default:
                                p.initGame();
                        }
                    });
                } catch (t) {
                    console.log("chall 挑战 主页进入房间错误"), console.log(t);
                } else console.log("进入主页场景"), this.initGame();
            }, t.prototype.update = function() {
                this.isLoad && (this.isLoad = !1);
            }, t.prototype.onStartGame = function() {
                r.SoundUtil.PlayEffectByKey(1), 0 == this.isLoad && (this.isFrist ? console.log("进入新手引导") : console.log("进入游戏界面"),
                    cc.director.loadScene("Fish_Main"));
            }, t.prototype.onChallenge = function() {
                r.SoundUtil.PlayEffectByKey(1), m.Define.createFishRoom(function(t) {
                    t && (t.rcode == m.Define_Chall_Status.NORMAL || m.Define_Chall_Status.ALREADYINOTHERROOM || m.Define_Chall_Status.REWARDUNRECEIVE ? (console.log("chall 挑战 房间号获取成功，进入房间：" + t.data.roomId),
                        d.Fish_UserData.challRoomID = t.data.roomId, b.default.share(a.default.pageshare, "chall=" + d.Fish_UserData.challRoomID, function(t) {
                            return console.log("网络错误 :", t);
                        }, function(t) {
                            console.log("成功 :", t), cc.director.loadScene("ChallengeScene");
                        }, function(t) {
                            console.log("失败：", t), cc.director.loadScene("ChallengeScene");
                        }, function(t) {
                            return console.log("complete:", t);
                        }, "", "", "", "", "")) : (console.log("chall 挑战 创建房间无有效房间状态：" + t.rcode), h.ComPage.ShowTip("无法发起挑战，请稍后再试。")));
                });
            }, t.prototype.onOpenShop = function() {
                r.SoundUtil.PlayEffectByKey(1), h.ComPage.openShop();
            }, t.prototype.onMoreGame = function() {
                r.SoundUtil.PlayEffectByKey(1), b.default.showMoreGame();
            }, t.prototype.onRank = function() {
                r.SoundUtil.PlayEffectByKey(1), l.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0,
                    o.default.showFriendList(null);
            }, t.prototype.onGroupRank = function(t) {
                l.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0, o.default.showGroupList(t);
            }, t.prototype.hideRank = function() {
                l.default.setVisible(0), this.GetNodeByName("btnRankBg").active = !1, d.Fish_UserData.getFristGame() || o.default.showGameResultList();
            }, t.prototype.onGroupRankShare = function() {
                r.SoundUtil.PlayEffectByKey(1), b.default.share(a.default.grouprank, "group=1", function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    console.log("成功 :", t), h.ComPage.ShowTip("分享成功，请点击群链接查看群排行");
                }, function(t) {
                    console.log("失败：", t), h.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.goHome = function() {
                r.SoundUtil.PlayEffectByKey(1), d.Fish_UserData.getFristGame() && (l.default.setVisible(0),
                    this.node.getChildByName("rankShow").active = !1), this.hideRank();
            }, t.prototype.onDestroy = function() {
                this.gameClub && this.gameClub.destroy(), c.GlobalEventUtil.offType("UpdateGold"),
                    c.GlobalEventUtil.offType("UpdateSkin"), c.GlobalEventUtil.offType("showGroupList"),
                    c.GlobalEventUtil.offType("PostShare");
            }, t = __decorate([u], t);
        }(S.NodeUtil));
exports.default = _;