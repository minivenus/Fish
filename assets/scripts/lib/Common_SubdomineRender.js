var o = cc._decorator.ccclass,
    r = function(a) {
        function t() {
            var t = null !== a && a.apply(this, arguments) || this;
            return t._renderFps = 30, t;
        }
        return __extends(t, a), Object.defineProperty(t.prototype, "renderFps", {
            set: function(t) {
                t != this._renderFps && (this._renderFps = t, this.refreshByFps());
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.onLoad = function() {
            this.display = this.node.addComponent(cc.Sprite), this.display.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                this.display.trim = !1, this.tex = new cc.Texture2D(), this.setNodeSize();
        }, t.prototype.start = function() {
            this.refreshByFps();
        }, t.prototype.refreshByFps = function() {
            this.unscheduleAllCallbacks(), this.schedule(this.refreshRender.bind(this), 1 / this._renderFps);
        }, t.prototype.refreshRender = function() {
            "undefined" != typeof wx && this.tex && (this.tex.initWithElement(sharedCanvas),
                this.tex.handleLoadedTexture(), this.display.spriteFrame = new cc.SpriteFrame(this.tex));
        }, t.prototype.setNodeSize = function() {
            var a = wx.getSystemInfoSync();
            console.log("系统信息：", a);
            var e = 1080,
                t = 1920;
            a.screenWdith / a.screenHeight > e / t ? e *= a.screenWidth * t / (a.screenHeight * e) : t *= a.screenHeight * e / (a.screenWidth * t),
                this.node.setContentSize(e, t);
        }, t = __decorate([o], t);
    }(cc.Component);
exports.default = r;