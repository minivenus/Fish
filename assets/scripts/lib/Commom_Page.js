var o, p, commonLogUtil = require("./Common_LogUtil"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property;
(p = o || (o = {}))[p.Normal = 0] = "Normal", p[p.TransitionSlideInR = 1] = "TransitionSlideInR",
    p[p.TransitionProgressInOut = 2] = "TransitionProgressInOut", p[p.TransitionFadeInOut = 3] = "TransitionFadeInOut";
var Common_Page = function(__super) {
    function Common_Page() {
        var Common_Page = null !== __super && __super.apply(this, arguments) || this;
        return Common_Page.pageEffectType = o.Normal, Common_Page.pageWidth = 720, Common_Page.pageHeight = 1080, Common_Page.content = null,
        Common_Page;
    }
    return __extends(Common_Page, __super), Common_Page.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, function() {}.bind(this), this), this.node.on(cc.Node.EventType.MOUSE_DOWN, function() {}.bind(this), this),
            this.node.on(cc.Node.EventType.TOUCH_MOVE, function() {}.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_END, function() {}.bind(this), this);
        var a = this.node.getContentSize();
        if (this.pageWidth = a.width, this.pageHeight = a.height, this.content = this.node.getChildByName("content"),
            this.content) switch (this.pageEffectType) {
            case o.Normal:
                commonLogUtil.LogUtil.Log("PageUtil-直接显示");
                break;

            case o.TransitionSlideInR:
                commonLogUtil.LogUtil.Log("PageUtil-从右边展开"), this.content.setPosition(this.pageWidth, this.content.y),
                    this.node.runAction(cc.sequence(cc.delayTime(.01), cc.callFunc(function() {
                        this.content.runAction(cc.sequence(cc.moveTo(.15, cc.p(0, this.content.y)), cc.callFunc(function() {}.bind(this))));
                    }.bind(this))));
                break;

            case o.TransitionProgressInOut:
                commonLogUtil.LogUtil.Log("PageUtil-变大展开");
                var e = cc.sequence(cc.scaleTo(.3, 1.05, 1.05).easing(cc.easeCubicActionOut()), cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()));
                this.content.scale = .5, this.content.runAction(e);
                break;

            case o.TransitionFadeInOut:
                commonLogUtil.LogUtil.Log("PageUtil-淡入"), this.content.opacity = 0, this.content.runAction(cc.fadeIn(1));
                break;

            default:
                commonLogUtil.LogUtil.ErroLog("PageUtil-不存在效果-" + this.pageEffectType);
        } else commonLogUtil.LogUtil.ErroLog("PageUtil-不存在content节点");
    }, Common_Page.prototype.BackAndRemove = function() {
        switch (this.pageEffectType) {
            case o.Normal:
                commonLogUtil.LogUtil.DebugLog("PageUtil-直接删除:" + this.node.name), this.node.destroy();
                break;

            case o.TransitionSlideInR:
                this.node.runAction(cc.sequence(cc.moveTo(.15, cc.p(this.pageWidth, this.node.y)), cc.callFunc(function() {
                    commonLogUtil.LogUtil.DebugLog("PageUtil-从左往右移除删除:" + this.node.name), this.node.destroy();
                }.bind(this), this)));
                break;

            case o.TransitionProgressInOut:
                if (this.content) {
                    var t = cc.scaleTo(.3, 0, 0);
                    this.content.runAction(cc.sequence(t, cc.callFunc(function() {
                        commonLogUtil.LogUtil.DebugLog("PageUtil-变小关闭删除:" + this.node.name), this.node.destroy();
                    }.bind(this), this)));
                } else commonLogUtil.LogUtil.ErroLog("PageUtil-不存在content节点");
                break;

            case o.TransitionFadeInOut:
                this.node.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function() {
                    commonLogUtil.LogUtil.DebugLog("PageUtil-渐隐删除:" + this.node.name), this.node.destroy();
                }.bind(this), this)));
                break;

            default:
                commonLogUtil.LogUtil.ErroLog("PageUtil-不存在效果-" + this.pageEffectType);
        }
    }, __decorate([c({
        tooltip: "页面开启关闭效果类型 默认0\n0-直接直接展开\n1-从右往左展开\n2-从里面向外扩展变大展开\n3-淡出淡入"
    })], Common_Page.prototype, "pageEffectType", void 0), Common_Page = __decorate([s], Common_Page);
}(cc.Component);
exports.default = Common_Page;