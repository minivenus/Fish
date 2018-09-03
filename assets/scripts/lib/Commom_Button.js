var o = cc._decorator,
    d = o.ccclass,
    n = o.property,
    Common_Button = function(__super) {
        function Common_Button() {
            var Common_Button = null !== __super && __super.apply(this, arguments) || this;
            return Common_Button.labDec = null, Common_Button.sp1 = null, Common_Button.sp2 = null, Common_Button.fc1 = new cc.Color(255, 255, 255, 255),
            Common_Button.fc2 = new cc.Color(255, 255, 255, 255), Common_Button.lab1 = "", Common_Button.lab2 = "", Common_Button._callBack = null,
            Common_Button._isSelect = !1, Common_Button;
        }
        return __extends(Common_Button, __super), Common_Button.prototype.onLoad = function() {
            this.node.on(cc.Node.EventType.TOUCH_END, function() {
                this._isSelect = !this._isSelect, this.SetSelect(this._isSelect);
            }.bind(this), this), this.node.getComponent(cc.Sprite).spriteFrame = this.sp1, this.labDec.node.color = this.fc1;
        }, Common_Button.prototype.onClick = function(o, e) {
            this._isSelect = !this._isSelect, this.SetSelect(this._isSelect), null != this._callBack && this._callBack(e, this._isSelect);
        }, Common_Button.prototype.SetInit = function(a, e) {
            this._callBack = e;
            var t = new cc.Component.EventHandler();
            t.target = this.node, t.component = "ComButton", t.handler = "onClick", t.customEventData = a,
                this.node.getComponent(cc.Button).clickEvents.push(t);
        }, Common_Button.prototype.SetSelect = function(t) {
            (this._isSelect = t) ? (this.node.getComponent(cc.Sprite).spriteFrame = this.sp2,
                this.labDec.node.color = this.fc2, this.labDec.string = this.lab2) : (this.node.getComponent(cc.Sprite).spriteFrame = this.sp1,
                this.labDec.node.color = this.fc1, this.labDec.string = this.lab1);
        }, __decorate([n({
            readonly: !0,
            type: cc.Label,
            tooltip: "按钮文字节点"
        })], Common_Button.prototype, "labDec", void 0), __decorate([n({
            readonly: !0,
            type: cc.SpriteFrame,
            tooltip: "按钮初始状态图片"
        })], Common_Button.prototype, "sp1", void 0), __decorate([n({
            readonly: !0,
            type: cc.SpriteFrame,
            tooltip: "按钮选中状态图片"
        })], Common_Button.prototype, "sp2", void 0), __decorate([n({
            tooltip: "按钮文字初始颜色"
        })], Common_Button.prototype, "fc1", void 0), __decorate([n({
            tooltip: "按钮文字选中颜色"
        })], Common_Button.prototype, "fc2", void 0), __decorate([n({
            tooltip: "按钮基础文字"
        })], Common_Button.prototype, "lab1", void 0), __decorate([n({
            tooltip: "按钮选中文字"
        })], Common_Button.prototype, "lab2", void 0), Common_Button = __decorate([d], Common_Button);
    }(cc.Component);
exports.default = Common_Button;