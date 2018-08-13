cc.Class({
    extends: cc.Component,
    properties: {
        _heroNode: null,
        _isdestroy: !1,
        _pos: null,
        _scale: 0
    },
    start: function() {
        cc.director.getCollisionManager().enabled = !0;
        var t = this.node.getPosition();
        this._pos = this.node.parent.convertToWorldSpaceAR(t);
    },
    onCollisionEnter: function(o) {
        var e = o.node.name;
        "puffer" == e && (this.node.removeFromParent(), this._isdestroy = !0), "BigBoss" == e && this.onBlast();
    },
    onBlast: function() {
        this._isdestroy || (this._isdestroy = !0, this.node.getChildByName("puffer").active = !1,
            this.node.getChildByName("blast").active = !0, this.scheduleOnce(function() {
                this.node.removeFromParent();
            }, 2));
    },
    update: function() {
        if (!this._isdestroy) {
            window.isGameOver && this.onBlast();
            var e = this._heroNode.getPosition();
            e = this._heroNode.parent.convertToWorldSpaceAR(e);
            var t = this._pos;
            2500 < g(u(e.x - t.x, 2) + u(e.y - t.y, 2)) && this.node.removeFromParent();
        }
    }
});