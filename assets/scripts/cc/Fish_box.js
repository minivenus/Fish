var t = require("../lib/ComPage"),
    a = require("../lib/Fish_UserData");
cc.Class({
    extends: cc.Component,
    properties: {
        timer: 10,
        agotimer: 10,
        inBox: !1,
        _openBox: !1,
        timeProgress: cc.Node
    },
    start: function() {
        this.agotimer = 4, this.timer = 4;
        var t = this.node.getPosition();
        this._pos = this.node.parent.convertToWorldSpaceAR(t), this.timeProgress._components[1].progress = 1;
    },
    onCollisionStay: function(r) {
        var e = r.node.name;
        if (!("plane" == e && r.node.getComponent("Fish_fishCtr").myFish)) "plane" != e && (this.node.removeFromParent(),
            window.gameCrtl._BoxBuildTemp = 5, window.gameCrtl._BoxBuildState = !0, ++window.gameCrtl._getBox);
        else if (this.timer -= .02,
            this.inBox = !0, this.timeProgress._components[1].progress = this.timer / 3, 0 >= this.timer && !this._openBox) {
            var s = this;
            this._openBox = !0;
            var o = a.Fish_UserData.getShareOpen(),
                d = window.gameCrtl._openBox;
            o ? 0 == d ? a.Fish_UserData.setBoxState(0) : 1 == d ? a.Fish_UserData.setBoxState(1) : 2 == d && a.Fish_UserData.setBoxState(1) : 0 == d ? a.Fish_UserData.setBoxState(2) : 1 == d ? a.Fish_UserData.setBoxState(3) : 2 == d && a.Fish_UserData.setBoxState(2),
                window.gameCrtl.pauseGame(!0), t.ComPage.openBox(function(t) {
                    window.gameCrtl.pauseGame(!1), s._openBox = !1, t ? (console.log("flag===", t),
                            a.Fish_UserData.setOpenGameBoxTimer(1), window.gameCrtl.checkOpenProtect(), window.gameCrtl._openBox++,
                            1 == window.gameCrtl._openBox ? window.gameCrtl._BoxBuildTemp = 60 : 2 == window.gameCrtl._openBox && (window.gameCrtl._BoxBuildTemp = 120),
                            window.gameCrtl.golds = a.Fish_UserData.getGold(), window.gameCrtl.goldLable.getComponent(cc.Label).string = window.gameCrtl.golds,
                            14 == window.worktype && "mainpt" != window.cur_scence && (window.gameCrtl._achievementList[14] += 1,
                                window.Achievement.checkWork(14))) : (window.gameCrtl._BoxBuildTemp = 60, ++window.gameCrtl._getBox),
                        window.gameCrtl._BoxBuildState = !0;
                }), this.node.removeFromParent();
        }
    },
    onBlast: function() {},
    update: function(a) {
        this.inBox && (this.agotimer -= a, this.agotimer + 1 <= this.timer && (this.timer = 4,
            this.agotimer = 4, this.timeProgress._components[1].progress = this.timer / 4, this.inBox = !1));
        var e = window.gameCrtl._hero.parent.getPosition();
        e = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(e);
        var t = this._pos;
        2e3 < g(u(e.x - t.x, 2) + u(e.y - t.y, 2)) && (this.node.removeFromParent(), window.gameCrtl._BoxBuildTemp = 15,
            window.gameCrtl._BoxBuildState = !0, ++window.gameCrtl._getBox);
    }
});