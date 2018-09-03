var commonUtil = require("./Common_CommonUtil"),
    d = cc._decorator,
    n = d.ccclass,
    a = d.property,
    SceneLogo = function(__super) {
        function SceneLogo() {
            var SceneLogo = null !== __super && __super.apply(this, arguments) || this;
            return SceneLogo.logo = null, SceneLogo;
        }
        return __extends(SceneLogo, __super), SceneLogo.prototype.start = function() {
            cc.director.setClearColor(cc.Color.WHITE), commonUtil.default.fitScreen(), this.logo.opacity = 0,
                this.logo.runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(1), cc.fadeOut(1), cc.callFunc(function() {
                    return cc.director.loadScene("SignScene");
                })));
        }, __decorate([a(cc.Node)], SceneLogo.prototype, "logo", void 0), SceneLogo = __decorate([n], SceneLogo);
    }(cc.Component);
exports.default = SceneLogo;