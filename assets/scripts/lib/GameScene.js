var common_RankList = require("./Common_RankList"),
    nodeUtil = require("./NodeUtil"),
    commonData = require("./Common_Data"),
    comPage = require("./ComPage"),
    fishCfgMgr = require("./FishCfgMgr"),
    fishUserData = require("./Fish_UserData"),
    eChannelPrefix = require("./EChannelPrefix"),
    wxDisplayCheck = require("./wxDisplayCheck"),
    commonGlobalEventUtil = require("./Common_GlobalEventUtil"),
    soundUtil = require("./SoundUtil"),
    readyGo = require("./ReadyGo"),
    commonUtil = require("./Common_CommonUtil"),
    define = require("./Define"),
    g = cc._decorator,
    u = g.ccclass,
    GameScene = (g.property,
        function(__super) {
            function GameScene() {
                var GameScene = null !== __super && __super.apply(this, arguments) || this;
                return GameScene.isFrist = !1, GameScene.isLoad = !0, GameScene.gameClub = null, GameScene;
            }
            return __extends(GameScene, __super), GameScene.prototype.ontest = function() {}, GameScene.prototype.start = function() {
                fishUserData.Fish_UserData.Init ? this.init() : (fishUserData.Fish_UserData.Init = !0, //d.Fish_UserData.initUserDataByServer(function(t) {
                    GameScene || fishUserData.Fish_UserData.initUserDataByLocal(), this.init());
                //}.bind(this)));
            }, GameScene.prototype.initGame = function() {
                var self = this;
                console.log("初始化主页场景"), readyGo.default.setVisible(2), commonUtil.default.isWeChat() && (this.gameClub = wx.createGameClubButton({
                        icon: "white",
                        style: {
                            left: 10,
                            top: 40,
                            width: 40,
                            height: 40
                        }
                    })), commonGlobalEventUtil.GlobalEventUtil.on("UpdateGold", function() {
                        this.GetNodeByName("content/labGold").getComponent(cc.Label).string = fishUserData.Fish_UserData.getGold().toString();
                    }.bind(this)), commonGlobalEventUtil.GlobalEventUtil.on("UpdateSkin", function() {
                        this.GetNodeByName("content/btnStart/spIcon").getComponent(cc.Sprite).spriteFrame = fishCfgMgr.FishCfgMgr.getSkinSpriteFrameByKey(fishUserData.Fish_UserData.getCurSkin().toString() + "_1");
                    }.bind(this)), commonGlobalEventUtil.GlobalEventUtil.on("PostShare", function() {
                        this.postShare();
                    }.bind(this)), commonGlobalEventUtil.GlobalEventUtil.on("showGroupList", function(t) {
                        t && wxDisplayCheck.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                            this.onGroupRank(t), wxDisplayCheck.default.onShowRes.query.group = null);
                    }.bind(this)), fishUserData.Fish_UserData.checkSignValid(), fishUserData.Fish_UserData.getFristGame() ? (console.log("首次进入游戏"),
                        this.node.getChildByName("rankBg").active = !1, this.GetNodeByName("content/btnRank").active = !1,
                        this.GetNodeByName("content/labGold").setPositionY(this.GetNodeByName("content/labGold").y + 300),
                        this.GetNodeByName("content/btnStart").setPositionY(this.GetNodeByName("content/btnStart").y + 100),
                        this.GetNodeByName("content/btnChall").setPositionY(this.GetNodeByName("content/btnChall").y + 100),
                        this.GetNodeByName("content/spBgStart").setPositionY(this.GetNodeByName("content/spBgStart").y + 100),
                        this.GetNodeByName("content/spBgChall").setPositionY(this.GetNodeByName("content/spBgChall").y + 100),
                        this.GetNodeByName("content/btnShop").setPositionY(this.GetNodeByName("content/btnShop").y + 100),
                        this.GetNodeByName("content/btnMore").setPositionY(this.GetNodeByName("content/btnMore").y + 100)) : (common_RankList.default.showGameResultList(),
                        console.log("排行榜事件"), this.AddButtonEventStart(this, this.GetNodeByName("content/btnRank"), this.onRank)),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/labGold/spGold"), this.onOpenShop),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnShop"), this.onOpenShop),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnMore"), this.onMoreGame),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnStart"), this.onStartGame),
                        this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnHome"), this.goHome),
                        this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnGroupRank"), this.onGroupRankShare),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnChall"), this.onChallenge),
                        this.GetNodeByName("content/labGold").getComponent(cc.Label).string = fishUserData.Fish_UserData.getGold().toString(),
                        this.GetNodeByName("content/btnStart/spIcon").getComponent(cc.Sprite).spriteFrame = fishCfgMgr.FishCfgMgr.getSkinSpriteFrameByKey(fishUserData.Fish_UserData.getCurSkin().toString() + "_1"),
                        this.isFrist = fishUserData.Fish_UserData.getFristGame(), wxDisplayCheck.default.onShowRes && wxDisplayCheck.default.onShowRes.shareTicket && wxDisplayCheck.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                        this.onGroupRank(wxDisplayCheck.default.onShowRes.shareTicket), wxDisplayCheck.default.onShowRes.query.group = null),
                        define.Define.checkPlayerStatus(function() {
                            self.GetNodeByName("content/labGold").getComponent(cc.Label).string = fishUserData.Fish_UserData.getGold().toString();
                    });
            }, GameScene.prototype.postShare = function() {
                if (wxDisplayCheck.default.onShowRes && wxDisplayCheck.default.onShowRes.query && wxDisplayCheck.default.onShowRes.query.shareType && wxDisplayCheck.default.onShowRes.query.time) {
                    if (console.log("分享奖励 存在"), console.log(wxDisplayCheck.default.onShowRes.query.openId), commonData.default.getOpenId() == wxDisplayCheck.default.onShowRes.query.openId) return void console.log("分享奖励，点击是本人，不上传");
                    define.Define.postShareReward(wxDisplayCheck.default.onShowRes.query.shareType, wxDisplayCheck.default.onShowRes.query.time, wxDisplayCheck.default.onShowRes.query.appId, wxDisplayCheck.default.onShowRes.query.openId);
                }
            }, GameScene.prototype.init = function() {
                var self = this;
                if (console.log("进入主页 init"), this.postShare(), fishUserData.Fish_UserData.setAgainGame(!1),
                define.Define.getShareRawardBySer(commonData.default.getAppId(), function(t) {
                        t && (console.log("分享奖励 存在配置"), define.Define.checkShareReward(commonData.default.getAppId(), commonData.default.getOpenId(), function(l) {
                            if ("{}" !== JSON.stringify(l)) {
                                for (var e, g = "", t = 0; t < define.Define.ShareTypes.length; t++)
                                    if (e = l[define.Define.ShareTypes[t]],
                                        console.log(e), null != e) {
                                        console.log("分享奖励 存在类型：" + define.Define.ShareTypes[t]), console.log(e);
                                        for (var o, a = 0; a < e.length; a++)
                                            if (o = define.Define.getShareRewardByID(e[a].share_type),
                                                console.log("查找奖励结果"), console.log(o), o) {
                                                var n = [o],
                                                    s = comPage.ComPage.getRewardStr(n),
                                                    c = define.Define.getShareStrByID(e[a].share_type);
                                                    comPage.ComPage.ShowTip("恭喜获得分享" + c + "奖励：" + s), fishUserData.Fish_UserData.addReward(n), g = "" == g ? "" : ",",
                                                    g += e[a].id;
                                            } else console.log("分享奖励 没找到奖励类型：" + e[a].share_type);
                                    }
                                    "" == g ? console.log("分享奖励 没有奖励发放") : (self.GetNodeByName("content/labGold").getComponent(cc.Label).string = fishUserData.Fish_UserData.getGold().toString(),
                                    define.Define.updateShareReward(g, commonData.default.getOpenId()));
                            }
                        }, null));
                    }, null), "" != fishUserData.Fish_UserData.challRoomID) try {
                    console.log("chall 挑战 主页进入房间：" + fishUserData.Fish_UserData.challRoomID), define.Define.joinRoom(fishUserData.Fish_UserData.challRoomID, function(t) {
                        switch (console.log("chall 挑战 主页进入房间返回成功 "), console.log(t), t.rcode) {
                            case define.Define_Chall_Status.NORMAL:
                            case define.Define_Chall_Status.ALREADYINCURROOM:
                            case define.Define_Chall_Status.REWARDUNRECEIVE:
                            case define.Define_Chall_Status.ALREADYINOTHERROOM:
                            case define.Define_Chall_Status.ROOMEXPIRE:
                                return console.log("chall 挑战 主页切换进入房间 "), void cc.director.loadScene("ChallengeScene");

                            case define.Define_Chall_Status.OVERSIZE:
                            case define.Define_Chall_Status.ROOMNOEXIST:
                            case define.Define_Chall_Status.OVERSIZE:
                                console.log("chall 挑战 房间不存在 留在主页 "), self.initGame();
                                break;

                            default:
                                self.initGame();
                        }
                    });
                } catch (exception) {
                    console.log("chall 挑战 主页进入房间错误"), console.log(exception);
                } else console.log("进入主页场景"), this.initGame();
            }, GameScene.prototype.update = function() {
                this.isLoad && (this.isLoad = !1);
            }, GameScene.prototype.onStartGame = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), 0 == this.isLoad && (this.isFrist ? console.log("进入新手引导") : console.log("进入游戏界面"),
                    cc.director.loadScene("Fish_Main"));
            }, GameScene.prototype.onChallenge = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), define.Define.createFishRoom(function(t) {
                    t && (t.rcode == define.Define_Chall_Status.NORMAL || define.Define_Chall_Status.ALREADYINOTHERROOM || define.Define_Chall_Status.REWARDUNRECEIVE ? (console.log("chall 挑战 房间号获取成功，进入房间：" + t.data.roomId),
                    fishUserData.Fish_UserData.challRoomID = t.data.roomId, commonData.default.share(eChannelPrefix.default.pageshare, "chall=" + fishUserData.Fish_UserData.challRoomID, function(t) {
                            return console.log("网络错误 :", t);
                        }, function(t) {
                            console.log("成功 :", t), cc.director.loadScene("ChallengeScene");
                        }, function(t) {
                            console.log("失败：", t), cc.director.loadScene("ChallengeScene");
                        }, function(t) {
                            return console.log("complete:", t);
                        }, "", "", "", "", "")) : (console.log("chall 挑战 创建房间无有效房间状态：" + t.rcode), comPage.ComPage.ShowTip("无法发起挑战，请稍后再试。")));
                });
            }, GameScene.prototype.onOpenShop = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), comPage.ComPage.openShop();
            }, GameScene.prototype.onMoreGame = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), commonData.default.showMoreGame();
            }, GameScene.prototype.onRank = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), readyGo.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0,
                common_RankList.default.showFriendList(null);
            }, GameScene.prototype.onGroupRank = function(t) {
                readyGo.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0, common_RankList.default.showGroupList(t);
            }, GameScene.prototype.hideRank = function() {
                readyGo.default.setVisible(0), this.GetNodeByName("btnRankBg").active = !1, fishUserData.Fish_UserData.getFristGame() || common_RankList.default.showGameResultList();
            }, GameScene.prototype.onGroupRankShare = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), commonData.default.share(eChannelPrefix.default.grouprank, "group=1", function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    console.log("成功 :", t), comPage.ComPage.ShowTip("分享成功，请点击群链接查看群排行");
                }, function(t) {
                    console.log("失败：", t), comPage.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, GameScene.prototype.goHome = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), fishUserData.Fish_UserData.getFristGame() && (readyGo.default.setVisible(0),
                    this.node.getChildByName("rankShow").active = !1), this.hideRank();
            }, GameScene.prototype.onDestroy = function() {
                this.gameClub && this.gameClub.destroy(), commonGlobalEventUtil.GlobalEventUtil.offType("UpdateGold"),
                commonGlobalEventUtil.GlobalEventUtil.offType("UpdateSkin"), commonGlobalEventUtil.GlobalEventUtil.offType("showGroupList"),
                commonGlobalEventUtil.GlobalEventUtil.offType("PostShare");
            }, GameScene = __decorate([u], GameScene);
        }(nodeUtil.NodeUtil));
exports.default = GameScene;