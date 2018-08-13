var o = require("./Common_CommonUtil"),
    m = require("./gamesdk"),
    d = require("./EChannelPrefix"),
    c = require("./wxShortcut"),
    s = require("./Fish_UserData"),
    l = function() {
        c.default.showToast("联网超时", 2e3);
    },
    p = null;
"undefined" != typeof wx && (c.Wx.showShareMenu({
    withShareTicket: !0
}), m.dataStatistics.getShareInfo(d.default.regular, function(t) {
    return p = t;
}, l, "", "", "", ""), c.Wx.onShareAppMessage(function() {
    if (m.dataStatistics.getShareInfo(d.default.regular, function(t) {
            return p = t;
        }, l, "", "", "", ""), p) try {
        return m.dataStatistics.onShareAppMsg({
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
var n = function() {
    function t() {}
    return t.login = function(d, o, n, t, a, e, l, p) {
        void 0 === e && (e = 320), void 0 === l && (l = 568), void 0 === p && (p = null),
            m.game.login(function(a) {
                if (a.data.isNeedUpdateUserInfo) {
                    var n = 10 * e,
                        r = 10 * n;
                    m.game.createUserInfoBtn("image", "", "https://h5gameres.kuaiyugo.com/chatgame/cocos_games_res/shareImages/FishEscape/login.png", {
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
                                s.Fish_UserData.setNickName(e);
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
                        s.Fish_UserData.setNickName(e);
                    }
                }), m.dataStatistics.saveLog(d);
            }, function(t) {
                console.log(t), n && n(t);
            });
    }, t.login2 = function(r, e, t, o, d, n, a, s) {
        void 0 === a && (a = 320), void 0 === s && (s = 568), this.login(r, e, t, d, n, a, s, o);
    }, t.login3 = function(r, e, t, o, s) {
        var n = c.Wx.getSystemInfoSync();
        this.login(r, e, t, s, null, n.screenWidth, n.screenHeight, o);
    }, t.onShow = function(a, e, t) {
        m.dataStatistics.onShowInfo(a, e, t), m.dataStatistics.saveLog(a);
    }, t.onHide = function() {
        m.dataStatistics.onHideInfo();
    }, t.share = function(p, g, e, t, o, n, a, s, c, r, u) {
        void 0 === g && (g = ""), void 0 === e && (e = null), void 0 === t && (t = null),
            void 0 === o && (o = null), void 0 === n && (n = null), void 0 === a && (a = ""),
            void 0 === s && (s = ""), void 0 === c && (c = ""), void 0 === r && (r = ""), void 0 === u && (u = ""),
            console.log("调用分享"), m.dataStatistics.getShareInfo(p, function(r) {
                console.log("获取分享数据成功：", r), m.dataStatistics.shareAppMsg({
                    title: (a || "") + r.data.data.title,
                    imageUrl: r.data.data.image,
                    query: g || "",
                    success: function(o) {
                        m.dataStatistics.shareSuccess(d.default.invitation), t && t(o);
                    },
                    fail: o || null,
                    complete: n || null
                });
            }, function() {
                l(), e && e();
            }, s, c, r + "", u);
    }, t.shareScore = function(r, e, t, o, s, n) {
        void 0 === e && (e = ""), void 0 === t && (t = null), void 0 === o && (o = null),
            void 0 === s && (s = null), void 0 === n && (n = null), this.share(d.default.result, e, t, o, s, n, "我的分数：" + r);
    }, t.shareScore2 = function(r, e, t, o, l, n, a, s) {
        void 0 === r && (r = ""), void 0 === o && (o = ""), void 0 === l && (l = null),
            void 0 === n && (n = null), void 0 === a && (a = null), void 0 === s && (s = null),
            this.share(d.default.result, o, l, n, a, s, "", e, t, r);
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
        var d = {
            codeBody: JSON.stringify({
                openid: wx.getStorageSync("userId"),
                appKey: m.config.appKey,
                appid: m.config.appId,
                param: r
            }),
            pageType: a
        };
        m.dataStatistics.gameHttp(m.config.api + "gamepay/createWXACode", d, "POST").then(function(a) {
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
                r = a.query.price;
            o && r && (e(o, r) ? c.default.showModal("提示", "您已购买该道具,我们将返还您在ReadyGo平台消耗的金币。") : m.coin.updateGold(-r, "购买道具", "game", function(a) {
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