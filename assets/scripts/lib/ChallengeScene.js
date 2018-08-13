var o = require("./NodeUtil"),
    g = require("./Define"),
    r = require("./Fish_UserData"),
    l = require("./ComPage"),
    h = require("./Common_Data"),
    n = require("./EChannelPrefix"),
    _ = require("./Common_GlobalEventUtil"),
    a = cc._decorator,
    s = a.ccclass,
    d = a.property,
    c = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.fbItem = null, t.spBgList = [], t.startTime = 0, t.endTime = 0, t.inter = 0,
                t.myRank = 0, t.rCheckCount = 5, t;
        }
        return __extends(t, o), t.prototype.start = function() {
                this.AddButtonEventStart(this, this.GetNodeByName("content/btnRet"), this.goHome),
                    "" == r.Fish_UserData.challRoomID ? (console.log("chall 挑战 房间ID为空跳转回主页：" + r.Fish_UserData.challRoomID),
                        cc.director.loadScene("GameScene")) : (console.log("chall 挑战 进入房间：" + r.Fish_UserData.challRoomID),
                        this.joinRoom());
            }, t.prototype.joinRoom = function() {
                var o = this;
                g.Define.joinRoom(r.Fish_UserData.challRoomID, function(t) {
                    switch (console.log("chall 挑战 进入房间返回成功 "), console.log(t), r.Fish_UserData.challRoomID = "",
                        t.rcode) {
                        case g.Define_Chall_Status.NORMAL:
                        case g.Define_Chall_Status.ALREADYINCURROOM:
                        case g.Define_Chall_Status.REWARDUNRECEIVE:
                            r.Fish_UserData.challRoomID = t.data.roomId, o.init(t.data);
                            break;

                        case g.Define_Chall_Status.ALREADYINOTHERROOM:
                            r.Fish_UserData.challRoomID = t.data.roomId, console.log("chall 挑战 玩家在另外房间跳转房间 " + r.Fish_UserData.challRoomID),
                                o.joinRoom();
                            break;

                        case g.Define_Chall_Status.ROOMEXPIRE:
                            o.init(t.data, !0);
                            break;

                        case g.Define_Chall_Status.ROOMNOEXIST:
                            console.log("chall 挑战 房间不存在,返回主页"), cc.director.loadScene("GameScene");
                            break;

                        case g.Define_Chall_Status.OVERSIZE:
                            console.log("chall 挑战 房间超过人数限制,返回主页"), cc.director.loadScene("GameScene");
                            break;

                        default:
                            console.log("chall 挑战 进入房间无有效房间状态" + t.rcode), cc.director.loadScene("GameScene");
                    }
                });
            }, t.prototype.init = function(d, e) {
                void 0 === e && (e = !1), console.log("chall 挑战 房间初始化"), console.log(d);
                try {
                    _.GlobalEventUtil.on("UpdataChall", function() {
                        console.log("chall 挑战 onshow 更新数据"), this.updateTime();
                    }.bind(this)), this.GetNodeByName("content/labTop").getComponent(cc.Label).string = d.ownerName + "的擂台";
                    for (var t = 0; t < d.ranking.length; t++) {
                        var o = cc.instantiate(this.fbItem),
                            p = this.spBgList[t] ? this.spBgList[t] : null;
                        o.getComponent(o.name).init(d.ranking[t], t + 1, p), this.GetNodeByName("content/scrollview/view/content").addChild(o);
                        var n = -(120 * t + 60);
                        o.setPosition(0, 120);
                        var a = cc.moveTo((t + 1) / 10, cc.p(0, n));
                        o.runAction(a);
                    }
                    if (this.AddButtonEventStart(this, this.GetNodeByName("content/btnStartGame"), this.onStart),
                        e ? (this.GetNodeByName("content/btnShare").active = !1, this.GetNodeByName("content/btnStartGame").active = !1,
                            this.GetNodeByName("content/btnShare2").active = !0, this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare2"), this.onShare2),
                            this.GetNodeByName("content/labTime").getComponent(cc.Label).string = "", _.GlobalEventUtil.offType("UpdataChall")) : (this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare"), this.onShare),
                            this.startTime = d.now, this.endTime = d.endTime, this.inter = this.endTime - this.startTime,
                            r.Fish_UserData.challRoomIntervalTime = this.inter, console.log("chall 挑战 间隔时间：" + this.inter),
                            this.schedule(this.timeCallback.bind(this), 1), this.schedule(this.updateTime.bind(this), 30)),
                        d.reward && (g.Define.pickReward(), d.rank <= g.Define.ChellRewards.length)) {
                        var s = l.ComPage.getRewardStr(g.Define.ChellRewards[d.rank - 1]);
                        r.Fish_UserData.addReward(g.Define.ChellRewards[d.rank - 1]), l.ComPage.ShowTip("恭喜获得第" + d.rank + "名，获得" + s);
                    }
                    this.myRank = d.rank;
                } catch (t) {
                    console.log("chall 挑战 房间初始化失败"), console.error(t);
                }
            }, t.prototype.updateTime = function(d) {
                var a = this;
                void 0 === d && (d = !1), console.log("chall 挑战 刷新数据"), g.Define.getRoomSimpleInfo(r.Fish_UserData.challRoomID, function(s) {
                    console.log("chall 挑战 刷新数据 收到刷新"), console.log(s), a.startTime = s.now, a.endTime = s.endTime,
                        a.inter = a.endTime - a.startTime, r.Fish_UserData.challRoomIntervalTime = a.inter,
                        console.log("chall 挑战 间隔时间：" + a.inter), a.GetNodeByName("content/scrollview/view/content").removeAllChildren();
                    for (var e = 0; e < s.ranking.length; e++) {
                        var t = cc.instantiate(a.fbItem),
                            o = a.spBgList[e] ? a.spBgList[e] : null;
                        t.getComponent(t.name).init(s.ranking[e], e + 1, o), a.GetNodeByName("content/scrollview/view/content").addChild(t);
                        var l = -(120 * e + 60);
                        t.setPosition(0, l);
                    }
                    1 == d && (console.log("chall 挑战 倒计时结束：查看排行奖励"), a.endCheckStatus());
                });
            }, t.prototype.endCheckStatus = function() {
                var o = this;
                g.Define.checkPlayerStatus(function(t) {
                        console.log("chall 挑战 玩家排名：" + t), -1 == t && 0 < o.rCheckCount ? (console.log("chall 挑战 重新获取请求数：" + o.rCheckCount),
                            o.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                                this.rCheckCount--, this.endCheckStatus();
                            }.bind(o))))) : o.myRank = t;
                    }), this.GetNodeByName("content/btnShare").active = !1, this.GetNodeByName("content/btnStartGame").active = !1,
                    this.GetNodeByName("content/btnShare2").active = !0, this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare2"), this.onShare2),
                    this.GetNodeByName("content/labTime").getComponent(cc.Label).string = "";
            }, t.prototype.timeCallback = function() {
                if (this.inter--, r.Fish_UserData.challRoomIntervalTime = this.inter, 0 < this.inter) {
                    var d = parseInt((this.inter / 3600).toString()),
                        e = (d % 24).toString();
                    e = 1 == e.length ? "0" + e : e;
                    var t = parseInt((d / 24).toString()),
                        o = parseInt(((this.inter - 60 * (60 * d)) / 60).toString()),
                        l = o.toString();
                    l = 1 == l.length ? "0" + l : l;
                    var n = parseInt((this.inter - 60 * (60 * d) - 60 * o).toString()).toString();
                    n = 1 == n.length ? "0" + n : n;
                    var a = "";
                    a = 0 < t ? t + "天 " + e + ":" + l + ":" + n : e + ":" + l + ":" + n, this.GetNodeByName("content/labTime").getComponent(cc.Label).string = "擂台关闭倒计时:" + a;
                } else r.Fish_UserData.challRoomIntervalTime = 0, this.GetNodeByName("content/labTime").getComponent(cc.Label).string = "",
                    this.unscheduleAllCallbacks(), console.log("倒计时结束：" + this.inter), this.updateTime(!0);
            }, t.prototype.goHome = function() {
                r.Fish_UserData.challRoomID = "", cc.director.loadScene("GameScene");
            }, t.prototype.onShare = function() {
                "" != r.Fish_UserData.challRoomID && h.default.share(n.default.pageshare, "chall=" + r.Fish_UserData.challRoomID, function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    console.log("成功 :", t);
                }, function(t) {
                    console.log("失败：", t), l.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t.prototype.onShare2 = function() {
                0 < this.myRank && h.default.share(n.default.friendreward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(t) {
                    console.log("成功 :", t);
                }, function(t) {
                    console.log("失败：", t), l.ComPage.ShowTip("分享失败");
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "1197669190", r.Fish_UserData.getNickName(), this.myRank, "");
            }, t.prototype.onStart = function() {
                cc.director.loadScene("Fish_MainTZ");
            }, t.prototype.onDestroy = function() {
                _.GlobalEventUtil.offType("UpdataChall"), this.unscheduleAllCallbacks();
            }, __decorate([d(cc.Prefab)], t.prototype, "fbItem", void 0), __decorate([d(cc.SpriteFrame)], t.prototype, "spBgList", void 0),
            t = __decorate([s], t);
    }(o.NodeUtil);
exports.default = c;