var o = cc._decorator,
    s = o.ccclass,
    RewardItem = (o.property, function(__super) {
        function RewardItem() {
            return null !== __super && __super.apply(this, arguments) || this;
        }
        return __extends(RewardItem, __super), RewardItem.prototype.start = function() {}, RewardItem.prototype.init = function(score, icon) {
            this.node.getChildByName("labDec").getComponent(cc.Label).string = score, this.node.getChildByName("spIcon").getComponent(cc.Sprite).spriteFrame = icon;
        }, RewardItem = __decorate([s], RewardItem);
    }(cc.Component));
exports.default = RewardItem;