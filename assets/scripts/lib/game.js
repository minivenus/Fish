function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(a, n) {
    try {
        var t = new Date().getTime();
        wx.setStorageSync("lastGetBannerTime", t), P.gameHttp(f.default.api + "game/getSwitchConfig?appId=" + f.default.appId, "", "GET").then(function(t) {
            L = t.data, a && a(L);
        }).catch(function(t) {
            n && n(t);
        });
    } catch (e) {
        n && n(e);
    }
}

function N(t) {
    n && console.log(t);
}

function d(r, s, d) {
    try {
        return new Promise(function(a, t) {
            var o = wx.getStorageSync("sessionId") || "";
            wx.request({
                url: f.default.api + d,
                data: r,
                method: s,
                header: {
                    "content-type": "application/json",
                    "session-id": o
                },
                success: function(o) {
                    0 == o.data.code ? a(o.data) : t(o.data);
                },
                fail: function(o) {
                    t(o);
                }
            });
        });
    } catch (e) {
        N(e);
    }
}

function h(o) {
    for (var e in N(o), o)
        if (null == o[e] || "" == o[e] || "undefined" == o[e]) return -1;
    return 1;
}

function u(t) {
    return N(t), {
        code: -10111,
        data: "",
        msg: t
    };
}

function a(o, a) {
    try {
        wx.login({
            success: function(n) {
                var e = {
                    code: n.code,
                    appId: f.default.appId,
                    sdkVersion: l
                };
                if (1 == h(e)) d(e, "POST", "user/login").then(function(n) {
                    if (0 == n.code) {
                        if (wx.setStorageSync("uid", n.data.openId), !n.data.isNeedUpdateUserInfo) {
                            N("保存了sessionId" + n.data.sessionId), wx.setStorageSync("sessionId", n.data.sessionId);
                            var e = JSON.stringify(n.data.userInfo);
                            wx.setStorageSync("gameUserInfo", e), i();
                        }
                        o(n);
                    } else a(n);
                }, function(t) {
                    a(t);
                });
                else {
                    var t = u("前端检查参数不正确" + JSON.stringify(e));
                    a(t);
                }
            },
            fail: function(t) {
                a(t);
            }
        });
    } catch (e) {
        a(e);
    }
}

function p(r, l, i) {
    try {
        var e = h(r);
        if (1 == P.midasPayCheckIng) {
            console.log("限制在支付成功后轮询成功前不允许重复下单支付 midasPay"), wx.showToast({
                title: "您有订单正在处理中，请稍后再试",
                icon: "none",
                duration: 2e3
            });
            var t = c(g.default.payUnEnd);
            return void i(t);
        }
        if (1 == e) d(r, "POST", "gamepay/addCoinOrder").then(function(a) {
            N({
                name: "成功获取订单",
                res: a
            });
            var n = a.data;
            v = a.data.orderCode;
            var t = a.data.buyQuantity;
            F = 1, 0 == t ? (P.midasPaying = !1, P.midasPayCheckIng = !0, s(l, i)) : (console.log("midasPaytime====真正的米大师支付时间", Date.now(), "midasPayStatus==" + P.midasPaying),
                wx.requestMidasPayment({
                    mode: n.mode,
                    env: n.env,
                    offerId: n.offerId,
                    currencyType: n.currencyType,
                    platform: n.platform,
                    buyQuantity: t,
                    zoneId: n.zoneId,
                    success: function(t) {
                        N({
                            name: "成功回调",
                            res: t
                        }), s(l, i), P.midasPaying = !1, P.midasPayCheckIng = !0;
                    },
                    fail: function(a) {
                        console.log("米大师错误返回:", a);
                        var e, n = {};
                        a.errCode ? (e = a.errCode, d({
                                orderCode: v,
                                midasErrorCode: e
                            }, "POST", "gamepay/cancelCoinOrder").then(function() {
                                console.log("用户支付失败已告知服务器");
                            }, function() {}), n = c(g.default.payError, a)) : n = c(g.default.unknowError),
                            i(n);
                    }
                }));
        }).catch(function(t) {
            N({
                name: "获取订单失败",
                res: t
            }), 40121 == t.code && wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
            }), i(t);
        });
        else {
            var o = u("前端检查参数不正确" + JSON.stringify(r));
            i(o);
        }
    } catch (t) {
        i(t);
    }
}

function s(e, t) {
    try {
        y = setInterval(function() {
            var o = wx.getStorageSync("sessionId");
            if (N("订单号:" + v + "--appId:" + f.default.appId + "--sessionId:" + o + "---waitOrderTime:" + F + "---midasPayErrorNum:" + P.midasPayErrorNum),
                120 < F) {
                N("state=5"), clearInterval(y), P.midasPayCheckIng = !1, F = 1;
                var a = c(g.default.paySuccessDelay);
                e(a);
            } else 1 == P.midasPayRequestIng ? F += 1 : (P.midasPayRequestIng = !0, d("", "GET", "gamepay/getCoinOrderStatus?orderCode=" + v + "&appId=" + f.default.appId).then(function(a) {
                N({
                    name: "成功回调",
                    "回调参数": a
                }), P.midasPayRequestIng = !1;
                var n = a.data;
                if (!(1 != n.pay_status)) {
                    N("pay_status=1"), clearInterval(y), P.midasPayCheckIng = !1, F = 1;
                    var r = c(g.default.paySuccess);
                    e(r);
                } else if (0 == n.pay_status && (N("pay_status=0"), F += 1), 0 != n.order_status) {
                    N("order_status=2"), clearInterval(y), P.midasPayCheckIng = !1, F = 1;
                    var i = c(g.default.orderCancel);
                    t(i);
                }
            }).catch(function(o) {
                P.midasPayErrorNum++, 119 < P.midasPayErrorNum && (P.midasPayErrorNum = 0, clearInterval(y),
                    P.midasPayCheckIng = !1), o.code && o.code == g.default.illegalOrderError.code && (clearInterval(y),
                    P.midasPayCheckIng = !1, t(o)), N({
                    name: "错误回调",
                    "回调参数": o
                }), P.midasPayRequestIng = !1, F = 1;
            }));
        }, 1e3);
    } catch (e) {
        t(e);
    }
}

function c(a, e) {
    try {
        var t = a;
        return e && (t.nativeCode = e.errCode, t.msg = e.errMsg), console.log("米大师支付状态:,", t),
            t;
    } catch (t) {
        console.log(t);
    }
}

function r(a, n) {
    try {
        wx.getUserInfo({
            withCredentials: !0,
            lang: "zh_CN",
            success: function(o) {
                var e = {
                    encryptedData: o.encryptedData,
                    iv: o.iv
                };
                P.authorize(e, a, n);
            },
            fail: function() {
                wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] || wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权，将无法正常使用小游戏的功能体验，请授权重新进入。",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {
                                        N(t), r(a, n);
                                    },
                                    fail: function() {
                                        var e = wx.createOpenSettingButton({
                                            type: "text",
                                            text: "打开设置页面",
                                            style: {
                                                left: S / 2 - 100,
                                                top: b / 2 - 20,
                                                width: 200,
                                                height: 40,
                                                lineHeight: 40,
                                                backgroundColor: "#ff0000",
                                                color: "#ffffff",
                                                textAlign: "center",
                                                fontSize: 16,
                                                borderRadius: 4
                                            }
                                        });
                                        e.onTap(function() {
                                            e.hide(), r(a, n);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (e) {
        n(e);
    }
}

var m = function() {
        function a(a, e) {
            for (var t, n = 0; n < e.length; n++) t = e[n], t.enumerable = t.enumerable || !1,
                t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(a, t.key, t);
        }
        return function(n, e, t) {
            return e && a(n.prototype, e), t && a(n, t), n;
        };
    }(),
    f = o(require("./config.js")),
    g = o(require("./code.js")),
    l = "1.0.7",
    n = !0,
    y = null,
    v = "",
    F = 1,
    S = window.innerWidth,
    b = window.innerHeight,
    L = {},
    P = function() {
        function g() {
            (function(o, e) {
                if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
            })(this, g);
        }
        return m(g, null, [{
            key: "createUserInfoBtn",
            value: function(d, l, p, c, m, n) {
                try {
                    var a = wx.getSystemInfoSync();
                    if (console.log(a), console.log("是否为iphone:" + a.system.toLocaleLowerCase().includes("ios")),
                        N("SDK版本号:" + a.SDKVersion), "2.0.6" > a.SDKVersion) return void r(m, n);
                    if (a.system.toLocaleLowerCase().includes("ios") && "6.6.7" > a.version && "2.1.0" > a.SDKVersion) return void r(m, n);
                    m({
                        code: 1,
                        data: wx.createUserInfoButton({
                            type: d,
                            text: l,
                            image: p,
                            style: c,
                            withCredentials: !0,
                            lang: "zh_CN"
                        }),
                        msg: "success"
                    });
                } catch (t) {
                    r(m, n);
                }
            }
        }, {
            key: "pay",
            value: function(l, m, _, y, C, s) {
                try {
                    var c = this;
                    if (g.midasPaying) return void console.log("并发调用拦截 midasPay");
                    g.midasPaying = !0, wx.login({
                        success: function(r) {
                            console.log(r);
                            var e = {
                                code: r.code,
                                appId: f.default.appId
                            };
                            c.gameHttp(f.default.api + "login/checkOrRefreshSessionkey", e, "POST").then(function() {
                                d("", "GET", "gamepay/getGamePayType?os=" + function() {
                                    try {
                                        var t = wx.getSystemInfoSync();
                                        return N({
                                            name: "当前设备",
                                            info: t
                                        }), 0 == t.system.indexOf("iOS") ? "ios" : 0 == t.system.indexOf("Android") ? "android" : 10 < t.system.length ? t.system.substring(0, 10) : t.system;
                                    } catch (t) {
                                        return N(t), "error";
                                    }
                                }() + "&appId=" + f.default.appId).then(function(r) {
                                    N(r);
                                    var e = r.data;
                                    ("midas" != e && (g.midasPaying = !1), "wxpay" == e) ? function(r, l, p, m, g, n) {
                                        try {
                                            var a = {
                                                openId: wx.getStorageSync("uid"),
                                                appId: f.default.appId,
                                                coin: r,
                                                gameCoin: l,
                                                gameCoinName: p,
                                                param: m
                                            };
                                            if (1 == h(a)) d({
                                                codeBody: JSON.stringify(a)
                                            }, "POST", "gamepay/createWXACode").then(function(o) {
                                                var e = o.data;
                                                wx.previewImage({
                                                    current: e,
                                                    urls: [e],
                                                    success: function(t) {
                                                        N(t), g(t);
                                                    },
                                                    fail: function(t) {
                                                        n(t);
                                                    }
                                                });
                                            }, function(t) {
                                                n(t);
                                            });
                                            else {
                                                var s = u("前端检查参数不正确" + JSON.stringify(a));
                                                n(s);
                                            }
                                        } catch (t) {
                                            N(t);
                                        }
                                    }(l, m, _, y, C, s) : "midas" == e ? (N("midasPay"), p({
                                        coin: l,
                                        gameCoinName: _,
                                        gameCoin: m,
                                        param: y,
                                        payType: "midas",
                                        purpose: 2,
                                        appId: f.default.appId
                                    }, function(t) {
                                        g.midasPaying = !1, C && C(t);
                                    }, function(t) {
                                        g.midasPaying = !1, s && s(t);
                                    })) : "none" == e ? (N("pay none"), s({
                                        code: 10406,
                                        data: "none",
                                        msg: "当前暂不支持充值"
                                    })) : s(r);
                                }, function(t) {
                                    g.midasPaying = !1, s(t);
                                });
                            }).catch(function(t) {
                                s(t), g.midasPaying = !1;
                            });
                        },
                        fail: function(t) {
                            g.midasPaying = !1, s(t);
                        }
                    });
                } catch (e) {
                    g.midasPaying = !1, s(e);
                }
            }
        }, {
            key: "login",
            value: function(o, e) {
                N({
                    name: "logName",
                    time: "00:00"
                }), a(o, e);
            }
        }, {
            key: "authorize",
            value: function(r, e, t) {
                try {
                    var o = wx.getStorageSync("uid"),
                        s = {
                            encryptedData: r.encryptedData,
                            iv: r.iv,
                            openId: o,
                            appId: f.default.appId
                        };
                    if (1 == h(s)) d(s, "POST", "user/update").then(function() {
                        a(e, t);
                    }, function(o) {
                        t(o);
                    });
                    else {
                        var n = u("前端检查参数不正确" + JSON.stringify(s));
                        t(n);
                    }
                } catch (o) {
                    t(o);
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
                    N(e);
                }
            }
        }, {
            key: "getMysteryGift",
            value: function(a, n, t) {
                this.gameHttp(f.default.api + "share/readSelfNotice?noticeId=" + a, "", "GET").then(function(t) {
                    n(t);
                }).catch(function(o) {
                    t(o);
                });
            }
        }, {
            key: "stringify",
            value: function(a, e) {
                var t = 0;
                for (var o in e) 0 == t ? (a = a + "?" + o + "=" + e[o], t++) : a = a + "&" + o + "=" + e[o];
                return a;
            }
        }, {
            key: "getOpenId",
            value: function() {
                return wx.getStorageSync("uid");
            }
        }, {
            key: "checkBannerSwitch",
            value: function(o, a) {
                try {
                    10 < (new Date().getTime() - wx.getStorageSync("lastGetBannerTime")) / 1e3 / 60 ? "{}" == JSON.stringify(L) ? i(o, a) : (o(L),
                        i()) : "{}" == JSON.stringify(L) ? i(o, a) : o(L);
                } catch (t) {
                    a(t);
                }
            }
        }, {
            key: "decryptShareTicket",
            value: function(a, r, s, o) {
                try {
                    var i = {
                        iv: a,
                        encryptedData: r,
                        appId: f.default.appId
                    };
                    this.gameHttp(f.default.api + "user/decryptWXData", i, "POST").then(function(t) {
                        s(t);
                    }).catch(function(t) {
                        o(t);
                    });
                } catch (t) {
                    o(t);
                }
            }
        }, {
            key: "handleLoading",
            value: function() {
                try {
                    wx.getClipboardData({
                        success: function(o) {
                            var e = o.data;
                            console.log(e), "" != e && null != e && null != e || (e = "");
                        },
                        fail: function(t) {
                            console.log(t);
                        }
                    });
                } catch (t) {
                    console.log(t);
                }
            }
        }]), g;
    }();
P.midasPaying = !1, P.midasPayCheckIng = !1, P.midasPayRequestIng = !1, P.midasPayErrorNum = 0, exports.default = P;