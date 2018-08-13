var o = require("./Common_CommonUtil"),
    d = cc._decorator,
    n = d.ccclass,
    a = d.property,
    s = function(r) {
        function t() {
            var t = null !== r && r.apply(this, arguments) || this;
            return t.logo = null, t;
        }
        return __extends(t, r), t.prototype.start = function() {
            cc.director.setClearColor(cc.Color.WHITE), o.default.fitScreen(), this.logo.opacity = 0,
                this.logo.runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(1), cc.fadeOut(1), cc.callFunc(function() {
                    return cc.director.loadScene("SignScene");
                })));
        }, __decorate([a(cc.Node)], t.prototype, "logo", void 0), t = __decorate([n], t);
    }(cc.Component);
exports.default = s;