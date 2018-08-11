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
        _radian: null
    },
    start: function() {
        this._time = 5, cc.director.getCollisionManager().enabled = !0, this.ration = .5 < Math.random(),
            this.node.y = this.ration ? -1e3 : 1e3, this.node.rotation = this.ration ? 0 : 180;
    },
    onCollisionEnter: function() {
        "gold" != name && this.onRunAction();
    },
    onBlast: function() {},
    onRunAction: function() {
        this.runAction = !0, this.node.getChildByName("boss2").active = !1, this.node.getChildByName("BigBoss").active = !0,
            this.scheduleOnce(function() {
                this.node.getChildByName("boss2").active = !0, this.node.getChildByName("BigBoss").active = !1,
                    this.runAction = !1;
            }, .2);
    },
    update: function(o) {
        var e = this.ration ? 1 : -1;
        this.node.y += 800 * o * e, (2e3 <= this.node.y || -2e3 >= this.node.y) && this.node.parent.removeFromParent();
    }
});