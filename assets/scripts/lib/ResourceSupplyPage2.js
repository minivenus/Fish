var o = require("./BaseResourcePage"),
    i = require("./Common_CommonUtil"),
    n = require("./EChannelPrefix"),
    a = require("./Common_Data"),
    s = require("./Common_ShareUtils"),
    c = require("./gamesdk"),
    r = cc._decorator,
    l = r.ccclass,
    d = r.property,
    m = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.icon = null, t.itemCount = null, t.desc = null, t.btnInvite = null, t.resData = null,
                t;
        }
        return __extends(t, o), t.prototype.start = function() {
                var o = this,
                    e = this.propDataList[0];
                e && e.propIcon && this.scheduleOnce(function() {
                    return i.default.setSprite(o.icon, e.propIcon, function() {
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
                    t = "propId=" + this.resData.id + "&shareId=" + c.game.getOpenId();
                a.default.share(n.default.reward, t, null, function() {
                    console.log("发送邀请成功！"), s.default.requestForServerRecord(o.resData.id);
                });
            }, t.prototype.onClose = function() {
                this.node.destroy();
            }, __decorate([d(cc.Sprite)], t.prototype, "icon", void 0), __decorate([d(cc.RichText)], t.prototype, "itemCount", void 0),
            __decorate([d(cc.Label)], t.prototype, "desc", void 0), __decorate([d(cc.Node)], t.prototype, "btnInvite", void 0),
            t = __decorate([l], t);
    }(o.default);
exports.default = m;