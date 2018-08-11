var o = require("./NodeUtil"),
    m = require("./Common_Data"),
    n = require("./EChannelPrefix"),
    a = require("./ComPage"),
    s = require("./SoundUtil"),
    c = require("./Fish_UserData"),
    i = require("./Common_GlobalEventUtil"),
    r = cc._decorator,
    d = r.ccclass,
    l = (r.property,
        function(o) {
            function t() {
                var t = null !== o && o.apply(this, arguments) || this;
                return t.reward = 100, t;
            }
            return __extends(t, o), t.prototype.start = function() {
                this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet"), this.onGet),
                    c.Fish_UserData.getShareOpen() ? this.AddButtonEventStart(this, this.GetNodeByName("content/btnGet5"), this.onGet5) : (this.GetNodeByName("content/btnGet5").active = !1,
                        this.GetNodeByName("content/btnGet").setPositionX(0));
            }, t.prototype.onGet = function() {
                s.SoundUtil.PlayEffectByKey(1);
                var o = [{
                        type: 0,
                        num: this.reward
                    }],
                    e = a.ComPage.getRewardStr(o);
                a.ComPage.ShowTip("领取新手奖励" + e + "成功\n继续游戏还有更多奖励"), c.Fish_UserData.addReward(o),
                    i.GlobalEventUtil.emit("OpenAchie"), this.node.destroy();
            }, t.prototype.onGet5 = function() {
                var r = this;
                s.SoundUtil.PlayEffectByKey(1), m.default.share(n.default.reward, "", function(t) {
                    return console.log("网络错误 :", t);
                }, function(n) {
                    console.log("成功 :", n);
                    var e = [{
                            type: 0,
                            num: 5 * r.reward
                        }],
                        t = a.ComPage.getRewardStr(e);
                    a.ComPage.ShowTip("领取新手奖励" + t + "成功\n继续游戏还有更多奖励"), c.Fish_UserData.addReward(e),
                        r.node.destroy();
                }, function(t) {
                    a.ComPage.ShowTip("分享失败"), console.log("失败：", t);
                }, function(t) {
                    return console.log("complete:", t);
                }, "", "", "", "", "");
            }, t = __decorate([d], t);
        }(o.NodeUtil));
exports.default = l;