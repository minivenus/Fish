var propCountData = require("./PropCountData"),
    shareUtils = require("./Common_ShareUtils"),
    wxDisplayCheck = require("./wxDisplayCheck"),
    o = cc._decorator,
    a = o.ccclass,
    s = (o.property,
        function(r) {
            function e() {
                return null !== r && r.apply(this, arguments) || this;
            }
            return __extends(e, r), (t = e).prototype.start = function() {
                shareUtils.default.checkSharePrize(), console.log("注册onShow事件！"), t.callbackId || (t.callbackId = wxDisplayCheck.default.addOnShowCallback(shareUtils.default.checkSharePrize.bind(shareUtils.default)));
            }, e.prototype.onOpenResourceSupplyPage = function() {
                var a = [propCountData.default.get(10001, 0, 5, "common/resourceSupply/textures/ziyuan_003"), propCountData.default.get(10002, 0, 5, "common/resourceSupply/textures/ziyuan_002"), propCountData.default.get(10003, 0, 5, "common/resourceSupply/textures/ziyuan_003"), propCountData.default.get(10004, 0, 5, "common/resourceSupply/textures/ziyuan_003"), propCountData.default.get(10005, 0, 8, "common/resourceSupply/textures/ziyuan_001"), propCountData.default.get(10006, 0, 8, "common/resourceSupply/textures/ziyuan_002"), propCountData.default.get(10007, 0, 8, "common/resourceSupply/textures/ziyuan_002")];
                shareUtils.default.getReward(a, function(o) {
                    console.log("获取奖励成功：", o);
                    var e = 2 * Math.random() + 1 >> 0;
                    shareUtils.default.openResourceSupplyPage(e, a, function() {
                        return cc.director.loadScene("ResourceSupplayScene");
                    });
                });
            }, e.callbackId = 0, e = t = __decorate([a], e);
            var t;
        }(cc.Component));
exports.default = s;