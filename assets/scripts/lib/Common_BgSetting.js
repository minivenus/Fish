var o = cc._decorator,
    s = o.ccclass,
    Common_BgSetting = (o.property, function(__super) {
        function Common_BgSetting() {
            return null !== __super && __super.apply(this, arguments) || this;
        }
        return __extends(Common_BgSetting, __super), Common_BgSetting.prototype.start = function() {
            var o = cc.director.getWinSize(),
                e = this.node.getContentSize();
            this.node.scaleX = o.width / e.width, this.node.scaleY = o.height / e.height;
        }, Common_BgSetting = __decorate([s], Common_BgSetting);
    }(cc.Component));
exports.default = Common_BgSetting;