var p = Math.abs, m = Math.atan2, g = Math.sqrt, u = Math.pow, _ = Math.sin, f = Math.cos, y = Math.PI, t = Math.ceil, C = Math.floor;

cc.Class({
    extends: cc.Component,
    properties: {
        _isdestroy: !1,
        _pos: null,
        _citie: !1
    },
    start: function() {},
    onCollisionEnter: function(other) {
        other.node && other.node.parent && "plane" == other.node.parent.name && !this._isdestroy && (other.node.name,
            cc.director.getScene().getChildByName("Canvas").emit("Gold_push", {
                other: other,
                target: this.node
            }), this.node.active = !1);
    },
    onBlast: function() {
        var self = this;
        this._isdestroy = !0, this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 5), cc.fadeTo(.3, 0)), cc.callFunc(function() {
            self.node.removeFromParent();
        })));
    },
    update: function(d) {
        if (!this._isdestroy && !window.isGameOver) {
            var heroPos = window.gameCrtl._hero.parent.getPosition();
            heroPos = window.gameCrtl._hero.parent.parent.convertToWorldSpaceAR(heroPos);
            var pos = this.node.parent.getPosition();
            pos = this.node.parent.parent.convertToWorldSpaceAR(pos);
            var o = 90 - Math.atan2(heroPos.y - pos.y, heroPos.x - pos.x) * (180 / y);
            if (400 > Math.sqrt(Math.pow(heroPos.x - pos.x, 2) + Math.pow(heroPos.y - pos.y, 2)) && (this._citie = !0), window.OpenCiTie && this._citie) {
                o -= this.node.rotation, 180 < p(o) && (o = 0 < o ? o - 360 : o + 360);
                var l = p(o);
                if (3 > l);
                else {
                    var n = 0 < o ? 1 : -1;
                    80 < l && 10, this.node.rotation += 60 * (20 * n * d);
                }
                var a = -Math.PI / 180 * (this.node.rotation + 90),
                    s = t.x - 30 * Math.cos(a),
                    c = t.y - 30 * Math.sin(a);
                t = this.node.parent.convertToNodeSpaceAR(cc.p(s, c)), console.log("myPos====", t),
                    this.node.setPosition(t);
            }
        }
    }
});