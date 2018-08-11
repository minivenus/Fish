var o = require("./utils/Common_CommonUtil"),
    m = require("../../lib_gamesdk/gamesdk"),
    d = require("../../lib_gamesdk/lib/EChannelPrefix"),
    c = require("./utils/wxShortcut"),
    i = require("../../../Script/Fish_UserData"),
    s = function() {
        c.default.showToast("联网超时", 2e3);
    },
    l = null;
"undefined" != typeof wx && (c.Wx.showShareMenu({
    withShareTicket: !0
}), m.dataStatistics.getShareInfo(d.default.regular, function(t) {
    return l = t;
}, s, "", "", "", ""), c.Wx.onShareAppMessage(function() {
    if (m.dataStatistics.getShareInfo(d.default.regular, function(t) {
            return l = t;
        }, s, "", "", "", ""), l) try {
        return m.dataStatistics.onShareAppMsg({
            title: l.data.data.title,
            imageUrl: l.data.data.image,
            success: function(t) {
                console.log("被动转发  成功：", t);
            },
            complet: function(t) {
                console.log("被动转发完成：", t);
            }
        });
    } catch (t) {
        throw new Error("未能成功获得有效的分享信息    详细信息：" + t);
    } else s();
}));
var n = function() {
    function t() {}
    return t.login = function(d, o, n, t, a, e, s, l) {
        void 0 === e && (e = 320), void 0 === s && (s = 568), void 0 === l && (l = null),
            m.game.login(function(a) {
                if (a.data.isNeedUpdateUserInfo) {
                    var n = 10 * e,
                        r = 10 * n;
                    m.game.createUserInfoBtn("image", "", "https://h5gameres.kuaiyugo.com/chatgame/cocos_games_res/shareImages/FishEscape/login.png", {
                        left: e - n >> 1,
                        top: s - r >> 1,
                        width: n,
                        height: r,
                        lineHeight: 40,
                        backgroundColor: "#cd2936",
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: 16,
                        borderRadius: 4
                    }, function(a) {
                        if (l && l(), 1 == a.code) {
                            var n = a.data;
                            n.onTap(function(t) {
                                m.game.authorize(t, function(t) {
                                    console.log("授权成功", t), m.dataStatistics.onShowInfo(d, function(t) {
                                        console.log(t), n.hide(), o ? (console.log("授权成功,进入回调"), o()) : console.log("授权成功,回调失败");
                                    }, function(t) {
                                        console.log(t);
                                    }), m.dataStatistics.saveLog(d);
                                }, function(t) {
                                    console.log(t);
                                });
                            });
                        } else 0 == a.code && (m.dataStatistics.onShowInfo(d, function(t) {
                            console.log(t), o && o();
                        }, function(t) {
                            console.log(t);
                        }), wx.getUserInfo({
                            success: function(o) {
                                var e = o.userInfo.nickName;
                                i.Fish_UserData.setNickName(e);
                            }
                        }), m.dataStatistics.saveLog(d));
                    }, function(o) {
                        console.log(o), t && t(o);
                    });
                } else console.log("不需要授权"), m.dataStatistics.onShowInfo(d, function(t) {
                    console.log(t), o && o();
                }, function(t) {
                    console.log(t);
                }), wx.getUserInfo({
                    success: function(o) {
                        var e = o.userInfo.nickName;
                        i.Fish_UserData.setNickName(e);
                    }
                }), m.dataStatistics.saveLog(d);
            }, function(t) {
                console.log(t), n && n(t);
            });
    }, t.login2 = function(r, e, t, o, i, n, a, s) {
        void 0 === a && (a = 320), void 0 === s && (s = 568), this.login(r, e, t, i, n, a, s, o);
    }, t.login3 = function(r, e, t, o, i) {
        var n = c.Wx.getSystemInfoSync();
        this.login(r, e, t, i, null, n.screenWidth, n.screenHeight, o);
    }, t.onShow = function(a, e, t) {
        m.dataStatistics.onShowInfo(a, e, t), m.dataStatistics.saveLog(a);
    }, t.onHide = function() {
        m.dataStatistics.onHideInfo();
    }, t.share = function(p, g, e, t, o, n, a, i, c, r, l) {
        void 0 === g && (g = ""), void 0 === e && (e = null), void 0 === t && (t = null),
            void 0 === o && (o = null), void 0 === n && (n = null), void 0 === a && (a = ""),
            void 0 === i && (i = ""), void 0 === c && (c = ""), void 0 === r && (r = ""), void 0 === l && (l = ""),
            console.log("调用分享"), m.dataStatistics.getShareInfo(p, function(i) {
                console.log("获取分享数据成功：", i), m.dataStatistics.shareAppMsg({
                    title: (a || "") + i.data.data.title,
                    imageUrl: i.data.data.image,
                    query: g || "",
                    success: function(o) {
                        m.dataStatistics.shareSuccess(d.default.invitation), t && t(o);
                    },
                    fail: o || null,
                    complete: n || null
                });
            }, function() {
                s(), e && e();
            }, i, c, r + "", l);
    }, t.shareScore = function(r, e, t, o, i, n) {
        void 0 === e && (e = ""), void 0 === t && (t = null), void 0 === o && (o = null),
            void 0 === i && (i = null), void 0 === n && (n = null), this.share(d.default.result, e, t, o, i, n, "我的分数：" + r);
    }, t.shareScore2 = function(r, e, t, o, i, n, a, s) {
        void 0 === o && (o = ""), void 0 === i && (i = null), void 0 === n && (n = null),
            void 0 === a && (a = null), void 0 === s && (s = null), this.share(d.default.result, o, i, n, a, s, "", e, t, r);
    }, t.setData = function(a, n, t) {
        m.dataStatistics.setKVUserData(a, function(t) {
            n && n(t);
        }, function(o) {
            t && t(o);
        });
    }, t.getData = function(a, t) {
        m.dataStatistics.getKVUserData(function(t) {
            a && a(t);
        }, function(o) {
            t && t(o);
        });
    }, t.getServerTime = function(o, e) {
        m.dataStatistics.getServerTime(o, e);
    }, t.showQRCode = function(a, r, s, o) {
        void 0 === r && (r = ""), void 0 === s && (s = null), void 0 === o && (o = null);
        var i = {
            codeBody: JSON.stringify({
                openid: wx.getStorageSync("userId"),
                appKey: m.config.appKey,
                appid: m.config.appId,
                param: r
            }),
            pageType: a
        };
        m.dataStatistics.gameHttp(m.config.api + "gamepay/createWXACode", i, "POST").then(function(a) {
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
    }, t.showMoreGame = function() {
        o.default.toPlatform(function(t) {
            console.log("更多游戏成功  ", t);
        }, function(t) {
            console.log("更多游戏失败  ", t);
        }, function(t) {
            console.log("更多游戏完成  ", t);
        });
    }, t.checkPlatformProp = function(a, e, t) {
        if (void 0 === t && (t = null), a && a.query) {
            var o = a.query.propId,
                i = a.query.price;
            o && i && (e(o, i) ? c.default.showModal("提示", "您已购买该道具,我们将返还您在ReadyGo平台消耗的金币。") : m.coin.updateGold(-i, "购买道具", "game", function(a) {
                console.log("信息返回", a), c.default.showModal("提示", "购买道具成功"), t && t(o);
            }, function() {
                c.default.showModal("提示", "购买道具失败");
            }));
        }
    }, t.getOpenId = function() {
        return m.game.getOpenId();
    }, t.getAppId = function() {
        return m.config.appId;
    }, t.createPFCode = function(a, t) {
        void 0 === a && (a = null), void 0 === t && (t = null), m.dataStatistics.createPFCode(function(t) {
            a && a(t);
        }, function(o) {
            console.log(o), t && t(o);
        });
    }, t;
}();
exports.default = n;