function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function l(r, s, d) {
    return new Promise(function(l, t) {
        var o = wx.getStorageSync("sessionId");
        console.log(o), wx.request({
            url: r,
            data: s,
            method: d,
            header: {
                "content-type": "application/json",
                "session-id": o
            },
            success: function(o) {
                0 == o.data.code ? l(o.data) : t(o);
            },
            fail: function(o) {
                t(o);
            }
        });
    });
}

var n = function() {
        function a(a, e) {
            for (var t, n = 0; n < e.length; n++) t = e[n], t.enumerable = t.enumerable || !1,
                t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(a, t.key, t);
        }
        return function(n, e, t) {
            return e && a(n.prototype, e), t && a(n, t), n;
        };
    }(),
    r = o(require("./config")),
    p = o(require("./dataStatistics")),
    s = function() {
        function t() {
            (function(o, e) {
                if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
            })(this, t);
        }
        return n(t, null, [{
            key: "updateGold",
            value: function(s, d, c, m, g) {
                try {
                    var n = {
                        appId: r.default.appId,
                        gold: s,
                        goldSource: d,
                        from: c
                    };
                    l(r.default.api + "user/updateGold", n, "POST").then(function(t) {
                        m(t), p.default.goldCount(s, t.data.gold);
                    }, function(t) {
                        g(t);
                    });
                } catch (t) {
                    g(t);
                }
            }
        }, {
            key: "getGameGoldBalance",
            value: function(a, t) {
                try {
                    l(r.default.api + "user/getGameGoldBalance?appId=" + r.default.appId, "", "GET").then(function(t) {
                        a(t);
                    }, function(o) {
                        t(o);
                    });
                } catch (o) {
                    t(o);
                }
            }
        }, {
            key: "addUserOpenidMapping",
            value: function(d, e, p, o) {
                var c = this,
                    n = "";
                if (d.query.openid ? n = d.query.openid : d.referrerInfo && d.referrerInfo.extraData && d.referrerInfo.extraData.openid && (n = d.referrerInfo.extraData.openid),
                    "" == n || null == n || null == n) c.checkSynchronized(function(t) {
                    t.data.isSynchronized ? c.getGameGoldBalance(function(t) {
                        p(t);
                    }, function(t) {
                        o(t);
                    }) : o({
                        code: 10410,
                        data: "",
                        msg: "没有进行金币关联"
                    });
                }, function(t) {
                    o(t);
                }, "gold");
                else {
                    var m = {
                        openId: n,
                        appId: r.default.appId,
                        gold: e
                    };
                    l(r.default.api + "user/addUserOpenidMapping", m, "POST").then(function() {
                        c.checkSynchronized(function(t) {
                            t.data.isSynchronized ? c.getGameGoldBalance(function(t) {
                                p(t);
                            }, function(t) {
                                o(t);
                            }) : o({
                                code: 10410,
                                data: "",
                                msg: "没有进行金币关联"
                            });
                        }, function(t) {
                            o(t);
                        }, "gold");
                    }, function(t) {
                        console.log("服务器返回错误:"), o(t);
                    });
                }
            }
        }, {
            key: "checkSynchronized",
            value: function(a, t) {
                var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "";
                try {
                    l(r.default.api + "user/checkSynchronized?checkTarget=" + o, "", "GET").then(function(t) {
                        a(t);
                    }, function(o) {
                        t(o);
                    });
                } catch (o) {
                    t(o);
                }
            }
        }, {
            key: "getGoldExplain",
            value: function(a, t) {
                try {
                    l(r.default.api + "user/getGoldExplain", "", "GET").then(function(t) {
                        a(t);
                    }, function(o) {
                        t(o);
                    });
                } catch (o) {
                    t(o);
                }
            }
        }]), t;
    }();
export default s;