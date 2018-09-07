var commonUtil = require("./Common_CommonUtil"),
    wxDisplayCheck = require("./wxDisplayCheck"),
    wxShortcut = require("./wxShortcut"),
    common_Data = require("./Common_Data"),
    fish_UserData = require("./Fish_UserData"),
    util = require("./Util"),
    nodeUtil = require("./NodeUtil"),
    eChannelPrefix = require("./EChannelPrefix"),
    soundUtil = require("./SoundUtil"),
    fishCfgMgr = require("./FishCfgMgr"),
    comPage = require("./ComPage"),
    gamesdk = require("./gamesdk"),
    p = cc._decorator,
    m = p.ccclass,
    g = p.property,
    SignScene = function(__super) {
        function SignScene() {
            var SignScene = null !== __super && __super.apply(this, arguments) || this;
            return SignScene.time = 1, SignScene.isSign = !1, SignScene.isLogin = !1, SignScene.isok = !0, SignScene.reward = [], SignScene.isShare = !1,
                SignScene.shareCount = 10, SignScene.upTime = 0, SignScene.labSign = null, SignScene.myNode = null, SignScene.tgShare = null,
                SignScene;
        }
        return __extends(SignScene, __super), SignScene.prototype.start = function() {
                cc.game.addPersistRootNode(this.myNode), fishCfgMgr.FishCfgMgr.LoadCfg(), soundUtil.SoundUtil.LoadAudio(),
                    comPage.ComPage.LoadPop(), fish_UserData.Fish_UserData.initUserDataByLocal(), this.schedule(this.loadCompe, 1);
                /*s.dataStatistics.getGameConfigByAppkey(function(t) {
                                        console.log("开关=", t), b.Fish_UserData.setShareOpen(t.data.data.invation), this.schedule(this.loadCompe, 1);
                                    }.bind(this), function() {
                                        console.log("onShow fail getGameConfigByAppkey");
                                    });*/
            }, SignScene.prototype.loadCompe = function() {
                console.log('log');
                this.loginComplete();
                fishCfgMgr.FishCfgMgr.CfgLoadComplete() && this.isok && (this.isok = !1, this.unschedule(this.loadCompe),
                    this.init());
            }, SignScene.prototype.init = function() {
                var self = this;
                try {
                    console.log("完成初始化加载-》进入初始界面");
                    var t = fish_UserData.Fish_UserData.getSignByLocal().split("-");
                    console.log(t), this.AddButtonEventStart(this, this.GetNodeByName("content/btnTrue"), this.onTrue),
                        this.GetNodeByName("content").active = !0, fish_UserData.Fish_UserData.getShareOpen() ? (this.isShare = !0,
                            this.labSign.string = "签到(" + this.shareCount + "s)", this.GetNodeByName("content/tgShare").active = !0) : this.GetNodeByName("content/tgShare").active = !1;
                    var e = parseInt(t[0]);
                    this.time = 0 == e ? 1 : e + 1, this.time = 7 < this.time ? 1 : this.time, this.GetNodeByName("content/labTop").getComponent(cc.Label).string = "第" + ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"][this.time] + "天";
                    var o = fishCfgMgr.FishCfgMgr.getSignRewardByDay(this.time);
                    if (o)
                        for (var p, a = 0; a < o.rewardNum.length; a++) p = {
                            type: o.rewardType[a],
                            num: o.rewardNum[a]
                        }, this.reward.push(p);
                    var n = comPage.ComPage.getRewardStr(this.reward);
                    this.GetNodeByName("content/labNum").getComponent(cc.Label).string = n, util.Util.isToday(t[2]) ? "1" == t[1] ? (console.log("已签到:" + t[1]),
                        this.isSign = !1, this.node.getChildByName("content").active = !1) : (console.log("未签到:" + t[1]),
                        this.isSign = !0, this.node.getChildByName("content").active = !0) : (this.isSign = !0,
                        this.node.getChildByName("content").active = !0);
                } catch (exception) {
                    console.log("signscene初始化加载错误"), console.log(exception);
                }
                /*if (commonUtil.default.isWeChat() && wxShortcut.Wx.showLoading({
                        title: "连接中..."
                    }), cc.director.setClearColor(cc.Color.GRAY), wxDisplayCheck.default.onShowRes) {
                    if (!commonUtil.default.isWeChat()) return;
                    wxShortcut.Wx.getSystemInfo({
                        success: function(t) {
                            console.log("手机系统信息：", t), self.login(t.screenWidth, t.screenHeight);
                        },
                        fail: function() {
                            self.login(320, 568);
                        }
                    });
                    }*/
            }, SignScene.prototype.login = function(a, e) {
                var t = this;
                common_Data.default.login2(wxDisplayCheck.default.onShowRes, function() {
                    t.loginComplete();
                }, null, function() {
                    commonUtil.default.isWeChat() && wxShortcut.Wx.hideLoading();
                }, function() {
                    t.isLogin = !1, wxShortcut.default.showModal("", "登录失败，请稍候再试");
                }, null, a, e);
            }, SignScene.prototype.loginComplete = function() {
                console.log("===========登录成功回调==========="), this.isSign ? (this.isLogin = !0, this.node.getChildByName("content").active = !0) : cc.director.loadScene("GameScene");
            }, SignScene.prototype.onTgCheck = function() {
                this.tgShare.isChecked || (console.log("关闭分享"), this.isShare = !1, this.labSign.string = "签到",
                    this.GetNodeByName("content/tgShare").active = !1);
            }, SignScene.prototype.onTrue = function() {
                var r = this;
                if (soundUtil.SoundUtil.PlayEffectByKey(1), console.log("确认领取"), this.isLogin)
                    if (this.isShare) {
                        var o = "shareType=1&time=" + new Date().getTime() + "&openId=" + common_Data.default.getOpenId() + "&appId=" + common_Data.default.getAppId();
                        common_Data.default.share(eChannelPrefix.default.reward, o, function(t) {
                            return console.log("网络错误 :", t);
                        }, function(o) {
                            console.log("分享成功 :", o);
                            var e = "签到成功，恭喜获得" + comPage.ComPage.getRewardStr(r.reward);
                            fish_UserData.Fish_UserData.setSignReward(r.rewarcommon_Datad, e), cc.director.loadScene("GameScene");
                        }, function(t) {
                            console.log("失败：", t);
                        }, function(t) {
                            return console.log("complete:", t);
                        }, "", "", "", "", "");
                    } else {
                        console.log("确认领取，跳转界面");
                        var e = "签到成功，恭喜获得" + (o = comPage.ComPage.getRewardStr(this.reward));
                        fish_UserData.Fish_UserData.setSignReward(this.reward, e), cc.director.loadScene("GameScene");
                    }
            }, SignScene.prototype.onShare = function() {
                var r = this;
                soundUtil.SoundUtil.PlayEffectByKey(1), common_Data.default.share(eChannelPrefix.default.reward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(a) {
                    if (console.log("成功 :", a), r.isLogin) {
                        for (var e = 0; e < r.reward.length; e++) r.reward[e].num = 3 * r.reward[e].num;
                        var t = "3倍签到成功，恭喜获得" + comPage.ComPage.getRewardStr(r.reward);
                        fish_UserData.Fish_UserData.setSignReward(r.reward, t), cc.director.loadScene("GameScene");
                    }
                }, function(t) {
                    console.log("失败：", t);
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, SignScene.prototype.update = function(dt) {
                this.upTime += dt, 1 < this.upTime && (this.isShare ? (this.shareCount--, 0 > this.shareCount ? (this.isShare = !1,
                        this.labSign.string = "签到", this.GetNodeByName("content/tgShare").active = !1) : this.labSign.string = "签到(" + this.shareCount + "s)") : this.labSign.string = "签到",
                    this.upTime = 0);
            }, __decorate([g(cc.Label)], SignScene.prototype, "labSign", void 0), __decorate([g(cc.Node)], SignScene.prototype, "myNode", void 0),
            __decorate([g(cc.Toggle)], SignScene.prototype, "tgShare", void 0), SignScene = __decorate([m], SignScene);
    }(nodeUtil.NodeUtil);
exports.default = SignScene;