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
    onCollisionEnter: function(other) {
        var nodeName = other.node.name;
        "puffer" == nodeName && (this.node.removeFromParent(), this._isdestroy = !0), "BigBoss" == nodeName && this.onBlast();
    },
    onBlast: function() {
        this._isdestroy || (this._isdestroy = !0, this.node.getChildByName("puffer").active = !1,
            this.node.getChildByName("blast").active = !0, this.scheduleOnce(function() {
                this.node.removeFromParent();
            }, 2));
    },
    update: function(dt) {
        this._isdestroy || (window.isGameOver && this.onBlast(), this.updateFrame -= dt,
            0 >= this.updateFrame && (this.sp1.active = !this.sp1.active, this.sp2.active = !this.sp1.active,
                this.updateFrame = 1));
    }
});