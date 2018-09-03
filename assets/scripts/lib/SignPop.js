var nodeUtil = require("./NodeUtil"),
    fishUserData = require("./Fish_UserData"),
    n = cc._decorator,
    a = n.ccclass,
    s = n.property,
    NodeUtil = function(__super) {
        function NodeUtil() {
            var NodeUtil = null !== __super && __super.apply(this, arguments) || this;
            return NodeUtil.label = null, NodeUtil.reward = 10, NodeUtil.getReward = 0, NodeUtil;
        }
        return __extends(NodeUtil, __super), NodeUtil.prototype.start = function() {
            this.AddButtonEventStart(this, this.GetNodeByName("content/btnTrue"), this.onTrue);
        }, NodeUtil.prototype.init = function(t) {
            this.getReward = this.reward * t, this.GetNodeByName("content/labTop").getComponent(cc.Label).string = "第" + t + "签到奖励",
                this.GetNodeByName("content/labNum").getComponent(cc.Label).string = "金币x" + this.getReward;
        }, NodeUtil.prototype.onTrue = function() {
            fishUserData.Fish_UserData.addGold(this.getReward), cc.director.loadScene("GameScene");
        }, __decorate([s(cc.Label)], NodeUtil.prototype, "label", void 0), NodeUtil = __decorate([a], NodeUtil);
    }(nodeUtil.NodeUtil);
exports.default = NodeUtil;