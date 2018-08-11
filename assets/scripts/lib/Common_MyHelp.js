var o = require("./Common_ShareUtils"),
    g = require("./Common_CommonUtil"),
    i = require("./wxShortcut"),
    n = require("./EChannelPrefix"),
    s = require("./Common_Global"),
    a = require("./Common_GlobalEventUtil"),
    r = require("./Common_LogUtil"),
    l = cc._decorator,
    d = l.ccclass,
    c = l.property,
    u = function(l) {
        function t() {
            var t = null !== l && l.apply(this, arguments) || this;
            return t.fbPacketItem = null, t.spHead = null, t.labName = null, t.baseHead = null,
                t.ndOpenRed = null, t.ndList = null, t.ndProgress = null, t.l_tip = null, t.ndSendRed = null,
                t.rtMoney = null, t.params = null, t;
        }
        return __extends(t, l), t.prototype.init = function(a) {
                r.LogUtil.DebugLog("初始化助力界面"), this.node.getChildByName("content").getChildByName("labDec").active = !1,
                    this.ndList.removeAllChildren();
                for (var e = 0; 3 > e; e++) this.ndProgress.children[e].color = new cc.Color(255, 255, 255);
                for (var t, n = 0; n < s.Global.MaxRedNum; n++) t = cc.instantiate(this.fbPacketItem),
                    this.ndList.addChild(t), t.setPosition(s.Global.MyRedItemPos[n].x, s.Global.MyRedItemPos[n].y);
                this.ndProgress.active = a, r.LogUtil.DebugLog("初始化界面完成");
            }, t.prototype.refresh = function(d) {
                try {
                    var e = 3 == s.Global.MaxRedNum;
                    if (this.init(e), this.params = d, r.LogUtil.DebugLog("打开我的助力"), g.default.setSprite(this.spHead, d.avatar_url + "?a=a.jpg"),
                        this.labName.string = d.nick_name + "的红包", 0 == d.status) {
                        this.ndOpenRed.active = !0, this.ndSendRed.active = !1;
                        var t = d.inviteList;
                        if (console.log(t), t.length < s.Global.MaxRedNum) {
                            var o = s.Global.MaxRedNum - t.length;
                            this.l_tip.string = "等待" + o + "个好友点击即可分享红包", this.ndOpenRed.getChildByName("b_open").active = !1,
                                this.ndOpenRed.getChildByName("b_find").active = !0;
                        } else this.l_tip.string = "好友来齐，红包可打开", this.ndOpenRed.getChildByName("b_open").active = !0,
                            this.ndOpenRed.getChildByName("b_find").active = !1;
                        for (var i = 0; i < t.length; i++) {
                            if (s.Global.MyRedItemPos[i] && null != s.Global.MyRedItemPos[i]) {
                                var n = this.ndList.children[i].getChildByName("spBg2").getChildByName("mkHead").getChildByName("spHead");
                                "" == t[i].avatar_url ? n.getComponent(cc.Sprite).spriteFrame = this.baseHead : g.default.setSprite(n, t[i].avatar_url + "?a=a.jpg"),
                                    this.ndList.children[i].getChildByName("spBg2").active = !0;
                            }
                            e && (this.ndProgress.children[i].color = new cc.Color(255, 0, 0));
                        }
                    } else this.ndOpenRed.active = !1, this.ndSendRed.active = !0, this.rtMoney.string = "<color=#222222>拆开红包，分得</c><color=#f3553f>" + d.reward_special_value + "</color><color=#222222>元</c>";
                } catch (t) {
                    r.LogUtil.ErroLog("我的助力" + t);
                }
            }, t.prototype.onClickInvite = function() {
                r.LogUtil.DebugLog("帮TA找人");
                var t = "shareCode=" + (this.params.reward_code || " ") + "&shareId=" + (this.params.owner_open_id || " ");
                o.default.share(n.default.helpinvite66, t, function() {
                    r.LogUtil.DebugLog("为好友助力，分享成功！"), cc.sys.os === cc.sys.OS_IOS ? i.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "我也要发红包", "返回", function() {
                        r.LogUtil.DebugLog("用户助力后自己也要发红包"), a.GlobalEventUtil.emit("event_sendred", !1);
                    }) : i.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "我也要发红包", " ", function() {
                        r.LogUtil.DebugLog("用户助力后自己也要发红包"), a.GlobalEventUtil.emit("event_sendred", !1);
                    });
                });
            }, t.prototype.onOpen = function() {
                r.LogUtil.DebugLog("助力-拆红包"), this.params && (console.log(this.params), o.default.openRedPacket(this.params.reward_code, this.params.nick_name, !0),
                    this.onClose());
            }, t.prototype.onSend = function() {
                r.LogUtil.DebugLog("自己发红包"), a.GlobalEventUtil.emit("event_sendred", !1), this.onClose();
            }, t.prototype.onClose = function() {
                this.node.active = !1;
            }, __decorate([c(cc.Prefab)], t.prototype, "fbPacketItem", void 0), __decorate([c(cc.Node)], t.prototype, "spHead", void 0),
            __decorate([c(cc.Label)], t.prototype, "labName", void 0), __decorate([c(cc.SpriteFrame)], t.prototype, "baseHead", void 0),
            __decorate([c(cc.Node)], t.prototype, "ndOpenRed", void 0), __decorate([c(cc.Node)], t.prototype, "ndList", void 0),
            __decorate([c(cc.Node)], t.prototype, "ndProgress", void 0), __decorate([c(cc.Label)], t.prototype, "l_tip", void 0),
            __decorate([c(cc.Node)], t.prototype, "ndSendRed", void 0), __decorate([c(cc.RichText)], t.prototype, "rtMoney", void 0),
            t = __decorate([d], t);
    }(cc.Component);
exports.default = u;