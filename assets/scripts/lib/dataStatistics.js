function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

function d(e) {
    if (l(e), S) {
        var a = 0;
        ! function n() {
            wx.request({
                url: "https://h5game-log.kuaiyugo.com/dataAnalysis/saveUserBehaviorLogV2",
                data: e,
                method: "POST",
                header: {
                    "content-type": "application/json"
                },
                success: function() {},
                fail: function() {
                    2 > a && (a++, e.retryTimes = a, n());
                }
            });
        }();
    }
}

function F(a, r, s) {
    try {
        return new Promise(function(n, t) {
            wx.request({
                url: _.default.api + s,
                data: a,
                method: r,
                header: {
                    "content-type": "application/json"
                },
                success: function(o) {
                    0 == o.data.code ? n(o) : t(o);
                },
                fail: function(o) {
                    t(o);
                }
            });
        });
    } catch (t) {
        l(t);
    }
}

function c(t) {
    return l(t), {
        code: -10110,
        data: t,
        msg: "request fail"
    };
}

function u(t) {
    return l(t), {
        code: -10111,
        data: "",
        msg: t
    };
}

function a(o, n, a) {
    try {
        wx.login({
            success: function(s) {
                var e = s.code,
                    d = {
                        appId: _.default.appId,
                        code: e
                    };
                if (1 == L(d)) F(d, "POST", "user/standAloneLogin").then(function(i) {
                    if (console.log(i, "res"), l({
                            name: "登录信息",
                            res: i
                        }), 0 == i.data.code) {
                        C = i.data.debug;
                        try {
                            console.log(i.data.data.sessionId);
                            var s = i.data.data.openId;
                            l("获取" + s), wx.setStorageSync("uid", s), wx.setStorageSync("sessionId", i.data.data.sessionId),
                                r(o, n, a, i.data);
                        } catch (t) {
                            console.log(t), p(o, n, a, t, "str");
                        }
                    } else p(o, n, a, i, "obj");
                }).catch(function(t) {
                    p(o, n, a, t, "obj");
                });
                else {
                    var c = u("前端检查参数不正确" + JSON.stringify(d));
                    a(c);
                }
            },
            fail: function(t) {
                l("微信Login失败"), p(o, n, a, t, "obj");
            }
        });
    } catch (e) {
        l(e), wx.hideLoading();
    }
}

function p(r, t, o, i, e) {
    try {
        var n = "网络异常，是否重新登录";
        "str" == e ? n += " " + i : "obj" == e && (i.data ? n += " " + JSON.stringify(i.data.msg) : n += " " + JSON.stringify(i)),
            console.log(n), wx.hideLoading(), wx.showModal({
                title: "提示",
                content: n,
                showCancel: !1,
                success: function(n) {
                    if (n.confirm) try {
                        wx.showLoading({
                            title: "登录中...",
                            mask: !1
                        }), a(r, t, o);
                    } catch (n) {
                        wx.showLoading({
                            title: "登录中...",
                            mask: !1
                        }), a(r, t, o);
                    }
                },
                fail: function() {
                    a(r, t, o);
                }
            });
    } catch (e) {
        l(e);
    }
}

function r(a, e, t, o) {
    console.log(a);
    try {
        var i = m("login_in");
        wx.setStorageSync("lastlogintime", new Date().getTime()), a.scene && (i.ext.scene = a.scene),
            function(o) {
                try {
                    var e = "";
                    if (o.query.goto ? e = o.query.goto : o.referrerInfo && o.referrerInfo.extraData && o.referrerInfo.extraData.goto && (e = o.referrerInfo.extraData.goto),
                        "" == e || null == e || null == e) return;
                    F("", "GET", "game/getGotoConfig?id=" + e).then(function(a) {
                        l(a);
                        var e = a.data.data,
                            t = e.is_open;
                        if (l(t), t) {
                            var o = e.appid,
                                r = e.next_id;
                            wx.navigateToMiniProgram({
                                appId: o,
                                envVersion: "release",
                                extraData: {
                                    goto: r
                                },
                                success: function(t) {
                                    l(t);
                                }
                            });
                        }
                    }).catch(function(t) {
                        l(t);
                    });
                } catch (t) {
                    l(t);
                }
            }(a), a.query.channelCode ? i.ext.ccode = a.query.channelCode : a.referrerInfo && a.referrerInfo.extraData && a.referrerInfo.extraData.channelCode && (i.ext.ccode = a.referrerInfo.extraData.channelCode);
        try {
            wx.setStorageSync("channelCode", i.ext.ccode);
        } catch (t) {
            wx.setStorageSync("channelCode", i.ext.ccode);
        }
        a.query.sid && (i.ext.sid = a.query.sid);
        try {
            wx.setStorageSync("sid", i.ext.sid);
        } catch (t) {
            wx.setStorageSync("sid", i.ext.sid);
        }
        e(o), wx.hideLoading(), g(i.ext), d({
            userLog: i
        });
    } catch (t) {
        wx.hideLoading(), l(t);
    }
}

function s(r, t, o, i, n) {
    try {
        var e = "网络异常，请稍后重试";
        C && (e += JSON.stringify(n)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            success: function() {
                "get" == r ? P.getKVUserData(o, i) : "set" == r && P.setKVUserData(t, o, i);
            },
            fail: function(a) {
                s(r, t, o, i, a);
            }
        });
    } catch (e) {
        l(e);
    }
}

function L(o) {
    for (var e in l(o), o)
        if (null == o[e] || "" == o[e] || "undefined" == o[e]) return -1;
    return 1;
}

function l(t) {
    y && console.log(t);
}

function m(a) {
    try {
        var n = wx.getSystemInfoSync(),
            t = {};
        return t.v = f, t.ext = {
            ak: _.default.appKey,
            ccode: wx.getStorageSync("channelCode") || "",
            sid: wx.getStorageSync("sid") || "",
            type: a,
            uid: wx.getStorageSync("uid"),
            scene: wx.getStorageSync("scene") || ""
        }, t.device = n, b && (t.location = v), t;
    } catch (t) {
        l(t);
    }
}

function g(o) {
    for (var e in o) "" != o[e] && null != o[e] && null != o[e] && "{}" != JSON.stringify(o[e]) || delete o[e];
    return o;
}
var h = function() {
        function a(a, e) {
            for (var t, n = 0; n < e.length; n++) t = e[n], t.enumerable = t.enumerable || !1,
                t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(a, t.key, t);
        }
        return function(n, e, t) {
            return e && a(n.prototype, e), t && a(n, t), n;
        };
    }(),
    _ = o(require("./config.js")),
    n = o(require("./EChannelPrefix")),
    f = "1.0.7",
    y = !0,
    C = !1,
    S = !0,
    b = !1,
    v = {};
var P = function() {
    function t() {
        (function(o, e) {
            if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
        })(this, t);
    }
    return h(t, null, [{
        key: "saveLog",
        value: function(a) {
            try {
                var e = wx.getStorageSync("channelCode") || "",
                    t = wx.getStorageSync("scene") || "",
                    o = wx.getStorageSync("sid") || "";
                "" == e && a.query.channelCode ? e = a.query.channelCode : "" == e && a.referrerInfo && a.referrerInfo.extraData && a.referrerInfo.extraData.channelCode && (e = a.referrerInfo.extraData.channelCode),
                    "" == o && a.query.sid && (o = a.query.sid), "" == t && a.scene && (t = a.scene),
                    wx.setStorageSync("channelCode", e), wx.setStorageSync("sid", o), wx.setStorageSync("scene", t);
            } catch (t) {
                console.log(t);
            }
        }
    }, {
        key: "shareAppMsg",
        value: function(o) {
            try {
                var a = m("share");
                a.ext.sid = a.ext.uid, o.query && "" != o.query ? o.query += "&sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode : o.query = "sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode,
                    l({
                        name: "options",
                        options: o
                    }), wx.shareAppMessage(o), a.ext = g(a.ext), d({
                        userLog: a
                    });
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "onShareAppMsg",
        value: function(o) {
            try {
                var a = m("share");
                return a.ext.sid = a.ext.uid, a.ext.ccode = wx.getStorageSync("passivechannelcode"),
                    o.query && "" != o.query ? o.query += "&sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode : o.query = "sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode,
                    a.ext = g(a.ext), d({
                        userLog: a
                    }), l({
                        name: "options",
                        options: o
                    }), o;
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "shareSuccess",
        value: function(o) {
            try {
                var e = m("sharesuccess");
                if ("initiative" == o) try {
                    e.ext.ccode = wx.getStorageSync("channelCode");
                } catch (t) {
                    e.ext.ccode = wx.getStorageSync("channelCode");
                } else try {
                    e.ext.ccode = wx.getStorageSync("passivechannelcode");
                } catch (t) {
                    e.ext.ccode = wx.getStorageSync("passivechannelcode");
                }
                e.ext.sid = e.ext.uid, e.ext = g(e.ext), d({
                    userLog: e
                });
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "onShowInfo",
        value: function(s, e, t) {
            l("sdk_config.version" + f);
            var o = e || function() {},
                i = t || function() {};
            try {
                "" == wx.getStorageSync("uid") || null == wx.getStorageSync("uid") ? function n(e, t, o) {
                    try {
                        wx.showLoading({
                            title: "登录中...",
                            mask: !0,
                            success: function() {
                                a(e, t, o);
                            },
                            fail: function() {
                                n(e, t, o);
                            }
                        });
                    } catch (e) {
                        l(e);
                    }
                }(s, o, i) : r(s, o, 0, {
                    code: 0,
                    data: {
                        openId: wx.getStorageSync("uid")
                    },
                    msg: ""
                });
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "onHideInfo",
        value: function() {
            try {
                var t = m("login_out");
                t.ext.preLogin = wx.getStorageSync("lastlogintime"), t.ext = g(t.ext), d({
                    userLog: t
                });
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "getShareInfo",
        value: function(p, m, t) {
            var o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "",
                i = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "",
                g = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : "",
                a = 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : "",
                s = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : "";
            try {
                var f = m || function() {},
                    y = t || function() {},
                    C = {
                        channelPrefix: p,
                        appKey: _.default.appKey
                    };
                if (1 == L(C))(function(d) {
                    var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                        e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "",
                        p = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "",
                        a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "",
                        s = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : "",
                        c = "";
                    try {
                        c = wx.getStorageSync("uid");
                    } catch (e) {}
                    return new Promise(function(r, o) {
                        wx.request({
                            url: _.default.api + "backendManager/getMaterialInfoByAppkey?channelPrefix=" + d + "&appKey=" + _.default.appKey + "&userId=" + c + "&materialSuffix=" + i + "&name=" + e + "&point=" + p + "&other=" + a + "&channelCode=" + s,
                            method: "GET",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(o) {
                                if (l({
                                        name: "服务器返回分享信息",
                                        res: o
                                    }), o.data.data.channel_code) {
                                    var a = o.data.data.channel_code;
                                    if (d == n.default.regular) try {
                                        wx.setStorageSync("passivechannelcode", a);
                                    } catch (t) {
                                        wx.setStorageSync("passivechannelcode", a);
                                    } else wx.setStorageSync("channelCode", a);
                                }
                                r(o);
                            },
                            fail: function(t) {
                                o(t);
                            }
                        });
                    });
                })(p, o, i, g, a, s).then(function(t) {
                    "function" == typeof f && f(t);
                }).catch(function(o) {
                    var e = c(o);
                    "function" == typeof y && y(e);
                });
                else {
                    var d = u("前端检查参数不正确" + JSON.stringify(C));
                    y(d);
                }
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "setKVUserData",
        value: function(r, d, e) {
            try {
                var t = {
                        appKey: _.default.appKey,
                        user: wx.getStorageSync("uid"),
                        value: r
                    },
                    i = d || function() {},
                    p = e || function() {};
                if (1 == L(t)) F(t, "POST", "game/setKVUserData").then(function(t) {
                    l(t), "function" == typeof i && i(t);
                }).catch(function(o) {
                    l(o);
                    var e = c(o);
                    "function" == typeof p && p(e), s("set", r, i, p, o);
                });
                else {
                    var m = u("前端检查参数不正确" + JSON.stringify(t));
                    p(m);
                }
            } catch (e) {
                l(e);
            }
        }
    }, {
        key: "getKVUserData",
        value: function(r, e) {
            try {
                var d = r || function() {},
                    p = e || function() {},
                    t = wx.getStorageSync("uid"),
                    m = {
                        appKey: _.default.appKey,
                        user: t
                    };
                if (1 == L(m)) F("", "GET", "game/getKVUserData?appKey=" + _.default.appKey + "&user=" + t).then(function(t) {
                    l(t), "function" == typeof d && d(t);
                }).catch(function(o) {
                    var e = c(o);
                    "function" == typeof p && p(e), s("get", "", d, p, o);
                });
                else {
                    var a = u("前端检查参数不正确" + JSON.stringify(m));
                    p(a);
                }
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "getServerTime",
        value: function(a, t) {
            try {
                F("", "GET", "user/getServerTime").then(function(t) {
                    a(t);
                }).catch(function(o) {
                    t(o);
                });
            } catch (e) {
                l(e);
            }
        }
    }, {
        key: "getGameConfigByAppkey",
        value: function(a, e) {
            try {
                var t = a || function() {},
                    r = e || function() {};
                if ("" == _.default.appKey || null == _.default.appKey) {
                    var s = u("前端检查参数不正确appkey=" + _.default.appKey);
                    r(s);
                } else F("", "GET", "game/getGameConfigByAppkey?appKey=" + _.default.appKey).then(function(a) {
                    l(a), "function" == typeof t && t(a);
                }).catch(function(o) {
                    var e = c(o);
                    "function" == typeof r && r(e);
                });
            } catch (t) {
                l(t);
            }
        }
    }, {
        key: "withDraw",
        value: function() {
            var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
                n = arguments[1],
                o = arguments[2];
            try {
                var i = {
                    codeBody: JSON.stringify({
                        openid: wx.getStorageSync("uid"),
                        appKey: _.default.appKey,
                        appid: _.default.appId,
                        param: a
                    }),
                    pageType: "red_packet"
                };
                this.gameHttp(_.default.api + "gamepay/createWXACode", i, "POST").then(function(a) {
                    console.log(a);
                    var e = a.data;
                    wx.previewImage({
                        current: e,
                        urls: [e],
                        success: function(t) {
                            console.log(t), n({
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
            } catch (t) {
                o(t);
            }
        }
    }, {
        key: "createPFCode",
        value: function(t, a) {
            try {
                var o = {
                    codeBody: JSON.stringify({
                        openid: wx.getStorageSync("uid"),
                        appKey: _.default.appKey,
                        appid: _.default.appId,
                        channelCode: "moregame"
                    }),
                    pageType: "more_games"
                };
                this.gameHttp(_.default.api + "gamepay/createWXACode", o, "POST").then(function(o) {
                    console.log(o);
                    var e = o.data;
                    wx.previewImage({
                        current: e,
                        urls: [e],
                        success: function(o) {
                            console.log(o), t({
                                code: 0,
                                data: "",
                                msg: "获取二维码成功"
                            });
                        },
                        fail: function(t) {
                            a(t);
                        }
                    });
                }, function(t) {
                    a(t);
                });
            } catch (e) {
                a(e);
            }
        }
    }, {
        key: "mysteryCode",
        value: function(a, n, o) {
            try {
                var i = {
                    codeBody: JSON.stringify({
                        openid: wx.getStorageSync("uid"),
                        appKey: _.default.appKey,
                        appid: _.default.appId,
                        gameName: a,
                        channelCode: "coinpackage"
                    }),
                    pageType: "mystical_reward"
                };
                this.gameHttp(_.default.api + "gamepay/createWXACode", i, "POST").then(function(a) {
                    console.log(a);
                    var e = a.data;
                    wx.previewImage({
                        current: e,
                        urls: [e],
                        success: function(t) {
                            console.log(t), n({
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
            } catch (t) {
                o(t);
            }
        }
    }, {
        key: "taskGoldMap",
        value: function(d, p, m, o) {
            try {
                var g = wx.getStorageSync("gameUserInfo"),
                    u = {};
                if ("string" == typeof g && 5 < g.length) {
                    var a, s = (g = JSON.parse(g)).nickName,
                        c = g.avatarUrl;
                    u.codeBody = JSON.stringify((i(a = {
                        openid: wx.getStorageSync("uid"),
                        appKey: _.default.appKey,
                        appid: _.default.appId,
                        channelCode: "coincheck",
                        gold: p,
                        gameName: d,
                        gameCoin: p
                    }, "gameCoin", p), i(a, "nickName", s), i(a, "avatarUrl", c), a)), u.pageType = "receive_gift";
                } else {
                    var r;
                    u.codeBody = JSON.stringify((i(r = {
                        openid: wx.getStorageSync("uid"),
                        appKey: _.default.appKey,
                        appid: _.default.appId,
                        channelCode: "coincheck",
                        gold: p,
                        gameName: d,
                        gameCoin: p
                    }, "gameCoin", p), i(r, "nickName", ""), i(r, "avatarUrl", ""), r)), u.pageType = "receive_gift";
                }
                this.gameHttp(_.default.api + "gamepay/createWXACode", u, "POST").then(function(a) {
                    console.log(a);
                    var e = a.data;
                    wx.previewImage({
                        current: e,
                        urls: [e],
                        success: function(t) {
                            console.log(t), m({
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
            } catch (t) {
                o(t);
            }
        }
    }, {
        key: "goldMap",
        value: function(d, p, m, o) {
            try {
                var g = wx.getStorageSync("gameUserInfo"),
                    u = {};
                if ("string" == typeof g && 5 < g.length) {
                    var a, s = (g = JSON.parse(g)).nickName,
                        c = g.avatarUrl;
                    u.codeBody = JSON.stringify((i(a = {
                        openid: wx.getStorageSync("uid"),
                        appKey: _.default.appKey,
                        appid: _.default.appId,
                        channelCode: "morecoin",
                        gold: p,
                        gameName: d,
                        gameCoin: p
                    }, "gameCoin", p), i(a, "nickName", s), i(a, "avatarUrl", c), a)), u.pageType = "gold_merge";
                } else {
                    var r;
                    u.codeBody = JSON.stringify((i(r = {
                        openid: wx.getStorageSync("uid"),
                        appKey: _.default.appKey,
                        appid: _.default.appId,
                        channelCode: "morecoin",
                        gold: p,
                        gameName: d,
                        gameCoin: p
                    }, "gameCoin", p), i(r, "nickName", ""), i(r, "avatarUrl", ""), r)), u.pageType = "gold_merge";
                }
                this.gameHttp(_.default.api + "gamepay/createWXACode", u, "POST").then(function(a) {
                    console.log(a);
                    var e = a.data;
                    wx.previewImage({
                        current: e,
                        urls: [e],
                        success: function(t) {
                            console.log(t), m({
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
            } catch (t) {
                o(t);
            }
        }
    }, {
        key: "gameHttp",
        value: function(r, s, d) {
            try {
                return "GET" == d && (r = this.stringify(r, s), s = ""), new Promise(function(l, t) {
                    var o = wx.getStorageSync("sessionId") || "";
                    wx.request({
                        url: r,
                        data: s,
                        method: d,
                        header: {
                            "content-type": "application/json",
                            "session-id": o
                        },
                        success: function(t) {
                            l(t.data);
                        },
                        fail: function(o) {
                            t(o);
                        }
                    });
                });
            } catch (e) {
                l(e);
            }
        }
    }, {
        key: "stringify",
        value: function(a, e) {
            var t = 0;
            for (var o in e) 0 == t ? (a = a + "?" + o + "=" + e[o], t++) : a = a + "&" + o + "=" + e[o];
            return a;
        }
    }, {
        key: "goldCount",
        value: function(a, e) {
            var t = m("changeGold");
            t.ext.goldValue = a, t.ext.goldAccount = e, t.ext = g(t.ext), d(t);
        }
    }]), t;
}();
exports.default = P;