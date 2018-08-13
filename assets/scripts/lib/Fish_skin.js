var o = cc._decorator,
    d = o.ccclass,
    n = o.property,
    a = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.label = null, t.text = "hello", t;
        }
        return __extends(t, o), t.prototype.start = function() {}, __decorate([n(cc.Label)], t.prototype, "label", void 0),
            __decorate([n], t.prototype, "text", void 0), t = __decorate([d], t);
    }(cc.Component);
exports.default = a;