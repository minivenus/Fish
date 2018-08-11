cc.Class({
    extends: cc.Component,
    properties: {},
    start: function() {
        var t = this;
        this.show(), this.schedule(function() {
            console.log("this.node.active", t.node.active), t.node.active && (t.onDisable(),
                t.show());
        }, 10);
    },
    onEnable: function() {},
    show: function() {
        var a = this;
        console.log("==========onEnable==========="), window.BanerCtrl = this;
        var t = wx.getSystemInfoSync(),
            e = t.screenWidth,
            n = t.screenHeight;
        console.log("=========Bannder测试=====================", e), this.bannerAd = wx.createBannerAd({
            adUnitId: "adunit-fa62233d7ef1be36",
            style: {
                left: 0,
                top: n,
                width: e
            }
        }), this.bannerAd.show().catch(function() {
            console.log("拉起失败");
        }).then(function() {
            console.log("拉起成功");
        }), this.bannerAd.onResize(function(t) {
            console.log(t.width, t.height), console.log(a.bannerAd.style.realWidth, a.bannerAd.style.realHeight),
                a.bannerAd.style.top = n - t.height, a.bannerAd.style.height = t.height;
        });
    },
    onHide: function() {
        this.node.active = !1;
    },
    onShow: function() {
        this.node.active = !0;
    },
    onDisable: function() {
        console.log("==========onDisable==========="), this.bannerAd.destroy();
    },
    onDestroy: function() {
        console.log("==========onDestroy===========");
    }
});