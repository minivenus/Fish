var p = require("./Common_CommonUtil"),
    m = require("./wxDisplayCheck"),
    n = require("./wxShortcut"),
    a = require("./Common_Data"),
    o = cc._decorator,
    s = o.ccclass,
    r = o.property,
    l = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.bg = null, t;
        }
        return __extends(t, o), t.prototype.start = function() {
            var o = this;
            if (this.bg || (this.bg = this.node.getChildByName("bg")), this.bg.active = !1,
                p.default.isWeChat() && n.Wx.showLoading({
                    title: "连接中..."
                }), cc.director.setClearColor(cc.Color.GRAY), p.default.fitScreen(), m.default.onShowRes) {
                if (!p.default.isWeChat()) return;
                n.Wx.getSystemInfo({
                    success: function(t) {
                        console.log("手机系统信息：", t), o.login(t.screenWidth, t.screenHeight);
                    },
                    fail: function() {
                        o.login(320, 568);
                    }
                });
            }
        }, t.prototype.login = function(r, e) {
            var t = this;
            a.default.login2(m.default.onShowRes, function() {
                t.loginComplete();
            }, null, function() {
                t.bg.active = !0, p.default.isWeChat() && n.Wx.hideLoading();
            }, function() {
                n.default.showModal("提示", "登录失败，请稍候再试");
            }, null, r, e);
        }, t.prototype.loginComplete = function() {
            console.log("===========登录成功回调==========="), this.node.active = !1, cc.director.loadScene("SceneStart");
        }, __decorate([r(cc.Node)], t.prototype, "bg", void 0), t = __decorate([s], t);
    }(cc.Component);
exports.default = l;