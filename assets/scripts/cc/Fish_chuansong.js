//var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

function RandomRange(o, e) {
    return Math.floor(Math.random() * (e - o + 1) + o);
}

cc.Class({
    extends: cc.Component,
    properties: {
        chuansong1: cc.Node,
        chuansong2: cc.Node
    },
    start: function() {
        var effect_1 = cc.scaleTo(.5, .5, .5),
        effect_2 = cc.scaleTo(.5, .45, .45);
        this.chuansong2.runAction(cc.repeatForever(cc.sequence(effect_1, effect_2))), this.chuansong1.active = !1,
            this.chuansong2.active = !1, this.node.active = !1, this.setNewPos();
    },
    setNewPos: function() {
            this.chuansong1.active = !1, this.chuansong2.active = !1, this.node.active = !1;
            var radius = -Math.PI / 180 * (RandomRange(0, 359) + 90),
            pos = window.gameCrtl._hero.parent.getPosition(),
            x = (pos = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(pos)).x + Math.cos(radius) * RandomRange(400, 600),
            y = pos.y + Math.sin(radius) * RandomRange(700, 1e3);
            pos = this.node.parent.convertToNodeSpaceAR(cc.p(x, y)), this.node.setPosition(pos),

            this.chuansong1.active = !0, this.chuansong2.active = !0, this.node.active = !0;
    },
    onCollisionEnter: function(other) {
        var nodeName = other.node.name;
        if (console.log("传送门---------------------------------------"), "plane" == nodeName && other.node.getComponent("Fish_fishCtr").myFish) {
            window._goldScene = !0, window.gameCrtl._missileNode.removeAllChildren(), window.gameCrtl._pufferNode.removeAllChildren(),
                window.gameCrtl._bigbossNode.removeAllChildren(), window.gameCrtl._fishNode.removeAllChildren(),
                window.gameCrtl._starNode.removeAllChildren(), window.gameCrtl.sceneNode.active = !1,
                window.gameCrtl._goldBuild = !1, this.node.active = !1, window.gameCrtl._goldBuild = !1,
                window.gameCrtl.goldSceneNode.active = !0, window.gameCrtl.goldSceneNode.setPosition(this.node.getPosition());
            var effect_1 = cc.scaleTo(.5, 1.2, 1.2),
                effect_2 = cc.scaleTo(.5, 1, 1);
            window.gameCrtl.ongoldtimer.runAction(cc.repeatForever(cc.sequence(effect_1, effect_2)));
        } else "puffer" != nodeName && "point5" != nodeName && "stone01" != nodeName && "point4" != nodeName && "point3" != nodeName && "point2" != nodeName && "point1" != nodeName && "pufferMod" != nodeName || (this.node.active = !1);
    },
    update: function() {
        if (this.node.active) {
            var heroPos = window.gameCrtl._hero.parent.getPosition();
            heroPos = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(heroPos);
            var nodePos = this.node.getPosition();
            2500 < Math.sqrt(Math.pow(heroPos.x - nodePos.x, 2) + Math.pow(heroPos.y - nodePos.y, 2)) && this.setNewPos();
        }
    }
});