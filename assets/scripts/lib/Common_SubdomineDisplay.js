var o = cc._decorator,
    s = o.ccclass,
    n = (o.property, function(o) {
        function e() {
            return null !== o && o.apply(this, arguments) || this;
        }
        return __extends(e, o), e.prototype.onEnable = function() {}, e.prototype.start = function() {
            this.display = this.node.getComponent(cc.Sprite), this.tex = new cc.Texture2D(),
                this.display.node.active = !0;
        }, e.prototype._updateSubDomainCanvas = function() {
            "undefined" != typeof wx && this.tex && (this.tex.initWithElement(sharedCanvas),
                this.tex.handleLoadedTexture(), this.display.spriteFrame = new cc.SpriteFrame(this.tex));
        }, e.prototype.update = function() {
            this._updateSubDomainCanvas();
        }, e = __decorate([s], e);
    }(cc.Component));
exports.default = n;