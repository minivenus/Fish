var d = require("./Common_CommonUtil"),
    o = cc._decorator,
    n = o.ccclass,
    a = (o.property,
        function(a) {
            function t() {
                var t = null !== a && a.apply(this, arguments) || this;
                return t.bannerAd = null, t;
            }
            return __extends(t, a), (r = t).prototype.start = function() {
                r.sThis = this;
            }, t.prototype.onCreate = function() {
                var a = this;
                if (d.default.isWeChat()) {
                    this.bannerAd && this.bannerAd.destroy();
                    var t = wx.getSystemInfoSync();
                    this.bannerAd = wx.createBannerAd({
                        adUnitId: "adunit-1bb472140bcd5f74",
                        style: {
                            left: 0,
                            top: t.windowHeight,
                            width: t.windowWidth
                        }
                    }), this.bannerAd.show(), this.bannerAd.onResize(function(o) {
                        console.log(o.width, o.height), console.log(a.bannerAd.style.realWidth, a.bannerAd.style.realHeight),
                            a.bannerAd.style.top = t.windowHeight - o.height, a.bannerAd.style.height = o.height;
                    }), this.node.opacity = 0, this.node.runAction(cc.fadeIn(.1));
                }
            }, t.prototype.onShow = function() {
                this.bannerAd.show();
            }, t.prototype.onHide = function() {
                this.bannerAd.hide();
            }, t.setVisible = function(t) {
                console.log("设置广告：" + t), 0 == t ? r.sThis.onShow() : 1 == t ? r.sThis.onHide() : r.sThis.onCreate();
            }, t.prototype.onDestroy = function() {
                this.bannerAd && (this.bannerAd.destroy(), this.bannerAd = null), cc.game.removePersistRootNode(this.node);
            }, t.sThis = null, t = r = __decorate([n], t);
            var r;
        }(cc.Component));
exports.default = a;