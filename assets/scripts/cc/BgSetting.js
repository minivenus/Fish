cc.Class({
    extends: cc.Component,
    properties: {},
    start: function() {
        var o = cc.view.getVisibleSize(),
            e = this.node.getContentSize();
        this.node.scaleX = o.width / e.width, this.node.scaleY = o.height / e.height, this.node.position = cc.p(0, 0),
            window.adapt_scaleX = this.node.scaleX, window.adapt_scaleY = this.node.scaleY,
            console.log("this.node.position:", this.node.position);
    }
})