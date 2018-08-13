var o = cc._decorator,
    s = o.ccclass,
    n = (o.property, function(o) {
        function e() {
            return null !== o && o.apply(this, arguments) || this;
        }
        return __extends(e, o), e.prototype.start = function() {}, e.prototype.init = function(o, e) {
            this.node.getChildByName("labDec").getComponent(cc.Label).string = o, this.node.getChildByName("spIcon").getComponent(cc.Sprite).spriteFrame = e;
        }, e = __decorate([s], e);
    }(cc.Component));
exports.default = n;