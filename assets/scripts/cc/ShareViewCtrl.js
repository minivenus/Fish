var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var fishUserData = require("../lib/Fish_UserData"),
    commonData = t(require("../lib/Common_Data")),
    eChannelPrefix = t(require("../lib/EChannelPrefix")),
    define = require("../lib/Define");
cc.Class({
    extends: cc.Component,
    properties: {
        Score: cc.Label,
        TimeTex: cc.Label,
        TimeNum: null,
        has: cc.Label,
        enablelable: cc.Node,
        fistGameLable: cc.Label,
        goldreliveBtn: cc.Node,
        kankanreliveBtn: cc.Node,
        game: cc.Node,
        _SeeAvState: !1,
        gobt: cc.Node,
        reliveGoldLabel: cc.Label,
        reliveBt: cc.Node,
        shareCoid: 1,
        shareCoidDob: 1
    },
    start: function() {
        this.node.setLocalZOrder(4), this.enablelable.setLocalZOrder(4), this.GameCtrl = window.gameCrtl,
            this.reliveNeedGold = this.GameCtrl.reliveNeedGold || 120, this.TimeNum = 10, this.TimeTex.string = this.TimeNum,
            this.timeOut = !1, this.CountDownClick(1e3);
        var a, e, isFirst = fishUserData.Fish_UserData.getFristGame();
        if (console.log("state======", isFirst), isFirst) this.fistGameLable.string = "免费复活", this.kankanreliveBtn.active = !1;
        else {
            var o = (e = 3, (a = 1) < Math.floor(Math.random() * (e - a + 1) + a));
            this.kankanreliveBtn.active = o, this.goldreliveBtn.active = !o;
        }
        this.gobt.on("touchstart", this.ShowSkipBtn, this);
    },
    ShowSkipBtn: function() {
        this.ShowView(!1), console.log("ShowSkipBtn!!!!!!!!!!!!"), this.GameCtrl.RealGameOver();
    },
    ShowView: function(t) {
        console.log("分享视图显示", t), this.node.active = t;
    },
    CountDownClick: function() {},
    DeleteTimeNum: function() {
        this._SeeAvState || (this.TimeNum -= 1, this.TimeTex.string = this.TimeNum, this.TimeNum);
    },
    onKanKan: function() {
        var self = this;
        define.Define.wxShowVideo("adunit-9d8fdf17e13482f5", function(t) {
            t && (self.shareCoid = 0, self.GameCtrl.ReliveGame("你已原地复活", 2), self.ShowView(!1));
        });
    },
    SetScoreLabel: function(score) {
        this.Score.string = score, this.has.string = fishUserData.Fish_UserData.getGold();
        var heightScore = fishUserData.Fish_UserData.getHeightScore();
        console.log("score===", score, heightScore);
    },
    ShareBtnClick: function() {
        var o = this.reliveNeedGold * this.shareCoid,
            gold = fishUserData.Fish_UserData.getGold();
        return fishUserData.Fish_UserData.getFristGame() ? (this.ShowView(!1), this.GameCtrl.ReliveGame("你已原地复活", 2),
            void fishUserData.Fish_UserData.setFristGame(!1)) : void(o <= gold ? (this.ShowView(!1), this.GameCtrl.ReliveGame("你已原地复活", 1, o)) : (this.enablelable.active = !0,
            this.scheduleOnce(function() {
                this.enablelable.active = !1;
            }, .5)));
    },
    ShareBtnClick2: function() {
        var self = this,
            t = this;
            commonData.default.share(eChannelPrefix.default.resurrection, "", null, function() {
            console.log("发送复活成功！"), .5 == self.shareCoidDob ? (self.shareCoid = .5, self.reliveGoldLabel.string = "50金币复活") : 0 == self.shareCoidDob && (self.shareCoid = 0,
                self.GameCtrl.ReliveGame("你已原地复活", 2), self.ShowView(!1));
        });
    },
    cancelBtnClick: function() {
        this.unschedule(this.DeleteTimeNum), this.GameCtrl.RealGameOver(), this.ShowView(!1);
    },
    onSeeAv: function() {
        var a = this,
            t = !0,
            o = wx.createRewardedVideoAd({
                adUnitId: "adunit-789e83626f95c274"
            });
        o.load().then(function() {
            o.show(), a._SeeAvState = !0, a.GameCtrl.pauseGame(!0);
        }).catch(function(t) {
            console.log(t.errMsg);
        }), o.onClose(function(o) {
            o && o.isEnded || null == o ? t && (a.GameCtrl.ReliveGame("你已原地复活", 2), a.ShowView(!1),
                t = !1) : a._SeeAvState = !1;
        });
    }
});