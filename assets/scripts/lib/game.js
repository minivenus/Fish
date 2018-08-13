function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function s(a, t) {
    try {
        var o = new Date().getTime();
        wx.setStorageSync("lastGetBannerTime", o), f.gameHttp(w.default.api + "game/getSwitchConfig?appId=" + w.default.appId, "", "GET").then(function(t) {
            g = t.data, a && a(g);
        }).catch(function(o) {
            t && t(o);
        });
    } catch (o) {
        t && t(o);
    }
}

function y(t) {
    console.log(t);
}

function v(r, s, d) {
    try {
        return new Promise(function(a, t) {
            var o = wx.getStorageSync("sessionId") || "";
            wx.request({
                url: w.default.api + d,
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
    } catch (t) {
        y(t);
    }
}

function C(o) {
    for (var e in y(o), o)
        if (null == o[e] || "" == o[e] || "undefined" == o[e]) return -1;
    return 1;
}

function S(t) {
    return y(t), {
        code: -10111,
        data: "",
        msg: t
    };
}

function b(o, r) {
    try {
        wx.login({
            success: function(n) {
                var e = {
                    code: n.code,
                    appId: w.default.appId,
                    sdkVersion: a,
                    noNeedAuthorize: !0
                };
                if (1 == C(e)) v(e, "POST", "user/login").then(function(a) {
                    if (0 == a.code) {
                        if (wx.setStorageSync("uid", a.data.openId), !a.data.isNeedUpdateUserInfo) {
                            y("保存了sessionId" + a.data.sessionId), wx.setStorageSync("sessionId", a.data.sessionId);
                            var e = JSON.stringify(a.data.userInfo);
                            wx.setStorageSync("gameUserInfo", e), s();
                        }
                        o(a);
                    } else r(a);
                }, function(t) {
                    r(t);
                });
                else {
                    var t = S("前端检查参数不正确" + JSON.stringify(e));
                    r(t);
                }
            },
            fail: function(t) {
                r(t);
            }
        });
    } catch (t) {
        r(t);
    }
}

function k(e, t) {
    try {
        h = setInterval(function() {
            var o = wx.getStorageSync("sessionId");
            if (y("订单号:" + l + "--appId:" + w.default.appId + "--sessionId:" + o + "---waitOrderTime:" + T + "---midasPayErrorNum:" + f.midasPayErrorNum),
                120 < T) {
                y("state=5"), clearInterval(h), f.midasPayCheckIng = !1, T = 1;
                var a = P(d.default.paySuccessDelay);
                e(a);
            } else 1 == f.midasPayRequestIng ? T += 1 : (f.midasPayRequestIng = !0, v("", "GET", "gamepay/getCoinOrderStatus?orderCode=" + l + "&appId=" + w.default.appId).then(function(a) {
                y({
                    name: "成功回调",
                    "回调参数": a
                }), f.midasPayRequestIng = !1;
                var n = a.data;
                if (!(1 != n.pay_status)) {
                    y("pay_status=1"), clearInterval(h), f.midasPayCheckIng = !1, T = 1;
                    var r = P(d.default.paySuccess);
                    e(r);
                } else if (0 == n.pay_status && (y("pay_status=0"), T += 1), 0 != n.order_status) {
                    y("order_status=2"), clearInterval(h), f.midasPayCheckIng = !1, T = 1;
                    var s = P(d.default.orderCancel);
                    t(s);
                }
            }).catch(function(o) {
                f.midasPayErrorNum++, 119 < f.midasPayErrorNum && (f.midasPayErrorNum = 0, clearInterval(h),
                    f.midasPayCheckIng = !1), o.code && o.code == d.default.illegalOrderError.code && (clearInterval(h),
                    f.midasPayCheckIng = !1, t(o)), y({
                    name: "错误回调",
                    "回调参数": o
                }), f.midasPayRequestIng = !1, T = 1;
            }));
        }, 1e3);
    } catch (o) {
        t(o);
    }
}

function P(a, e) {
    try {
        var t = a;
        return e && (t.nativeCode = e.errCode, t.msg = e.errMsg), console.log("米大师支付状态:,", t),
            t;
    } catch (t) {
        console.log(t);
    }
}

function R(a, o) {
    try {
        wx.getUserInfo({
            withCredentials: !0,
            lang: "zh_CN",
            success: function(n) {
                var e = {
                    encryptedData: n.encryptedData,
                    iv: n.iv
                };
                f.authorize(e, a, o);
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
                                        y(t), R(a, o);
                                    },
                                    fail: function() {
                                        var e = wx.createOpenSettingButton({
                                            type: "text",
                                            text: "打开设置页面",
                                            style: {
                                                left: p / 2 - 100,
                                                top: m / 2 - 20,
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
                                            e.hide(), R(a, o);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (t) {
        o(t);
    }
}

var N, F, n = function() {
        function a(a, e) {
            for (var t, n = 0; n < e.length; n++) t = e[n], t.enumerable = t.enumerable || !1,
                t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(a, t.key, t);
        }
        return function(n, e, t) {
            return e && a(n.prototype, e), t && a(n, t), n;
        };
    }(),
    w = o(require("./config.js")),
    d = o(require("./code.js")),
    a = "1.0.8",
    h = null,
    l = "",
    T = 1,
    p = window.innerWidth,
    m = window.innerHeight,
    g = {},
    f = (F = N = function() {
            function p() {
                (function(o, e) {
                    if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
                })(this, p);
            }
            return n(p, null, [{
                key: "createUserInfoBtn",
                value: function(r, d, l, p, c, n) {
                    try {
                        var a = wx.getSystemInfoSync();
                        if (console.log(a), console.log("是否为iphone:" + a.system.toLocaleLowerCase().includes("ios")),
                            y("SDK版本号:" + a.SDKVersion), "2.0.6" > a.SDKVersion) return void R(c, n);
                        if (a.system.toLocaleLowerCase().includes("ios") && "6.6.7" > a.version && "2.1.0" > a.SDKVersion) return void R(c, n);
                        c({
                            code: 1,
                            data: wx.createUserInfoButton({
                                type: r,
                                text: d,
                                image: l,
                                style: p,
                                withCredentials: !0,
                                lang: "zh_CN"
                            }),
                            msg: "success"
                        });
                    } catch (t) {
                        R(c, n);
                    }
                }
            }, {
                key: "pay",
                value: function(m, g, h, _, b, s) {
                    try {
                        var c = this;
                        if (p.midasPaying) return void console.log("并发调用拦截 midasPay");
                        p.midasPaying = !0, wx.login({
                            success: function(r) {
                                console.log(r);
                                var e = {
                                    code: r.code,
                                    appId: w.default.appId
                                };
                                c.gameHttp(w.default.api + "login/checkOrRefreshSessionkey", e, "POST").then(function() {
                                    v("", "GET", "gamepay/getGamePayType?os=" + function() {
                                        try {
                                            var t = wx.getSystemInfoSync();
                                            return y({
                                                name: "当前设备",
                                                info: t
                                            }), 0 == t.system.indexOf("iOS") ? "ios" : 0 == t.system.indexOf("Android") ? "android" : 10 < t.system.length ? t.system.substring(0, 10) : t.system;
                                        } catch (t) {
                                            return y(t), "error";
                                        }
                                    }() + "&appId=" + w.default.appId).then(function(r) {
                                        y(r);
                                        var e = r.data;
                                        ("midas" != e && (p.midasPaying = !1), "wxpay" == e) ? function(d, p, m, g, u, n) {
                                            try {
                                                var a = {
                                                        openId: wx.getStorageSync("uid"),
                                                        appId: w.default.appId,
                                                        coin: d,
                                                        gameCoin: p,
                                                        gameCoinName: m,
                                                        param: g
                                                    },
                                                    s = C(a);
                                                if (1 == s) {
                                                    var c = {
                                                        codeBody: JSON.stringify(a)
                                                    };
                                                    v(c, "POST", "gamepay/createWXACode").then(function(o) {
                                                        var e = o.data;
                                                        wx.previewImage({
                                                            current: e,
                                                            urls: [e],
                                                            success: function(t) {
                                                                y(t), u(t);
                                                            },
                                                            fail: function(t) {
                                                                n(t);
                                                            }
                                                        });
                                                    }, function(t) {
                                                        n(t);
                                                    });
                                                } else {
                                                    var r = "前端检查参数不正确" + JSON.stringify(a),
                                                        l = S(r);
                                                    n(l);
                                                }
                                            } catch (t) {
                                                y(t);
                                            }
                                        }(m, g, h, _, b, s) : "midas" == e ? (y("midasPay"), function(r, p, c) {
                                            try {
                                                var e = C(r);
                                                if (1 == f.midasPayCheckIng) {
                                                    console.log("限制在支付成功后轮询成功前不允许重复下单支付 midasPay"), wx.showToast({
                                                        title: "您有订单正在处理中，请稍后再试",
                                                        icon: "none",
                                                        duration: 2e3
                                                    });
                                                    var t = P(d.default.payUnEnd);
                                                    return c(t);
                                                }
                                                if (1 == e) v(r, "POST", "gamepay/addCoinOrder").then(function(a) {
                                                    y({
                                                        name: "成功获取订单",
                                                        res: a
                                                    });
                                                    var n = a.data;
                                                    l = a.data.orderCode;
                                                    var t = a.data.buyQuantity;
                                                    T = 1, 0 == t ? (f.midasPaying = !1, f.midasPayCheckIng = !0, k(p, c)) : (console.log("midasPaytime====真正的米大师支付时间", Date.now(), "midasPayStatus==" + f.midasPaying),
                                                        wx.requestMidasPayment({
                                                            mode: n.mode,
                                                            env: n.env,
                                                            offerId: n.offerId,
                                                            currencyType: n.currencyType,
                                                            platform: n.platform,
                                                            buyQuantity: t,
                                                            zoneId: n.zoneId,
                                                            success: function(t) {
                                                                y({
                                                                    name: "成功回调",
                                                                    res: t
                                                                }), k(p, c), f.midasPaying = !1, f.midasPayCheckIng = !0;
                                                            },
                                                            fail: function(a) {
                                                                console.log("米大师错误返回:", a);
                                                                var e, n = {};
                                                                a.errCode ? (e = a.errCode, v({
                                                                        orderCode: l,
                                                                        midasErrorCode: e
                                                                    }, "POST", "gamepay/cancelCoinOrder").then(function() {
                                                                        console.log("用户支付失败已告知服务器");
                                                                    }, function() {}), n = P(d.default.payError, a)) : n = P(d.default.unknowError),
                                                                    c(n);
                                                            }
                                                        }));
                                                }).catch(function(t) {
                                                    y({
                                                        name: "获取订单失败",
                                                        res: t
                                                    }), 40121 == t.code && wx.showToast({
                                                        title: t.msg,
                                                        icon: "none",
                                                        duration: 2e3
                                                    }), c(t);
                                                });
                                                else {
                                                    var o = "前端检查参数不正确" + JSON.stringify(r),
                                                        a = S(o);
                                                    c(a);
                                                }
                                            } catch (t) {
                                                c(t);
                                            }
                                        }({
                                            coin: m,
                                            gameCoinName: h,
                                            gameCoin: g,
                                            param: _,
                                            payType: "midas",
                                            purpose: 2,
                                            appId: w.default.appId
                                        }, function(t) {
                                            p.midasPaying = !1, b && b(t);
                                        }, function(t) {
                                            p.midasPaying = !1, s && s(t);
                                        })) : "none" == e ? (y("pay none"), s({
                                            code: 10406,
                                            data: "none",
                                            msg: "当前暂不支持充值"
                                        })) : s(r);
                                    }, function(t) {
                                        p.midasPaying = !1, s(t);
                                    });
                                }).catch(function(t) {
                                    s(t), p.midasPaying = !1;
                                });
                            },
                            fail: function(t) {
                                p.midasPaying = !1, s(t);
                            }
                        });
                    } catch (t) {
                        p.midasPaying = !1, s(t);
                    }
                }
            }, {
                key: "login",
                value: function(o, e) {
                    y({
                        name: "logName",
                        time: "00:00"
                    }), b(o, e);
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
                                appId: w.default.appId
                            };
                        if (1 == C(s)) v(s, "POST", "user/update").then(function() {
                            b(e, t);
                        }, function(o) {
                            t(o);
                        });
                        else {
                            var n = S("前端检查参数不正确" + JSON.stringify(s));
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
                            var p = wx.getStorageSync("sessionId") || "";
                            wx.request({
                                url: r,
                                data: s,
                                method: d,
                                header: {
                                    "content-type": "application/json",
                                    "session-id": p
                                },
                                success: function(a) {
                                    var e = a.data.code;
                                    a.data.data && a.data.data.code && (e = a.data.data.code), 0 == e ? l(a.data) : o(a.data);
                                },
                                fail: function(t) {
                                    o(t);
                                }
                            });
                        });
                    } catch (t) {
                        y(t);
                    }
                }
            }, {
                key: "getMysteryGift",
                value: function(a, n, t) {
                    this.gameHttp(w.default.api + "share/readSelfNotice?noticeId=" + a, "", "GET").then(function(t) {
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
                        10 < (new Date().getTime() - wx.getStorageSync("lastGetBannerTime")) / 1e3 / 60 ? "{}" == JSON.stringify(g) ? s(o, a) : (o(g),
                            s()) : "{}" == JSON.stringify(g) ? s(o, a) : o(g);
                    } catch (t) {
                        a(t);
                    }
                }
            }, {
                key: "decryptShareTicket",
                value: function(a, r, s, o) {
                    try {
                        var d = {
                            iv: a,
                            encryptedData: r,
                            appId: w.default.appId
                        };
                        this.gameHttp(w.default.api + "user/decryptWXData", d, "POST").then(function(t) {
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
                    var a = this;
                    try {
                        wx.getClipboardData({
                            success: function(n) {
                                var e = n.data;
                                console.log(e), "" != e && null != e && null != e || (e = "");
                                var t = w.default.appId,
                                    o = e;
                                a.gameHttp(w.default.api + "login/handleClipboardContent?appId=" + t + "&content=" + o, "", "GET").then(function(o) {
                                    if (console.log(o), o.data.needToSet) {
                                        var e = o.data.content;
                                        wx.setClipboardData({
                                            data: e,
                                            success: function(t) {
                                                console.log(t);
                                            },
                                            fail: function(t) {
                                                console.log(t);
                                            }
                                        });
                                    }
                                }).catch(function(t) {
                                    console.log(t);
                                });
                            },
                            fail: function(t) {
                                console.log(t);
                            }
                        });
                    } catch (t) {
                        console.log(t);
                    }
                }
            }]), p;
        }(), N.midasPaying = !1, N.midasPayCheckIng = !1, N.midasPayRequestIng = !1, N.midasPayErrorNum = 0,
        F);
export default f;