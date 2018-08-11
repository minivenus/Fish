var o = require("./NodeUtil"),
    i = cc._decorator,
    n = i.ccclass,
    a = i.property,
    s = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.labTop = null, t;
        }
        return __extends(t, o), t.prototype.start = function() {
                this.AddButtonEventStart(this, this.GetNodeByName("content/btnRet"), this.goHome),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnShare"), this.onShare),
                    this.AddButtonEventStart(this, this.GetNodeByName("content/btnStartGame"), this.onStart);
            }, t.prototype.goHome = function() {
                cc.director.loadScene("GameScene");
            }, t.prototype.onShare = function() {}, t.prototype.onStart = function() {}, __decorate([a(cc.Label)], t.prototype, "labTop", void 0),
            t = __decorate([n], t);
    }(o.NodeUtil);
exports.default = s