var o, i, n = require("./Common_LogUtil"),
    a = cc._decorator,
    s = a.ccclass,
    p = a.property;
(i = o || (o = {}))[i.Normal = 0] = "Normal", i[i.TransitionSlideInR = 1] = "TransitionSlideInR",
    i[i.TransitionProgressInOut = 2] = "TransitionProgressInOut", i[i.TransitionFadeInOut = 3] = "TransitionFadeInOut";
var r = function(a) {
    function t() {
        var t = null !== a && a.apply(this, arguments) || this;
        return t.pageEffectType = o.Normal, t.pageWidth = 720, t.pageHeight = 1080, t.content = null,
            t;
    }
    return __extends(t, a), t.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            console.log("PageUtil TOUCH_START-" + this.node.name);
        }.bind(this), this), this.node.on(cc.Node.EventType.MOUSE_DOWN, function() {
            console.log("PageUtil MOUSE_DOWN-" + this.node.name);
        }.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function() {
            console.log("PageUtil TOUCH_MOVE-" + this.node.name);
        }.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_END, function() {
            console.log("PageUtil TOUCH_END-" + this.node.name);
        }.bind(this), this);
        var a = this.node.getContentSize();
        if (this.pageWidth = a.width, this.pageHeight = a.height, this.content = this.node.getChildByName("content"),
            this.content) switch (this.pageEffectType) {
            case o.Normal:
                n.LogUtil.Log("PageUtil-直接显示");
                break;

            case o.TransitionSlideInR:
                n.LogUtil.Log("PageUtil-从右边展开"), this.content.setPosition(this.pageWidth, this.content.y),
                    this.node.runAction(cc.sequence(cc.delayTime(.01), cc.callFunc(function() {
                        this.content.runAction(cc.sequence(cc.moveTo(.15, cc.p(0, this.content.y)), cc.callFunc(function() {}.bind(this))));
                    }.bind(this))));
                break;

            case o.TransitionProgressInOut:
                n.LogUtil.Log("PageUtil-变大展开");
                var e = cc.sequence(cc.scaleTo(.3, 1.05, 1.05).easing(cc.easeCubicActionOut()), cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()));
                this.content.scale = .5, this.content.runAction(e);
                break;

            case o.TransitionFadeInOut:
                n.LogUtil.Log("PageUtil-淡入"), this.content.opacity = 0, this.content.runAction(cc.fadeIn(1));
                break;

            default:
                n.LogUtil.ErroLog("PageUtil-不存在效果-" + this.pageEffectType);
        } else n.LogUtil.ErroLog("PageUtil-不存在content节点");
    }, t.prototype.BackAndRemove = function() {
        switch (this.pageEffectType) {
            case o.Normal:
                n.LogUtil.DebugLog("PageUtil-直接删除:" + this.node.name), this.node.destroy();
                break;

            case o.TransitionSlideInR:
                this.node.runAction(cc.sequence(cc.moveTo(.15, cc.p(this.pageWidth, this.node.y)), cc.callFunc(function() {
                    n.LogUtil.DebugLog("PageUtil-从左往右移除删除:" + this.node.name), this.node.destroy();
                }.bind(this), this)));
                break;

            case o.TransitionProgressInOut:
                if (this.content) {
                    var t = cc.scaleTo(.3, 0, 0);
                    this.content.runAction(cc.sequence(t, cc.callFunc(function() {
                        n.LogUtil.DebugLog("PageUtil-变小关闭删除:" + this.node.name), this.node.destroy();
                    }.bind(this), this)));
                } else n.LogUtil.ErroLog("PageUtil-不存在content节点");
                break;

            case o.TransitionFadeInOut:
                this.node.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function() {
                    n.LogUtil.DebugLog("PageUtil-渐隐删除:" + this.node.name), this.node.destroy();
                }.bind(this), this)));
                break;

            default:
                n.LogUtil.ErroLog("PageUtil-不存在效果-" + this.pageEffectType);
        }
    }, __decorate([p({
        tooltip: "页面开启关闭效果类型 默认0\n0-直接直接展开\n1-从右往左展开\n2-从里面向外扩展变大展开\n3-淡出淡入"
    })], t.prototype, "pageEffectType", void 0), t = __decorate([s], t);
}(cc.Component);
exports.default = r;