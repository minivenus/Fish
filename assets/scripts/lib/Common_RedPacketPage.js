var Common_MyHelp = require("./Common_MyHelp"),
    Common_MyRedPackets = require("./Common_MyRedPackets"),
    Common_ShareUtils = require("./Common_ShareUtils"),
    wxShortcut = require("./wxShortcut"),
    Common_CommonUtil = require("./Common_CommonUtil"),
    gamesdk = require("./gamesdk"),
    Common_Define = require("./Common_Define"),
    Common_LogUtil = require("./Common_LogUtil"),
    Common_Global = require("./Common_Global"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    m = function(d) {
        function t() {
            var t = null !== d && d.apply(this, arguments) || this;
            return t.txt_money = null, t.l_cash = null, t.myHelp = null, t.myRedPackets = null,
                t.anchor2 = null, t.moneyAni = null, t.moneyAniState = null, t.fristMoney = !1,
                t.fristCash = !1, t.joinType = 1, t.activityRuleText = "暂无红包助力信息", t.ruleText = null,
                t.ruleNode = null, t.playCallback = null, t._ruleText = "", t;
        }
        return __extends(t, d), (e = t).prototype.onLoad = function() {
                e.instance = this;
            }, t.prototype.start = function() {
                .5 < cc.view.getVisibleSize().width / cc.view.getVisibleSize().height ? (this.node.height = 1920,
                    console.log("========= > > > > >1920=============")) : (console.log("========= < < < <2350============="),
                    this.node.height = 2350), this.loadConfig(), Common_CommonUtil.default.resetScale(this.node);
            }, t.prototype.loadConfig = function() {
                var t = cc.url.raw("resources/common/redPack/config/Com_RedConfig.json");
                console.log("加载配置文件：Com_RedConfig.json"), cc.loader.load(t, function(a, e) {
                    if (a) console.log(a.message || a);
                    else {
                        console.log("load Com_RedConfig success");
                        var t = e.red;
                        t && (Common_Global.Global.RedItemPos = t.RedItemPos, Common_Global.Global.MyRedItemPos = t.MyRedItemPos,
                            Common_Global.Global.MaxRedNum = t.MaxRedNum), this.refresh();
                    }
                }.bind(this));
            }, t.prototype.refresh = function(d) {
                var o = this;
                void 0 === d && (d = !1), Common_ShareUtils.default.httpGet(Common_Define.Common_Http.GetRedpacketBalance, {}, function(n) {
                    if (Common_LogUtil.LogUtil.DebugLog("获取分数成功"), console.log(n), n.code && 0 != n.code) wxShortcut.default.showModal("提示", n.msg || "");
                    else {
                        d && (o.joinType = 1), o.fristCash = n.data.isFirstTransferOut, Common_LogUtil.LogUtil.Log("是否首次提现" + n.data.isFirstTransferOut),
                            o.refreshBalance(n.data.balance);
                        var e = cc.sys.localStorage.getItem("fristRed");
                        "string" == typeof e && "" != e ? o.fristMoney = !(0 < parseInt(e)) : (cc.sys.localStorage.setItem("fristRed", "0"),
                            o.fristMoney = !0), o.fristMoney && .3 <= n.data.balance && (Common_LogUtil.LogUtil.DebugLog("首次拆红包，当前金额：" + n.data.balance),
                            o.moneyAniState = o.moneyAni.play());
                    }
                }, null), console.log(">>>>>>>>>>>6"), Common_ShareUtils.default.httpGet(Common_Define.Common_Http.GetHelperRedpacketList, {
                    appId: gamesdk.config.appId
                }, function(t) {
                    Common_LogUtil.LogUtil.DebugLog("获取我的助力成功："), console.log(t), t.code && 0 != t.code ? wxShortcut.default.showModal("提示", t.msg || "") : (o.refreshMyHelp(t.data),
                        2 == o.joinType && (Common_LogUtil.LogUtil.DebugLog("助力进入红包界面，直接显示我的助力"), o.onShowHelp()));
                }, null), console.log(">>>>>>>>>>>7"), Common_ShareUtils.default.httpGet(Common_Define.Common_Http.GetRedpacketList, {
                    appId: gamesdk.config.appId
                }, function(t) {
                    Common_LogUtil.LogUtil.DebugLog("获取我的红包成功"), console.log(t), t.code && 0 != t.code ? wxShortcut.default.showModal("提示", t.msg || "") : o.refreshMyRewards(t.data);
                }, null);
            }, t.prototype.refreshBalance = function(t) {
                this.txt_money.string = t + "元", this.l_cash.string = this.fristCash ? "0.3元可提现" : "1元可提现";
            }, t.prototype.refreshMyHelp = function(t) {
                0 == t.length ? (Common_LogUtil.LogUtil.DebugLog("没有助力"), this.node.getChildByName("top").getChildByName("b_comGetRed").active = !1) : (this.node.getChildByName("top").getChildByName("b_comGetRed").active = !0,
                    this.myHelp.refresh(t[0]));
            }, t.prototype.refreshMyRewards = function(t) {
                this.myRedPackets.refresh(t, this.playCallback);
            }, t.prototype.test = function() {}, t.prototype.onClose = function() {
                this.node.destroy();
            }, t.prototype.onShowHelp = function() {
                this.myHelp.node.active = !0, this.onPlayPageAin(this.myHelp.node);
            }, t.prototype.onGetMoney = function() {
                this.moneyAniState && (Common_LogUtil.LogUtil.DebugLog("提现停止动画"), this.moneyAniState.time = 0,
                    this.moneyAniState.sample(), this.moneyAni.stop(), this.moneyAniState = null, cc.sys.localStorage.setItem("fristRed", "1"),
                    this.fristMoney = !1), Common_LogUtil.LogUtil.DebugLog("提现！"), gamesdk.dataStatistics.withDraw("", function(t) {
                        Common_LogUtil.LogUtil.DebugLog(t);
                }, function(t) {
                    Common_LogUtil.LogUtil.DebugLog(t);
                });
            }, t.prototype.onShowRule = function() {
                this.ruleNode.active = !0, this.ruleText.string = this._ruleText, this.onPlayPageAin(this.ruleNode);
            }, t.prototype.onPlayPageAin = function(o) {
                var e = cc.sequence(cc.scaleTo(.3, 1.05, 1.05).easing(cc.easeCubicActionOut()), cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()));
                o.getChildByName("content").scale = .5, o.getChildByName("content").runAction(e);
            }, t.prototype.onHideRule = function() {
                this.ruleNode.active = !1;
            }, t.prototype.onPlay = function() {
                if (Common_LogUtil.LogUtil.DebugLog("主界面-开始游戏"), this.node.destroy(), !this.playCallback) throw "RedPacketPage.onPlay()  请在参数中传入回调方法！";
                this.playCallback();
            }, t.prototype.setParams = function(a, e, t, o) {
                void 0 === t && (t = ""), this.playCallback = a, this._ruleText = e, this.joinType = o,
                Common_LogUtil.LogUtil.DebugLog("进入红包类型 " + this.joinType), t && (this.activityRuleText = t);
            }, t.instance = null, __decorate([p(cc.Label)], t.prototype, "txt_money", void 0),
            __decorate([p(cc.Label)], t.prototype, "l_cash", void 0), __decorate([p(Common_MyHelp.default)], t.prototype, "myHelp", void 0),
            __decorate([p(Common_MyRedPackets.default)], t.prototype, "myRedPackets", void 0), __decorate([p(cc.Node)], t.prototype, "anchor2", void 0),
            __decorate([p(cc.Animation)], t.prototype, "moneyAni", void 0), __decorate([p(cc.RichText)], t.prototype, "ruleText", void 0),
            __decorate([p(cc.Node)], t.prototype, "ruleNode", void 0), t = e = __decorate([u], t);
        var e;
    }(cc.Component);
exports.default = m;