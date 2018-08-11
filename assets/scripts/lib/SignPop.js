var o = require("./NodeUtil"),
    i = require("./Fish_UserData"),
    n = cc._decorator,
    a = n.ccclass,
    s = n.property,
    l = function(o) {
        function t() {
            var t = null !== o && o.apply(this, arguments) || this;
            return t.label = null, t.reward = 10, t.getReward = 0, t;
        }
        return __extends(t, o), t.prototype.start = function() {
            this.AddButtonEventStart(this, this.GetNodeByName("content/btnTrue"), this.onTrue);
        }, t.prototype.init = function(t) {
            this.getReward = this.reward * t, this.GetNodeByName("content/labTop").getComponent(cc.Label).string = "第" + t + "签到奖励",
                this.GetNodeByName("content/labNum").getComponent(cc.Label).string = "金币x" + this.getReward;
        }, t.prototype.onTrue = function() {
            i.Fish_UserData.addGold(this.getReward), cc.director.loadScene("GameScene");
        }, __decorate([s(cc.Label)], t.prototype, "label", void 0), t = __decorate([a], t);
    }(o.NodeUtil);
exports.default = l;