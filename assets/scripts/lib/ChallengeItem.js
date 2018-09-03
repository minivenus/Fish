var commonUtil = require("./Common_CommonUtil"),
    rankList = require("./Common_RankUtils"),
    o = cc._decorator,
    a = o.ccclass,
    ChallengeItem = (o.property, function(__super) {
        function ChallengeItem() {
            return null !== __super && __super.apply(this, arguments) || this;
        }
        return __extends(ChallengeItem, __super), ChallengeItem.prototype.start = function() {}, ChallengeItem.prototype.init = function(a, e, t) {
            a && (this.node.getChildByName("labRank").getComponent(cc.Label).string = e, this.node.getChildByName("labScore").getComponent(cc.Label).string = a.score,
                this.node.getChildByName("labName").getComponent(cc.Label).string = rankList.Common_RankUtils.nameCheck(a.nick_name),
                t && (this.node.getChildByName("spBg").getComponent(cc.Sprite).spriteFrame = t),
                commonUtil.default.setSprite(this.node.getChildByName("spHead"), a.avatar_url + "?a=a.jpg"));
        }, ChallengeItem = __decorate([a], ChallengeItem);
    }(cc.Component));
exports.default = ChallengeItem;