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
        var pos = this.node.getPosition();
        this._pos = this.node.parent.convertToWorldSpaceAR(pos);
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
    update: function() {
        if (!this._isdestroy) {
            window.isGameOver && this.onBlast();
            var heroPos = this._heroNode.getPosition();
            heroPos = this._heroNode.parent.convertToWorldSpaceAR(heroPos);
            var pos = this._pos;
            2500 < Math.sqrt(Math.pow(heroPos.x - pos.x, 2) + Math.pow(heroPos.y - pos.y, 2)) && this.node.removeFromParent();
        }
    }
});