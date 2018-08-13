var o = cc._decorator,
    s = o.ccclass,
    n = (o.property, function(o) {
        function e() {
            return null !== o && o.apply(this, arguments) || this;
        }
        return __extends(e, o), e.prototype.start = function() {
            var o = cc.director.getWinSize(),
                e = this.node.getContentSize();
            this.node.scaleX = o.width / e.width, this.node.scaleY = o.height / e.height;
        }, e = __decorate([s], e);
    }(cc.Component));
exports.default = n;