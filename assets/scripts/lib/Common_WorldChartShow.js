var o = require("./Common_CommonUtil"),
    p = require("./Common_ShareUtils"),
    n = require("./Common_RankUtils"),
    a = cc._decorator,
    i = a.ccclass,
    s = a.property,
    r = function(a) {
        function t() {
            var t = null !== a && a.apply(this, arguments) || this;
            return t.labRank = null, t.labScore = null, t.labName = null, t.labTitle = null,
                t.spHead = null, t.fbRankItem = null, t.fbRankTip = null, t.ndRankList = null, t.curPos = 0,
                t.needShowPos = 20, t.isNowRefreshing = !1, t.myScore = 0, t.tip = null, t;
        }
        return __extends(t, a), t.prototype.start = function() {}, t.prototype.refresh = function(a, e, t) {
                if (this.curPos = 0, this.myScore = t, n.Common_RankUtils.titleLists = e, a && a.list && 0 < a.list.length) {
                    if (a.userInfo) {
                        console.log("userinfo"), console.log(a.userInfo), -1 == a.userInfo.rank ? (this.labRank.string = "未上榜",
                            this.labScore.string = this.myScore.toString()) : (this.labRank.string = (a.userInfo.rank + 1).toString(),
                            this.labScore.string = n.Common_RankUtils.scoreCheck(a.userInfo.score)), this.labName.string = n.Common_RankUtils.nameCheck(a.userInfo.nick_name);
                        var r = n.Common_RankUtils.getTitle(a.userInfo.score);
                        "" == r ? this.labTitle.node.parent.active = !1 : this.labTitle.string = r, "" != a.userInfo.avatar_url && o.default.setSprite(this.spHead, a.userInfo.avatar_url + "?a=a.jpg");
                    }
                    console.log(a.list), this.addWorldList(a.list);
                }
            }, t.prototype.scrollCallBack = function(o, e) {
                var t = this;
                if (e === cc.ScrollView.EventType.BOUNCE_BOTTOM && (cc.log("下拉世界排行榜列表：BOUNCE_BOTTOM"),
                        200 < o.getScrollOffset().y - o.getMaxScrollOffset().y && 0 == this.isNowRefreshing)) {
                    console.log("世界排行榜列表：刷新");
                    var i = this.curPos + 1,
                        n = this.curPos + this.needShowPos;
                    if (console.log("开始名次：" + i + " 结束名次：" + n), 1e3 <= i) return void(this.isNowRefreshing = !1);
                    n = 1e3 < n ? 1e3 : n, console.log("检测后 开始名次：" + i + " 结束名次：" + n), p.default._updateWorldRankList(i, n, function(o) {
                        o && o.list && t.addWorldList(o.list), t.isNowRefreshing = !1;
                    });
                }
                (e === cc.ScrollView.EventType.SCROLL_TO_BOTTOM && null == this.tip && (this.tip = cc.instantiate(this.fbRankTip),
                        this.tip.getChildByName("labDec").getComponent(cc.Label).string = "下拉加载...", this.ndRankList.addChild(this.tip)),
                    e === cc.ScrollView.EventType.SCROLLING) && 200 < o.getScrollOffset().y - o.getMaxScrollOffset().y && this.tip && (this.tip.getChildByName("labDec").getComponent(cc.Label).string = "松手加载更多...");
            }, t.prototype.addWorldList = function(a) {
                this.tip && (this.ndRankList.removeChild(this.tip), this.tip = null);
                for (var e = 0; e < a.length; e++) {
                    this.curPos++;
                    var t = cc.instantiate(this.fbRankItem);
                    t.getComponent(t.name).init(a[e], this.curPos), this.ndRankList.addChild(t);
                }
                console.log("更新名次：" + this.curPos);
            }, t.prototype.onClose = function() {
                this.node.destroy();
            }, __decorate([s(cc.Label)], t.prototype, "labRank", void 0), __decorate([s(cc.Label)], t.prototype, "labScore", void 0),
            __decorate([s(cc.Label)], t.prototype, "labName", void 0), __decorate([s(cc.Label)], t.prototype, "labTitle", void 0),
            __decorate([s(cc.Sprite)], t.prototype, "spHead", void 0), __decorate([s(cc.Prefab)], t.prototype, "fbRankItem", void 0),
            __decorate([s(cc.Prefab)], t.prototype, "fbRankTip", void 0), __decorate([s(cc.Node)], t.prototype, "ndRankList", void 0),
            t = __decorate([i], t);
    }(cc.Component);
exports.default = r;