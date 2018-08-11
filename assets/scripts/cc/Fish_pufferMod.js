cc.Class({
    extends: cc.Component,
    properties: {
        sp1: cc.Node,
        sp2: cc.Node
    },
    start: function() {
        this.updateFrame = 1, cc.director.getCollisionManager().enabled = !0, this.sp1.active = !0,
            this.sp2.active = !1, this.sp2.scaleX = 1.1, this.sp2.scaleY = 1.1;
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
    update: function(t) {
        this._isdestroy || (window.isGameOver && this.onBlast(), this.updateFrame -= t,
            0 >= this.updateFrame && (this.sp1.active = !this.sp1.active, this.sp2.active = !this.sp1.active,
                this.updateFrame = 1));
    }
});