function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function d(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

function s(e) {
    b(e);
    var a = 0;
    (function n() {
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
    })();
}

function g(a, r, s) {
    try {
        return new Promise(function(n, t) {
            wx.request({
                url: N.default.api + s,
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
        b(t);
    }
}

function h(t) {
    return b(t), {
        code: -10110,
        data: t,
        msg: "request fail"
    };
}

function _(t) {
    return b(t), {
        code: -10111,
        data: "",
        msg: t
    };
}

function n(o, n, a) {
    try {
        wx.login({
            success: function(r) {
                var e = r.code,
                    s = {
                        appId: N.default.appId,
                        code: e
                    };
                // var s = "1";
                // b("获取" + s), wx.setStorageSync("uid", s), wx.setStorageSync("sessionId", "1"),
                //     y(o, n, a, null);
                if (1 == S(s)) g(s, "POST", "user/standAloneLogin").then(function(r) {
                    if (console.log(r, "res"), b({
                            name: "登录信息",
                            res: r
                        }), 0 == r.data.code) {
                        k = r.data.debug;
                        try {
                            console.log(r.data.data.sessionId);
                            var s = r.data.data.openId;
                            b("获取" + s), wx.setStorageSync("uid", s), wx.setStorageSync("sessionId", r.data.data.sessionId),
                                y(o, n, a, r.data);
                        } catch (t) {
                            console.log(t), f(o, n, a, t, "str");
                        }
                    } else f(o, n, a, r, "obj");
                }).catch(function(t) {
                    f(o, n, a, t, "obj");
                });
                else {
                    var d = _("前端检查参数不正确" + JSON.stringify(s));
                    a(d);
                }
            },
            fail: function(t) {
                b("微信Login失败"), f(o, n, a, t, "obj");
            }
        });
    } catch (t) {
        b(t), wx.hideLoading();
    }
}

function f(r, t, o, s, e) {
    try {
        var d = "网络异常，是否重新登录";
        "str" == e ? d += " " + s : "obj" == e && (s.data ? d += " " + JSON.stringify(s.data.msg) : d += " " + JSON.stringify(s)),
            console.log(d), wx.hideLoading(), wx.showModal({
                title: "提示",
                content: d,
                showCancel: !1,
                success: function(a) {
                    if (a.confirm) try {
                        wx.showLoading({
                            title: "登录中...",
                            mask: !1
                        }), n(r, t, o);
                    } catch (a) {
                        wx.showLoading({
                            title: "登录中...",
                            mask: !1
                        }), n(r, t, o);
                    }
                },
                fail: function() {
                    n(r, t, o);
                }
            });
    } catch (t) {
        b(t);
    }
}

function y(a, e, t, o) {
    console.log(a);
    try {
        var r = v("login_in");
        wx.setStorageSync("lastlogintime", new Date().getTime()), a.scene && (r.ext.scene = a.scene),
            function(o) {
                try {
                    var e = "";
                    if (o.query.goto ? e = o.query.goto : o.referrerInfo && o.referrerInfo.extraData && o.referrerInfo.extraData.goto && (e = o.referrerInfo.extraData.goto),
                        "" == e || null == e || null == e) return;
                    g("", "GET", "game/getGotoConfig?id=" + e).then(function(a) {
                        b(a);
                        var e = a.data.data,
                            t = e.is_open;
                        if (b(t), t) {
                            var o = e.appid,
                                r = e.next_id;
                            wx.navigateToMiniProgram({
                                appId: o,
                                envVersion: "release",
                                extraData: {
                                    goto: r
                                },
                                success: function(t) {
                                    b(t);
                                }
                            });
                        }
                    }).catch(function(t) {
                        b(t);
                    });
                } catch (t) {
                    b(t);
                }
            }(a), a.query.channelCode ? r.ext.ccode = a.query.channelCode : a.referrerInfo && a.referrerInfo.extraData && a.referrerInfo.extraData.channelCode && (r.ext.ccode = a.referrerInfo.extraData.channelCode);
        try {
            wx.setStorageSync("channelCode", r.ext.ccode);
        } catch (t) {
            wx.setStorageSync("channelCode", r.ext.ccode);
        }
        a.query.sid && (r.ext.sid = a.query.sid);
        try {
            wx.setStorageSync("sid", r.ext.sid);
        } catch (t) {
            wx.setStorageSync("sid", r.ext.sid);
        }
        e(o), wx.hideLoading(), R(r.ext), s({
            userLog: r
        });
    } catch (t) {
        wx.hideLoading(), b(t);
    }
}

function C(r, t, o, s, n) {
    try {
        var e = "网络异常，请稍后重试";
        k && (e += JSON.stringify(n)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            success: function() {
                "get" == r ? l.getKVUserData(o, s) : "set" == r && l.setKVUserData(t, o, s);
            },
            fail: function(a) {
                C(r, t, o, s, a);
            }
        });
    } catch (t) {
        b(t);
    }
}

function S(o) {
    for (var e in b(o), o)
        if (null == o[e] || "" == o[e] || "undefined" == o[e]) return -1;
    return 1;
}

function b(t) {
    console.log(t);
}

function v(n) {
    try {
        var r = wx.getSystemInfoSync(),
            t = {};
        return t.v = p, t.ext = {
            ak: N.default.appKey,
            ccode: wx.getStorageSync("channelCode") || "",
            sid: wx.getStorageSync("sid") || "",
            type: n,
            uid: wx.getStorageSync("uid"),
            scene: wx.getStorageSync("scene") || ""
        }, t.device = r, a, t;
    } catch (t) {
        b(t);
    }
}

function R(o) {
    for (var e in o) "" != o[e] && null != o[e] && null != o[e] && "{}" != JSON.stringify(o[e]) || delete o[e];
    return o;
}

var P = function() {
        function a(a, e) {
            for (var t, n = 0; n < e.length; n++) t = e[n], t.enumerable = t.enumerable || !1,
                t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(a, t.key, t);
        }
        return function(n, e, t) {
            return e && a(n.prototype, e), t && a(n, t), n;
        };
    }(),
    N = o(require("./config.js")),
    u = o(require("./EChannelPrefix")),
    p = "1.0.8",
    k = !1,
    a = !1;
var l = function() {
    function t() {
        (function(o, e) {
            if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
        })(this, t);
    }
    return P(t, null, [{
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
                var a = v("share");
                a.ext.sid = a.ext.uid, o.query && "" != o.query ? o.query += "&sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode : o.query = "sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode,
                    b({
                        name: "options",
                        options: o
                    }), wx.shareAppMessage(o), a.ext = R(a.ext), s({
                        userLog: a
                    });
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "onShareAppMsg",
        value: function(o) {
            try {
                var a = v("share");
                return a.ext.sid = a.ext.uid, a.ext.ccode = wx.getStorageSync("passivechannelcode"),
                    o.query && "" != o.query ? o.query += "&sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode : o.query = "sid=" + a.ext.sid + "&channelCode=" + a.ext.ccode,
                    a.ext = R(a.ext), s({
                        userLog: a
                    }), b({
                        name: "options",
                        options: o
                    }), o;
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "shareSuccess",
        value: function(o) {
            try {
                var e = v("sharesuccess");
                if ("initiative" == o) try {
                    e.ext.ccode = wx.getStorageSync("channelCode");
                } catch (t) {
                    e.ext.ccode = wx.getStorageSync("channelCode");
                } else try {
                    e.ext.ccode = wx.getStorageSync("passivechannelcode");
                } catch (t) {
                    e.ext.ccode = wx.getStorageSync("passivechannelcode");
                }
                e.ext.sid = e.ext.uid, e.ext = R(e.ext), s({
                    userLog: e
                });
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "onShowInfo",
        value: function(a, e, t) {
            b("sdk_config.version" + p);
            var o = e || function() {},
                r = t || function() {};
            try {
                "" == wx.getStorageSync("uid") || null == wx.getStorageSync("uid") ? function a(e, t, o) {
                    try {
                        wx.showLoading({
                            title: "登录中...",
                            mask: !0,
                            success: function() {
                                n(e, t, o);
                            },
                            fail: function() {
                                a(e, t, o);
                            }
                        });
                    } catch (t) {
                        b(t);
                    }
                }(a, o, r) : y(a, o, r, {
                    code: 0,
                    data: {
                        openId: wx.getStorageSync("uid")
                    },
                    msg: ""
                });
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "onHideInfo",
        value: function() {
            try {
                var t = v("login_out");
                t.ext.preLogin = wx.getStorageSync("lastlogintime"), t.ext = R(t.ext), s({
                    userLog: t
                });
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "getShareInfo",
        value: function(p, m, t) {
            var o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "",
                g = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "",
                n = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : "",
                a = 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : "",
                s = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : "";
            try {
                var c = m || function() {},
                    f = t || function() {},
                    y = {
                        channelPrefix: p,
                        appKey: N.default.appKey
                    };
                if (1 == S(y))(function(d) {
                    var l = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                        e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "",
                        n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "",
                        a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "",
                        s = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : "",
                        p = "";
                    try {
                        p = wx.getStorageSync("uid");
                    } catch (t) {}
                    return new Promise(function(r, o) {
                        wx.request({
                            url: N.default.api + "backendManager/getMaterialInfoByAppkey?channelPrefix=" + d + "&appKey=" + N.default.appKey + "&userId=" + p + "&materialSuffix=" + l + "&name=" + e + "&point=" + n + "&other=" + a + "&channelCode=" + s,
                            method: "GET",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(o) {
                                if (b({
                                        name: "服务器返回分享信息",
                                        res: o
                                    }), o.data.data.channel_code) {
                                    var a = o.data.data.channel_code;
                                    if (d == u.default.regular) try {
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
                })(p, o, g, n, a, s).then(function(t) {
                    "function" == typeof c && c(t);
                }).catch(function(o) {
                    var e = h(o);
                    "function" == typeof f && f(e);
                });
                else {
                    var C = _("前端检查参数不正确" + JSON.stringify(y));
                    f(C);
                }
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "setKVUserData",
        value: function(r, d, e) {
            try {
                var t = {
                        appKey: N.default.appKey,
                        user: wx.getStorageSync("uid"),
                        value: r
                    },
                    l = d || function() {},
                    p = e || function() {};
                if (1 == S(t)) g(t, "POST", "game/setKVUserData").then(function(t) {
                    b(t), "function" == typeof l && l(t);
                }).catch(function(o) {
                    b(o);
                    var e = h(o);
                    "function" == typeof p && p(e), C("set", r, l, p, o);
                });
                else {
                    var c = _("前端检查参数不正确" + JSON.stringify(t));
                    p(c);
                }
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "getKVUserData",
        value: function(r, e) {
            try {
                var d = r || function() {},
                    l = e || function() {},
                    t = wx.getStorageSync("uid"),
                    p = {
                        appKey: N.default.appKey,
                        user: t
                    };
                if (1 == S(p)) g("", "GET", "game/getKVUserData?appKey=" + N.default.appKey + "&user=" + t).then(function(t) {
                    b(t), "function" == typeof d && d(t);
                }).catch(function(o) {
                    var e = h(o);
                    "function" == typeof l && l(e), C("get", "", d, l, o);
                });
                else {
                    var a = _("前端检查参数不正确" + JSON.stringify(p));
                    l(a);
                }
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "getServerTime",
        value: function(a, t) {
            try {
                g("", "GET", "user/getServerTime").then(function(t) {
                    a(t);
                }).catch(function(o) {
                    t(o);
                });
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "getGameConfigByAppkey",
        value: function(a, e) {
            try {
                var t = a || function() {},
                    r = e || function() {};
                if ("" == N.default.appKey || null == N.default.appKey) {
                    var s = _("前端检查参数不正确appkey=" + N.default.appKey);
                    r(s);
                } else g("", "GET", "game/getGameConfigByAppkey?appKey=" + N.default.appKey).then(function(a) {
                    b(a), "function" == typeof t && t(a);
                }).catch(function(o) {
                    var e = h(o);
                    "function" == typeof r && r(e);
                });
            } catch (t) {
                b(t);
            }
        }
    }, {
        key: "withDraw",
        value: function() {
            var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
                n = arguments[1],
                o = arguments[2];
            try {
                var r = {
                    codeBody: JSON.stringify({
                        openid: wx.getStorageSync("uid"),
                        appKey: N.default.appKey,
                        appid: N.default.appId,
                        param: a
                    }),
                    pageType: "red_packet"
                };
                this.gameHttp(N.default.api + "gamepay/createWXACode", r, "POST").then(function(a) {
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
        value: function(t, o) {
            try {
                var a = {
                    codeBody: JSON.stringify({
                        openid: wx.getStorageSync("uid"),
                        appKey: N.default.appKey,
                        appid: N.default.appId,
                        channelCode: "moregame"
                    }),
                    pageType: "more_games"
                };
                this.gameHttp(N.default.api + "gamepay/createWXACode", a, "POST").then(function(a) {
                    console.log(a);
                    var e = a.data;
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
        key: "mysteryCode",
        value: function(a, n, o) {
            try {
                var r = {
                    codeBody: JSON.stringify({
                        openid: wx.getStorageSync("uid"),
                        appKey: N.default.appKey,
                        appid: N.default.appId,
                        gameName: a,
                        channelCode: "coinpackage"
                    }),
                    pageType: "mystical_reward"
                };
                this.gameHttp(N.default.api + "gamepay/createWXACode", r, "POST").then(function(a) {
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
        value: function(p, m, g, o) {
            try {
                var u = wx.getStorageSync("gameUserInfo"),
                    h = {};
                if ("string" == typeof u && 5 < u.length) {
                    var a, s = (u = JSON.parse(u)).nickName,
                        c = u.avatarUrl;
                    h.codeBody = JSON.stringify((d(a = {
                        openid: wx.getStorageSync("uid"),
                        appKey: N.default.appKey,
                        appid: N.default.appId,
                        channelCode: "coincheck",
                        gold: m,
                        gameName: p,
                        gameCoin: m
                    }, "gameCoin", m), d(a, "nickName", s), d(a, "avatarUrl", c), a)), h.pageType = "receive_gift";
                } else {
                    var r;
                    h.codeBody = JSON.stringify((d(r = {
                        openid: wx.getStorageSync("uid"),
                        appKey: N.default.appKey,
                        appid: N.default.appId,
                        channelCode: "coincheck",
                        gold: m,
                        gameName: p,
                        gameCoin: m
                    }, "gameCoin", m), d(r, "nickName", ""), d(r, "avatarUrl", ""), r)), h.pageType = "receive_gift";
                }
                this.gameHttp(N.default.api + "gamepay/createWXACode", h, "POST").then(function(a) {
                    console.log(a);
                    var e = a.data;
                    wx.previewImage({
                        current: e,
                        urls: [e],
                        success: function(t) {
                            console.log(t), g({
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
        value: function(p, m, g, o) {
            try {
                var u = wx.getStorageSync("gameUserInfo"),
                    h = {};
                if ("string" == typeof u && 5 < u.length) {
                    var a, s = (u = JSON.parse(u)).nickName,
                        c = u.avatarUrl;
                    h.codeBody = JSON.stringify((d(a = {
                        openid: wx.getStorageSync("uid"),
                        appKey: N.default.appKey,
                        appid: N.default.appId,
                        channelCode: "morecoin",
                        gold: m,
                        gameName: p,
                        gameCoin: m
                    }, "gameCoin", m), d(a, "nickName", s), d(a, "avatarUrl", c), a)), h.pageType = "gold_merge";
                } else {
                    var r;
                    h.codeBody = JSON.stringify((d(r = {
                        openid: wx.getStorageSync("uid"),
                        appKey: N.default.appKey,
                        appid: N.default.appId,
                        channelCode: "morecoin",
                        gold: m,
                        gameName: p,
                        gameCoin: m
                    }, "gameCoin", m), d(r, "nickName", ""), d(r, "avatarUrl", ""), r)), h.pageType = "gold_merge";
                }
                this.gameHttp(N.default.api + "gamepay/createWXACode", h, "POST").then(function(a) {
                    console.log(a);
                    var e = a.data;
                    wx.previewImage({
                        current: e,
                        urls: [e],
                        success: function(t) {
                            console.log(t), g({
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
            } catch (t) {
                b(t);
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
            var t = v("changeGold");
            t.ext.goldValue = a, t.ext.goldAccount = e, t.ext = R(t.ext), s(t);
        }
    }]), t;
}();
export default l;