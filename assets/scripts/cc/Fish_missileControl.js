var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

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
        var bossNode = this.node.getChildByName("boss2");
        this.schedule(function() {
            var effect_1 = cc.scaleTo(.4, 1.1, .95),
                effect_2 = cc.scaleTo(.4, .95, 1.1);
            bossNode.runAction(cc.sequence(effect_1, effect_2));
        }, 1), this._enemy_speed = .1 * (Math.random() + 5), cc.director.getCollisionManager().enabled = !0;
    },
    onCollisionEnter: function(other) {
        var nodeName = other.node.name;
        "plane" != nodeName || this.runAction || this.onRunAction(), "BigBoss" == nodeName ? this.onBlast() : "puffer" == nodeName || "point5" == nodeName || "stone01" == nodeName || "point4" == nodeName || "point3" == nodeName || "point2" == nodeName || "point1" == nodeName || "pufferMod" == nodeName ? this.onBlast() : "Missile" == nodeName && this.node.x > other.node.x ? this.onBlast() : "Missile" == nodeName && this.node.x < other.node.x && !this.runAction && this.onRunAction();
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
    update: function(dt) {
        if (!(this.gameCtl && this.gameCtl.isPause || this._isdestroy)) {
            window.isGameOver && this.onBlast();
            var heroPos = this._heroNode.getPosition();
            heroPos = this._heroNode.parent.convertToWorldSpaceAR(heroPos);
            var nodePos = this.node.getPosition();
            nodePos = this.node.parent.convertToWorldSpaceAR(nodePos);
            var angle = 90 - m(heroPos.y - nodePos.y, heroPos.x - nodePos.x) * (180 / y),
                dist = Math.sqrt(Math.pow(heroPos.x - nodePos.x, 2) + Math.pow(heroPos.y - nodePos.y, 2));
                angle -= this.node.rotation, angle *= this.Contrary ? -1 : 1, 180 < Math.abs(angle) && (angle = 0 < angle ? angle - 360 : angle + 360);
            var nAngle = Math.abs(angle);
            if (3 > nAngle);
            else {
                var a = 1,
                    s = 0 < angle ? 1 : -1;
                80 < nAngle && (a = 10), this.node.rotation += 40 * (a * s * dt);
            }
            this._add_speed, 1.9 < 1.5 + this._add_speed || this._add_speed;
            var c = 1.5 * this._hero_speed;
            "mainpt" == window.cur_scence && (c *= 1.3);
            var r = -Math.PI / 180 * (this.node.rotation + 90),
                l = nodePos.x - Math.cos(r) * c,
                h = nodePos.y - Math.sin(r) * c;
            return nodePos = this.node.parent.convertToNodeSpaceAR(cc.p(l, h)), this.node.setPosition(nodePos),
                2500 < dist ? (this.node.destroy(), void(this._isdestroy = !0)) : void 0;
        }
    }
});