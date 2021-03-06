var o = require("./Common_RedPacketPage"),
    i = require("./Common_CommonUtil"),
    n = require("./Common_ShareUtils"),
    a = require("./Common_Global"),
    s = require("./wxShortcut"),
    c = require("./EChannelPrefix"),
    r = require("./Common_GlobalEventUtil"),
    l = require("./Common_LogUtil"),
    d = cc._decorator,
    h = d.ccclass,
    u = d.property,
    p = function(d) {
        function t() {
            var t = null !== d && d.apply(this, arguments) || this;
            return t.noRedPacketPage = null, t.haveRedPacketPage = null, t.itemRoot = null,
                t.itemPrefab = null, t.l_myRedPacket = null, t.spRedPack = [], t.baseHead = null,
                t.playCallback = null, t.itemData = null, t.itemDataLists = [], t.redPack = 0, t.isHaveRedByMe = !1,
                t.isSendEvent = !1, t;
        }
        return __extends(t, d), t.prototype.start = function() {
                r.GlobalEventUtil.on("event_sendred", function(t) {
                    t ? this.isSendEvent = !0 : (l.LogUtil.Log("我的助力-邀请或者获取红包"), this.onSendRedEvent(this.isHaveRedByMe));
                }.bind(this));
            }, t.prototype.onSendRedEvent = function(t) {
                t ? (l.LogUtil.DebugLog("自己有红包邀请助力"), this.onClickInvite()) : (l.LogUtil.DebugLog("自己没红包获取红包"),
                    this.onStartGame());
            }, t.prototype.refresh = function(o, e) {
                this.redPack = 0;
                try {
                    this.playCallback = e, this.itemData = null, this.itemDataLists.length = 0, o.length ? (this.isHaveRedByMe = !0,
                        l.LogUtil.DebugLog("存在红包" + o.length), n.default.packSort(o, "inviteList", 0), this.haveRedPacketPage.active = !0,
                        this.noRedPacketPage.active = !1, this.itemData = o[0], this.itemDataLists = o,
                        this.addRedPack()) : (l.LogUtil.DebugLog("没有红包"), this.haveRedPacketPage.active = !1,
                        this.noRedPacketPage.active = !0, this.itemData = null, this.isHaveRedByMe = !1);
                } catch (t) {
                    l.LogUtil.ErroLog("我的红包：" + t);
                }
                this.isSendEvent && (l.LogUtil.Log("我的红包-邀请或者获取"), this.isSendEvent = !1, this.onSendRedEvent(this.isHaveRedByMe));
            }, t.prototype.addRedPack = function() {
                var n = this;
                l.LogUtil.DebugLog("添加一个红包内容"), console.log(this.itemData), this.itemRoot.removeAllChildren();
                for (var o, t = 0; t < a.Global.MaxRedNum; t++) o = cc.instantiate(this.itemPrefab),
                    this.itemRoot.addChild(o), o.setPosition(a.Global.RedItemPos[t].x, a.Global.RedItemPos[t].y);
                if (this.itemData.inviteList.forEach(function(o, e) {
                        console.log(o), a.Global.RedItemPos[e] && null != a.Global.RedItemPos[e] ? ("" == o.avatar_url ? n.itemRoot.children[e].getChildByName("mkHead").getChildByName("spHead").getComponent(cc.Sprite).spriteFrame = n.baseHead : i.default.setSprite(n.itemRoot.children[e].getChildByName("mkHead").getChildByName("spHead"), o.avatar_url + "?a=a.jpg"),
                            n.itemRoot.children[e].getChildByName("mkHead").active = !0) : l.LogUtil.DebugLog("错误，没有找到红包item坐标相应配置" + e);
                    }), this.itemData.inviteList.length >= a.Global.MaxRedNum) this.l_myRedPacket.string = "好友来齐，即可开启",
                    this.redPack = 1, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Sprite).spriteFrame = this.spRedPack[this.redPack],
                    this.haveRedPacketPage.getChildByName("b_invite").active = !1, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Animation).play();
                else {
                    var e = a.Global.MaxRedNum - this.itemData.inviteList.length;
                    this.l_myRedPacket.string = "等待" + e + "个好友点击即可开启", this.redPack = 0, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Sprite).spriteFrame = this.spRedPack[this.redPack],
                        this.haveRedPacketPage.getChildByName("b_invite").active = !0, this.haveRedPacketPage.getChildByName("btnOpen").getComponent(cc.Animation).stop();
                }
            }, t.prototype.onClickGetRedPacket = function() {
                l.LogUtil.DebugLog("拆红包"), this.itemData && 1 == this.redPack && (l.LogUtil.DebugLog("拆红包 1"),
                    console.log(this.itemDataLists), console.log(this.itemDataLists.length), n.default.openRedPacket(this.itemData.reward_code, !1, 1 < this.itemDataLists.length));
            }, t.prototype.onClickInvite = function() {
                if (this.itemData) {
                    var o = this;
                    l.LogUtil.DebugLog("邀请拉人", this.itemData);
                    var t = "shareCode=" + (this.itemData.reward_code || " ");
                    n.default.share(c.default.selfinvite66, t, function() {
                        l.LogUtil.DebugLog("邀请拉人，分享成功！"), cc.sys.os === cc.sys.OS_IOS ? s.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "返回游戏", "关闭", function() {
                            l.LogUtil.DebugLog("邀请拉人，分享成功！"), o.onStartGame();
                        }) : s.default.showModalRet("邀请发送成功", "记得提醒好友帮你点哦", "返回游戏", " ", function() {
                            l.LogUtil.DebugLog("邀请拉人，分享成功！"), o.onStartGame();
                        });
                    });
                }
            }, t.prototype.onStartGame = function() {
                l.LogUtil.DebugLog("我的红包-开始游戏！"), o.default.instance && o.default.instance.node && o.default.instance.node.destroy(),
                    this.playCallback && this.playCallback();
            }, t.prototype.onDestroy = function() {
                r.GlobalEventUtil.offType("event_sendred");
            }, __decorate([u(cc.Node)], t.prototype, "noRedPacketPage", void 0), __decorate([u(cc.Node)], t.prototype, "haveRedPacketPage", void 0),
            __decorate([u(cc.Node)], t.prototype, "itemRoot", void 0), __decorate([u(cc.Prefab)], t.prototype, "itemPrefab", void 0),
            __decorate([u(cc.Label)], t.prototype, "l_myRedPacket", void 0), __decorate([u([cc.SpriteFrame])], t.prototype, "spRedPack", void 0),
            __decorate([u(cc.SpriteFrame)], t.prototype, "baseHead", void 0), t = __decorate([h], t);
    }(cc.Component);
exports.default = p;