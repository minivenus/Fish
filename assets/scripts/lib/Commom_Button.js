var o = cc._decorator,
    i = o.ccclass,
    n = o.property,
    a = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.labDec = null, t.sp1 = null, t.sp2 = null, t.fc1 = new cc.Color(255, 255, 255, 255),
                t.fc2 = new cc.Color(255, 255, 255, 255), t.lab1 = "", t.lab2 = "", t._callBack = null,
                t._isSelect = !1, t;
        }
        return __extends(t, o), t.prototype.onLoad = function() {
            this.node.on(cc.Node.EventType.TOUCH_END, function() {
                this._isSelect = !this._isSelect, this.SetSelect(this._isSelect);
            }.bind(this), this), this.node.getComponent(cc.Sprite).spriteFrame = this.sp1, this.labDec.node.color = this.fc1;
        }, t.prototype.onClick = function(o, e) {
            this._isSelect = !this._isSelect, this.SetSelect(this._isSelect), null != this._callBack && this._callBack(e, this._isSelect);
        }, t.prototype.SetInit = function(a, e) {
            this._callBack = e;
            var t = new cc.Component.EventHandler();
            t.target = this.node, t.component = "ComButton", t.handler = "onClick", t.customEventData = a,
                this.node.getComponent(cc.Button).clickEvents.push(t);
        }, t.prototype.SetSelect = function(t) {
            (this._isSelect = t) ? (this.node.getComponent(cc.Sprite).spriteFrame = this.sp2,
                this.labDec.node.color = this.fc2, this.labDec.string = this.lab2) : (this.node.getComponent(cc.Sprite).spriteFrame = this.sp1,
                this.labDec.node.color = this.fc1, this.labDec.string = this.lab1);
        }, __decorate([n({
            readonly: !0,
            type: cc.Label,
            tooltip: "按钮文字节点"
        })], t.prototype, "labDec", void 0), __decorate([n({
            readonly: !0,
            type: cc.SpriteFrame,
            tooltip: "按钮初始状态图片"
        })], t.prototype, "sp1", void 0), __decorate([n({
            readonly: !0,
            type: cc.SpriteFrame,
            tooltip: "按钮选中状态图片"
        })], t.prototype, "sp2", void 0), __decorate([n({
            tooltip: "按钮文字初始颜色"
        })], t.prototype, "fc1", void 0), __decorate([n({
            tooltip: "按钮文字选中颜色"
        })], t.prototype, "fc2", void 0), __decorate([n({
            tooltip: "按钮基础文字"
        })], t.prototype, "lab1", void 0), __decorate([n({
            tooltip: "按钮选中文字"
        })], t.prototype, "lab2", void 0), t = __decorate([i], t);
    }(cc.Component);
exports.default = a;