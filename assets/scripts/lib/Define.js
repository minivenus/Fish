var m, o, s, Common_ShareUtils = require("./Common_ShareUtils"),
    ComPage = require("./ComPage"),
    Fish_UserData = require("./Fish_UserData"),
    Util = require("./Util"),
    gamesdk = require("./gamesdk");
(o = m || (m = {})).CheckPlayerStatus = "game/fishroom/checkPlayerStatus", o.CreateFishRoom = "game/fishroom/createFishRoom",
    o.JoinRoom = "game/fishroom/enterRoom", o.PickReward = "game/fishroom/pickReward",
    o.GetRoomSimpleInfo = "game/fishroom/roomSimpleInfo", o.updateChallScore = "game/fishroom/updateScore",
    o.getRewardCfg = "share/getRewardConf", o.postShareReward = "share/createRewardRecord",
    o.getShareReward = "share/getRewardRecord", o.updateShareReward = "share/updateRewardRecord",
    (s = exports.Define_Chall_Status || (exports.Define_Chall_Status = {}))[s.NORMAL = 1] = "NORMAL",
    s[s.ROOMNOEXIST = 2] = "ROOMNOEXIST", s[s.ALREADYINCURROOM = 3] = "ALREADYINCURROOM",
    s[s.ALREADYINOTHERROOM = 4] = "ALREADYINOTHERROOM", s[s.REWARDUNRECEIVE = 5] = "REWARDUNRECEIVE",
    s[s.ROOMEXPIRE = 6] = "ROOMEXPIRE", s[s.OVERSIZE = 7] = "OVERSIZE", s[s.NOINROOM = 8] = "NOINROOM";
var g = function() {
    function s() {}
    return s.wxShowVideo = function(a, n) {
            var o = this;
            cc.sys.platform == cc.sys.WECHAT_GAME && (this.videoAd[a] ? (console.log("广告：" + a + "存在"),
                this.videoAd[a].load().then(function() {
                    return o.videoAd[a].show();
                }).catch(function(t) {
                    console.log(t.errMsg), n && n(!1);
                }), this.videoAd[a].onClose(function(t) {
                    t && t.isEnded || void 0 === t ? (console.log("看视屏结束"), o.videoAd[a].offClose(t),
                        n && n(!0)) : (console.log("看视屏中途退出"), o.videoAd[a].offClose(t), n && n(!1));
                })) : (console.log("广告：" + a + "不存在，新建"), this.videoAd[a] = wx.createRewardedVideoAd({
                adUnitId: a
            }), this.videoAd[a].load().then(function() {
                return o.videoAd[a].show();
            }).catch(function(t) {
                console.log(t.errMsg), n && n(!1);
            }), this.videoAd[a].onClose(function(t) {
                t && t.isEnded || void 0 === t ? (console.log("看视屏结束"), o.videoAd[a].offClose(t),
                    n && n(!0)) : (console.log("看视屏中途退出"), o.videoAd[a].offClose(t), n && n(!1));
            })));
        }, s.checkPlayerStatus = function(r, t) {
            void 0 === r && (r = null), void 0 === t && (t = null), Common_ShareUtils.default.httpGet(m.CheckPlayerStatus, {}, function(o) {
                if (console.log("chall 获取玩家状态"), console.log(o), o.data.data.reward) {
                    if (s.pickReward(), o.data.data.rank <= s.ChellRewards.length) {
                        var e = ComPage.ComPage.getRewardStr(s.ChellRewards[o.data.data.rank - 1]);
                        Fish_UserData.Fish_UserData.addReward(s.ChellRewards[o.data.data.rank - 1]), ComPage.ComPage.ShowTip("恭喜擂台挑战获得第" + o.data.data.rank + "名，获得" + e);
                    } else console.log("chall 玩家名次没有奖励可以领取：" + o.data.data.rank);
                    r && r(o.data.data.rank);
                } else console.log("chall 玩家没有奖励可以领取"), r && r(-1);
            }, null);
        }, s.createFishRoom = function(o) {
            void 0 === o && (o = null), Common_ShareUtils.default.httpGet(m.CreateFishRoom, {}, function(t) {
                console.log("chall 创建房间"), console.log(t), 0 == t.code ? o && o(t.data) : console.log("chall 创建房间 code返回错误" + t.code);
            }, null);
        }, s.joinRoom = function(a, r, o) {
            void 0 === r && (r = null), void 0 === o && (o = null), Common_ShareUtils.default.httpGet(m.JoinRoom, {
                roomId: a
            }, function(t) {
                console.log("chall 进入房间:" + a), console.log(t), 0 == t.code ? r && r(t.data) : console.log("chall 进入房间 code返回错误" + t.code);
            }, null);
        }, s.pickReward = function() {
            Common_ShareUtils.default.httpGet(m.PickReward, {}, null, null);
        }, s.getRoomSimpleInfo = function(a, r, t) {
            void 0 === r && (r = null), void 0 === t && (t = null), Common_ShareUtils.default.httpGet(m.GetRoomSimpleInfo, {
                roomId: a
            }, function(t) {
                console.log("chall 获取房间信息"), console.log(t), 0 == t.code ? r && r(t.data) : console.log("chall 获取房间信息 code返回错误" + t.code);
            }, null);
        }, s.sendChallScore = function(t) {
            console.log("chall 上传分数:" + t), Common_ShareUtils.default.httpGet(m.updateChallScore, {
                score: t
            }, null, null);
        }, s.getShareRawardBySer = function(a, n, t) {
            var o = this;
            void 0 === n && (n = null), void 0 === t && (t = null), console.log("获取分享奖励配置 "),
                this.httpGet(m.getRewardCfg, {
                    appId: a
                }, function(t) {
                    console.log("分享奖励配置"), console.log(t), 0 == t.code ? (o.ShareCofig = t.data, n && n(!0)) : (console.log("chall 获取房间信息 code返回错误" + t.code),
                        n && n(!1));
                }, function() {
                    console.log("分享奖励配置失败"), t && t();
                });
        }, s.postShareReward = function(r, e, t, s, d, n) {
            void 0 === d && (d = null), void 0 === n && (n = null), console.log("创建分享奖励 "),
                this.httpPost(m.postShareReward, {
                    shareType: parseInt(r),
                    shareTime: parseInt(e),
                    appId: t,
                    openid: s
                }, function(t) {
                    console.log("创建分享奖励返回"), console.log(t), 0 == t.code && console.log("创建分享奖励返回成功");
                }, function() {
                    n && n();
                });
        }, s.checkShareReward = function(a, n, r, o) {
            void 0 === r && (r = null), void 0 === o && (o = null), console.log("查询获得分享奖励 "),
                this.httpGet(m.getShareReward, {
                    appId: a,
                    openid: n
                }, function(t) {
                    console.log("查询获得分享奖励返回"), console.log(t), 0 == t.code ? (console.log("查询获得分享奖励返回成功"),
                        r && r(t.data)) : r && r(null);
                }, function() {
                    o && o();
                });
        }, s.updateShareReward = function(a, n, r, o) {
            void 0 === r && (r = null), void 0 === o && (o = null), console.log("更新分享领取奖励状态 "),
                console.log(a), this.httpPost(m.updateShareReward, {
                    ids: a,
                    openid: n
                }, function(t) {
                    console.log("更新分享领取奖励状态返回"), console.log(t), 0 == t.code && console.log("更新分享领取奖励状态返回成功");
                }, null);
        }, s.getShareRewardByID = function(t) {
            return console.log("分享奖励 查找奖励：" + t), Util.Util.FindObjByArry(this.ShareCofig, "share_type", t);
        }, s.getShareStrByID = function(t) {
            return null == this.ShareString[t - 1] ? "" : this.ShareString[t - 1];
        }, s.request = function(r, e, t, o, s) {
            var n = gamesdk.config.apiGameServer + e;
            console.log("GameHttp:");
            console.log(n);
            console.log(t);
            gamesdk.game.gameHttp(n, t, r).then(function(t) {
                o && o(t);
            }, function(t) {
                console.log(t), s && s(t);
            });
        }, s.httpGet = function(a, e, t, o) {
            this.request("GET", a, e, t, o);
        }, s.httpPost = function(a, e, t, o) {
            this.request("POST", a, e, t, o);
        }, s.ChellRewards = [
            [{
                type: 0,
                num: 100
            }],
            [{
                type: 0,
                num: 75
            }],
            [{
                type: 0,
                num: 50
            }]
        ], s.ShareCofig = [], s.videoAd = {}, s.ShareTypes = [1, 2, 3, 4], s.ShareString = ["签到", "宝箱", "成就奖励", "新手礼"],
        s;
}();
exports.Define = g;