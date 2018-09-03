//var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

cc.Class({
    extends: cc.Component,
    properties: {
        _heroNode: null,
        _hero_speed: 3,
        _time: 0,
        _isdestroy: !1,
        build_enemy: 0,
        runAction: !1,
        isPause: !0,
        gameCtl: null,
        heroPos: null,
        _radian: null,
        speed: 400,
        redRode: cc.Node
    },
    start: function() {
        this._time = 5, cc.director.getCollisionManager().enabled = !0, this.ration = .5 < Math.random(),
            this.node.y = this.ration ? -1e3 : 1e3, this.node.rotation = this.ration ? 0 : 180,
            this.speed = 200 * Math.floor(window.gameCrtl.timergo / 10) + 400, 800 < this.speed && (this.speed = 800);
        var effect_1 = cc.fadeTo(.5, 255),
            effect_2 = cc.fadeTo(.2, 200),
            effect_3 = cc.fadeTo(.2, 255),
            effect_4 = cc.fadeTo(.5, 100);
        this.redRode.runAction(cc.sequence(effect_1, effect_2, effect_3, effect_4));
    },
    onCollisionEnter: function(other) {
        "gold" != other.node.name && this.onRunAction();
    },
    onBlast: function() {},
    onRunAction: function() {
        this.runAction = !0, this.node.getChildByName("boss2").active = !1, this.node.getChildByName("BigBoss").active = !0,
            this.scheduleOnce(function() {
                this.node.getChildByName("boss2").active = !0, this.node.getChildByName("BigBoss").active = !1,
                    this.runAction = !1;
            }, .2);
    },
    update: function(dt) {
        if (window.gameCrtl && !window.gameCrtl.isPause) {
            var ration = this.ration ? 1 : -1;
            this.node.y += dt * this.speed * ration, (1e3 <= this.node.y || -1e3 >= this.node.y) && this.node.parent.destroy();
        }
    }
});