cc.Class({
    extends: cc.Component,
    properties: {},
    start: function() {
        var self = this;
        this.show(), this.schedule(function() {
            console.log("this.node.active", self.node.active), self.node.active && (self.onDisable(),
            self.show());
        }, 10);
    },
    onEnable: function() {},
    show: function() {
        var self = this;
        console.log("==========onEnable==========="), window.BanerCtrl = this;
        var sysInfo = wx.getSystemInfoSync(),
            screenWidth = sysInfo.screenWidth,
            screenHeight = sysInfo.screenHeight;
        console.log("=========Bannder测试=====================", screenWidth), this.bannerAd = wx.createBannerAd({
            adUnitId: "adunit-fa62233d7ef1be36",
            style: {
                left: 0,
                top: screenHeight,
                width: screenWidth
            }
        }), this.bannerAd.show().catch(function() {
            console.log("拉起失败");
        }).then(function() {
            console.log("拉起成功");
        }), this.bannerAd.onResize(function(t) {
            console.log(t.width, t.height), console.log(self.bannerAd.style.realWidth, self.bannerAd.style.realHeight),
            self.bannerAd.style.top = screenHeight - t.height, self.bannerAd.style.height = t.height;
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