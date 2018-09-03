cc.Class({
    extends: cc.Component,
    properties: {},
    start: function() {
        var visibleSize = cc.view.getVisibleSize(),
            contentSize = this.node.getContentSize();
        this.node.scaleX = visibleSize.width / contentSize.width, this.node.scaleY = visibleSize.height / contentSize.height, this.node.position = cc.p(0, 0),
            window.adapt_scaleX = this.node.scaleX, window.adapt_scaleY = this.node.scaleY,
            console.log("this.node.position:", this.node.position);
    }
});