var Common_ShareUtils = require("./Common_ShareUtils"),
    Common_CommonUtil = require("./Common_CommonUtil"),
    n = cc._decorator,
    a = n.ccclass,
    s = (n.property,
        function(n) {
            function t() {
                var t = null !== n && n.apply(this, arguments) || this;
                return t.reward_code = "", t.nick_name = "", t.isHelperRedPacket = !1, t;
            }
            return __extends(t, n), t.prototype.start = function() {
                Common_CommonUtil.default.resetScale(this.node);
            }, t.prototype.setParams = function(a, e, t) {
                this.reward_code = a, this.nick_name = e, this.isHelperRedPacket = t;
            }, t.prototype.onClose = function() {
                this.node.destroy();
            }, t.prototype.onOpen = function() {
                this.onClose(), Common_ShareUtils.default.openRedPacket(this.reward_code, this.isHelperRedPacket);
            }, t = __decorate([a], t);
        }(cc.Component));
exports.default = s;