var t = require("../lib/ComPage"),
    n = require("../lib/Fish_UserData");
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
        this.agotimer = 3, this.timer = 3;
        var t = this.node.getPosition();
        this._pos = this.node.parent.convertToWorldSpaceAR(t), this.timeProgress._components[1].progress = 1;
    },
    onCollisionStay: function(a) {
        var e = a.node.name;
        if (!("plane" == e && a.node.getComponent("Fish_fishCtr").myFish)) "plane" != e && (this.node.removeFromParent(),
            window.gameCrtl._BoxBuildTemp = 5, window.gameCrtl._BoxBuildState = !0, ++window.gameCrtl._getBox);
        else if (this.timer -= .02,
            this.inBox = !0, this.timeProgress._components[1].progress = this.timer / 3, 0 >= this.timer && !this._openBox) {
            var r = this;
            if (this._openBox = !0, n.Fish_UserData.getShareOpen()) {
                var o = window.gameCrtl._openBox;
                0 == o ? n.Fish_UserData.setBoxState(0) : 1 == o ? n.Fish_UserData.setBoxState(1) : 2 == o && n.Fish_UserData.setBoxState(1);
            } else n.Fish_UserData.setBoxState(2);
            window.gameCrtl.pauseGame(!0), t.ComPage.openBox(function(t) {
                window.gameCrtl.pauseGame(!1), r._openBox = !1, t ? (console.log("flag===", t),
                    n.Fish_UserData.setOpenGameBoxTimer(1), window.gameCrtl.checkOpenProtect(), window.gameCrtl._openBox++,
                    1 == window.gameCrtl._openBox ? window.gameCrtl._BoxBuildTemp = 240 : 2 == window.gameCrtl._openBox && (window.gameCrtl._BoxBuildTemp = 420),
                    window.gameCrtl.golds = n.Fish_UserData.getGold(), window.gameCrtl.goldLable.getComponent(cc.Label).string = window.gameCrtl.golds) : (window.gameCrtl._BoxBuildTemp = 240,
                    ++window.gameCrtl._getBox), window.gameCrtl._BoxBuildState = !0;
            }), this.node.removeFromParent();
        }
    },
    onBlast: function() {},
    update: function(a) {
        this.inBox && (this.agotimer -= a, this.agotimer + 1 <= this.timer && (this.timer = 3,
            this.agotimer = 3, this.timeProgress._components[1].progress = this.timer / 3, this.inBox = !1));
        var e = window.gameCrtl._hero.parent.getPosition();
        e = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(e);
        var t = this._pos;
        2e3 < g(_(e.x - t.x, 2) + _(e.y - t.y, 2)) && (this.node.removeFromParent(), window.gameCrtl._BoxBuildTemp = 240,
            window.gameCrtl._BoxBuildState = !0, ++window.gameCrtl._getBox);
    }
});