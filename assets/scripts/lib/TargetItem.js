var o = cc._decorator,
    d = o.ccclass,
    n = o.property,
    a = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.labContent = null, t.itemID = 0, t;
        }
        return __extends(t, o), t.prototype.start = function() {}, t.prototype.updateItem = function(o, e) {
            void 0 === e && (e = 0), this.itemID = e, this.labContent.string = o.target_content;
        }, __decorate([n(cc.Label)], t.prototype, "labContent", void 0), t = __decorate([d], t);
    }(cc.Component);
exports.default = a;