var o = require("./Common_CommonUtil"),
    d = cc._decorator,
    n = d.ccclass,
    a = d.property,
    s = function(r) {
        function t() {
            var t = null !== r && r.apply(this, arguments) || this;
            return t.icon = null, t.alertIcon = null, t.propName = null, t._data = null, t;
        }
        return __extends(t, r), Object.defineProperty(t.prototype, "data", {
                set: function(t) {
                    t != this._data && (this._data = t, this.refresh());
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.refresh = function() {
                o.default.setSprite(this.icon, this._data.icon), this.alertIcon.active = this._data.showMark,
                    this.propName.string = this._data.name + "x" + this._data.count;
            }, t.prototype.onClick = function() {
                this._data.callback();
            }, __decorate([a(cc.Sprite)], t.prototype, "icon", void 0), __decorate([a(cc.Node)], t.prototype, "alertIcon", void 0),
            __decorate([a(cc.Label)], t.prototype, "propName", void 0), t = __decorate([n], t);
    }(cc.Component);
exports.default = s;