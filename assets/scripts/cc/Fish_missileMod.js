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
        cc.director.getCollisionManager().enabled = !0;
    },
    onCollisionEnter: function(o) {
        var e = o.node.name;
        "plane" != e || this.runAction || this.onRunAction(), "BigBoss" == e || "puffer" == e || "Missile" == e && (this.node.x,
            o.node.x);
    },
    onBlast: function() {
        this._isdestroy || (this._isdestroy = !0, this.node.getChildByName("Missile").active = !1,
            this.node.getChildByName("boss2").active = !1, this.node.getChildByName("blast").active = !0,
            this.scheduleOnce(function() {
                this.node.removeFromParent();
            }, 1));
    },
    onRunAction: function() {
        this.runAction = !0, this.node.getChildByName("boss2").active = !1, this.node.getChildByName("Missile").active = !0,
            this.scheduleOnce(function() {
                this.node.getChildByName("boss2").active = !0, this.node.getChildByName("Missile").active = !1,
                    this.runAction = !1;
            }, .2);
    },
    update: function(t) {
        this.node.y += 2e3 * t, 5e3 <= this.node.y && this.node.parent.removeFromParent();
    }
});