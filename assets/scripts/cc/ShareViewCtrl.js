function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
var r = require("../lib/Fish_UserData"),
    n = t(require("../lib/Common_Data")),
    i = t(require("../lib/EChannelPrefix"));
cc.Class({
    extends: cc.Component,
    properties: {
        Score: cc.Label,
        TimeTex: cc.Label,
        TimeNum: null,
        has: cc.Label,
        enablelable: cc.Node,
        fistGameLable: cc.Label,
        game: cc.Node,
        _SeeAvState: !1,
        gobt: cc.Node,
        shareBt: cc.Node,
        shareBt2: cc.Node,
        reliveGoldLabel: cc.Label,
        reliveBt: cc.Node,
        shareCoid: 1,
        shareCoidDob: 1
    },
    start: function() {
        this.node.setLocalZOrder(4), this.enablelable.setLocalZOrder(4), this.GameCtrl = this.game.getComponent("Fish_Main"),
            this.reliveNeedGold = this.GameCtrl.reliveNeedGold || 120, this.TimeNum = 10, this.TimeTex.string = this.TimeNum,
            this.timeOut = !1, this.CountDownClick(1e3);
        var t = r.Fish_UserData.getFristGame();
        console.log("state======", t), t && (this.fistGameLable.string = "免费复活"), this.gobt.on("touchstart", this.ShowSkipBtn, this);
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
    SetScoreLabel: function(a) {
        this.Score.string = a, this.has.string = r.Fish_UserData.getGold();
        var e = r.Fish_UserData.getHeightScore();
        console.log("score===", a, e);
        var t = r.Fish_UserData.getShareOpen(),
            o = r.Fish_UserData.getFristGame();
        t && !o ? e < a ? (this.shareCoidDob = 0, this.shareBt.active = !1, this.shareBt2.active = !0) : (this.shareCoidDob = .5,
            this.shareBt.active = !0, this.shareBt2.active = !1) : (this.shareBt.active = !1,
            this.shareBt2.active = !1);
    },
    ShareBtnClick: function() {
        var o = this.reliveNeedGold * this.shareCoid,
            e = r.Fish_UserData.getGold();
        return r.Fish_UserData.getFristGame() ? (this.ShowView(!1), this.GameCtrl.ReliveGame("你已原地复活", 2),
            void r.Fish_UserData.setFristGame(!1)) : void(o <= e ? (this.ShowView(!1), this.GameCtrl.ReliveGame("你已原地复活", 1, o)) : (this.enablelable.active = !0,
            this.scheduleOnce(function() {
                this.enablelable.active = !1;
            }, .5)));
    },
    ShareBtnClick2: function() {
        var e = this,
            t = this;
        n.default.share(i.default.resurrection, "", null, function() {
            console.log("发送复活成功！"), .5 == e.shareCoidDob ? (e.shareCoid = .5, e.reliveGoldLabel.string = "50金币复活") : 0 == e.shareCoidDob && (e.shareCoid = 0,
                t.GameCtrl.ReliveGame("你已原地复活", 2), e.ShowView(!1)), e.shareBt.active = !1, e.shareBt2.active = !1;
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