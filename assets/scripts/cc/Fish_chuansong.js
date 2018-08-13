function a(o, e) {
    return C(Math.random() * (e - o + 1) + o);
}

cc.Class({
    extends: cc.Component,
    properties: {
        chuansong1: cc.Node,
        chuansong2: cc.Node
    },
    start: function() {
        var o = cc.scaleTo(.5, .5, .5),
            e = cc.scaleTo(.5, .45, .45);
        this.chuansong2.runAction(cc.repeatForever(cc.sequence(o, e))), this.chuansong1.active = !1,
            this.chuansong2.active = !1, this.node.active = !1, this.setNewPos();
    },
    setNewPos: function() {
        var n = -y / 180 * (a(0, 359) + 90),
            e = window.gameCrtl._hero.parent.getPosition(),
            t = (e = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(e)).x + f(n) * a(400, 600),
            o = e.y + _(n) * a(700, 1e3);
        e = this.node.parent.convertToNodeSpaceAR(cc.p(t, o)), this.node.setPosition(e),
            this.scheduleOnce(function() {
                this.chuansong1.active = !0, this.chuansong2.active = !0, this.node.active = !0;
            }, 1.5);
    },
    onCollisionEnter: function(a) {
        var e = a.node.name;
        if (console.log("传送门---------------------------------------"), "plane" == e && a.node.getComponent("Fish_fishCtr").myFish) {
            window._goldScene = !0, window.gameCrtl._missileNode.removeAllChildren(), window.gameCrtl._pufferNode.removeAllChildren(),
                window.gameCrtl._bigbossNode.removeAllChildren(), window.gameCrtl._fishNode.removeAllChildren(),
                window.gameCrtl._starNode.removeAllChildren(), window.gameCrtl.sceneNode.active = !1,
                window.gameCrtl._goldBuild = !1, this.node.active = !1, window.gameCrtl._goldBuild = !1,
                window.gameCrtl.goldSceneNode.active = !0, window.gameCrtl.goldSceneNode.setPosition(this.node.getPosition());
            var t = cc.scaleTo(.5, 1.2, 1.2),
                o = cc.scaleTo(.5, 1, 1);
            window.gameCrtl.ongoldtimer.runAction(cc.repeatForever(cc.sequence(t, o)));
        } else "puffer" != e && "point5" != e && "stone01" != e && "point4" != e && "point3" != e && "point2" != e && "point1" != e && "pufferMod" != e || (this.node.active = !1);
    },
    update: function() {
        if (this.node.active) {
            var e = window.gameCrtl._hero.parent.getPosition();
            e = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(e);
            var t = this.node.getPosition();
            2500 < g(u(e.x - t.x, 2) + u(e.y - t.y, 2)) && this.setNewPos();
        }
    }
});