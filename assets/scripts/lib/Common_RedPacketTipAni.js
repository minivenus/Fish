var o = cc._decorator,
    s = o.ccclass,
    n = (o.property, function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.cashConfig = [], t.cashCount = 0, t.cashLength = 0, t;
        }
        return __extends(t, o), t.prototype.start = function() {
            var t = cc.url.raw("resources/common/redPack/config/Com_CashConfig.json");
            console.log("加载配置文件：Com_CashConfig.json"), cc.loader.load(t, function(a, e) {
                if (a) console.log(a.message || a);
                else if (console.log("load Com_CashConfig success"),
                    this.cashConfig = e, this.cashConfig) {
                    console.log(this.cashConfig), this.cashLength = this.cashConfig.length;
                    var t = this.cashLength - 1,
                        o = Math.random();
                    this.cashCount = Math.round(o * t), console.log("总配置条数：" + this.cashLength), console.log("随机显示现金下标：" + this.cashCount);
                    var r = this.cashLength <= this.cashCount ? 0 : this.cashCount;
                    this.cashCount = r, this.node.getChildByName("spLine1").getChildByName("labText").getComponent(cc.Label).string = this.cashConfig[r].content,
                        this.cashCount++, r = this.cashLength <= this.cashCount ? 0 : this.cashCount, this.cashCount = r,
                        this.node.getChildByName("spLine2").getChildByName("labText").getComponent(cc.Label).string = this.cashConfig[r].content,
                        this.node.getComponent(cc.Animation).play();
                }
            }.bind(this));
        }, t.prototype.tip1Event = function() {
            this.cashCount++;
            var t = this.cashLength <= this.cashCount ? 0 : this.cashCount;
            this.cashCount = t, this.node.getChildByName("spLine1").getChildByName("labText").getComponent(cc.Label).string = this.cashConfig[t].content;
        }, t.prototype.tip2Event = function() {
            this.cashCount++;
            var t = this.cashLength <= this.cashCount ? 0 : this.cashCount;
            this.cashCount = t, this.node.getChildByName("spLine2").getChildByName("labText").getComponent(cc.Label).string = this.cashConfig[t].content;
        }, t = __decorate([s], t);
    }(cc.Component));
exports.default = n;