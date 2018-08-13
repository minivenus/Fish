var l = require("./PropCountData"),
    p = require("./Common_ShareUtils"),
    n = require("./wxDisplayCheck"),
    o = cc._decorator,
    a = o.ccclass,
    s = (o.property,
        function(r) {
            function e() {
                return null !== r && r.apply(this, arguments) || this;
            }
            return __extends(e, r), (t = e).prototype.start = function() {
                p.default.checkSharePrize(), console.log("注册onShow事件！"), t.callbackId || (t.callbackId = n.default.addOnShowCallback(p.default.checkSharePrize.bind(p.default)));
            }, e.prototype.onOpenResourceSupplyPage = function() {
                var a = [l.default.get(10001, 0, 5, "common/resourceSupply/textures/ziyuan_003"), l.default.get(10002, 0, 5, "common/resourceSupply/textures/ziyuan_002"), l.default.get(10003, 0, 5, "common/resourceSupply/textures/ziyuan_003"), l.default.get(10004, 0, 5, "common/resourceSupply/textures/ziyuan_003"), l.default.get(10005, 0, 8, "common/resourceSupply/textures/ziyuan_001"), l.default.get(10006, 0, 8, "common/resourceSupply/textures/ziyuan_002"), l.default.get(10007, 0, 8, "common/resourceSupply/textures/ziyuan_002")];
                p.default.getReward(a, function(o) {
                    console.log("获取奖励成功：", o);
                    var e = 2 * Math.random() + 1 >> 0;
                    p.default.openResourceSupplyPage(e, a, function() {
                        return cc.director.loadScene("ResourceSupplayScene");
                    });
                });
            }, e.callbackId = 0, e = t = __decorate([a], e);
            var t;
        }(cc.Component));
exports.default = s;