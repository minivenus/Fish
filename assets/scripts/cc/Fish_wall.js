var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

cc.Class({
    extends: cc.Component,
    properties: {},
    start: function() {},
    onCollisionEnter: function(other) {
        if ("plane" == other.node.name && other.node.getComponent("Fish_fishCtr").myFish) {
            var heroPos = window.gameCrtl._hero.parent.getPosition();
            heroPos = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(heroPos);
            var pos = window.gameCrtl.sceneNode.getPosition();
            3200 < Math.sqrt(Math.pow(heroPos.x - pos.x, 2) + Math.pow(heroPos.y - pos.y, 2)) && this.loadNewScene();
        }
    },
    loadNewScene: function() {
        if (!window._goldScene) {
            var heroPos = window.gameCrtl._hero.parent.getPosition(),
                x = (heroPos = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(heroPos)).x,
                y = heroPos.y;
            0 == this.node._name ? x -= 2e3 : 1 == this.node._name ? x += 2e3 : 2 == this.node._name ? y -= 2e3 : 3 == this.node._name && (y += 2e3),
                heroPos = window.gameCrtl.node.convertToNodeSpaceAR(cc.p(x, y)), window.gameCrtl.sceneNode.setPosition(heroPos),
                window.gameCrtl.updateScene();
        }
    }
});