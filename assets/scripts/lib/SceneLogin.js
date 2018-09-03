var commonUtil = require("./Common_CommonUtil"),
    wxDisplayCheck = require("./wxDisplayCheck"),
    wxShortcut = require("./wxShortcut"),
    commonData = require("./Common_Data"),
    o = cc._decorator,
    s = o.ccclass,
    r = o.property,
    SceneLogin = function(__super) {
        function SceneLogin() {
            var SceneLogin = null !== __super && __super.apply(this, arguments) || this;
            return SceneLogin.bg = null, SceneLogin;
        }
        return __extends(SceneLogin, __super), SceneLogin.prototype.start = function() {
            var self = this;
            if (this.bg || (this.bg = this.node.getChildByName("bg")), this.bg.active = !1,
            commonUtil.default.isWeChat() && wxShortcut.Wx.showLoading({
                    title: "连接中..."
                }), cc.director.setClearColor(cc.Color.GRAY), commonUtil.default.fitScreen(), wxDisplayCheck.default.onShowRes) {
                if (!commonUtil.default.isWeChat()) return;
                wxShortcut.Wx.getSystemInfo({
                    success: function(t) {
                        console.log("手机系统信息：", t), self.login(t.screenWidth, t.screenHeight);
                    },
                    fail: function() {
                        self.login(320, 568);
                    }
                });
            }
        }, SceneLogin.prototype.login = function(width, height) {
            var self = this;
            commonData.default.login2(wxDisplayCheck.default.onShowRes, function() {
                self.loginComplete();
            }, null, function() {
                self.bg.active = !0, commonUtil.default.isWeChat() && wxShortcut.Wx.hideLoading();
            }, function() {
                wxShortcut.default.showModal("提示", "登录失败，请稍候再试");
            }, null, width, height);
        }, SceneLogin.prototype.loginComplete = function() {
            console.log("===========登录成功回调==========="), this.node.active = !1, cc.director.loadScene("SceneStart");
        }, __decorate([r(cc.Node)], SceneLogin.prototype, "bg", void 0), SceneLogin = __decorate([s], SceneLogin);
    }(cc.Component);
exports.default = SceneLogin;