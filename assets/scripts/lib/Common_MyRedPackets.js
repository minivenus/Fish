var redPacketPage = require("./Common_RedPacketPage"),
    commonUtil = require("./Common_CommonUtil"),
    commonShareUtils = require("./Common_ShareUtils"),
    global = require("./Common_Global"),
    wxShortcut = require("./wxShortcut"),
    eChannelPrefix = require("./EChannelPrefix"),
    globalEventUtil = require("./Common_GlobalEventUtil"),
    Common_LogUtil = require("./Common_LogUtil"),
    h = cc._decorator,
    d = h.ccclass,
    u = h.property,
    p = function(p) {
        function t() {
            var t = null !== p && p.apply(this, arguments) || this;
            return t.noRedPacketPage = null, t.haveRedPacketPage = null, t.itemRoot = null,
                t.itemPrefab = null, t.l_myRedPacket = null, t.spRedPack = [], t.baseHead = null,
                t.playCallback = null, t.itemData = null, t.itemDataLists = [], t.redPack = 0, t.isHaveRedByMe = !1,
                t.isSendEvent = !1, t;
        }
        return __extends(t, p), t.prototype.start = function() {
            globalEventUtil.GlobalEventUtil.on("event_sendred", function(t) {
                    t ? this.isSendEvent = !0 : (Common_LogUtil.LogUtil.Log("我的助力-邀请或者获取红包"), this.onSendRedEvent(this.isHaveRedByMe));
                }.bind(this));
            }, t.prototype.onSendRedEvent = function(t) {
                t ? (Common_LogUtil.LogUtil.DebugLog("自己有红包邀请助力"), this.onClickInvite()) : (Common_LogUtil.LogUtil.DebugLog("自己没红包获取红包"),
                    this.onStartGame());
            }, t.prototype.refresh = function(o, e) {
                this.redPack = 0;
                try {
                    this.playCallback = e, this.itemData = null, this.itemDataLists.length = 0, o.length ? (this.isHaveRedByMe = !0,
                        Common_LogUtil.LogUtil.DebugLog("存在红包" + o.length), commonShareUtils.default.packSort(o, "inviteList", 0), this.haveRedPacketPage.active = !0,
                        this.noRedPacketPage.active = !1, this.itemData = o[0], this.itemDataLists = o,
                        this.addRedPack()) : (Common_LogUtil.LogUtil.DebugLog("没有红包"), this.haveRedPacketPage.active = !1,
                        this.noRedPacketPage.active = !0, this.itemData = null, this.isHaveRedByMe = !1);
                } catch (t) {
                    Common_LogUtil.LogUtil.ErroLog("我的红包：" + t);
                }
                this.isSendEvent && (Common_LogUtil.LogUtil.Log("我的红包-邀请或者获取"), this.isSendEvent = !1, this.onSendRedEvent(this.isHaveRedByMe));
            }, t.prototype.addRedPack = function() {
                var n = this;
                Common_LogUtil.LogUtil.DebugLog("添加一个红包内容"), console.log(this.itemData), this.itemRoot.removeAllChildren();
                for (var o, t = 0; t < global.Global.MaxRedNum; t++) o = cc.instantiate(this.itemPrefab),
                    this.itemRoot.addChild(o), o.setPosition(global.Global.RedItemPos[t].x, global.Global.RedItemPos[t].y);
                if (this.itemData.inviteList.forEach(function(o, e) {
                        console.log(o), global.Global.RedItemPos[e] && null != global.Global.RedItemPos[e] ? ("" == o.avatar_url ? n.itemRoot.children[e].getChildByName("mkHead").getChildByName("spHead").getComponent(cc.Sprite).spriteFrame = n.baseHead : commonUtil.default.setSprite(n.itemRoot.children[e].getChildByName("mkHead").getChildByName("spHead"), o.avatar_url + "?a=a.jpg"),
                            n.itemRoot.children[e].getChildByName("mkHead").active = !0) : Common_LogUtil.LogUtil.DebugLog("错误，没有找到红包item坐标相应配置" + e);
                    }), this.itemData.inviteList.length >= global.Global.MaxRedNum) this.l_myRedPacket.string = "好友来齐，即可开启",
                    this.redPack = 1, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Sprite).spriteFrame = this.spRedPack[this.redPack],
                    this.haveRedPacketPage.getChildByName("b_invite").active = !1, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Animation).play();
                else {
                    var e = global.Global.MaxRedNum - this.itemData.inviteList.length;
                    this.l_myRedPacket.string = "等待" + e + "个好友点击即可开启", this.redPack = 0, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Sprite).spriteFrame = this.spRedPack[this.redPack],
                        this.haveRedPacketPage.getChildByName("b_invite").active = !0, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Animation).stop();
                }
            }, t.prototype.onClickGetRedPacket = function() {
                Common_LogUtil.LogUtil.DebugLog("拆红包"), this.itemData && 1 == this.redPack && (Common_LogUtil.LogUtil.DebugLog("拆红包 1"),
                    console.log(this.itemDataLists), console.log(this.itemDataLists.length), commonShareUtils.default.openRedPacket(this.itemData.reward_code, !1, 1 < this.itemDataLists.length));
            }, t.prototype.onClickInvite = function() {
                if (this.itemData) {
                    var o = this;
                    Common_LogUtil.LogUtil.DebugLog("邀请拉人", this.itemData);
                    var t = "shareCode=" + (this.itemData.reward_code || " ");
                    commonShareUtils.default.share(eChannelPrefix.default.selfinvite66, t, function() {
                        Common_LogUtil.LogUtil.DebugLog("邀请拉人，分享成功！"), cc.sys.os === cc.sys.OS_IOS ? wxShortcut.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "返回游戏", "关闭", function() {
                            Common_LogUtil.LogUtil.DebugLog("邀请拉人，分享成功！"), o.onStartGame();
                        }) : wxShortcut.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "返回游戏", " ", function() {
                            Common_LogUtil.LogUtil.DebugLog("邀请拉人，分享成功！"), o.onStartGame();
                        });
                    });
                }
            }, t.prototype.onStartGame = function() {
                Common_LogUtil.LogUtil.DebugLog("我的红包-开始游戏！"), redPacketPage.default.instance && redPacketPage.default.instance.node && redPacketPage.default.instance.node.destroy(),
                    this.playCallback && this.playCallback();
            }, t.prototype.onDestroy = function() {
                globalEventUtil.GlobalEventUtil.offType("event_sendred");
            }, __decorate([u(cc.Node)], t.prototype, "noRedPacketPage", void 0), __decorate([u(cc.Node)], t.prototype, "haveRedPacketPage", void 0),
            __decorate([u(cc.Node)], t.prototype, "itemRoot", void 0), __decorate([u(cc.Prefab)], t.prototype, "itemPrefab", void 0),
            __decorate([u(cc.Label)], t.prototype, "l_myRedPacket", void 0), __decorate([u([cc.SpriteFrame])], t.prototype, "spRedPack", void 0),
            __decorate([u(cc.SpriteFrame)], t.prototype, "baseHead", void 0), t = __decorate([d], t);
    }(cc.Component);
exports.default = p;