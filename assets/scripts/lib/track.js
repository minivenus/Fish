function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
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
    d = o(require("./config")),
    a = o(require("./trackTable"));
t.default = new(function() {
    function t() {
        (function(o, e) {
            if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
        })(this, t), this.trackTable = a.default;
    }
    return i(t, [{
        key: "getExtraParamKey",
        value: function(t) {
            try {
                var a = "";
                return this.trackTable.forEach(function(n) {
                    var e = Object.keys(n);
                    t == n.type && (a = e[1]);
                }), a;
            } catch (e) {
                console.log(e);
            }
        }
    }, {
        key: "trackLog",
        value: function(o, e) {
            try {
                (function(a) {
                    var n = 0;
                    ! function i() {
                        wx.request({
                            url: "https://h5game-log.kuaiyugo.com/dataAnalysis/saveUserBehaviorLogV2",
                            data: a,
                            method: "POST",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function() {
                                console.log(a);
                            },
                            fail: function(t) {
                                return 2 > n ? (n++, a.retryTimes = n, void i()) : void console.log(t, "数据上报日志失败");
                            }
                        });
                    }();
                })({
                    userLog: this.getObject(o, e)
                });
            } catch (t) {
                console.log(t);
            }
        }
    }, {
        key: "gameHttp",
        value: function(r, s, d) {
            try {
                return "GET" == d && (r = this.stringify(r, s)), new Promise(function(l, o) {
                    var i = wx.getStorageSync("sessionId") || "";
                    wx.request({
                        url: r,
                        data: s,
                        method: d,
                        header: {
                            "content-type": "application/json",
                            "session-id": i
                        },
                        success: function(a) {
                            var e = a.data.code;
                            a.data.data.code && (e = a.data.data.code), 0 == e ? l(a.data) : o(a.data);
                        },
                        fail: function(t) {
                            o(t);
                        }
                    });
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, {
        key: "getObject",
        value: function(a, r) {
            try {
                var t = wx.getSystemInfoSync(),
                    o = {
                        v: "1.0.7"
                    };
                if (o.ext = {
                        ak: d.default.appKey,
                        ccode: wx.getStorageSync("channelCode") || "",
                        sid: wx.getStorageSync("sid") || "",
                        type: a,
                        uid: wx.getStorageSync("uid"),
                        scene: wx.getStorageSync("scene") || ""
                    }, o.device = t, void 0 !== r) {
                    var i = this.getExtraParamKey(a);
                    "extraParam" != i && "" != i && (o.ext[i] = r);
                }
                return o.ext = function(o) {
                    for (var e in o) "number" != typeof o[e] && ("" != o[e] && null != o[e] && null != o[e] && "{}" != JSON.stringify(o[e]) || delete o[e]);
                    return o;
                }(o.ext), o;
            } catch (t) {
                console.log(t);
            }
        }
    }]), t;
}())();