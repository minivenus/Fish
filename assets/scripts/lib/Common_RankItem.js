var Common_RankUtils = require("./Common_RankUtils"),
    Common_CommonUtil = require("./Common_CommonUtil"),
    o = cc._decorator,
    a = o.ccclass,
    n = o.property,
    s = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.labRank = null, t.labScore = null, t.labName = null, t.labTitle = null,
                t.spHead = null, t;
        }
        return __extends(t, o), t.prototype.start = function() {}, t.prototype.init = function(a, e) {
                if (a) {
                    this.labRank.string = e.toString(), this.labName.string = Common_RankUtils.Common_RankUtils.nameCheck(a.nick_name),
                        this.labScore.string = Common_RankUtils.Common_RankUtils.scoreCheck(a.score);
                    var t = Common_RankUtils.Common_RankUtils.getTitle(a.score);
                    "" == t ? this.labTitle.node.parent.active = !1 : this.labTitle.string = t, "" != a.avatar_url && Common_CommonUtil.default.setSprite(this.spHead, a.avatar_url + "?a=a.jpg");
                }
            }, __decorate([n(cc.Label)], t.prototype, "labRank", void 0), __decorate([n(cc.Label)], t.prototype, "labScore", void 0),
            __decorate([n(cc.Label)], t.prototype, "labName", void 0), __decorate([n(cc.Label)], t.prototype, "labTitle", void 0),
            __decorate([n(cc.Sprite)], t.prototype, "spHead", void 0), t = __decorate([a], t);
    }(cc.Component);
exports.default = s;