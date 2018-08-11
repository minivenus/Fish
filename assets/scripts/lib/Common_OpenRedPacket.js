var o = require("./Common_ShareUtils"),
    i = require("./Common_CommonUtil"),
    n = cc._decorator,
    a = n.ccclass,
    s = (n.property,
        function(n) {
            function t() {
                var t = null !== n && n.apply(this, arguments) || this;
                return t.reward_code = "", t.nick_name = "", t.isHelperRedPacket = !1, t;
            }
            return __extends(t, n), t.prototype.start = function() {
                i.default.resetScale(this.node);
            }, t.prototype.setParams = function(a, e, t) {
                this.reward_code = a, this.nick_name = e, this.isHelperRedPacket = t;
            }, t.prototype.onClose = function() {
                this.node.destroy();
            }, t.prototype.onOpen = function() {
                this.onClose(), o.default.openRedPacket(this.reward_code, this.isHelperRedPacket);
            }, t = __decorate([a], t);
        }(cc.Component));
exports.default = s;