cc.Class({
    extends: cc.Component,
    properties: {
        _isdestroy: !1,
        _pos: null,
        _citie: !1
    },
    start: function() {},
    onCollisionEnter: function(t) {
        t.node && t.node.parent && "plane" == t.node.parent.name && !this._isdestroy && (t.node.name,
            cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
                other: t,
                target: this.node
            }), this.node.active = !1);
    },
    onBlast: function() {
        var t = this;
        this._isdestroy = !0, this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 5), cc.fadeTo(.3, 0)), cc.callFunc(function() {
            t.node.removeFromParent();
        })));
    },
    update: function(d) {
        if (!this._isdestroy && !window.isGameOver) {
            var e = window.gameCrtl._hero.parent.getPosition();
            e = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(e);
            var t = this.node.parent.getPosition();
            t = this.node.parent.parent.convertToWorldSpaceAR(t);
            var o = 90 - m(e.y - t.y, e.x - t.x) * (180 / y);
            if (400 > g(u(e.x - t.x, 2) + u(e.y - t.y, 2)) && (this._citie = !0), window.OpenCiTie && this._citie) {
                o -= this.node.rotation, 180 < p(o) && (o = 0 < o ? o - 360 : o + 360);
                var l = p(o);
                if (3 > l);
                else {
                    var n = 0 < o ? 1 : -1;
                    80 < l && 10, this.node.rotation += 60 * (20 * n * d);
                }
                var a = -y / 180 * (this.node.rotation + 90),
                    s = t.x - 30 * f(a),
                    c = t.y - 30 * _(a);
                t = this.node.parent.convertToNodeSpaceAR(cc.p(s, c)), console.log("myPos====", t),
                    this.node.setPosition(t);
            }
        }
    }
});