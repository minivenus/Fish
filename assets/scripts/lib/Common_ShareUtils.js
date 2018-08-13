var y = require("./Common_CommonUtil"),
    s = require("./wxShortcut"),
    c = require("./Common_RedPacketPage"),
    a = require("./Common_Data"),
    C = require("./Common_RedPacketModal"),
    n = require("./Common_OpenedRedPacket"),
    r = require("./gamesdk"),
    l = require("./Common_Define"),
    h = require("./Common_LogUtil"),
    o = require("./wxDisplayCheck"),
    d = require("./BaseResourcePage"),
    p = require("./ResourcePageData"),
    m = function() {
        function t() {}
        return t.jailactivity = "jailactivity", t.jiongactivity = "jiongactivity", t.puzzleactivity = "puzzleactivity",
            t;
    }();
exports.EActivityEnter = m;

var g = function() {
    function m() {}
    return m.getRedPacket = function(a, t) {
        var o = this;
        void 0 === a && (a = null), void 0 === t && (t = !0), console.log(">>>>>>>>>>>3"),
            this.httpGet(l.Common_Http.GetShareCode, {
                appId: r.config.appId,
                rewardType: "red_packet",
                appKey: r.config.appKey
            }, function(n) {
                return (h.LogUtil.DebugLog(n), n.code && 0 != n.code) ? (s.default.showModal("提示", n.msg || ""),
                    void(a && a())) : void(n.data.shareCode && t ? o.showRedPacketModal(n.data.shareCode, a) : a && a(-1));
            }, function() {
                s.default.showToast("赠送失败！", 2e3), a && a();
            });
    }, m.showRedPacketPage = function(a, t, o, r) {
        void 0 === o && (o = ""), void 0 === r && (r = 1), this.callback = t, this.ruleText = a,
            y.default.getPrefab("common/redPack/prefabs/Common_RedPacketPage", function(n) {
                n.parent = cc.find("Canvas") || cc.director.getScene().children[0], n.getComponent(c.default).setParams(t, a, o, r);
            });
    }, m.getActivityState = function(a, n, t) {
        void 0 === t && (t = null), this.httpGet(l.Common_Http.GetAcvitityStatus, {
            activityName: a
        }, function(t) {
            return t.code && 0 != t.code ? (s.default.showModal("提示", t.msg || ""), void n(-1)) : void(n && (console.log(t.data),
                n(t.data.status)));
        }, function(o) {
            n && n(-1), t && t(o);
        });
    }, m.enterGameByShare = function(a, n, d) {
        this.httpPost(l.Common_Http.JoinShare, {
            appId: r.config.appId,
            channelCode: a,
            rewardType: "red_packet",
            shareCode: n,
            shareId: d || r.game.getOpenId(),
            appKey: r.config.appKey
        }, function(t) {
            t.code && 0 != t.code ? s.default.showModal("提示", t.msg || "") : s.default.showModal("提示", "助力成功！");
        }, function(t) {
            h.LogUtil.DebugLog("助力失败： ", t.msg);
        });
    }, m.showRedPacketModal = function(a, t) {
        void 0 === t && (t = null), y.default.getPrefab("common/redPack/prefabs/Common_RedPacketModal", function(o) {
            o.parent = cc.find("Canvas") || cc.director.getScene().children[0], o.getComponent(C.default).setParams(a, t);
        });
    }, m.helpJoinRed = function(a) {
        var t = this;
        console.log(">>>>>>>>>>>4"), this.httpPost(l.Common_Http.JoinShare, {
            appId: r.config.appId,
            channelCode: a.channelCode,
            rewardType: "red_packet",
            shareCode: a.shareCode,
            shareId: a.shareId || r.game.getOpenId(),
            appKey: r.config.appKey
        }, function(o) {
            o.code && 0 != o.code ? s.default.showModal("提示", o.msg || "") : (h.LogUtil.DebugLog("通过别人的分享进入，助力成功,打开红包列表", o),
                t.showRedPacketPage(a.ruleText, a.callback, a.activityRuleText, 2));
        }, function(t) {
            h.LogUtil.DebugLog("助力失败： ", t.msg);
        });
    }, m.getRedShardCode = function(a) {
        var t = this;
        this.httpGet(l.Common_Http.GetRedpacketList, {
            appId: r.config.appId
        }, function(o) {
            o.code && 0 != o.code && (console.log("getRedShardCode获取红包错误"), a(-1)), 0 < o.data.length ? (t.packSort(o.data, "inviteList", 0),
                console.log("getRedShardCode获取红包:" + o.data[0].reward_code), a(o.data[0].reward_code)) : (console.log("getRedShardCode没有红包"),
                a(-1));
        }, null);
    }, m.packSort = function(t, a, o) {
        void 0 === o && (o = 1), null != t && (o = 1 == o ? 1 : o ? 1 : -1, t.sort(function(n, e) {
            return (n = n[a].length) < (e = e[a].length) ? -1 * o : e < n ? 1 * o : 0;
        }));
    }, m.getSharePrizePacket = function(o, a) {
        void 0 === a && (a = null), this.httpGet("share/getShareCode", {
            appId: r.config.appId,
            rewardType: o,
            appKey: r.config.appKey
        }, function(t) {
            return (console.log(t), t.code && 0 != t.code) ? (s.default.showModal("提示", t.msg || ""),
                void(a && a())) : void(t.data.shareCode ? a && a(t.data.shareCode) : s.default.showModal("提示", "宝箱达到上限暂不能分享"));
        }, function() {
            a && a();
        });
    }, m.getSharePrize = function(a, n, t, o) {
        this.httpPost("share/updateShareStatus", {
            appId: r.config.appId,
            rewardType: n || "",
            shareCode: a,
            isHelperRedPacket: t ? 1 : 0,
            appKey: r.config.appKey
        }, function(t) {
            console.log(t), t.code && 0 != t.code ? s.default.showModal("提示", t.msg || "") : o && o();
        }, function(t) {
            console.log("领取getSharePrize失败! 详情：\n", t), s.default.showModal("提示", "领取奖励失败，请稍后再试！");
        });
    }, m.enterGameBySharePrize = function(d, l, p, o, c, n) {
        void 0 === n && (n = null), console.log("enterGameByShareprize", d, l, p, o), this.httpPost("share/joinShare", {
            appId: r.config.appId,
            channelCode: d,
            rewardType: o || "gun_share_box5",
            shareCode: l,
            shareId: p || r.game.getOpenId(),
            appKey: r.config.appKey
        }, function(t) {
            return (console.log("enterGame success"), t.code && 0 != t.code) ? (s.default.showModal("提示", "不能重复领取或已达领取上限"),
                void console.log(t)) : void(c && c());
        }, function(t) {
            console.log("助力失败： ", t), n && n(t);
        });
    }, m.getRewardList = function(a, n, t) {
        void 0 === t && (t = null), this.httpGet("share/getRewardList", {
            appId: r.config.appId,
            rewardType: a
        }, function(t) {
            console.log("获取我的奖励列表：", t), t.code && 0 != t.code ? s.default.showModal("提示", t.msg || "") : n && n(t);
        }, function(o) {
            t && t(o);
        });
    }, m.openResourceSupplyPage = function(r, s, n) {
        var t = "common/resourceSupply/prefabs/ResourceSupplyPage";
        2 == r && (t += 2), y.default.getPrefab(t, function(a) {
            var e = p.default.get(r, n),
                t = a.getComponent(d.default);
            t.propDataList = s, t.pageData = e, a.parent = cc.director.getScene().getComponentInChildren(cc.Canvas).node;
        });
    }, m.getShareRewardList = function(o, a) {
        console.log("appId:", r.config.appId), this.httpGet("share/getGameGiftList", {
            type: o,
            appId: r.config.appId
        }, function(t) {
            a && a(t);
        }, function(t) {
            console.log("获取数据失败：", t);
        });
    }, m.requestForServerRecord = function(a, n, t) {
        void 0 === n && (n = null), void 0 === t && (t = null), this.httpPost("share/inviteFriendsToGetGift", {
            giftId: a
        }, function(t) {
            console.log("requestForServerRecord: 成功！", t), n && n(t);
        }, function(t) {
            console.log("请求失败：", t);
        });
    }, m.getReward = function(a, n) {
        var t = [];
        a.forEach(function(o) {
            t.push({
                giftId: o.propId,
                giftNum: o.limitCount - o.currentCount
            });
        }), this.httpPost("share/receiveGift", {
            receiveGiftList: t
        }, function(t) {
            n && n(t);
        }, function(t) {
            console.log("获取奖励失败  detail:", t);
        });
    }, m.checkSharePrize = function() {
        var a = o.default.onShowRes;
        a && a.query && a.query.propId && (m.enterGameBySharePrize(a.query.channelCode, a.query.propId, a.query.shareId, "gift_share", function(t) {
            console.log("检测分享奖励成功！======", t);
        }, function(t) {
            console.log("检测分享奖励失败------", a), t.code && s.default.showModal("提示", t.msg);
        }), o.default.onShowRes = null);
    }, m.showOpenedRedPacketModal = function(a, t) {
        var o = this;
        y.default.getPrefab("common/redPack/prefabs/Common_OpenedRedPacket", function(r) {
            r.parent = cc.find("Canvas") || cc.director.getScene().children[0], console.log("开红包-》》"),
                console.log(a), r.getComponent(n.default).refresh(a, o.callback, o.ruleText, o.activityRuleText, t);
        });
    }, m.share = function(n, e, t) {
        a.default.share(n, e, function() {
            return s.default.showToast("网络连接错误！", 2e3);
        }, function() {
            t && t();
        }, function() {
            h.LogUtil.DebugLog("分享失败！");
        });
    }, m.openRedPacket = function(a, n, t) {
        var o = this;
        void 0 === t && (t = !1), this.httpPost(l.Common_Http.UpdateShareStatus, {
            appId: r.config.appId,
            rewardType: "red_packet",
            shareCode: a,
            isHelperRedPacket: n ? 1 : 0,
            appKey: r.config.appKey
        }, function(a) {
            a.code && 0 != a.code ? s.default.showModal("提示", a.msg || "") : (console.log(a),
                o.showOpenedRedPacketModal(a.data.specialValue, t));
        }, function(t) {
            h.LogUtil.DebugLog("拆红包失败! 详情：\n", t), s.default.showModal("提示", "打开红包失败，请稍后再试！");
        });
    }, m.showOpenedWorldRankList = function(a, o) {
        h.LogUtil.DebugLog("打开世界排行榜"), console.log(a), this.httpGet(l.Common_Http.GetWorldRankingList, {
            appId: r.config.appId,
            start: 1,
            end: 20
        }, function(n) {
            (console.log(n), n.code && 0 != n.code) ? s.default.showModal("提示", n.msg || ""): y.default.getPrefab("common/rankingList/prefabs/Common_WorldChartShow", function(t) {
                t.parent = cc.find("Canvas") || cc.director.getScene().children[0], console.log("显示世界排行榜"),
                    t.getComponent(t.name).refresh(n.data, a, o);
            });
        }, function(t) {
            console.log("WorldRankList 获取失败：\n", t), s.default.showModal("提示", "获取排行榜信息失败，请稍后再试！");
        });
    }, m._updateWorldRankList = function(a, n, d) {
        h.LogUtil.DebugLog("分段请求世界排行榜"), wx.showLoading(), this.httpGet(l.Common_Http.GetWorldRankingList, {
            appId: r.config.appId,
            start: a,
            end: n
        }, function(t) {
            return (wx.hideLoading(), console.log(t), t.code && 0 != t.code) ? (s.default.showModal("提示", t.msg || ""),
                void(d && d(null))) : void(d && (console.log("更新世界排行回调"), console.log(t.data),
                d(t.data)));
        }, function(t) {
            wx.hideLoading(), d && d(null), console.log("WorldRankList 获取失败：\n", t), s.default.showModal("提示", "获取排行榜信息失败，请稍后再试！");
        });
    }, m.updateMyScore = function(t) {
        h.LogUtil.DebugLog("上传最新分数：" + t), this.httpPost(l.Common_Http.UpdateCommonRank, {
            appId: r.config.appId,
            score: t
        }, function(t) {
            console.log(t), t.code && 0 != t.code && s.default.showModal("提示", t.msg || "");
        }, function(t) {
            console.log("WorldRankList 上传分数失败：\n", t);
        });
    }, m.request = function(d, e, t, o, l) {
        var n = r.config.api + e;
        console.log(n), r.game.gameHttp(n, t, d).then(function(t) {
            o && o(t);
        }, function(t) {
            h.LogUtil.DebugLog("Common_ShareUtils:request 请求失败："), console.log(t), s.default.showModal("提示", t.msg),
                l && l(t);
        });
    }, m.httpGet = function(a, e, t, o) {
        this.request("GET", a, e, t, o);
    }, m.httpPost = function(a, e, t, o) {
        this.request("POST", a, e, t, o);
    }, m.callback = null, m.ruleText = "", m.activityRuleText = "", m;
}();
exports.default = g;