var S = require("./Common_CommonUtil"),
    c = require("./wxDisplayCheck"),
    r = require("./wxShortcut"),
    l = require("./Common_Data"),
    b = require("./Fish_UserData"),
    d = require("./Util"),
    o = require("./NodeUtil"),
    n = require("./EChannelPrefix"),
    a = require("./SoundUtil"),
    h = require("./FishCfgMgr"),
    u = require("./ComPage"),
    i = require("./gamesdk"),
    s = cc._decorator,
    p = s.ccclass,
    m = s.property,
    g = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.time = 1, t.isSign = !1, t.isLogin = !1, t.isok = !0, t.reward = [], t.myNode = null,
                t;
        }
        return __extends(t, o), t.prototype.start = function() {
            cc.game.addPersistRootNode(this.myNode), h.FishCfgMgr.LoadCfg(), a.SoundUtil.LoadAudio(),
                u.ComPage.LoadPop(), b.Fish_UserData.initUserDataByLocal(), i.dataStatistics.getGameConfigByAppkey(function(t) {
                    console.log("开关=", t), b.Fish_UserData.setShareOpen(t.data.data.invation), this.schedule(this.loadCompe, 1);
                }.bind(this), function() {
                    console.log("onShow fail getGameConfigByAppkey");
                });
        }, t.prototype.loadCompe = function() {
            h.FishCfgMgr.CfgLoadComplete() && this.isok && (this.isok = !1, this.unschedule(this.loadCompe),
                this.init());
        }, t.prototype.init = function() {
            var l = this;
            try {
                console.log("完成初始化加载-》进入初始界面");
                var t = b.Fish_UserData.getSignByLocal().split("-");
                console.log(t), this.AddButtonEventStart(this, this.GetNodeByName("content/btnTrue"), this.onTrue),
                    b.Fish_UserData.getShareOpen() ? this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare"), this.onShare) : (this.GetNodeByName("content/btnTrue").setPositionX(0),
                        this.GetNodeByName("content/btnShare").active = !1);
                var e = parseInt(t[0]);
                this.time = 0 == e ? 1 : e + 1, this.time = 7 < this.time ? 1 : this.time, this.GetNodeByName("content/labTop").getComponent(cc.Label).string = "第" + ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"][this.time] + "天";
                var o = h.FishCfgMgr.getSignRewardByDay(this.time);
                if (o)
                    for (var i, a = 0; a < o.rewardNum.length; a++) i = {
                        type: o.rewardType[a],
                        num: o.rewardNum[a]
                    }, this.reward.push(i);
                var n = u.ComPage.getRewardStr(this.reward);
                this.GetNodeByName("content/labNum").getComponent(cc.Label).string = n, d.Util.isToday(t[2]) ? "1" == t[1] ? (console.log("已签到:" + t[1]),
                    this.isSign = !1, this.node.getChildByName("content").active = !1) : (console.log("未签到:" + t[1]),
                    this.isSign = !0, this.node.getChildByName("content").active = !0) : (this.isSign = !0,
                    this.node.getChildByName("content").active = !0);
            } catch (t) {
                console.log("signscene初始化加载错误"), console.log(t);
            }
            if (S.default.isWeChat() && r.Wx.showLoading({
                    title: "连接中..."
                }), cc.director.setClearColor(cc.Color.GRAY), c.default.onShowRes) {
                if (!S.default.isWeChat()) return;
                r.Wx.getSystemInfo({
                    success: function(t) {
                        console.log("手机系统信息：", t), l.login(t.screenWidth, t.screenHeight);
                    },
                    fail: function() {
                        l.login(320, 568);
                    }
                });
            }
        }, t.prototype.login = function(a, e) {
            var t = this;
            l.default.login2(c.default.onShowRes, function() {
                t.loginComplete();
            }, null, function() {
                S.default.isWeChat() && r.Wx.hideLoading();
            }, function() {
                t.isLogin = !1, r.default.showModal("提示", "登录失败，请稍候再试");
            }, null, a, e);
        }, t.prototype.loginComplete = function() {
            console.log("===========登录成功回调==========="), this.isSign ? (this.isLogin = !0, this.node.getChildByName("content").active = !0) : cc.director.loadScene("GameScene");
        }, t.prototype.onTrue = function() {
            if (a.SoundUtil.PlayEffectByKey(1), console.log("确认领取"), this.isLogin) {
                console.log("确认领取，跳转界面");
                var t = "签到成功，恭喜获得" + u.ComPage.getRewardStr(this.reward);
                b.Fish_UserData.setSignReward(this.reward, t), cc.director.loadScene("GameScene");
            }
        }, t.prototype.onShare = function() {
            var r = this;
            a.SoundUtil.PlayEffectByKey(1), l.default.share(n.default.reward, "", function(t) {
                return console.log("网络错误 :", t);
            }, function(a) {
                if (console.log("成功 :", a), r.isLogin) {
                    for (var e = 0; e < r.reward.length; e++) r.reward[e].num = 3 * r.reward[e].num;
                    var t = "3倍签到成功，恭喜获得" + u.ComPage.getRewardStr(r.reward);
                    b.Fish_UserData.setSignReward(r.reward, t), cc.director.loadScene("GameScene");
                }
            }, function(t) {
                console.log("失败：", t);
            }, function(t) {
                return console.log("complete:", t);
            }, "", "", "", "", "");
        }, __decorate([m(cc.Node)], t.prototype, "myNode", void 0), t = __decorate([p], t);
    }(o.NodeUtil);
exports.default = g;