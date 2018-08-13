cc.Class({
    extends: cc.Component,
    properties: {},
    start: function() {},
    onCollisionEnter: function(a) {
        if ("plane" == a.node.name && a.node.getComponent("Fish_fishCtr").myFish) {
            var e = window.gameCrtl._hero.parent.getPosition();
            e = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(e);
            var t = window.gameCrtl.sceneNode.getPosition();
            3200 < g(u(e.x - t.x, 2) + u(e.y - t.y, 2)) && this.loadNewScene();
        }
    },
    loadNewScene: function() {
        if (!window._goldScene) {
            var a = window.gameCrtl._hero.parent.getPosition(),
                e = (a = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(a)).x,
                t = a.y;
            0 == this.node._name ? e -= 2e3 : 1 == this.node._name ? e += 2e3 : 2 == this.node._name ? t -= 2e3 : 3 == this.node._name && (t += 2e3),
                a = window.gameCrtl.node.convertToNodeSpaceAR(cc.p(e, t)), window.gameCrtl.sceneNode.setPosition(a),
                window.gameCrtl.updateScene();
        }
    }
});