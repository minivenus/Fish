var o = cc._decorator,
    d = o.ccclass,
    n = o.property,
    TargetItem = function(__super) {
        function TargetItem() {
            var TargetItem = null !== __super && __super.apply(this, arguments) || this;
            return TargetItem.labContent = null, TargetItem.itemID = 0, TargetItem;
        }
        return __extends(TargetItem, __super), TargetItem.prototype.start = function() {}, TargetItem.prototype.updateItem = function(o, e) {
            void 0 === e && (e = 0), this.itemID = e, this.labContent.string = o.target_content;
        }, __decorate([n(cc.Label)], TargetItem.prototype, "labContent", void 0), TargetItem = __decorate([d], TargetItem);
    }(cc.Component);
exports.default = TargetItem;