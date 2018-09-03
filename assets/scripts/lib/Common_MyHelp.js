var shareUtils = require("./Common_ShareUtils"),
    commonUtil = require("./Common_CommonUtil"),
    wxShortcut = require("./wxShortcut"),
    eChannelPrefix = require("./EChannelPrefix"),
    global = require("./Common_Global"),
    globalEventUtil = require("./Common_GlobalEventUtil"),
    LogUtil = require("./Common_LogUtil"),
    l = cc._decorator,
    c = l.ccclass,
    d = l.property,
    Common_MyHelp = function(__super) {
        function Common_MyHelp() {
            var Common_MyHelp = null !== __super && __super.apply(this, arguments) || this;
            return Common_MyHelp.fbPacketItem = null, Common_MyHelp.spHead = null, Common_MyHelp.labName = null, Common_MyHelp.baseHead = null,
            Common_MyHelp.ndOpenRed = null, Common_MyHelp.ndList = null, Common_MyHelp.ndProgress = null, Common_MyHelp.l_tip = null, Common_MyHelp.ndSendRed = null,
            Common_MyHelp.rtMoney = null, Common_MyHelp.params = null, Common_MyHelp;
        }
        return __extends(Common_MyHelp, __super), Common_MyHelp.prototype.init = function(a) {
            LogUtil.LogUtil.DebugLog("初始化助力界面"), this.node.getChildByName("content").getChildByName("labDec").active = !1,
                    this.ndList.removeAllChildren();
                for (var e = 0; 3 > e; e++) this.ndProgress.children[e].color = new cc.Color(255, 255, 255);
                for (var t, n = 0; n < global.Global.MaxRedNum; n++) t = cc.instantiate(this.fbPacketItem),
                    this.ndList.addChild(t), t.setPosition(global.Global.MyRedItemPos[n].x, global.Global.MyRedItemPos[n].y);
                this.ndProgress.active = a, LogUtil.LogUtil.DebugLog("初始化界面完成");
            }, Common_MyHelp.prototype.refresh = function(s) {
                try {
                    var e = 3 == global.Global.MaxRedNum;
                    if (this.init(e), this.params = s, LogUtil.LogUtil.DebugLog("打开我的助力"), commonUtil.default.setSprite(this.spHead, s.avatar_url + "?a=a.jpg"),
                        this.labName.string = s.nick_name + "的红包", 0 == s.status) {
                        this.ndOpenRed.active = !0, this.ndSendRed.active = !1;
                        var t = s.inviteList;
                        if (console.log(t), t.length < global.Global.MaxRedNum) {
                            var o = global.Global.MaxRedNum - t.length;
                            this.l_tip.string = "等待" + o + "个好友点击即可分享红包", this.ndOpenRed.getChildByName("b_open").active = !1,
                                this.ndOpenRed.getChildByName("b_find").active = !0;
                        } else this.l_tip.string = "好友来齐，红包可打开", this.ndOpenRed.getChildByName("b_open").active = !0,
                            this.ndOpenRed.getChildByName("b_find").active = !1;
                        for (var d = 0; d < t.length; d++) {
                            if (global.Global.MyRedItemPos[d] && null != global.Global.MyRedItemPos[d]) {
                                var n = this.ndList.children[d].getChildByName("spBg2").getChildByName("mkHead").getChildByName("spHead");
                                "" == t[d].avatar_url ? n.getComponent(cc.Sprite).spriteFrame = this.baseHead : commonUtil.default.setSprite(n, t[d].avatar_url + "?a=a.jpg"),
                                    this.ndList.children[d].getChildByName("spBg2").active = !0;
                            }
                            e && (this.ndProgress.children[d].color = new cc.Color(255, 0, 0));
                        }
                    } else this.ndOpenRed.active = !1, this.ndSendRed.active = !0, this.rtMoney.string = "<color=#222222>拆开红包，分得</c><color=#f3553f>" + s.reward_special_value + "</color><color=#222222>元</c>";
                } catch (t) {
                    LogUtil.LogUtil.ErroLog("我的助力" + t);
                }
            }, Common_MyHelp.prototype.onClickInvite = function() {
                LogUtil.LogUtil.DebugLog("帮TA找人");
                var t = "shareCode=" + (this.params.reward_code || " ") + "&shareId=" + (this.params.owner_open_id || " ");
                shareUtils.default.share(eChannelPrefix.default.helpinvite66, t, function() {
                    LogUtil.LogUtil.DebugLog("为好友助力，分享成功！"), cc.sys.os === cc.sys.OS_IOS ? wxShortcut.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "我也要发红包", "返回", function() {
                        LogUtil.LogUtil.DebugLog("用户助力后自己也要发红包"), globalEventUtil.GlobalEventUtil.emit("event_sendred", !1);
                    }) : wxShortcut.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "我也要发红包", " ", function() {
                        LogUtil.LogUtil.DebugLog("用户助力后自己也要发红包"), globalEventUtil.GlobalEventUtil.emit("event_sendred", !1);
                    });
                });
            }, Common_MyHelp.prototype.onOpen = function() {
                LogUtil.LogUtil.DebugLog("助力-拆红包"), this.params && (console.log(this.params), shareUtils.default.openRedPacket(this.params.reward_code, this.params.nick_name, !0),
                    this.onClose());
            }, Common_MyHelp.prototype.onSend = function() {
                LogUtil.LogUtil.DebugLog("自己发红包"), globalEventUtil.GlobalEventUtil.emit("event_sendred", !1), this.onClose();
            }, Common_MyHelp.prototype.onClose = function() {
                this.node.active = !1;
            }, __decorate([d(cc.Prefab)], Common_MyHelp.prototype, "fbPacketItem", void 0), __decorate([d(cc.Node)], Common_MyHelp.prototype, "spHead", void 0),
            __decorate([d(cc.Label)], Common_MyHelp.prototype, "labName", void 0), __decorate([d(cc.SpriteFrame)], Common_MyHelp.prototype, "baseHead", void 0),
            __decorate([d(cc.Node)], Common_MyHelp.prototype, "ndOpenRed", void 0), __decorate([d(cc.Node)], Common_MyHelp.prototype, "ndList", void 0),
            __decorate([d(cc.Node)], Common_MyHelp.prototype, "ndProgress", void 0), __decorate([d(cc.Label)], Common_MyHelp.prototype, "l_tip", void 0),
            __decorate([d(cc.Node)], Common_MyHelp.prototype, "ndSendRed", void 0), __decorate([d(cc.RichText)], Common_MyHelp.prototype, "rtMoney", void 0),
            Common_MyHelp = __decorate([c], Common_MyHelp);
    }(cc.Component);
exports.default = Common_MyHelp;