var Common_ResultPropItem = require("./Common_ResultPropItem"),
    Common_ResultSubdomine = require("./Common_ResultSubdomine"),
    EChannelPrefix = require("./EChannelPrefix"),
    Common_RankList = require("./Common_RankList"),
    Common_CommonUtil = require("./Common_CommonUtil"),
    Common_Data = require("./Common_Data"),
    wxDisplayCheck = require("./wxDisplayCheck"),
    l = cc._decorator,
    c = l.ccclass,
    d = l.property,
    u = function(l) {
        function t() {
            var t = null !== l && l.apply(this, arguments) || this;
            return t.score = null, t.bestScore = null, t.coins = null, t.title = null, t.surpassLabel = null,
                t.tipLabel = null, t.propRoot = null, t.propPrefab = null, t.resultSubdomine = null,
                t.callbackId = 0, t.data = null, t;
        }
        return __extends(t, l), (p = t).prototype.refresh = function(t) {
                this.data = t, this.node.scale = p.getScale(), this.score.string = this.data.score + "",
                    this.bestScore.string = this.data.bestScore + "", this.coins.string = this.data.coin + "",
                    this.title.string = this.getTitle(), this.surpassLabel.string = "超越了" + this.data.surpassRatio + "%的玩家",
                    this.tipLabel.string = this.data.tips, this.createProps();
            }, t.prototype.getTitle = function() {
                var o = this;
                if (!this.data.titleList) return "";
                var t = this.data.titleList.filter(function(t) {
                    return t.score <= o.data.score;
                });
                return t[t.length - 1].title;
            }, t.prototype.start = function() {
                Common_RankList.default.showGameResultList(), this.resultSubdomine.refresh(2), this.node.scale = p.getScale();
            }, t.prototype.onDisable = function() {
                this.callbackId && wxDisplayCheck.default.clearCallback(this.callbackId);
            }, t.getScale = function() {
                cc.director.getScene().getComponentInChildren(cc.Canvas);
                var t = cc.view.getVisibleSize();
                return t.width / t.height < 9 / 16 ? cc.view.getVisibleSize().width / 1080 : cc.view.getVisibleSize().height / 1920;
            }, t.prototype.onClickHome = function() {
                this.data.homeCallback();
            }, t.prototype.onClickMoreGame = function() {
                Common_CommonUtil.default.preview();
            }, t.prototype.onClickGroupRank = function() {
                Common_Data.default.share(EChannelPrefix.default.grouprank, "group=1"), this.callbackId || (this.callbackId = wxDisplayCheck.default.addOnShowCallback(this.checkShowGroupRank.bind(this)));
            }, t.prototype.checkShowGroupRank = function(t) {
                t && t.shareTicket && t.query && 1 == t.query.group && (Common_RankList.default.showGroupList(t.shareTicket, this.data.titleList),
                    this.resultSubdomine.refresh(0), wxDisplayCheck.default.clearCallback(this.callbackId));
            }, t.prototype.onClickWorldRnak = function() {
                Common_RankList.default.showFriendList(this.data.titleList), this.resultSubdomine.refresh(1);
            }, t.prototype.onClickPlay = function() {
                this.data.restartCallback();
            }, t.prototype.onClickFlaunt = function() {
                Common_Data.default.share(EChannelPrefix.default.result, "", null, null, null, null, "", "", "", this.data.score);
            }, t.prototype.onInviteFirend = function() {
                Common_Data.default.share(EChannelPrefix.default.grouprank);
            }, t.prototype.onShare = function() {
                Common_Data.default.share(EChannelPrefix.default.pageshare, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    return console.log("成功 :", t);
                }, function(t) {
                    return console.log("失败：", t);
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.onRestart = function() {
                this.data.restartCallback();
            }, t.prototype.createProps = function() {
                this.propRoot.removeAllChildren();
                for (var a, t = 0; t < this.data.props.length; t++) {
                    a = cc.instantiate(this.propPrefab), a.parent = this.propRoot;
                    var e = -this.data.props.length / 2 + .5 + t;
                    a.position = cc.p(220 * e, 0), a.getComponent(Common_ResultPropItem.default).data = this.data.props[t];
                }
            }, __decorate([d(cc.RichText)], t.prototype, "score", void 0), __decorate([d(cc.Label)], t.prototype, "bestScore", void 0),
            __decorate([d(cc.Label)], t.prototype, "coins", void 0), __decorate([d(cc.Label)], t.prototype, "title", void 0),
            __decorate([d(cc.Label)], t.prototype, "surpassLabel", void 0), __decorate([d(cc.Label)], t.prototype, "tipLabel", void 0),
            __decorate([d(cc.Node)], t.prototype, "propRoot", void 0), __decorate([d(cc.Prefab)], t.prototype, "propPrefab", void 0),
            __decorate([d(Common_ResultSubdomine.default)], t.prototype, "resultSubdomine", void 0), t = p = __decorate([c], t);
        var p;
    }(cc.Component);
exports.default = u;