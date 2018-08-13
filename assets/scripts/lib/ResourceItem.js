var o = require("./Common_CommonUtil"),
    m = require("./EChannelPrefix"),
    n = require("./Common_Data"),
    a = require("./Common_ShareUtils"),
    s = require("./gamesdk"),
    c = cc._decorator,
    r = c.ccclass,
    l = c.property,
    g = function(d) {
        function t() {
            var t = null !== d && d.apply(this, arguments) || this;
            return t.icon = null, t.iconName = null, t.btnInvite = null, t.btnStr = null, t.itemData = null,
                t.propData = null, t;
        }
        return __extends(t, d), t.prototype.start = function() {
                var t = this;
                this.propData && this.propData.propIcon && this.scheduleOnce(function() {
                    return o.default.setSprite(t.icon, t.propData.propIcon, function() {
                        return t.icon.node.opacity = 255;
                    });
                }, .1);
            }, t.prototype.refresh = function(o) {
                var e = (this.itemData = o).host_gift_name;
                1 < o.host_gift_num && (e += "X" + o.host_gift_num), e += " <color=#FFC107>(" + o.hasReceivedCount + "/" + o.host_gift_num_limit + ")</color>",
                    this.iconName.string = e, o.open_status ? (this.btnStr.string = "<color=#ffc107>邀请好友</c>",
                        this.btnInvite.interactable = !0) : (this.btnStr.string = "<color=#888888>已获得</c>",
                        this.btnInvite.interactable = !1);
            }, t.prototype.onClickInvite = function() {
                var o = this;
                console.log("点击邀请");
                var t = "propId=" + this.itemData.id + "&shareId=" + s.game.getOpenId();
                n.default.share(m.default.reward, t, null, function() {
                    console.log("发送邀请成功！"), a.default.requestForServerRecord(o.itemData.id);
                });
            }, __decorate([l(cc.Sprite)], t.prototype, "icon", void 0), __decorate([l(cc.RichText)], t.prototype, "iconName", void 0),
            __decorate([l(cc.Button)], t.prototype, "btnInvite", void 0), __decorate([l(cc.RichText)], t.prototype, "btnStr", void 0),
            t = __decorate([r], t);
    }(cc.Component);
exports.default = g;