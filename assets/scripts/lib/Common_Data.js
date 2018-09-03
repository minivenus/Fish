var commonUtil = require("./Common_CommonUtil"),
    gamesdk = require("./gamesdk"),
    eChannelPrefix = require("./EChannelPrefix"),
    wxShortcut = require("./wxShortcut"),
    fishUserData = require("./Fish_UserData"),
    l = function() {
        wxShortcut.default.showToast("联网超时", 2e3);
    },
    p = null;
"undefined" != typeof wx && (wxShortcut.Wx.showShareMenu({
    withShareTicket: !0
}), gamesdk.dataStatistics.getShareInfo(eChannelPrefix.default.regular, function(t) {
    return p = t;
}, l, "", "", "", ""), wxShortcut.Wx.onShareAppMessage(function() {
    if (gamesdk.dataStatistics.getShareInfo(eChannelPrefix.default.regular, function(t) {
            return p = t;
        }, l, "", "", "", ""), p) try {
        return gamesdk.dataStatistics.onShareAppMsg({
            title: p.data.data.title,
            imageUrl: p.data.data.image,
            success: function(t) {
                console.log("被动转发  成功：", t);
            },
            complet: function(t) {
                console.log("被动转发完成：", t);
            }
        });
    } catch (t) {
        throw new Error("未能成功获得有效的分享信息    详细信息：" + t);
    } else l();
}));
var Common_Data = function() {
    function Common_Data() {}
    return Common_Data.login = function(d, o, n, t, a, e, l, p) {
        void 0 === e && (e = 320), void 0 === l && (l = 568), void 0 === p && (p = null),
            gamesdk.game.login(function(a) {
                if (a.data.isNeedUpdateUserInfo) {
                    var n = 10 * e,
                        r = 10 * n;
                        gamesdk.game.createUserInfoBtn("image", "", "https://h5gameres.kuaiyugo.com/chatgame/cocos_games_res/shareImages/FishEscape/login.png", {
                        left: e - n >> 1,
                        top: l - r >> 1,
                        width: n,
                        height: r,
                        lineHeight: 40,
                        backgroundColor: "#cd2936",
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: 16,
                        borderRadius: 4
                    }, function(a) {
                        if (p && p(), 1 == a.code) {
                            var n = a.data;
                            n.onTap(function(t) {
                                gamesdk.game.authorize(t, function(t) {
                                    console.log("授权成功", t), gamesdk.dataStatistics.onShowInfo(d, function(t) {
                                        console.log(t), n.hide(), o ? (console.log("授权成功,进入回调"), o()) : console.log("授权成功,回调失败");
                                    }, function(t) {
                                        console.log(t);
                                    }), gamesdk.dataStatistics.saveLog(d);
                                }, function(t) {
                                    console.log(t);
                                });
                            });
                        } else 0 == a.code && (gamesdk.dataStatistics.onShowInfo(d, function(t) {
                            console.log(t), o && o();
                        }, function(t) {
                            console.log(t);
                        }), wx.getUserInfo({
                            success: function(o) {
                                var e = o.userInfo.nickName;
                                fishUserData.Fish_UserData.setNickName(e);
                            }
                        }), gamesdk.dataStatistics.saveLog(d));
                    }, function(o) {
                        console.log(o), t && t(o);
                    });
                } else console.log("不需要授权"), gamesdk.dataStatistics.onShowInfo(d, function(t) {
                    console.log(t), o && o();
                }, function(t) {
                    console.log(t);
                }), wx.getUserInfo({
                    success: function(o) {
                        var e = o.userInfo.nickName;
                        fishUserData.Fish_UserData.setNickName(e);
                    }
                }), gamesdk.dataStatistics.saveLog(d);
            }, function(t) {
                console.log(t), n && n(t);
            });
    }, Common_Data.login2 = function(r, e, t, o, d, n, a, s) {
        void 0 === a && (a = 320), void 0 === s && (s = 568), this.login(r, e, t, d, n, a, s, o);
    }, Common_Data.login3 = function(r, e, t, o, s) {
        var n = wxShortcut.Wx.getSystemInfoSync();
        this.login(r, e, t, s, null, n.screenWidth, n.screenHeight, o);
    }, Common_Data.onShow = function(a, e, t) {
        gamesdk.dataStatistics.onShowInfo(a, e, t), gamesdk.dataStatistics.saveLog(a);
    }, Common_Data.onHide = function() {
        gamesdk.dataStatistics.onHideInfo();
    }, Common_Data.share = function(p, g, e, t, o, n, a, s, c, r, u) {
        void 0 === g && (g = ""), void 0 === e && (e = null), void 0 === t && (t = null),
            void 0 === o && (o = null), void 0 === n && (n = null), void 0 === a && (a = ""),
            void 0 === s && (s = ""), void 0 === c && (c = ""), void 0 === r && (r = ""), void 0 === u && (u = ""),
            console.log("调用分享"), gamesdk.dataStatistics.getShareInfo(p, function(r) {
                console.log("获取分享数据成功：", r), gamesdk.dataStatistics.shareAppMsg({
                    title: (a || "") + r.data.data.title,
                    imageUrl: r.data.data.image,
                    query: g || "",
                    success: function(o) {
                        gamesdk.dataStatistics.shareSuccess(eChannelPrefix.default.invitation), t && t(o);
                    },
                    fail: o || null,
                    complete: n || null
                });
            }, function() {
                l(), e && e();
            }, s, c, r + "", u);
    }, Common_Data.shareScore = function(r, e, t, o, s, n) {
        void 0 === e && (e = ""), void 0 === t && (t = null), void 0 === o && (o = null),
            void 0 === s && (s = null), void 0 === n && (n = null), this.share(eChannelPrefix.default.result, e, t, o, s, n, "我的分数：" + r);
    }, Common_Data.shareScore2 = function(r, e, t, o, l, n, a, s) {
        void 0 === r && (r = ""), void 0 === o && (o = ""), void 0 === l && (l = null),
            void 0 === n && (n = null), void 0 === a && (a = null), void 0 === s && (s = null),
            this.share(eChannelPrefix.default.result, o, l, n, a, s, "", e, t, r);
    }, Common_Data.setData = function(a, n, t) {
        gamesdk.dataStatistics.setKVUserData(a, function(t) {
            n && n(t);
        }, function(o) {
            t && t(o);
        });
    }, Common_Data.getData = function(a, t) {
        gamesdk.dataStatistics.getKVUserData(function(t) {
            a && a(t);
        }, function(o) {
            t && t(o);
        });
    }, Common_Data.getServerTime = function(o, e) {
        gamesdk.dataStatistics.getServerTime(o, e);
    }, Common_Data.showQRCode = function(a, r, s, o) {
        void 0 === r && (r = ""), void 0 === s && (s = null), void 0 === o && (o = null);
        var d = {
            codeBody: JSON.stringify({
                openid: wx.getStorageSync("userId"),
                appKey: gamesdk.config.appKey,
                appid: gamesdk.config.appId,
                param: r
            }),
            pageType: a
        };
        gamesdk.dataStatistics.gameHttp(gamesdk.config.api + "gamepay/createWXACode", d, "POST").then(function(a) {
            console.log(a);
            var e = a.data;
            wx.previewImage({
                current: e,
                urls: [e],
                success: function(t) {
                    console.log(t), s({
                        code: 0,
                        data: "",
                        msg: "获取二维码成功"
                    });
                },
                fail: function(t) {
                    o(t);
                }
            });
        }, function(t) {
            o(t);
        });
    }, Common_Data.showMoreGame = function() {
        commonUtil.default.toPlatform(function(t) {
            console.log("更多游戏成功  ", t);
        }, function(t) {
            console.log("更多游戏失败  ", t);
        }, function(t) {
            console.log("更多游戏完成  ", t);
        });
    }, Common_Data.checkPlatformProp = function(a, e, t) {
        if (void 0 === t && (t = null), a && a.query) {
            var o = a.query.propId,
                r = a.query.price;
            o && r && (e(o, r) ? wxShortcut.default.showModal("提示", "您已购买该道具,我们将返还您在ReadyGo平台消耗的金币。") : gamesdk.coin.updateGold(-r, "购买道具", "game", function(a) {
                console.log("信息返回", a), wxShortcut.default.showModal("提示", "购买道具成功"), t && t(o);
            }, function() {
                wxShortcut.default.showModal("提示", "购买道具失败");
            }));
        }
    }, Common_Data.getOpenId = function() {
        return gamesdk.game.getOpenId();
    }, Common_Data.getAppId = function() {
        return gamesdk.config.appId;
    }, Common_Data.createPFCode = function(a, t) {
        void 0 === a && (a = null), void 0 === t && (t = null), gamesdk.dataStatistics.createPFCode(function(t) {
            a && a(t);
        }, function(o) {
            console.log(o), t && t(o);
        });
    }, Common_Data;
}();
exports.default = Common_Data;