var BaseResourcePage = require("./BaseResourcePage"),
    Common_CommonUtil = require("./Common_CommonUtil"),
    EChannelPrefix = require("./EChannelPrefix"),
    Common_Data = require("./Common_Data"),
    Common_ShareUtils = require("./Common_ShareUtils"),
    gamesdk = require("./gamesdk"),
    r = cc._decorator,
    l = r.ccclass,
    g = r.property,
    d = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.icon = null, t.itemCount = null, t.desc = null, t.btnInvite = null, t.resData = null,
                t;
        }
        return __extends(t, o), t.prototype.start = function() {
                var o = this,
                    e = this.propDataList[0];
                e && e.propIcon && this.scheduleOnce(function() {
                    return Common_CommonUtil.default.setSprite(o.icon, e.propIcon, function() {
                        return o.icon.node.opacity = 255;
                    });
                }, .1);
            }, t.prototype.refresh = function(o) {
                this.resData = o.data[0];
                var e = this.resData.host_gift_name;
                1 < this.resData.host_gift_num && (e += "X" + this.resData.host_gift_num), e += " <color=#FFC107>(" + this.resData.hasReceivedCount + "/" + this.resData.host_gift_num_limit + ")</color>",
                    this.itemCount.string = e, this.desc.string = this.pageData.desc, this.btnInvite.interactable = !!this.resData.open_status;
            }, t.prototype.onInvite = function() {
                var o = this,
                    t = "propId=" + this.resData.id + "&shareId=" + gamesdk.game.getOpenId();
                    Common_Data.default.share(EChannelPrefix.default.reward, t, null, function() {
                    console.log("发送邀请成功！"), Common_ShareUtils.default.requestForServerRecord(o.resData.id);
                });
            }, t.prototype.onClose = function() {
                this.node.destroy();
            }, __decorate([g(cc.Sprite)], t.prototype, "icon", void 0), __decorate([g(cc.RichText)], t.prototype, "itemCount", void 0),
            __decorate([g(cc.Label)], t.prototype, "desc", void 0), __decorate([g(cc.Node)], t.prototype, "btnInvite", void 0),
            t = __decorate([l], t);
    }(BaseResourcePage.default);
exports.default = d;