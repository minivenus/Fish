//var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

var comPage = require("../lib/ComPage"),
    fishUserData = require("../lib/Fish_UserData");
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
        var pos = this.node.getPosition();
        this._pos = this.node.parent.convertToWorldSpaceAR(pos), this.timeProgress._components[1].progress = 1;
    },
    onCollisionStay: function(other) {
        var otherName = other.node.name;
        /*if (!("plane" == e && r.node.getComponent("Fish_fishCtr").myFish)) "plane" != e && (console.log('b1-'+e),this.node.removeFromParent(),
            window.gameCrtl._BoxBuildTemp = 5, window.gameCrtl._BoxBuildState = !0, ++window.gameCrtl._getBox);
        else */
        if ("plane" == otherName && other.node.getComponent("Fish_fishCtr").myFish) {
            if (this.timer -= .02,
                this.inBox = !0, this.timeProgress._components[1].progress = this.timer / 3, 0 >= this.timer && !this._openBox) {
                var self = this;
                this._openBox = !0;
                var shareOpen = fishUserData.Fish_UserData.getShareOpen(),
                    openBox = window.gameCrtl._openBox;
                shareOpen ? 0 == openBox ? fishUserData.Fish_UserData.setBoxState(0) : 1 == openBox ? fishUserData.Fish_UserData.setBoxState(1) : 2 == openBox && fishUserData.Fish_UserData.setBoxState(1) : 0 == openBox ? fishUserData.Fish_UserData.setBoxState(2) : 1 == openBox ? fishUserData.Fish_UserData.setBoxState(3) : 2 == openBox && fishUserData.Fish_UserData.setBoxState(2),
                    window.gameCrtl.pauseGame(!0), comPage.ComPage.openBox(function(t) {
                        window.gameCrtl.pauseGame(!1), self._openBox = !1, t ? (console.log("flag===", t),
                            fishUserData.Fish_UserData.setOpenGameBoxTimer(1), window.gameCrtl.checkOpenProtect(), window.gameCrtl._openBox++,
                                1 == window.gameCrtl._openBox ? window.gameCrtl._BoxBuildTemp = 60 : 2 == window.gameCrtl._openBox && (window.gameCrtl._BoxBuildTemp = 120),
                                window.gameCrtl.golds = fishUserData.Fish_UserData.getGold(), window.gameCrtl.goldLable.getComponent(cc.Label).string = window.gameCrtl.golds,
                                14 == window.worktype && "mainpt" != window.cur_scence && (window.gameCrtl._achievementList[14] += 1,
                                    window.Achievement.checkWork(14))) : (window.gameCrtl._BoxBuildTemp = 60, ++window.gameCrtl._getBox),
                            window.gameCrtl._BoxBuildState = !0;
                    }), this.node.removeFromParent();
            }
        }
    },
    onBlast: function() {},
    update: function(dt) {
        this.inBox && (this.agotimer -= dt, this.agotimer + 1 <= this.timer && (this.timer = 4,
            this.agotimer = 4, this.timeProgress._components[1].progress = this.timer / 4, this.inBox = !1));
        var pos = window.gameCrtl._hero.parent.getPosition();
        pos = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(pos);
        var _pos = this._pos;
        2e3 < Math.sqrt(Math.pow(pos.x - _pos.x, 2) + Math.pow(pos.y - _pos.y, 2)) && (this.node.removeFromParent(), window.gameCrtl._BoxBuildTemp = 15,
            window.gameCrtl._BoxBuildState = !0, ++window.gameCrtl._getBox);
    }
});