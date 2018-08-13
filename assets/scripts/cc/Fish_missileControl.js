cc.Class({
    extends: cc.Component,
    properties: {
        _heroNode: null,
        _hero_speed: 3,
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
        var a = this.node.getChildByName("boss2");
        this.schedule(function() {
            var o = cc.scaleTo(.4, 1.1, .95),
                e = cc.scaleTo(.4, .95, 1.1);
            a.runAction(cc.sequence(o, e));
        }, 1), this._enemy_speed = .1 * (Math.random() + 5), cc.director.getCollisionManager().enabled = !0;
    },
    onCollisionEnter: function(o) {
        var e = o.node.name;
        "plane" != e || this.runAction || this.onRunAction(), "BigBoss" == e ? this.onBlast() : "puffer" == e || "point5" == e || "stone01" == e || "point4" == e || "point3" == e || "point2" == e || "point1" == e || "pufferMod" == e ? this.onBlast() : "Missile" == e && this.node.x > o.node.x ? this.onBlast() : "Missile" == e && this.node.x < o.node.x && !this.runAction && this.onRunAction();
    },
    onBlast: function() {
        this._isdestroy || (this._isdestroy = !0, this.node.getChildByName("Missile").active = !1,
            this.node.getChildByName("boss2").active = !1, this.node.getChildByName("blast").active = !0,
            this.scheduleOnce(function() {
                this.node.destroy();
            }, .5));
    },
    onRunAction: function() {
        this.runAction = !0, this.node.getChildByName("boss2").active = !1, this.node.getChildByName("Missile").active = !0,
            this.scheduleOnce(function() {
                this.node.getChildByName("boss2").active = !0, this.node.getChildByName("Missile").active = !1,
                    this.runAction = !1;
            }, .2);
    },
    update: function(C) {
        if (!(this.gameCtl && this.gameCtl.isPause || this._isdestroy)) {
            window.isGameOver && this.onBlast();
            var e = this._heroNode.getPosition();
            e = this._heroNode.parent.convertToWorldSpaceAR(e);
            var t = this.node.getPosition();
            t = this.node.parent.convertToWorldSpaceAR(t);
            var o = 90 - m(e.y - t.y, e.x - t.x) * (180 / y),
                S = g(u(e.x - t.x, 2) + u(e.y - t.y, 2));
            o -= this.node.rotation, o *= this.Contrary ? -1 : 1, 180 < p(o) && (o = 0 < o ? o - 360 : o + 360);
            var n = p(o);
            if (3 > n);
            else {
                var a = 1,
                    s = 0 < o ? 1 : -1;
                80 < n && (a = 10), this.node.rotation += 40 * (a * s * C);
            }
            this._add_speed, 1.9 < 1.5 + this._add_speed || this._add_speed;
            var c = 1.5 * this._hero_speed;
            "mainpt" == window.cur_scence && (c *= 1.3);
            var r = -y / 180 * (this.node.rotation + 90),
                l = t.x - f(r) * c,
                h = t.y - _(r) * c;
            return t = this.node.parent.convertToNodeSpaceAR(cc.p(l, h)), this.node.setPosition(t),
                2500 < S ? (this.node.destroy(), void(this._isdestroy = !0)) : void 0;
        }
    }
});