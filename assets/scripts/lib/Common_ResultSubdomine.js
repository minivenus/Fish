var Common_ResultPage = require("./Common_ResultPage"),
    EChannelPrefix = require("./EChannelPrefix"),
    Common_RankList = require("./Common_RankList"),
    Common_Data = require("./Common_Data"),
    s = cc._decorator,
    c = s.ccclass,
    r = s.property,
    l = function(s) {
        function t() {
            var t = null !== s && s.apply(this, arguments) || this;
            return t.btns = null, t.bg = null, t.btnBack = null, t.btnGroup = null, t.btnPlay = null,
                t;
        }
        return __extends(t, s), t.prototype.start = function() {
                this.btns.active = !1, this.bg.scale /= Common_ResultPage.default.getScale();
            }, t.prototype.onBack = function() {
                this.btns.active = !1, this.node.active = !1, Common_RankList.default.showGameResultList(), this.refresh(2);
            }, t.prototype.onGroupRank = function() {
                Common_Data.default.share(EChannelPrefix.default.grouprank);
            }, t.prototype.refresh = function(t) {
                switch (this.node.active = !0, this.btns.active = !0, t) {
                    case 0:
                        this.bg.active = !0, this.btnBack.active = !0, this.btnGroup.active = !1, this.btnPlay.active = !0;
                        break;

                    case 1:
                        this.bg.active = !0, this.btnBack.active = !0, this.btnGroup.active = !0, this.btnPlay.active = !1;
                        break;

                    case 2:
                        this.bg.active = !1, this.btnBack.active = !1, this.btnGroup.active = !1, this.btnPlay.active = !1;
                        break;

                    default:
                        throw this.bg.active = !1, this.btnBack.active = !1, this.btnGroup.active = !1,
                            this.btnPlay.active = !1, "subdomineType类型错误： subdomineType:" + t;
                }
            }, __decorate([r(cc.Node)], t.prototype, "btns", void 0), __decorate([r(cc.Node)], t.prototype, "bg", void 0),
            __decorate([r(cc.Node)], t.prototype, "btnBack", void 0), __decorate([r(cc.Node)], t.prototype, "btnGroup", void 0),
            __decorate([r(cc.Node)], t.prototype, "btnPlay", void 0), t = __decorate([c], t);
    }(cc.Component);
exports.default = l;