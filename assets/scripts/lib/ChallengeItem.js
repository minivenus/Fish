var d = require("./Common_CommonUtil"),
    l = require("./Common_RankUtils"),
    o = cc._decorator,
    a = o.ccclass,
    n = (o.property, function(o) {
        function e() {
            return null !== o && o.apply(this, arguments) || this;
        }
        return __extends(e, o), e.prototype.start = function() {}, e.prototype.init = function(a, e, t) {
            a && (this.node.getChildByName("labRank").getComponent(cc.Label).string = e, this.node.getChildByName("labScore").getComponent(cc.Label).string = a.score,
                this.node.getChildByName("labName").getComponent(cc.Label).string = l.Common_RankUtils.nameCheck(a.nick_name),
                t && (this.node.getChildByName("spBg").getComponent(cc.Sprite).spriteFrame = t),
                d.default.setSprite(this.node.getChildByName("spHead"), a.avatar_url + "?a=a.jpg"));
        }, e = __decorate([a], e);
    }(cc.Component));
exports.default = n;