var LogUtil = require("./LogUtil"),
    o = function(o) {
        function e() {
            return null !== o && o.apply(this, arguments) || this;
        }
        return __extends(e, o), e.prototype.GetComponentByNodeName = function(a, e) {
            var t = this.GetNodeByName(a);
            if (!t) return LogUtil.LogUtil.ErroLog(" BaseGameUI.GetNodeComponent : path is not exist!"),
                null;
            var n = t.getComponent(e);
            return n || (LogUtil.LogUtil.ErroLog(" BaseGameUI.GetNodeComponent : Node=>'" + t.name + "' does not hava Component=>'" + e + "' !"),
                null);
        }, e.prototype.GetNodeByRootName = function(a) {
            for (var e = a.split("/"), t = null, o = 0; o < e.length; o++)
                if (0 != o) {
                    if (null == t) return null;
                    t = t.getChildByName(e[o]);
                } else t = cc.find(e[o]);
            return t;
        }, e.prototype.GetNodeByName = function(a) {
            if ("" == a) return this.node;
            var e = a.split(/\//g),
                t = [];
            t.push(this.node);
            for (var o = 0; o < e.length; o++) {
                e[o];
                var s = t[o].getChildByName(e[o]);
                if (null == s) return LogUtil.LogUtil.ErroLog("BaseGameUI.GetNodeByName : Not find node=>'" + e[o] + "'"),
                    null;
                t.push(s);
            }
            return t[t.length - 1];
        }, e.prototype.AddToggleEvent = function(s, e, t, o, d) {
            try {
                var n = new cc.Component.EventHandler();
                n.target = s, n.component = e, n.handler = t, n.customEventData = null == d ? "" : d,
                    o.getComponent(cc.Toggle).checkEvents.push(n);
            } catch (t) {
                LogUtil.LogUtil.ErroLog("NodeUtil<AddToggleEvent> " + o.name + " " + t);
            }
        }, e.prototype.AddButtonEvent = function(s, e, t, o, d) {
            try {
                var n = new cc.Component.EventHandler();
                n.target = s, n.component = e, n.handler = t, n.customEventData = null == d ? "" : d,
                    o.getComponent(cc.Button).clickEvents.push(n);
            } catch (t) {
                LogUtil.LogUtil.ErroLog("NodeUtil<AddButtonEvent> " + o.name + " " + t);
            }
        }, e.prototype.AddButtonEventStart = function(a, e, t) {
            e.on("touchstart", t, a);
        }, e.prototype.SetFlipx = function(a, e) {
            var t = cc.flipX(e);
            a.runAction(t);
        }, e.prototype.LoadSprite = function(r, t, d, n, a) {
            "" != t && null != t && void 0 !== t ? cc.loader.load({
                url: t,
                type: "jpg"
            }, function(s, e) {
                if (null != e) {
                    var t = new cc.SpriteFrame(e);
                    this.spUserHead.getComponent(cc.Sprite).spriteFrame = t, this.spUserHead.node.width = n,
                        this.spUserHead.node.height = a;
                } else r.getComponent(cc.Sprite).spriteFrame = d, r.width = n, r.height = a;
            }.bind(this)) : (r.getComponent(cc.Sprite).spriteFrame = d, r.width = n, r.height = a);
        }, e;
    }(cc.Component);
exports.NodeUtil = o;