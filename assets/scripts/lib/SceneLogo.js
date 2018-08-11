var o = require("./Common_CommonUtil"),
    i = cc._decorator,
    n = i.ccclass,
    a = i.property,
    s = function(i) {
        function t() {
            var t = null !== i && i.apply(this, arguments) || this;
            return t.logo = null, t;
        }
        return __extends(t, i), t.prototype.start = function() {
            cc.director.setClearColor(cc.Color.WHITE), o.default.fitScreen(), this.logo.opacity = 0,
                this.logo.runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(1), cc.fadeOut(1), cc.callFunc(function() {
                    return cc.director.loadScene("SignScene");
                })));
        }, __decorate([a(cc.Node)], t.prototype, "logo", void 0), t = __decorate([n], t);
    }(cc.Component);
exports.default = s;