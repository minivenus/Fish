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
var i = function() {
        function a(a, e) {
            for (var t, n = 0; n < e.length; n++) t = e[n], t.enumerable = t.enumerable || !1,
                t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(a, t.key, t);
        }
        return function(n, e, t) {
            return e && a(n.prototype, e), t && a(n, t), n;
        };
    }(),
    p = o(require("./config")),
    n = o(require("./dataStatistics")),
    r = function() {
        function t() {
            (function(o, e) {
                if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
            })(this, t);
        }
        return i(t, null, [{
            key: "updateGold",
            value: function(r, s, d, c, i) {
                try {
                    var m = {
                        appId: p.default.appId,
                        gold: r,
                        goldSource: s,
                        from: d
                    };
                    l(p.default.api + "user/updateGold", m, "POST").then(function(t) {
                        c(t), n.default.goldCount(r, t.data.gold);
                    }, function(t) {
                        i(t);
                    });
                } catch (e) {
                    i(e);
                }
            }
        }, {
            key: "getGameGoldBalance",
            value: function(a, n) {
                try {
                    l(p.default.api + "user/getGameGoldBalance?appId=" + p.default.appId, "", "GET").then(function(t) {
                        a(t);
                    }, function(t) {
                        n(t);
                    });
                } catch (e) {
                    n(e);
                }
            }
        }, {
            key: "addUserOpenidMapping",
            value: function(r, e, d, o) {
                var i = this,
                    n = "";
                if (r.query.openid ? n = r.query.openid : r.referrerInfo && r.referrerInfo.extraData && r.referrerInfo.extraData.openid && (n = r.referrerInfo.extraData.openid),
                    "" == n || null == n || null == n) i.checkSynchronized(function(t) {
                    t.data.isSynchronized ? i.getGameGoldBalance(function(t) {
                        d(t);
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
                    var c = {
                        openId: n,
                        appId: p.default.appId,
                        gold: e
                    };
                    l(p.default.api + "user/addUserOpenidMapping", c, "POST").then(function() {
                        i.checkSynchronized(function(t) {
                            t.data.isSynchronized ? i.getGameGoldBalance(function(t) {
                                d(t);
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
            value: function(a, n) {
                var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "";
                try {
                    l(p.default.api + "user/checkSynchronized?checkTarget=" + t, "", "GET").then(function(t) {
                        a(t);
                    }, function(t) {
                        n(t);
                    });
                } catch (e) {
                    n(e);
                }
            }
        }, {
            key: "getGoldExplain",
            value: function(a, n) {
                try {
                    l(p.default.api + "user/getGoldExplain", "", "GET").then(function(t) {
                        a(t);
                    }, function(t) {
                        n(t);
                    });
                } catch (e) {
                    n(e);
                }
            }
        }]), t;
    }();
exports.default = r;