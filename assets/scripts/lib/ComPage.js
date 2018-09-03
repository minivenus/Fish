var d, o, Common_CommonUtil = require("./Common_CommonUtil");
(o = d || (d = {}))[o.TransitionFadeInOut = 0] = "TransitionFadeInOut", o[o.TransitionProgressInOut = 1] = "TransitionProgressInOut",
    o[o.TransitionMoveInOut = 2] = "TransitionMoveInOut";
var n = function() {
    function t() {}
    return t.LoadPop = function() {
        var o = this;
        if (!this.FbTip) {
            cc.loader.loadRes("prefab/PublicTips", function(o, e) {
                o ? console.log(o.message || o) : this.FbTip = e;
            }.bind(this));
            var t = "prefab/ShopPop";
            Common_CommonUtil.default.getPrefab(t, function(t) {
                o.pageList.ShopPop = t;
            }), t = "prefab/BoxPop", Common_CommonUtil.default.getPrefab(t, function(t) {
                o.pageList.BoxPop = t;
            }), t = "prefab/NewGiftPop", Common_CommonUtil.default.getPrefab(t, function(t) {
                o.pageList.NewGiftPop = t;
            }), t = "prefab/AchievementPop", Common_CommonUtil.default.getPrefab(t, function(t) {
                o.pageList.AchievementPop = t;
            });
        }
    }, t.getRewardStr = function(a) {
        var e = "";
        if (a)
            for (var t = 0; t < a.length; t++) 0 == a[t].type ? e = " 金币*" + a[t].num : 1 == a[t].type && (e = " 护盾*" + a[t].num);
        return e;
    }, t.openShop = function() {
        this.pageList.ShopPop && (cc.instantiate(this.pageList.ShopPop).parent = cc.find("Canvas") || cc.director.getScene().children[0]);
    }, t.openReward = function(a, e) {
        if (void 0 === e && (e = null), this.pageList.GainPop) {
            var t = cc.instantiate(this.pageList.GainPop);
            t.getComponent(t.name).init(a, e), t.parent = cc.find("Canvas") || cc.director.getScene().children[0];
        }
    }, t.openBox = function(o) {
        if (this.pageList.BoxPop) {
            var e = cc.instantiate(this.pageList.BoxPop);
            e.parent = cc.find("Canvas") || cc.director.getScene().children[0], e.getComponent(e.name).init(o);
        }
    }, t.openNewPop = function() {
        this.pageList.NewGiftPop && (cc.instantiate(this.pageList.NewGiftPop).parent = cc.find("Canvas") || cc.director.getScene().children[0]);
    }, t.openAchievementPop = function(o) {
        if (this.pageList.AchievementPop) {
            var e = cc.instantiate(this.pageList.AchievementPop);
            e.parent = cc.find("Canvas") || cc.director.getScene().children[0], e.getComponent(e.name).init(o);
        }
    }, t.ShowTip = function(r, e, t, o) {
        if (!(void 0 === e && (e = d.TransitionFadeInOut), void 0 === t && (t = 2), void 0 === o && (o = 1),
                cc.log("showtips now:" + r), null != this.FbTip)) cc.error("componentsutils tipPrefab null");
        else if ("" !== r && r != this.tipContent) {
            var l = cc.find("Canvas"),
                n = cc.instantiate(this.FbTip);
            l.addChild(n), this.tipContent = r, cc.view.getVisibleSize(), n.getChildByName("labTip").getComponent(cc.Label).string = r,
                n.getChildByName("spBg").width = n.getChildByName("labTip").width + 20, n.getChildByName("spBg").height = n.getChildByName("labTip").height + 20;
            var a = cc.callFunc(function() {
                n.destroy(), this.tipContent = "";
            }.bind(this));
            switch (e) {
                case d.TransitionFadeInOut:
                    n.runAction(cc.sequence(cc.delayTime(t), cc.fadeOut(o), a));
                    break;

                case d.TransitionProgressInOut:
                    var s = cc.sequence(cc.scaleTo(.3, 1.05, 1.05).easing(cc.easeCubicActionOut()), cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()), cc.delayTime(t), cc.scaleTo(o, 0, 0), a);
                    n.scale = .5, n.runAction(s);
                    break;

                case d.TransitionMoveInOut:
                    n.runAction(cc.sequence(cc.moveBy(.5, cc.p(0, 100)), cc.fadeOut(o), a));
            }
        }
    }, t.FbTip = null, t.tipContent = "", t.pageList = {}, t;
}();
exports.ComPage = n;