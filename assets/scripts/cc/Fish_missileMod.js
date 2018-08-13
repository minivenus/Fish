cc.Class({
    extends: cc.Component,
    properties: {
        _heroNode: null,
        _hero_speed: 3,
        _time: 0,
        _isdestroy: !1,
        build_enemy: 0,
        runAction: !1,
        recovery: null,
        _enemy_speed: 0,
        _add_speed: 0,
        isPause: !0,
        gameCtl: null
    },
    start: function() {
        cc.director.getCollisionManager().enabled = !0, this.ration = .5 < Math.random(),
            this.node.y = this.ration ? -1e3 : 1e3, this.node.rotation = this.ration ? 0 : 180;
    },
    onCollisionEnter: function(o) {
        var e = o.node.name;
        "plane" != e || this.runAction || this.onRunAction(), "BigBoss" == e ? this.onBlast() : "puffer" == e || "point5" == e || "stone01" == e || "point4" == e || "point3" == e || "point2" == e || "point1" == e || "pufferMod" == e ? this.onBlast() : "Missile" == e && this.node.x > o.node.x && this.onBlast();
    },
    onBlast: function() {
        this._isdestroy || (this._isdestroy = !0, this.node.getChildByName("Missile").active = !1,
            this.node.getChildByName("boss2").active = !1, this.node.getChildByName("blast").active = !0,
            this.scheduleOnce(function() {
                this.node.parent.destroy();
            }, 1));
    },
    onRunAction: function() {
        this.runAction = !0, this.node.getChildByName("boss2").active = !1, this.node.getChildByName("Missile").active = !0,
            this.scheduleOnce(function() {
                this.node.getChildByName("boss2").active = !0, this.node.getChildByName("Missile").active = !1,
                    this.runAction = !1;
            }, .2);
    },
    update: function(o) {
        if (window.gameCrtl && !window.gameCrtl.isPause) {
            var e = this.ration ? 1 : -1;
            this.node.y += 400 * o * e, (2e3 <= this.node.y || -2e3 >= this.node.y) && this.node.parent.destroy();
        }
    }
});