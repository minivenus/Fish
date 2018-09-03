var nodeUtil = require("./NodeUtil"),
    commonData = require("./Common_Data"),
    comPage = require("./ComPage"),
    rankList = require("./Common_RankList"),
    fishUserData = require("./Fish_UserData"),
    eChannelPrefix = require("./EChannelPrefix"),
    wxDisplayCheck = require("./wxDisplayCheck"),
    soundUtil = require("./SoundUtil"),
    fishCfgMgr = require("./FishCfgMgr"),
    globalEventUtil = require("./Common_GlobalEventUtil"),
    readyGo = require("./ReadyGo"),
    define = require("./Define"),
    m = cc._decorator,
    g = m.ccclass,
    f = m.property,
    ResultScene = function(__super) {
        function ResultScene() {
            var ResultScene = null !== __super && __super.apply(this, arguments) || this;
            return ResultScene.richScore = null, ResultScene.labScoreDec2 = null, ResultScene;
        }
        return __extends(ResultScene, __super), ResultScene.prototype.start = function() {
                try {
                    fishUserData.Fish_UserData.setAgainGame(!0), readyGo.default.setVisible(2), this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare"), this.onShare),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnRank"), this.onRank),
                        this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnGroupRank"), this.onGroupRankShare),
                        rankList.default.showGameResultList(!0), globalEventUtil.GlobalEventUtil.on("showGroupList", function(t) {
                            t && wxDisplayCheck.default.onShowRes.query.group && (this.node.getChildByName("rankShow").active = !0,
                                this.onGroupRank(t), wxDisplayCheck.default.onShowRes.query.group = null);
                        }.bind(this));
                    var l = fishUserData.Fish_UserData.getCurScore(),
                        e = 0;
                    if (0 <= l && 400 >= l ? e = .0375 * l : 401 <= l && 1500 >= l ? e = .06 * l : 1501 <= l && 3e4 >= l ? e = .00317 * l : 30001 <= l && 2e5 >= l && (e = 495e-6 * l),
                        e = 99 < e ? 99 : e, this.labScoreDec2.string = "你已超过全球" + e.toFixed(2) + "%的玩家",
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnRestart"), this.onRetGame),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnMoreGame"), this.onMoreGame),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnHome"), this.gonHome),
                        this.AddButtonEventStart(this, this.GetNodeByName("content/btnChallenge"), this.onChallenge),
                        this.AddButtonEventStart(this, this.GetNodeByName("btnRankBg/btnHome"), this.hideRank),
                        this.richScore.string = "<b>" + fishUserData.Fish_UserData.getCurScore() + "</b>", this.GetNodeByName("content/btnRestart/spIcon").getComponent(cc.Sprite).spriteFrame = fishCfgMgr.FishCfgMgr.getSkinSpriteFrameByKey(fishUserData.Fish_UserData.getCurSkin().toString() + "_1"),
                        fishUserData.Fish_UserData.getServerNewGift()) globalEventUtil.GlobalEventUtil.on("OpenAchie", function() {
                        var e = fishUserData.Fish_UserData.getTempList(),
                            t = fishCfgMgr.FishCfgMgr.getAllTargetValidByArryType(e);
                        t && 0 < t.length ? (console.log("有成就完成"), console.log(t), comPage.ComPage.openAchievementPop(t)) : console.log("无成就完成");
                    }.bind(this)), fishUserData.Fish_UserData.setServerNewGift(!1), comPage.ComPage.openNewPop();
                    else {
                        var t = fishUserData.Fish_UserData.getTempList(),
                            o = fishCfgMgr.FishCfgMgr.getAllTargetValidByArryType(t);
                        o && 0 < o.length ? (console.log("有成就完成"), console.log(o), comPage.ComPage.openAchievementPop(o)) : console.log("无成就完成");
                    }
                    define.Define.checkPlayerStatus();
                } catch (t) {
                    console.log("resultscene"), console.log(t);
                }
            }, ResultScene.prototype.onShare = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), commonData.default.shareScore2(fishUserData.Fish_UserData.getCurScore(), "856404236", fishUserData.Fish_UserData.getNickName());
            }, ResultScene.prototype.onChallenge = function() {
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
            }, ResultScene.prototype.onRetGame = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), cc.director.loadScene("Fish_Main");
            }, ResultScene.prototype.onMoreGame = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), commonData.default.showMoreGame();
            }, ResultScene.prototype.onRank = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), readyGo.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0,
                rankList.default.showFriendList(null);
            }, ResultScene.prototype.hideRank = function() {
                readyGo.default.setVisible(0), this.GetNodeByName("btnRankBg").active = !1, rankList.default.showGameResultList();
            }, ResultScene.prototype.onGroupRank = function(t) {
                readyGo.default.setVisible(1), this.GetNodeByName("btnRankBg").active = !0, rankList.default.showGroupList(t);
            }, ResultScene.prototype.onGroupRankShare = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), commonData.default.share(eChannelPrefix.default.grouprank, "group=1", function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    console.log("成功 :", t), comPage.ComPage.ShowTip("分享成功，请点击群链接查看群排行");
                }, function(t) {
                    console.log("失败：", t), comPage.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, ResultScene.prototype.gonHome = function() {
                soundUtil.SoundUtil.PlayEffectByKey(1), cc.director.loadScene("GameScene");
            }, ResultScene.prototype.onDestroy = function() {
                globalEventUtil.GlobalEventUtil.offType("OpenAchie"), globalEventUtil.GlobalEventUtil.offType("showGroupList");
            }, __decorate([f(cc.RichText)], ResultScene.prototype, "richScore", void 0), __decorate([f(cc.Label)], ResultScene.prototype, "labScoreDec2", void 0),
            ResultScene = __decorate([g], ResultScene);
    }(nodeUtil.NodeUtil);
exports.default = ResultScene;